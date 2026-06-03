// tracker.js — Real-time Group Location Tracker (Firebase + Leaflet)

const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyDf1i_Q5669_OlmXWS94UVhlc-RW-dVedA",
    authDomain:        "europe-trip-2026-11512.firebaseapp.com",
    databaseURL:       "https://europe-trip-2026-11512-default-rtdb.firebaseio.com",
    projectId:         "europe-trip-2026-11512",
    storageBucket:     "europe-trip-2026-11512.firebasestorage.app",
    messagingSenderId: "524211349534",
    appId:             "1:524211349534:web:d2ce16f1b1c447b8fbe60f"
};

// Initialise Firebase (guard against duplicate init)
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

// ===== COLOURS PER PERSON =====
const COLOURS  = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c'];
const nameMap  = {};
let   colIdx   = 0;
function colourFor(name) {
    if (!nameMap[name]) { nameMap[name] = COLOURS[colIdx++ % COLOURS.length]; }
    return nameMap[name];
}

// ===== MAP STATE =====
let map          = null;
let mapReady     = false;
let markers      = {};   // { name: L.marker }
let dbListener   = null;

document.addEventListener('DOMContentLoaded', () => {
    const trackerBtn = document.getElementById('tracker-btn');
    const panel      = document.getElementById('tracker-panel');
    const closeBtn   = document.getElementById('close-tracker');
    const shareBtn   = document.getElementById('share-location-btn');
    const nameInput  = document.getElementById('tracker-name');
    const statusEl   = document.getElementById('tracker-status');

    if (!trackerBtn || !db) {
        if (trackerBtn) trackerBtn.style.display = 'none'; // hide if no Firebase
        return;
    }

    // Restore saved name
    nameInput.value = localStorage.getItem('eurotrip-tracker-name') || '';

    // ===== OPEN =====
    trackerBtn.addEventListener('click', () => {
        panel.style.display = 'flex';
        setTimeout(() => {
            panel.classList.add('show');
            initMap();
        }, 50);
        attachListener();
    });

    // ===== CLOSE =====
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        setTimeout(() => { panel.style.display = 'none'; }, 400);
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

        setStatus('📡 Getting your GPS position…', 'info');
        shareBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                shareBtn.disabled = false;
                const { latitude: lat, longitude: lon, accuracy } = pos.coords;
                const now     = new Date();
                const timeStr = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
                const dateStr = now.toLocaleDateString('en-GB', { day:'numeric', month:'short' });

                db.ref('locations/' + name).set({
                    name, lat, lon,
                    accuracy: Math.round(accuracy),
                    time: timeStr,
                    date: dateStr,
                    ts:   Date.now()
                })
                .then(() => setStatus(`✅ Location shared! Everyone can see you now.`, 'success'))
                .catch(e  => setStatus('❌ Save error: ' + e.message, 'error'));
            },
            (err) => {
                shareBtn.disabled = false;
                const msgs = {
                    1: '❌ Location permission denied. Please allow access in browser settings.',
                    2: '❌ Position unavailable. Try again in a moment.',
                    3: '❌ Request timed out. Try again.'
                };
                setStatus(msgs[err.code] || '❌ Could not get location.', 'error');
            },
            { enableHighAccuracy: true, timeout: 14000, maximumAge: 0 }
        );
    });

    // ===== FIREBASE REAL-TIME LISTENER =====
    function attachListener() {
        if (dbListener) return; // already attached
        dbListener = db.ref('locations').on('value', (snap) => {
            const data = snap.val() || {};
            updateMap(data);
            renderList(data);
        });
    }

    // ===== MAP INIT =====
    function initMap() {
        if (mapReady) {
            setTimeout(() => map && map.invalidateSize(), 300);
            return;
        }
        const el = document.getElementById('tracker-map');
        if (!el || typeof L === 'undefined') return;

        map = L.map('tracker-map', { zoomControl: true }).setView([56.5, -4.2], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        mapReady = true;
        setTimeout(() => map.invalidateSize(), 400);
    }

    // ===== UPDATE MAP MARKERS =====
    function updateMap(data) {
        if (!map || !mapReady) return;

        const names = Object.keys(data);

        // Remove stale markers
        Object.keys(markers).forEach(n => {
            if (!data[n]) { map.removeLayer(markers[n]); delete markers[n]; }
        });

        // Add/update markers
        names.forEach(n => {
            const loc     = data[n];
            const colour  = colourFor(n);
            const initial = n.charAt(0).toUpperCase();
            const ago     = timeAgo(loc.ts);
            const popup   = `<b>${loc.name}</b><br>${loc.date} · ${loc.time}<br><span style="color:#888">${ago} · ±${loc.accuracy}m</span>`;

            const icon = L.divIcon({
                className: '',
                html: `<div style="
                    background:${colour};color:#fff;border-radius:50%;
                    width:36px;height:36px;display:flex;align-items:center;
                    justify-content:center;font-weight:700;font-size:15px;
                    border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.35);
                    font-family:sans-serif;
                ">${initial}</div>`,
                iconSize:   [36, 36],
                iconAnchor: [18, 18]
            });

            if (markers[n]) {
                markers[n].setLatLng([loc.lat, loc.lon]);
                markers[n].setPopupContent(popup);
                markers[n].setIcon(icon);
            } else {
                markers[n] = L.marker([loc.lat, loc.lon], { icon })
                    .addTo(map)
                    .bindPopup(popup);
            }
        });

        // Zoom to fit all markers
        if (names.length > 0) {
            const group = L.featureGroup(Object.values(markers));
            map.fitBounds(group.getBounds().pad(0.25));
        }
    }

    // ===== PEOPLE LIST =====
    function renderList(data) {
        const listEl = document.getElementById('tracker-list');
        if (!listEl) return;
        const entries = Object.values(data).sort((a, b) => b.ts - a.ts);

        if (entries.length === 0) {
            listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;font-size:0.9rem">
                No one has shared their location yet.<br>Be the first!
            </p>`;
            return;
        }

        listEl.innerHTML = entries.map(loc => {
            const colour = colourFor(loc.name);
            const initial = loc.name.charAt(0).toUpperCase();
            return `
            <div class="expense-item" style="margin:0 16px 10px;cursor:pointer" onclick="
                if(window.__trackerMap && window.__trackerMarkers['${loc.name}']) {
                    window.__trackerMap.setView([${loc.lat},${loc.lon}], 14);
                    window.__trackerMarkers['${loc.name}'].openPopup();
                }
            ">
                <div class="expense-icon-box" style="background:${colour}22;color:${colour};font-weight:700;font-size:1.1rem">
                    ${initial}
                </div>
                <div class="expense-details">
                    <div class="expense-desc-text">${loc.name}</div>
                    <div class="expense-meta">
                        <span class="expense-date-lbl">${loc.date} · ${loc.time}</span>
                        <span class="expense-date-lbl" style="color:${colour}">${timeAgo(loc.ts)}</span>
                    </div>
                    <div class="expense-split-detail">±${loc.accuracy}m accuracy</div>
                </div>
                <a href="https://maps.google.com/?q=${loc.lat},${loc.lon}" target="_blank"
                   class="save-expense-btn" onclick="event.stopPropagation()"
                   style="font-size:0.78rem;padding:6px 12px;width:auto;text-decoration:none;text-align:center;flex-shrink:0">
                    Maps
                </a>
            </div>`;
        }).join('');

        // Expose for inline onclick
        window.__trackerMap     = map;
        window.__trackerMarkers = markers;
    }

    // ===== HELPERS =====
    function timeAgo(ts) {
        const m = Math.floor((Date.now() - ts) / 60000);
        if (m < 1)  return 'Just now';
        if (m < 60) return `${m}m ago`;
        const h = Math.floor(m / 60);
        if (h < 24) return `${h}h ago`;
        return `${Math.floor(h/24)}d ago`;
    }

    function setStatus(msg, type) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className   = `tracker-status tracker-status-${type}`;
    }
});
