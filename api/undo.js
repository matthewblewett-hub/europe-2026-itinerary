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

  const GITHUB_PAT = process.env.GITHUB_PAT;
  if (!GITHUB_PAT) {
    return res.status(500).json({ error: 'Missing GITHUB_PAT in Vercel.' });
  }

  try {
    const repo = 'matthewblewett-hub/europe-2026-itinerary';
    const filePath = 'data.js';

    // 1. Get commit history for data.js
    const historyUrl = `https://api.github.com/repos/${repo}/commits?path=${filePath}`;
    const histRes = await fetch(historyUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard'
      }
    });
    
    if (!histRes.ok) throw new Error('Failed to fetch commit history');
    const commits = await histRes.json();

    if (commits.length < 2) {
      throw new Error('No previous version to undo to.');
    }

    const previousCommitSha = commits[1].sha;

    // 2. Fetch the content of data.js from the previous commit
    const oldFileUrl = `https://api.github.com/repos/${repo}/contents/${filePath}?ref=${previousCommitSha}`;
    const oldFileRes = await fetch(oldFileUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard'
      }
    });

    if (!oldFileRes.ok) throw new Error('Failed to fetch previous file content');
    const oldData = await oldFileRes.json();
    const oldContentBase64 = oldData.content;

    // 3. Fetch the CURRENT file SHA so we can overwrite it
    const currFileUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const currRes = await fetch(currFileUrl, {
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard'
      }
    });
    const currData = await currRes.json();
    const currentSha = currData.sha;

    // 4. Commit the old content over the current file
    const updateRes = await fetch(currFileUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_PAT}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'App-Wizard',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `App Wizard 🪄: Undo previous change`,
        content: oldContentBase64, // The base64 from the old commit
        sha: currentSha, // The SHA of the current head file we are overwriting
        branch: 'main'
      })
    });

    if (!updateRes.ok) throw new Error('Failed to commit undo to GitHub');

    // 5. Notify Firebase so everyone's app updates
    const fbUrl = 'https://europe-trip-2026-11512-default-rtdb.firebaseio.com';
    
    // Ping hard refresh listener
    await fetch(`${fbUrl}/sys/hard_refresh.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: Date.now(),
        message: "Undid the last itinerary change."
      })
    });

    // Ping the update banner listener
    await fetch(`${fbUrl}/appUpdate.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now().toString(),
        title: "Wizard Spell Reverted 🔙",
        desc: "The previous itinerary plan was restored.",
        ts: Date.now()
      })
    });

    res.status(200).json({ success: true, message: 'Undo successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
