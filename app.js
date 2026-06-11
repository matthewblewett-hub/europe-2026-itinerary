

// --- APP WIZARD LOGIC ---
const wizardBtn = document.getElementById('wizard-btn');
const wizardModal = document.getElementById('wizard-modal');
const closeWizardBtn = document.getElementById('close-wizard');
const wizardSubmitBtn = document.getElementById('wizard-submit');
const wizardUndoBtn = document.getElementById('wizard-undo');
const wizardInput = document.getElementById('wizard-input');
const wizardStatus = document.getElementById('wizard-status');

// Only show wizard button in local dev or if a secret hash is present
if (window.location.hostname === 'localhost' || window.location.hash === '#wizard') {
    if(wizardBtn) wizardBtn.style.display = 'inline-block';
}

if (wizardBtn) {
    wizardBtn.addEventListener('click', () => {
        wizardModal.classList.add('active');
        wizardInput.value = '';
        wizardStatus.textContent = 'Ready.';
        wizardStatus.style.color = '#e2e8f0';
    });
}

if (closeWizardBtn) {
    closeWizardBtn.addEventListener('click', () => {
        wizardModal.classList.remove('active');
    });
}

if (wizardSubmitBtn) {
    wizardSubmitBtn.addEventListener('click', async () => {
        const promptText = wizardInput.value.trim();
        if (!promptText) return;

        wizardSubmitBtn.disabled = true;
        if(wizardUndoBtn) wizardUndoBtn.disabled = true;
        wizardSubmitBtn.textContent = 'Casting...';
        wizardStatus.textContent = 'Connecting to Vercel...';
        wizardStatus.style.color = '#fbbf24';

        try {
            const backendUrl = 'https://europe-2026-itinerary.vercel.app/api/wizard'; 
            
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: promptText,
                    currentDateStr: new Date().toISOString()
                })
            });
            const data = await response.json();
            if(!response.ok) throw new Error(data.error || 'Failed to execute spell');
            
            wizardStatus.textContent = 'Success! Code updated.';
            wizardStatus.style.color = '#4ade80';
            setTimeout(() => { wizardModal.classList.remove('active'); }, 2000);
        } catch (err) {
            console.error(err);
            wizardStatus.textContent = 'Error: ' + err.message;
            wizardStatus.style.color = '#ef4444';
        } finally {
            wizardSubmitBtn.disabled = false;
            wizardSubmitBtn.textContent = 'Cast Spell';
            wizardUndoBtn.disabled = false;
        }
    });
}

if (wizardUndoBtn) {
    wizardUndoBtn.addEventListener('click', async () => {
        if (!confirm("Are you sure you want to undo the last Wizard change?")) return;

        wizardUndoBtn.disabled = true;
        wizardSubmitBtn.disabled = true;
        wizardStatus.textContent = 'Reverting time... ⏳';
        wizardStatus.style.color = '#fbbf24';

        try {
            const res = await fetch('https://europe-2026-itinerary.vercel.app/api/undo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            const data = await res.json();
            
            if (data.success) {
                wizardStatus.textContent = 'Undo successful! Waiting for server (45s)...';
                wizardStatus.style.color = '#fbbf24';
                // Note: The live sync listener will auto-reload the page in 45s
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (err) {
            wizardStatus.textContent = 'Error: ' + err.message;
            wizardStatus.style.color = '#ef4444';
            wizardUndoBtn.disabled = false;
            wizardSubmitBtn.disabled = false;
        }
    });
}

// --- SECRET TAP WIZARD UNLOCK ---
let headerTaps = 0;
let tapTimeout;
const headerTitle = document.querySelector('.header-content h1');
if (headerTitle) {
    headerTitle.addEventListener('click', () => {
        headerTaps++;
        clearTimeout(tapTimeout);
        if (headerTaps >= 5) {
            if(wizardBtn) wizardBtn.style.display = 'inline-block';
            headerTaps = 0;
        }
        tapTimeout = setTimeout(() => headerTaps = 0, 2000); // reset after 2 seconds
    });
}

// Cache bust: Force reload wizard logic


// --- LIVE SYNC LISTENER ---
if (window.fbDb) {
    let initialLoad = true;
    window.fbDb.ref('sys/hard_refresh').on('value', (snap) => {
        if (initialLoad) {
            initialLoad = false;
            return;
        }
        const data = snap.val();
        if (data && data.timestamp) {
            // The AI Wizard updated the backend!
            // We wait 45 seconds to let GitHub Pages finish deploying before we reload the app.
            if(wizardStatus) {
                wizardStatus.textContent = 'App code rewritten! Waiting for server deployment (45s)...';
                wizardStatus.style.color = '#fbbf24';
            }
            
            setTimeout(() => {
                alert("App Wizard 🪄: Itinerary update deployed! Reloading your screen...");
                // Force a cache-busting reload
                window.location.href = window.location.href.split('?')[0] + '?t=' + new Date().getTime();
            }, 45000);
        }
    });
}
