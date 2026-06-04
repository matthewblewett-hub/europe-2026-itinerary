// updates.js — In-app update notification banner

const APP_URL = 'https://matthewblewett-hub.github.io/europe-2026-itinerary/';

document.addEventListener('DOMContentLoaded', () => {
    const db = window.fbDb;
    if (!db) return;

    const banner      = document.getElementById('update-banner');
    const titleEl     = document.getElementById('update-title');
    const descEl      = document.getElementById('update-desc');
    const waBtn       = document.getElementById('update-whatsapp-btn');
    const dismissBtn  = document.getElementById('update-dismiss-btn');

    if (!banner) return;

    // Listen for the latest update record in Firebase
    db.ref('appUpdate').on('value', (snap) => {
        const update = snap.val();
        if (!update) return;

        const lastSeen = parseInt(localStorage.getItem('lastSeenUpdate') || '0');
        if (update.ts <= lastSeen) return; // already seen

        // Show banner
        titleEl.textContent = update.title  || '🚀 App Updated!';
        descEl.textContent  = update.desc   || 'New features added.';
        banner.style.display = 'flex';
        setTimeout(() => banner.classList.add('show'), 10);

        // WhatsApp share button
        waBtn.addEventListener('click', () => {
            const msg = `🚀 *EuroTrip App Update!*\n\n${update.title}\n\n${update.desc}\n\n👉 Everyone please *hard refresh* the app:\n• *iPhone*: Hold the refresh icon → Reload\n• *Android*: Pull down on page, then refresh\n\n${APP_URL}`;
            window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(msg), '_blank');
        });

        // Dismiss
        dismissBtn.addEventListener('click', () => {
            banner.classList.remove('show');
            setTimeout(() => { banner.style.display = 'none'; }, 400);
            localStorage.setItem('lastSeenUpdate', update.ts.toString());
        });
    });
});
