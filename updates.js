// updates.js — In-app update notification banner

const APP_URL = 'https://matthewblewett-hub.github.io/europe-2026-itinerary/';

document.addEventListener('DOMContentLoaded', () => {
    const db = window.fbDb;
    if (!db) return;

    const banner     = document.getElementById('update-banner');
    const titleEl    = document.getElementById('update-title');
    const descEl     = document.getElementById('update-desc');
    const waBtn      = document.getElementById('update-whatsapp-btn');
    const dismissBtn = document.getElementById('update-dismiss-btn');

    if (!banner) return;

    let currentUpdate = null;

    // ===== Listen for latest update from Firebase =====
    db.ref('appUpdate').on('value', (snap) => {
        const update = snap.val();
        if (!update) return;

        const lastSeen = parseInt(localStorage.getItem('lastSeenUpdate') || '0');
        if (update.ts <= lastSeen) return; // already dismissed

        currentUpdate = update;

        titleEl.textContent  = update.title || 'App Updated!';
        descEl.textContent   = update.desc  || 'New features added.';
        banner.style.display = 'flex';
        setTimeout(() => banner.classList.add('show'), 10);
    });

    // ===== Share button — native share sheet on iPhone, clipboard fallback =====
    waBtn.addEventListener('click', async () => {
        if (!currentUpdate) return;

        const msg = [
            '🚀 EuroTrip App Update!',
            '',
            currentUpdate.title,
            '',
            currentUpdate.desc,
            '',
            '👉 Hard refresh the app to see the new features:',
            'iPhone: Hold the reload icon → tap Reload',
            'Android: Pull down to refresh'
        ].join('\n');

        // ---- Option 1: native share sheet (iOS/Android) ----
        if (navigator.share) {
            try {
                await navigator.share({ text: msg });
                return;
            } catch (e) {
                if (e.name === 'AbortError') return;
            }
        }

        // ---- Option 2: copy to clipboard ----
        try {
            await navigator.clipboard.writeText(msg);
            waBtn.textContent = '✅ Copied!';
            setTimeout(() => { waBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Share'; }, 2500);
        } catch {
            // ---- Option 3: last resort — prompt so they can copy manually ----
            prompt('Copy this message and paste into your WhatsApp group:', msg);
        }
    });

    // ===== Dismiss =====
    dismissBtn.addEventListener('click', () => {
        banner.classList.remove('show');
        setTimeout(() => { banner.style.display = 'none'; }, 400);
        if (currentUpdate) {
            localStorage.setItem('lastSeenUpdate', currentUpdate.ts.toString());
        }
    });
});
