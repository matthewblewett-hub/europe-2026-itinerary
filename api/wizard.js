export const config = {
  maxDuration: 30, // 30 seconds for Vercel
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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GITHUB_PAT = process.env.GITHUB_PAT;

  if (!GEMINI_API_KEY || !GITHUB_PAT) {
    return res.status(500).json({ error: 'Missing environment variables in Vercel.' });
  }

  try {
    // 1. Fetch current data.js from GitHub
    const repo = 'matthewblewett-hub/europe-2026-itinerary';
    const filePath = 'data.js';
    const ghUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    
    const ghRes = await fetch(ghUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard'
      }
    });
    
    if (!ghRes.ok) throw new Error('Failed to fetch data.js from GitHub');
    
    const ghData = await ghRes.json();
    const currentCode = Buffer.from(ghData.content, 'base64').toString('utf-8');
    const fileSha = ghData.sha;

    // 2. Parse data.js to get the array
    const startIndex = currentCode.indexOf('[');
    const endIndex = currentCode.lastIndexOf(']') + 1;
    if (startIndex === -1 || endIndex === 0) throw new Error('Could not parse data.js array');
    
    let rawJsonStr = currentCode.substring(startIndex, endIndex);
    // data.js has unquoted keys, which breaks JSON.parse. 
    // We will just pass the raw string to Gemini and let it figure it out!
    
    // 3. Ask Gemini to rewrite ONLY the affected day
    const todayStr = new Date().toDateString(); // e.g. "Wed Jun 10 2026"
    
    const systemInstruction = `You are a helpful travel assistant AI that modifies a Javascript array of itinerary days.
The user will provide a request to delay, shift, or cancel activities.
Analyze the user's request, identify which day object needs updating (assume it's the current day of the trip unless specified, today is ${todayStr}), and calculate the new timings.

The user's itinerary data is:
${rawJsonStr}

Return a valid JSON response exactly in this format:
{
  "targetId": "id-of-the-day-modified",
  "newDayCode": "the complete Javascript object for this day as a raw string (including braces { })"
}

CRITICAL RULES:
- Respond ONLY with the JSON object above. No markdown wrapping.
- The 'newDayCode' string must be exactly the replacement code for that day block in the array, maintaining the exact same property structure.
- Shift the times appropriately based on the user's delay request.
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `User request: ${prompt}` }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
      })
    });

    if (!geminiRes.ok) {
        throw new Error('Gemini API Error: ' + await geminiRes.text());
    }

    const geminiData = await geminiRes.json();
    const resultObj = JSON.parse(geminiData.candidates[0].content.parts[0].text);
    
    const { targetId, newDayCode } = resultObj;
    if (!targetId || !newDayCode) throw new Error('AI returned invalid structure.');

    // 4. Splice the new day code into the original data.js string
    // We find the day by its ID
    const dayStartStr = `id: "${targetId}"`;
    const dayStartAlt = `"id": "${targetId}"`;
    let idIndex = currentCode.indexOf(dayStartStr);
    if (idIndex === -1) idIndex = currentCode.indexOf(dayStartAlt);
    if (idIndex === -1) throw new Error(`Could not find day ID ${targetId} in data.js`);

    // Find the opening brace { for this day
    const objectStart = currentCode.lastIndexOf('{', idIndex);
    
    // Find the closing brace } for this day
    let openBraces = 0;
    let objectEnd = -1;
    for (let i = objectStart; i < currentCode.length; i++) {
        if (currentCode[i] === '{') openBraces++;
        if (currentCode[i] === '}') {
            openBraces--;
            if (openBraces === 0) {
                objectEnd = i + 1;
                break;
            }
        }
    }

    if (objectEnd === -1) throw new Error('Could not find end of day object');

    // Replace the specific day in the file
    const newFileCode = currentCode.substring(0, objectStart) + newDayCode + currentCode.substring(objectEnd);

    // 5. Commit back to GitHub
    const updateRes = await fetch(ghUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `App Wizard 🪄: ${prompt}`,
        content: Buffer.from(newFileCode).toString('base64'),
        sha: fileSha,
        branch: 'main'
      })
    });

    if (!updateRes.ok) throw new Error('Failed to commit to GitHub');

    // 6. Notify Firebase
    // Assuming your app listens to this endpoint
    await fetch('https://itineraryapp-europe2026-default-rtdb.europe-west1.firebasedatabase.app/updates.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now().toString(),
        title: "Wizard Spell Cast! 🪄",
        description: `Itinerary updated: ${prompt}`,
        timestamp: Date.now()
      })
    });

    res.status(200).json({ success: true, message: 'Itinerary successfully updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
