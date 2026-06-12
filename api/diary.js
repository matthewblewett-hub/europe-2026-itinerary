export const config = {
  maxDuration: 60, // Vercel timeout
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phase, tripGroup, completedActivities, quotes, itinerarySlice } = req.body;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
  }

  const systemInstruction = `You are a creative, fun, and magical AI Trip Diarist.
Your job is to read the provided trip data and write an engaging, narrative diary entry summarizing this phase of the trip.

CRITICAL RULES:
1. ONLY write about activities that are explicitly marked as "COMPLETED: TRUE" in the itinerary data. If an activity is NOT completed, pretend it didn't happen (maybe plans changed!).
2. Incorporate the provided "Quotes of the Day" naturally into the story, attributing them to the correct person.
3. Acknowledge the members of the "Trip Group" by name and their relationship.
4. Format the output ENTIRELY as rich HTML. Use <h2> for days or major sections, <p> for paragraphs, <blockquote> for quotes, and <strong> or <em> for emphasis. 
5. DO NOT wrap your response in markdown code blocks (e.g. \`\`\`html). Return ONLY raw HTML.
6. Make it sound like a beautiful, nostalgic memory scrapbook written by a close friend.`;

  // Merge the "completedActivities" map directly into the itinerarySlice to make it easier for the AI
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
${JSON.stringify(tripGroup, null, 2)}

Quotes of the Day:
${JSON.stringify(quotes, null, 2)}

Itinerary Log:
${JSON.stringify(enhancedItinerary, null, 2)}

Please generate the HTML diary!`;

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.7 }
      })
    });

    if (!geminiRes.ok) {
        throw new Error('Gemini API Error: ' + await geminiRes.text());
    }

    const geminiData = await geminiRes.json();
    let diaryHtml = geminiData.candidates[0].content.parts[0].text;
    
    // Clean up markdown block if the AI accidentally adds it
    if (diaryHtml.startsWith('\`\`\`html')) diaryHtml = diaryHtml.replace(/^\`\`\`html\n/, '');
    if (diaryHtml.startsWith('\`\`\`')) diaryHtml = diaryHtml.replace(/^\`\`\`\n/, '');
    diaryHtml = diaryHtml.replace(/\n\`\`\`$/, '');

    return res.status(200).json({ html: diaryHtml });
  } catch (error) {
    console.error("Diary generation failed:", error);
    return res.status(500).json({ error: error.message });
  }
}
