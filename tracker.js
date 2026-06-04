// tracker.js — Real-time Group Location Tracker (Firebase + Leaflet)
// Uses window.fbDb initialised by firebase-config.js

const COLOURS  = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c'];
const nameColourMap = {};
let nameColourIdx   = 0;
function colourFor(name) {
    if (!nameColourMap[name]) nameColourMap[name] = COLOURS[nameColourIdx++ % COLOURS.length];
    return nameColourMap[name];
}

let map        = null;
let mapReady   = false;
let markers    = {};
let watchId    = null;   // for live tracking
let autoLive   = false;

document.addEventListener('DOMContentLoaded', () => {
    const db         = window.fbDb;
    const LOC_REF    = db ? db.ref('locations') : null;
    const trackerBtn = document.getElementById('tracker-btn');
    const panel      = document.getElementById('tracker-panel');
    const closeBtn   = document.getElementById('close-tracker');
    const shareBtn   = document.getElementById('share-location-btn');
    const nameInput  = document.getElementById('tracker-name');
    const statusEl   = document.getElementById('tracker-status');

    if (!trackerBtn) return;

    nameInput.value = localStorage.getItem('eurotrip-tracker-name') || '';

    // ===== OPEN =====
    trackerBtn.addEventListener('click', () => {
        panel.style.display = 'flex';
        setTimeout(() => {
            panel.classList.add('show');
            initMap();
        }, 50);
        if (LOC_REF) attachListener();
    });

    // ===== CLOSE =====
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        stopLiveTracking();
        setTimeout(() => { panel.style.display = 'none'; }, 400);
    });

    // ===== FIREBASE LISTENER =====
    let fbListenerOn = false;
    function attachListener() {
        if (fbListenerOn || !LOC_REF) return;
        fbListenerOn = true;
        LOC_REF.on('value', (snap) => {
            const data = snap.val() || {};
            updateMap(data);
            renderList(data);
        });
    }

    // ===== SHARE / AUTO-LIVE TOGGLE =====
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
            setStatus('❌ Geolocation not supported.', 'error');
            return;
        }

        if (autoLive) {
            // Already live-tracking — stop
            stopLiveTracking();
            shareBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Share My Location';
            shareBtn.style.background = '';
            setStatus('⏸ Live tracking stopped.', 'info');
            return;
        }

        // One-time share
        setStatus('📡 Getting your GPS position…', 'info');
        shareBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                shareBtn.disabled = false;
                pushLocation(name, pos);
                setStatus('✅ Location shared! Everyone can see you.', 'success');

                // Offer live tracking
                const liveBtn = document.getElementById('live-toggle-btn');
                if (liveBtn) liveBtn.style.display = 'inline-flex';
            },
            (err) => {
                shareBtn.disabled = false;
                const msgs = { 1:'❌ Permission denied.', 2:'❌ Position unavailable.', 3:'❌ Timed out.' };
                setStatus(msgs[err.code] || '❌ Error.', 'error');
            },
            { enableHighAccuracy: true, timeout: 14000, maximumAge: 0 }
        );
    });

    // ===== LIVE TRACKING TOGGLE (injected into DOM after first share) =====
    function ensureLiveBtn() {
        if (document.getElementById('live-toggle-btn')) return;
        const btn = document.createElement('button');
        btn.id        = 'live-toggle-btn';
        btn.className = 'split-mode-btn';
        btn.style.cssText = 'margin-top:8px;display:none;align-items:center;gap:6px;';
        btn.innerHTML = '🔴 Start Live Tracking';
        btn.addEventListener('click', () => {
            if (autoLive) {
                stopLiveTracking();
                btn.innerHTML = '🔴 Start Live Tracking';
                btn.classList.remove('active');
                setStatus('⏸ Live tracking stopped.', 'info');
            } else {
                startLiveTracking();
                btn.innerHTML = '🟢 Live Tracking ON (tap to stop)';
                btn.classList.add('active');
            }
        });
        statusEl.parentNode.insertBefore(btn, statusEl.nextSibling);
    }

    function startLiveTracking() {
        const name = nameInput.value.trim();
        if (!name || !navigator.geolocation) return;
        autoLive = true;
        watchId  = navigator.geolocation.watchPosition(
            (pos) => {
                pushLocation(name, pos);
                const t = new Date().toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' });
                setStatus(`🟢 Live · last update ${t}`, 'success');
            },
            (err) => { setStatus('⚠️ Location error — retrying…', 'info'); },
            { enableHighAccuracy: true, maximumAge: 10000 }
        );
        ensureLiveBtn();
    }

    function stopLiveTracking() {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
        autoLive = false;
    }

    function pushLocation(name, pos) {
        if (!LOC_REF) return;
        const now     = new Date();
        LOC_REF.child(name).set({
            name,
            lat:      pos.coords.latitude,
            lon:      pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            time:     now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' }),
            date:     now.toLocaleDateString('en-GB', { day:'numeric', month:'short' }),
            ts:       Date.now()
        });
    }

    // ===== MAP INIT =====
    function initMap() {
        if (mapReady) { setTimeout(() => map && map.invalidateSize(), 300); return; }
        const el = document.getElementById('tracker-map');
        if (!el || typeof L === 'undefined') return;

        map = L.map('tracker-map', { zoomControl: true }).setView([56.5, -4.2], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(map);
        mapReady = true;
        setTimeout(() => map.invalidateSize(), 400);
    }

    function makeIcon(name) {
        const c = colourFor(name);
        return L.divIcon({
            className: '',
            html: `<div style="background:${c};color:#fff;border-radius:50%;width:36px;height:36px;
                display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;
                border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-family:sans-serif">
                ${name.charAt(0).toUpperCase()}</div>`,
            iconSize: [36,36], iconAnchor: [18,18]
        });
    }

    // ===== UPDATE MAP =====
    function updateMap(data) {
        if (!map || !mapReady) return;
        Object.keys(markers).forEach(n => {
            if (!data[n]) { map.removeLayer(markers[n]); delete markers[n]; }
        });
        Object.values(data).forEach(loc => {
            const ago    = timeAgo(loc.ts);
            const popup  = `<b>${loc.name}</b><br>${loc.date} · ${loc.time}<br><span style="color:#888">${ago} · ±${loc.accuracy}m</span>`;
            const icon   = makeIcon(loc.name);
            if (markers[loc.name]) {
                markers[loc.name].setLatLng([loc.lat, loc.lon]).setIcon(icon).setPopupContent(popup);
            } else {
                markers[loc.name] = L.marker([loc.lat, loc.lon], { icon }).addTo(map).bindPopup(popup);
            }
        });
        if (Object.keys(markers).length > 0) {
            map.fitBounds(L.featureGroup(Object.values(markers)).getBounds().pad(0.25));
        }
    }

    // ===== PEOPLE LIST =====
    function renderList(data) {
        const listEl = document.getElementById('tracker-list');
        if (!listEl) return;
        const entries = Object.values(data).sort((a, b) => b.ts - a.ts);

        if (entries.length === 0) {
            listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:20px;font-size:0.9rem">
                No one has shared yet. Tap "Share My Location" to appear on the map!</p>`;
            return;
        }

        listEl.innerHTML = entries.map(loc => {
            const c = colourFor(loc.name);
            return `
            <div class="expense-item" style="margin:0 16px 10px">
                <div class="expense-icon-box" style="background:${c}22;color:${c};font-weight:700;font-size:1.1rem;cursor:pointer"
                     onclick="if(window.__trackerMap&&window.__trackerMarkers['${loc.name}']){window.__trackerMap.setView([${loc.lat},${loc.lon}],14);window.__trackerMarkers['${loc.name}'].openPopup()}">
                    ${loc.name.charAt(0).toUpperCase()}
                </div>
                <div class="expense-details" style="cursor:pointer"
                     onclick="if(window.__trackerMap&&window.__trackerMarkers['${loc.name}']){window.__trackerMap.setView([${loc.lat},${loc.lon}],14);window.__trackerMarkers['${loc.name}'].openPopup()}">
                    <div class="expense-desc-text">${loc.name}</div>
                    <div class="expense-meta">
                        <span class="expense-date-lbl">${loc.date} · ${loc.time}</span>
                        <span class="expense-date-lbl" style="color:${c}">${timeAgo(loc.ts)}</span>
                    </div>
                    <div class="expense-split-detail">±${loc.accuracy}m accuracy</div>
                </div>
                <div class="expense-right-col" style="gap:4px">
                    <a href="https://maps.google.com/?q=${loc.lat},${loc.lon}" target="_blank"
                       class="save-expense-btn" onclick="event.stopPropagation()"
                       style="font-size:0.78rem;padding:6px 10px;width:auto;text-decoration:none;text-align:center">
                        Maps
                    </a>
                    <button class="del-btn del-loc-btn" data-name="${loc.name}" onclick="event.stopPropagation()" aria-label="Remove ${loc.name}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
        }).join('');

        listEl.querySelectorAll('.del-loc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                if (!confirm(`Remove ${name} from the map?`)) return;
                if (LOC_REF) LOC_REF.child(name).remove();
            });
        });

        window.__trackerMap     = map;
        window.__trackerMarkers = markers;
    }

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
