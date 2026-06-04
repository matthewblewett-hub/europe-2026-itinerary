// tracker.js — Group Location Tracker (Firebase + Leaflet)

const COLOURS       = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c'];
const nameColourMap = {};
let nameColourIdx   = 0;
function colourFor(name) {
    if (!nameColourMap[name]) nameColourMap[name] = COLOURS[nameColourIdx++ % COLOURS.length];
    return nameColourMap[name];
}

let map      = null;
let mapReady = false;
let markers  = {};
let liveTimer = null;   // setInterval handle for auto-ping

document.addEventListener('DOMContentLoaded', () => {
    const db      = window.fbDb;
    const LOC_REF = db ? db.ref('locations') : null;

    const trackerBtn  = document.getElementById('tracker-btn');
    const panel       = document.getElementById('tracker-panel');
    const closeBtn    = document.getElementById('close-tracker');
    const nameInput   = document.getElementById('tracker-name');
    const statusEl    = document.getElementById('tracker-status');

    // Replace the tracker share card HTML with improved two-mode UI
    const shareCard = panel ? panel.querySelector('.tracker-share-card') : null;
    if (shareCard) {
        shareCard.innerHTML = `
            <p class="tracker-note" style="margin-bottom:10px">
                Enter your name then choose how to share your location:
            </p>
            <input type="text" id="tracker-name" class="expense-input"
                   placeholder="Your name (e.g. Matt)" style="margin-bottom:10px">
            <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button id="checkin-btn" class="save-expense-btn" style="flex:1;padding:12px 10px;font-size:0.85rem">
                    📍 Check In Once
                </button>
                <button id="golive-btn" class="save-expense-btn" style="flex:1;padding:12px 10px;font-size:0.85rem;background:linear-gradient(135deg,#27ae60,#2ecc71)">
                    🟢 Go Live
                </button>
            </div>
            <div id="tracker-status" class="tracker-status" style="margin-top:8px"></div>
            <div class="tracker-tip" style="margin:10px 0 0;font-size:0.78rem">
                <i class="fas fa-info-circle"></i>
                <span><strong>Check In Once</strong> = drop your pin now.<br>
                <strong>Go Live</strong> = updates your pin every 60s <em>while this screen is open</em>.<br>
                ⚠️ For background tracking while using other apps, use <strong>WhatsApp → Share Live Location</strong> in your group chat.</span>
            </div>
        `;
        // Restore saved name
        const ni = shareCard.querySelector('#tracker-name');
        if (ni) ni.value = localStorage.getItem('eurotrip-tracker-name') || '';
    }

    if (!trackerBtn) return;

    // ===== OPEN =====
    trackerBtn.addEventListener('click', () => {
        panel.style.display = 'flex';
        setTimeout(() => {
            panel.classList.add('show');
            initMap();
        }, 50);
        if (LOC_REF) attachListener();
        bindButtons();
    });

    // ===== CLOSE =====
    closeBtn.addEventListener('click', () => {
        panel.classList.remove('show');
        stopLive();
        setTimeout(() => { panel.style.display = 'none'; }, 400);
    });

    // ===== BIND BUTTONS (after DOM rebuild) =====
    function bindButtons() {
        const checkinBtn = document.getElementById('checkin-btn');
        const goliveBtn  = document.getElementById('golive-btn');
        const nameEl     = document.getElementById('tracker-name');
        const statEl     = document.getElementById('tracker-status');

        if (checkinBtn) {
            checkinBtn.addEventListener('click', () => {
                const name = nameEl ? nameEl.value.trim() : '';
                if (!name) { if (nameEl) { nameEl.focus(); nameEl.classList.add('shake'); setTimeout(() => nameEl.classList.remove('shake'),500); } return; }
                localStorage.setItem('eurotrip-tracker-name', name);
                stopLive();
                updateGoLiveBtn(goliveBtn, false);
                pingOnce(name, statEl, checkinBtn);
            });
        }

        if (goliveBtn) {
            goliveBtn.addEventListener('click', () => {
                const name = nameEl ? nameEl.value.trim() : '';
                if (!name) { if (nameEl) { nameEl.focus(); nameEl.classList.add('shake'); setTimeout(() => nameEl.classList.remove('shake'),500); } return; }
                localStorage.setItem('eurotrip-tracker-name', name);

                if (liveTimer) {
                    // Already live — stop
                    stopLive();
                    updateGoLiveBtn(goliveBtn, false);
                    setStatusEl(statEl, '⏸ Live tracking stopped.', 'info');
                } else {
                    // Start live
                    startLive(name, statEl, goliveBtn);
                }
            });
        }
    }

    // ===== ONE-TIME CHECK-IN =====
    function pingOnce(name, statEl, btn) {
        if (!navigator.geolocation) { setStatusEl(statEl, '❌ Geolocation not supported.', 'error'); return; }
        setStatusEl(statEl, '📡 Getting GPS…', 'info');
        if (btn) btn.disabled = true;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                if (btn) btn.disabled = false;
                pushLocation(name, pos);
                setStatusEl(statEl, `✅ Checked in at ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}`, 'success');
            },
            (err) => {
                if (btn) btn.disabled = false;
                const msgs = {1:'❌ Permission denied.',2:'❌ Position unavailable.',3:'❌ Timed out.'};
                setStatusEl(statEl, msgs[err.code]||'❌ Error.', 'error');
            },
            { enableHighAccuracy: true, timeout: 14000, maximumAge: 0 }
        );
    }

    // ===== LIVE TRACKING (60s interval) =====
    function startLive(name, statEl, btn) {
        if (!navigator.geolocation) { setStatusEl(statEl, '❌ Geolocation not supported.', 'error'); return; }
        updateGoLiveBtn(btn, true);
        // Ping immediately then every 60s
        pingLive(name, statEl);
        liveTimer = setInterval(() => pingLive(name, statEl), 60000);
    }

    function pingLive(name, statEl) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                pushLocation(name, pos);
                setStatusEl(statEl, `🟢 Live · updated ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}`, 'success');
            },
            () => setStatusEl(statEl, '⚠️ GPS error, will retry in 60s…', 'info'),
            { enableHighAccuracy: true, timeout: 14000, maximumAge: 30000 }
        );
    }

    function stopLive() {
        if (liveTimer) { clearInterval(liveTimer); liveTimer = null; }
    }

    function updateGoLiveBtn(btn, isLive) {
        if (!btn) return;
        if (isLive) {
            btn.innerHTML = '🔴 Stop Live';
            btn.style.background = 'linear-gradient(135deg,#c0392b,#e74c3c)';
        } else {
            btn.innerHTML = '🟢 Go Live';
            btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';
        }
    }

    // ===== PUSH TO FIREBASE =====
    function pushLocation(name, pos) {
        if (!LOC_REF) return;
        const now = new Date();
        LOC_REF.child(name).set({
            name,
            lat:      pos.coords.latitude,
            lon:      pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            time:     now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),
            date:     now.toLocaleDateString('en-GB',{day:'numeric',month:'short'}),
            ts:       Date.now()
        });
    }

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

    // ===== MAP =====
    function initMap() {
        if (mapReady) { setTimeout(() => map && map.invalidateSize(), 300); return; }
        const el = document.getElementById('tracker-map');
        if (!el || typeof L === 'undefined') return;
        map = L.map('tracker-map', { zoomControl: true }).setView([56.5, -4.2], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 18
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
            iconSize:[36,36], iconAnchor:[18,18]
        });
    }

    function updateMap(data) {
        if (!map || !mapReady) return;
        Object.keys(markers).forEach(n => {
            if (!data[n]) { map.removeLayer(markers[n]); delete markers[n]; }
        });
        Object.values(data).forEach(loc => {
            const ago   = timeAgo(loc.ts);
            const popup = `<b>${loc.name}</b><br>${loc.date} · ${loc.time}<br><span style="color:#888">${ago} · ±${loc.accuracy}m</span>`;
            const icon  = makeIcon(loc.name);
            if (markers[loc.name]) {
                markers[loc.name].setLatLng([loc.lat,loc.lon]).setIcon(icon).setPopupContent(popup);
            } else {
                markers[loc.name] = L.marker([loc.lat,loc.lon],{icon}).addTo(map).bindPopup(popup);
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
        const entries = Object.values(data).sort((a,b) => b.ts - a.ts);
        if (entries.length === 0) {
            listEl.innerHTML = `<p style="text-align:center;color:var(--text-secondary);padding:16px;font-size:0.9rem">No one has checked in yet.</p>`;
            return;
        }
        listEl.innerHTML = entries.map(loc => {
            const c   = colourFor(loc.name);
            const ago = timeAgo(loc.ts);
            // Show stale warning if > 10 mins old
            const stale = (Date.now() - loc.ts) > 600000;
            return `
            <div class="expense-item" style="margin:0 16px 10px">
                <div class="expense-icon-box" style="background:${c}22;color:${c};font-weight:700;font-size:1.1rem;position:relative;cursor:pointer"
                     onclick="if(window.__trackerMap&&window.__trackerMarkers['${loc.name}']){window.__trackerMap.setView([${loc.lat},${loc.lon}],14);window.__trackerMarkers['${loc.name}'].openPopup()}">
                    ${loc.name.charAt(0).toUpperCase()}
                    ${!stale ? `<span style="position:absolute;bottom:0;right:0;width:9px;height:9px;background:#2ecc71;border-radius:50%;border:2px solid var(--card-bg)"></span>` : ''}
                </div>
                <div class="expense-details" style="cursor:pointer"
                     onclick="if(window.__trackerMap&&window.__trackerMarkers['${loc.name}']){window.__trackerMap.setView([${loc.lat},${loc.lon}],14);window.__trackerMarkers['${loc.name}'].openPopup()}">
                    <div class="expense-desc-text">${loc.name}</div>
                    <div class="expense-meta">
                        <span class="expense-date-lbl">${loc.date} · ${loc.time}</span>
                        <span class="expense-date-lbl" style="color:${stale?'#e67e22':c}">${ago}${stale?' · may be stale':''}</span>
                    </div>
                    <div class="expense-split-detail">±${loc.accuracy}m accuracy</div>
                </div>
                <div class="expense-right-col" style="gap:4px">
                    <a href="https://maps.google.com/?q=${loc.lat},${loc.lon}" target="_blank"
                       class="save-expense-btn" onclick="event.stopPropagation()"
                       style="font-size:0.78rem;padding:6px 10px;width:auto;text-decoration:none;text-align:center">Maps</a>
                    <button class="del-btn del-loc-btn" data-name="${loc.name}" onclick="event.stopPropagation()" aria-label="Remove">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
        }).join('');

        listEl.querySelectorAll('.del-loc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!confirm(`Remove ${btn.dataset.name} from the map?`)) return;
                if (LOC_REF) LOC_REF.child(btn.dataset.name).remove();
            });
        });

        window.__trackerMap     = map;
        window.__trackerMarkers = markers;
    }

    function timeAgo(ts) {
        const m = Math.floor((Date.now()-ts)/60000);
        if (m<1)  return 'Just now';
        if (m<60) return `${m}m ago`;
        const h = Math.floor(m/60);
        if (h<24) return `${h}h ago`;
        return `${Math.floor(h/24)}d ago`;
    }

    function setStatusEl(el, msg, type) {
        if (!el) return;
        el.textContent = msg;
        el.className   = `tracker-status tracker-status-${type}`;
    }
});
