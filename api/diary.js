export const config = {
  runtime: 'edge',
};

const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
};

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const { phase, tripGroup, completedActivities, quotes, photos, dayNotes, itinerarySlice } = body;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY environment variable.' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  // Map tripGroup to remove the massive base64 avatars before sending to Gemini, sending only the IDs
  const safeTripGroup = tripGroup.map(member => ({
    id: member.id,
    name: member.name,
    relation: member.relation,
    hasProfilePic: !!member.avatar
  }));

  const systemInstruction = `You are a creative, fun, and magical AI Trip Diarist (aka The App Wizard).
Your job is to read the provided trip data and write an engaging, narrative diary entry summarizing this phase of the trip.

CRITICAL RULES:
1. Start the diary with a beautiful cover page or main title section using the format: "The Travels of [Names of Group Members] - [Trip Phase]". Directly below the title, arrange the profile pictures of the group members in a circle or neat row. I have provided the "Trip Group Members" with their IDs. For each member that has a profile pic, embed it using <img src="AVATAR_ID_HereGoesTheID" style="width:80px; height:80px; border-radius:50%; object-fit:cover; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.2); margin: 0 10px;"> along with their name underneath.
2. ONLY write about activities that are explicitly marked as "COMPLETED: TRUE" in the itinerary data. If an activity is NOT completed, pretend it didn't happen (maybe plans changed!).
3. I have provided "Quotes of the Day" (funny or memorable sayings). Feel free to quote these directly and attribute them.
4. I have also provided "Daily Ratings & Notes". These are private, end-of-day reflections and star ratings (out of 5) written by the users for each specific day. Do NOT just copy-paste these notes. Instead, use them as inside information to shape the emotional tone of that day's narrative (e.g. if they rated it a 5/5 and said it was exhausting but beautiful, weave that feeling into the story).
5. Acknowledge the members of the "Trip Group" by name and their relationship where appropriate.
6. I have provided a list of "Trip Photos" with their IDs, days, and captions. Select the best 3 to 5 photos that fit the narrative and embed them directly into your HTML output using <img src="PHOTO_ID_HereGoesTheID" style="width:100%; max-width: 600px; border-radius:8px; margin: 20px auto; display: block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">. Include the caption underneath the photo in italicized text centered.
7. Format the output ENTIRELY as rich HTML. Use <h2> for days or major sections, <p> for paragraphs, and <strong> or <em> for emphasis. 
8. DO NOT wrap your response in markdown code blocks (e.g. \`\`\`html). Return ONLY raw HTML.
9. Make it sound like a beautiful, nostalgic memory scrapbook written by a close friend.`;

  const enhancedItinerary = itinerarySlice.map(day => {
    const dayCompleted = completedActivities[day.id] || {};
    return {
      day: day.title,
      date: day.date,
      activities: day.items.map((item, idx) => ({
        time: item.time,
        title: item.title,
        description: item.description,
        completed: !!dayCompleted[idx]
      }))
    };
  });

  const prompt = `
Trip Phase: ${phase}

Trip Group Members:
${JSON.stringify(safeTripGroup, null, 2)}

Daily Ratings & Notes (Use to shape the story's emotion):
${JSON.stringify(dayNotes, null, 2)}

Trip Photos (Embed 3-5 of these into the story):
${JSON.stringify(photos, null, 2)}

Quotes of the Day (Quote these directly):
${JSON.stringify(quotes, null, 2)}

Itinerary (ONLY WRITE ABOUT COMPLETED ACTIVITIES):
${JSON.stringify(enhancedItinerary, null, 2)}
`;

  try {
    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return new Response(JSON.stringify({ error: `Gemini API Error: ${errorText}` }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const geminiData = await geminiRes.json();
    let diaryHtml = geminiData.candidates[0].content.parts[0].text;
    
    // Clean up markdown code blocks if the AI accidentally adds them despite instructions
    diaryHtml = diaryHtml.replace(/^```html\n/, '').replace(/\n```$/, '');

    return new Response(JSON.stringify({ html: diaryHtml }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });

  } catch (error) {
    console.error("Diary generation failed:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
}
