

// --- APP WIZARD LOGIC ---
const wizardBtn = document.getElementById('wizard-btn');
const wizardModal = document.getElementById('wizard-modal');
const closeWizardBtn = document.getElementById('close-wizard');
const wizardSubmitBtn = document.getElementById('wizard-submit');
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
        wizardSubmitBtn.textContent = 'Casting...';
        wizardStatus.textContent = 'Calling AI backend...';
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
