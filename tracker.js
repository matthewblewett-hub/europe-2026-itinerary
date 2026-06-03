// tracker.js — Group Location Tracker (WhatsApp-based sharing)

document.addEventListener('DOMContentLoaded', () => {
    const trackerBtn   = document.getElementById('tracker-btn');
    const trackerPanel = document.getElementById('tracker-panel');
    const closeTracker = document.getElementById('close-tracker');
    const shareBtn     = document.getElementById('share-location-btn');
    const nameInput    = document.getElementById('tracker-name');
    const statusEl     = document.getElementById('tracker-status');
    const listEl       = document.getElementById('tracker-list');

    if (!trackerBtn) return;

    // ===== STORAGE =====
    function getSavedLocations() {
        try { return JSON.parse(localStorage.getItem('eurotrip-locations')) || []; }
        catch { return []; }
    }
    function saveLocations(list) {
        localStorage.setItem('eurotrip-locations', JSON.stringify(list));
    }
    function getSavedName() {
        return localStorage.getItem('eurotrip-tracker-name') || '';
    }

    // ===== OPEN/CLOSE =====
    trackerBtn.addEventListener('click', () => {
        trackerPanel.style.display = 'flex';
        setTimeout(() => trackerPanel.classList.add('show'), 10);
        nameInput.value = getSavedName();
        renderTrackerList();
    });

    closeTracker.addEventListener('click', () => {
        trackerPanel.classList.remove('show');
        setTimeout(() => { trackerPanel.style.display = 'none'; }, 400);
    });

    // ===== SHARE LOCATION =====
    shareBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.focus();
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            return;
        }

        localStorage.setItem('eurotrip-tracker-name', name);

        if (!navigator.geolocation) {
            setStatus('❌ Geolocation not supported on this browser.', 'error');
            return;
        }

        setStatus('📡 Getting your location…', 'info');
        shareBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                shareBtn.disabled = false;
                const lat = pos.coords.latitude.toFixed(6);
                const lon = pos.coords.longitude.toFixed(6);
                const accuracy = Math.round(pos.coords.accuracy);
                const now = new Date();
                const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
                const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

                // Save to local history
                const locs = getSavedLocations();
                locs.unshift({ name, lat, lon, accuracy, time: timeStr, date: dateStr, ts: Date.now() });
                saveLocations(locs.slice(0, 20)); // keep last 20

                // Build WhatsApp message
                const mapsUrl = `https://maps.google.com/?q=${lat},${lon}`;
                const msg = `📍 ${name}'s location (${dateStr} ${timeStr}):\n${mapsUrl}\n(±${accuracy}m accuracy)`;
                const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;

                setStatus(`✅ Got your location! Opening WhatsApp…`, 'success');
                renderTrackerList();

                // Small delay so status is visible before redirect
                setTimeout(() => { window.open(waUrl, '_blank'); }, 800);
            },
            (err) => {
                shareBtn.disabled = false;
                const msgs = {
                    1: '❌ Location permission denied. Please allow location access in your browser settings.',
                    2: '❌ Location unavailable. Try again in a moment.',
                    3: '❌ Location request timed out. Try again.'
                };
                setStatus(msgs[err.code] || '❌ Could not get location.', 'error');
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
    });

    function setStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = `tracker-status tracker-status-${type}`;
    }

    // ===== RENDER LOCATION LIST =====
    function renderTrackerList() {
        const locs = getSavedLocations();
        if (!listEl) return;
        if (locs.length === 0) {
            listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;font-size:0.9rem">No saved locations yet.</p>`;
            return;
        }
        listEl.innerHTML = locs.map(loc => `
            <div class="expense-item" style="margin:0 16px 10px">
                <div class="expense-icon-box" style="font-size:1.4rem">📍</div>
                <div class="expense-details">
                    <div class="expense-desc-text">${loc.name}</div>
                    <div class="expense-meta">
                        <span class="expense-date-lbl">${loc.date} ${loc.time}</span>
                        ${loc.accuracy ? `<span class="expense-date-lbl">±${loc.accuracy}m</span>` : ''}
                    </div>
                </div>
                <div class="expense-right-col">
                    <a href="https://maps.google.com/?q=${loc.lat},${loc.lon}" target="_blank"
                       class="save-expense-btn" style="font-size:0.78rem;padding:6px 12px;width:auto;text-decoration:none;text-align:center">
                        Maps
                    </a>
                    <button class="del-btn del-loc-btn" data-ts="${loc.ts}" aria-label="Remove">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');

        listEl.querySelectorAll('.del-loc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const ts = parseInt(btn.dataset.ts);
                saveLocations(getSavedLocations().filter(l => l.ts !== ts));
                renderTrackerList();
            });
        });
    }
});
