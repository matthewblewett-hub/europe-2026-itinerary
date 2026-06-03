// quotes.js — Sayings of the Day + Hall of Fame

document.addEventListener('DOMContentLoaded', () => {

    // ===== STORAGE =====
    function getQuotes() {
        try { return JSON.parse(localStorage.getItem('eurotrip-quotes')) || []; }
        catch { return []; }
    }
    function saveQuotes(list) {
        localStorage.setItem('eurotrip-quotes', JSON.stringify(list));
    }

    // ===== QUOTE SECTION IN DAY MODAL =====
    // Called by script.js when modal opens (see integration below)
    window.loadDayQuotes = function(dayId, dayTitle, dayDate) {
        const listEl = document.getElementById('quotes-day-list');
        const saveBtn = document.getElementById('save-quote-btn');
        const textEl  = document.getElementById('new-quote-text');
        const authorEl = document.getElementById('new-quote-author');
        if (!listEl || !saveBtn) return;

        renderDayQuotes(dayId, listEl);

        // Avoid duplicate listeners by cloning
        const newSave = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSave, saveBtn);

        newSave.addEventListener('click', () => {
            const text   = textEl.value.trim();
            const author = authorEl.value.trim() || 'Someone';
            if (!text) { textEl.focus(); return; }

            const list = getQuotes();
            list.push({
                id:        Date.now(),
                dayId,
                dayTitle,
                dayDate,
                text,
                author,
                likes:     0
            });
            saveQuotes(list);
            textEl.value   = '';
            authorEl.value = '';
            renderDayQuotes(dayId, listEl);
        });
    };

    function renderDayQuotes(dayId, listEl) {
        const quotes = getQuotes().filter(q => q.dayId === dayId);
        if (quotes.length === 0) {
            listEl.innerHTML = '';
            return;
        }
        listEl.innerHTML = quotes.map(q => `
            <div class="quote-day-item" data-qid="${q.id}">
                <div class="quote-day-body">
                    <div class="quote-day-text">"${q.text}"</div>
                    <div class="quote-day-author">— ${q.author}</div>
                </div>
                <button class="quote-del-btn" data-qid="${q.id}" aria-label="Delete quote">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `).join('');

        listEl.querySelectorAll('.quote-del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.qid);
                saveQuotes(getQuotes().filter(q => q.id !== id));
                renderDayQuotes(dayId, listEl);
            });
        });
    }

    // ===== HALL OF FAME PANEL =====
    const hofBtn   = document.getElementById('hof-btn');
    const hofPanel = document.getElementById('hof-panel');
    const closeHof = document.getElementById('close-hof');
    const hofBody  = document.getElementById('hof-body');

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
        const list = getQuotes();
        if (list.length === 0) {
            hofBody.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-quote-left"></i>
                    <p>No sayings saved yet.<br>Open a day and add a memorable quote!</p>
                </div>`;
            return;
        }

        // Sort by likes descending
        const sorted = [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        const topLikes = sorted[0].likes || 0;

        hofBody.innerHTML = sorted.map((q, i) => {
            const isTop = i === 0 && topLikes > 0;
            return `
            <div class="hof-quote-card ${isTop ? 'top-quote' : ''}" data-qid="${q.id}">
                ${isTop ? '<div class="hof-quote-trophy">🏆 Trip Favourite</div>' : ''}
                <div class="hof-quote-text">${q.text}</div>
                <div class="hof-quote-meta">
                    <div>
                        <div class="hof-quote-who">— ${q.author}</div>
                        <div class="hof-quote-day">${q.dayTitle || q.dayDate || ''}</div>
                    </div>
                    <button class="hof-like-btn" data-qid="${q.id}">
                        ❤️ <span class="like-count">${q.likes || 0}</span>
                    </button>
                </div>
            </div>`;
        }).join('');

        hofBody.querySelectorAll('.hof-like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.qid);
                const quotes = getQuotes();
                const q = quotes.find(x => x.id === id);
                if (q) {
                    q.likes = (q.likes || 0) + 1;
                    saveQuotes(quotes);
                    renderHOF(); // re-render to re-sort
                }
            });
        });
    }

    // ===== INTEGRATE WITH SCRIPT.JS MODAL OPEN =====
    // Patch openDayDetails to also call loadDayQuotes
    const origOpenDayDetails = window.__origOpenDayDetails;
    // We use a MutationObserver to detect when the modal title changes (modal opens)
    const modalTitle = document.getElementById('modal-title');
    if (modalTitle) {
        const obs = new MutationObserver(() => {
            // Find current day from itinerary by matching the title shown
            // We use a global currentDayForQuotes set by the modal
            const dayId = window.__currentDayForQuotes;
            if (dayId) {
                const day = (typeof itinerary !== 'undefined')
                    ? itinerary.find(d => d.id === dayId) : null;
                if (day) loadDayQuotes(day.id, day.title, day.date);
            }
        });
        obs.observe(modalTitle, { characterData: true, childList: true, subtree: true });
    }
});
