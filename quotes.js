// quotes.js — Sayings of the Day + Hall of Fame (Firebase-backed, shared across all devices)

document.addEventListener('DOMContentLoaded', () => {
    const db        = window.fbDb;
    const QTS_REF   = db ? db.ref('quotes') : null;
    let allQuotes   = []; // local cache from Firebase snapshot

    // ===== FIREBASE LISTENER (runs once globally) =====
    if (QTS_REF) {
        QTS_REF.on('value', (snap) => {
            const raw = snap.val() || {};
            allQuotes = Object.entries(raw)
                .map(([key, val]) => ({ ...val, fbKey: key }))
                .sort((a, b) => (b.likes || 0) - (a.likes || 0));
            // Refresh HOF if it's open
            if (document.getElementById('hof-panel').classList.contains('show')) {
                renderHOF();
            }
            // Refresh day list if modal is open
            const dayId = window.__currentDayForQuotes;
            if (dayId && document.getElementById('detail-modal').classList.contains('open')) {
                renderDayQuotes(dayId);
            }
        });
    }

    // ===== QUOTE SECTION IN DAY MODAL =====
    window.loadDayQuotes = function (dayId, dayTitle, dayDate) {
        const saveBtn  = document.getElementById('save-quote-btn');
        const textEl   = document.getElementById('new-quote-text');
        const authorEl = document.getElementById('new-quote-author');
        if (!saveBtn) return;

        renderDayQuotes(dayId);

        const newSave = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSave, saveBtn);

        newSave.addEventListener('click', () => {
            const text   = textEl.value.trim();
            const author = authorEl.value.trim() || 'Someone';
            if (!text) { textEl.focus(); return; }

            const record = {
                dayId, dayTitle, dayDate,
                text, author,
                likes: 0,
                ts:    Date.now()
            };

            if (QTS_REF) {
                QTS_REF.push(record).catch(e => console.error('Quote save error:', e));
            } else {
                // localStorage fallback
                const list = getLocalQuotes();
                list.push({ ...record, fbKey: Date.now().toString() });
                localStorage.setItem('eurotrip-quotes', JSON.stringify(list));
                allQuotes = list.sort((a, b) => (b.likes||0) - (a.likes||0));
                renderDayQuotes(dayId);
            }
            textEl.value = '';
            authorEl.value = '';
        });
    };

    function renderDayQuotes(dayId) {
        const listEl = document.getElementById('quotes-day-list');
        if (!listEl) return;
        const source = QTS_REF ? allQuotes : getLocalQuotes();
        const quotes = source.filter(q => q.dayId === dayId);

        if (quotes.length === 0) { listEl.innerHTML = ''; return; }

        listEl.innerHTML = quotes.map(q => `
            <div class="quote-day-item" data-fbkey="${q.fbKey || ''}">
                <div class="quote-day-body">
                    <div class="quote-day-text">"${q.text}"</div>
                    <div class="quote-day-author">— ${q.author}
                        ${q.likes > 0 ? `<span style="color:var(--accent);margin-left:6px">❤️ ${q.likes}</span>` : ''}
                    </div>
                </div>
                <button class="quote-del-btn" data-fbkey="${q.fbKey || ''}" aria-label="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`).join('');

        listEl.querySelectorAll('.quote-del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.fbkey;
                if (key && QTS_REF) {
                    QTS_REF.child(key).remove();
                } else {
                    const local = getLocalQuotes().filter(q => q.fbKey !== key);
                    localStorage.setItem('eurotrip-quotes', JSON.stringify(local));
                    allQuotes = local;
                    renderDayQuotes(dayId);
                }
            });
        });
    }

    // ===== HALL OF FAME PANEL =====
    const hofBtn   = document.getElementById('hof-btn');
    const hofPanel = document.getElementById('hof-panel');
    const closeHof = document.getElementById('close-hof');

    if (hofBtn) {
        hofBtn.addEventListener('click', () => {
            hofPanel.style.display = 'flex';
            setTimeout(() => hofPanel.classList.add('show'), 10);
            renderHOF();
        });
    }
    if (closeHof) {
        closeHof.addEventListener('click', () => {
            hofPanel.classList.remove('show');
            setTimeout(() => { hofPanel.style.display = 'none'; }, 400);
        });
    }

    function renderHOF() {
        const hofBody = document.getElementById('hof-body');
        const source  = QTS_REF ? allQuotes : getLocalQuotes().sort((a,b) => (b.likes||0)-(a.likes||0));

        if (source.length === 0) {
            hofBody.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-quote-left"></i>
                    <p>No sayings saved yet.<br>Open any day and add a memorable quote!</p>
                </div>`;
            return;
        }

        const topLikes = source[0].likes || 0;

        hofBody.innerHTML = source.map((q, i) => {
            const isTop = (i === 0 && topLikes > 0);
            return `
            <div class="hof-quote-card ${isTop ? 'top-quote' : ''}">
                ${isTop ? '<div class="hof-quote-trophy">🏆 Trip Favourite</div>' : ''}
                <div class="hof-quote-text">${q.text}</div>
                <div class="hof-quote-meta">
                    <div>
                        <div class="hof-quote-who">— ${q.author}</div>
                        <div class="hof-quote-day">${q.dayTitle || q.dayDate || ''}</div>
                    </div>
                    <button class="hof-like-btn" data-fbkey="${q.fbKey || ''}">
                        ❤️ <span class="like-count">${q.likes || 0}</span>
                    </button>
                </div>
            </div>`;
        }).join('');

        hofBody.querySelectorAll('.hof-like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.fbkey;
                if (key && QTS_REF) {
                    // Atomic increment using Firebase transaction
                    QTS_REF.child(key + '/likes').transaction(cur => (cur || 0) + 1);
                } else {
                    const local = getLocalQuotes();
                    const q = local.find(x => x.fbKey === key);
                    if (q) { q.likes = (q.likes || 0) + 1; }
                    localStorage.setItem('eurotrip-quotes', JSON.stringify(local));
                    allQuotes = local.sort((a,b) => (b.likes||0)-(a.likes||0));
                    renderHOF();
                }
                btn.classList.add('liked');
            });
        });
    }

    // ===== INTEGRATE WITH MODAL =====
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
        const obs = new MutationObserver(() => {
            const dayId = window.__currentDayForQuotes;
            if (dayId) {
                const day = (typeof itinerary !== 'undefined')
                    ? itinerary.find(d => d.id === dayId) : null;
                if (day) loadDayQuotes(day.id, day.title, day.date);
            }
        });
        obs.observe(modalTitle, { characterData: true, childList: true, subtree: true });
    }

    // ===== LOCAL FALLBACK =====
    function getLocalQuotes() {
        try { return JSON.parse(localStorage.getItem('eurotrip-quotes')) || []; }
        catch { return []; }
    }
});
