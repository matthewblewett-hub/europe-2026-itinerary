// expenses.js — Blues vs Oosties Trip Expense Splitter

document.addEventListener('DOMContentLoaded', () => {
    const fab          = document.getElementById('split-fab');
    const panel        = document.getElementById('split-panel');
    const closePanel   = document.getElementById('close-split');
    const addBtn       = document.getElementById('add-expense-btn');
    const addModal     = document.getElementById('add-expense-modal');
    const closeAdd     = document.getElementById('close-add-expense');
    const saveBtn      = document.getElementById('save-expense-btn');
    const photoInput   = document.getElementById('receipt-photo');
    const photoPreview = document.getElementById('receipt-preview');
    const photoHolder  = document.getElementById('photo-placeholder');

    let selectedPaidBy = null;
    let capturedPhoto  = null;

    // ===== STORAGE =====
    function getExpenses() {
        try { return JSON.parse(localStorage.getItem('eurotrip-expenses')) || []; }
        catch { return []; }
    }
    function saveExpenses(list) {
        localStorage.setItem('eurotrip-expenses', JSON.stringify(list));
    }

    // ===== FAB: OPEN PANEL =====
    fab.addEventListener('click', () => {
        panel.style.display = 'flex';
        setTimeout(() => panel.classList.add('show'), 10);
        renderPanel();
    });

    closePanel.addEventListener('click', () => {
        panel.classList.remove('show');
        setTimeout(() => { panel.style.display = 'none'; }, 400);
    });

    // ===== ADD EXPENSE SHEET =====
    addBtn.addEventListener('click', openAddSheet);

    function openAddSheet() {
        resetForm();
        addModal.style.display = 'flex';
        setTimeout(() => addModal.classList.add('show'), 10);
        document.getElementById('expense-desc').focus();
    }

    function closeAddSheet() {
        addModal.classList.remove('show');
        setTimeout(() => { addModal.style.display = 'none'; }, 350);
    }

    closeAdd.addEventListener('click', closeAddSheet);
    addModal.addEventListener('click', (e) => { if (e.target === addModal) closeAddSheet(); });

    // ===== WHO PAID TOGGLE =====
    document.querySelectorAll('.paid-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.paid-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPaidBy = btn.dataset.team;
        });
    });

    // ===== PHOTO CAPTURE =====
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxW = 500;
                const scale = Math.min(1, maxW / img.width);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                capturedPhoto = canvas.toDataURL('image/jpeg', 0.72);
                photoPreview.src = capturedPhoto;
                photoPreview.style.display = 'block';
                photoHolder.style.display = 'none';
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    });

    // ===== SAVE =====
    saveBtn.addEventListener('click', () => {
        const desc     = document.getElementById('expense-desc').value.trim();
        const amountRaw = document.getElementById('expense-amount').value;
        const amount   = parseFloat(amountRaw);
        const category = document.getElementById('expense-category').value;

        if (!desc)               { shake('expense-desc');   return; }
        if (!amount || amount <= 0) { shake('expense-amount'); return; }
        if (!selectedPaidBy)     { shake('paid-by-row');    return; }

        const today = new Date();
        const dateLabel = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

        const list = getExpenses();
        list.unshift({
            id:          Date.now(),
            date:        dateLabel,
            description: desc,
            amount:      Math.round(amount * 100) / 100,
            paidBy:      selectedPaidBy,
            category,
            photo:       capturedPhoto || null
        });
        saveExpenses(list);
        closeAddSheet();
        renderPanel();
    });

    function shake(elId) {
        const el = document.getElementById(elId);
        if (!el) return;
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
    }

    // ===== RESET FORM =====
    function resetForm() {
        capturedPhoto  = null;
        selectedPaidBy = null;
        document.getElementById('expense-desc').value    = '';
        document.getElementById('expense-amount').value  = '';
        document.getElementById('expense-category').value = 'food';
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        photoHolder.style.display  = 'flex';
        photoInput.value = '';
        document.querySelectorAll('.paid-btn').forEach(b => b.classList.remove('active'));
    }

    // ===== RENDER PANEL =====
    function renderPanel() {
        const list = getExpenses();
        renderSummary(list);
        renderList(list);
    }

    // ===== SUMMARY CARD =====
    function renderSummary(list) {
        const el = document.getElementById('split-summary');
        const bluesPaid   = list.filter(e => e.paidBy === 'blues').reduce((s, e) => s + e.amount, 0);
        const oostiesPaid = list.filter(e => e.paidBy === 'oosties').reduce((s, e) => s + e.amount, 0);
        const total       = bluesPaid + oostiesPaid;
        const diff        = Math.abs(bluesPaid - oostiesPaid) / 2;

        let balanceHTML;
        if (total === 0) {
            balanceHTML = `<div class="balance-indicator balance-even">No expenses yet</div>`;
        } else if (diff < 0.005) {
            balanceHTML = `<div class="balance-indicator balance-even">✓ All square!</div>`;
        } else if (bluesPaid > oostiesPaid) {
            balanceHTML = `<div class="balance-indicator balance-blues">Oosties owe Blues <strong>£${diff.toFixed(2)}</strong></div>`;
        } else {
            balanceHTML = `<div class="balance-indicator balance-oosties">Blues owe Oosties <strong>£${diff.toFixed(2)}</strong></div>`;
        }

        el.innerHTML = `
            <div class="summary-couples">
                <div class="couple-card blues-card">
                    <div class="couple-emoji">🔵</div>
                    <div class="couple-name">Blues</div>
                    <div class="couple-paid">£${bluesPaid.toFixed(2)}</div>
                    <div class="couple-label">paid</div>
                </div>
                <div class="couple-divider"></div>
                <div class="couple-card oosties-card">
                    <div class="couple-emoji">🟡</div>
                    <div class="couple-name">Oosties</div>
                    <div class="couple-paid">£${oostiesPaid.toFixed(2)}</div>
                    <div class="couple-label">paid</div>
                </div>
            </div>
            <div class="summary-total-row">
                <span>Total shared spend</span>
                <strong>£${total.toFixed(2)}</strong>
            </div>
            ${balanceHTML}
        `;
    }

    // ===== EXPENSE LIST =====
    const catIcons = {
        food: '🍽️', activity: '🎯', fuel: '⛽',
        accommodation: '🏕️', transport: '🚌', shopping: '🛍️', other: '📦'
    };

    function renderList(list) {
        const el = document.getElementById('split-list');
        if (list.length === 0) {
            el.innerHTML = `
                <div class="no-expenses">
                    <i class="fas fa-receipt"></i>
                    <p>Tap <strong>+ Add</strong> to log your first shared expense</p>
                </div>`;
            return;
        }

        el.innerHTML = list.map(exp => `
            <div class="expense-item" data-id="${exp.id}">
                <div class="expense-left">
                    ${exp.photo
                        ? `<img src="${exp.photo}" class="expense-thumb" alt="receipt" data-id="${exp.id}">`
                        : `<div class="expense-icon-box">${catIcons[exp.category] || '📦'}</div>`
                    }
                </div>
                <div class="expense-details">
                    <div class="expense-desc-text">${exp.description}</div>
                    <div class="expense-meta">
                        <span class="expense-date-lbl">${exp.date}</span>
                        <span class="paid-tag ${exp.paidBy === 'blues' ? 'blues-tag' : 'oosties-tag'}">
                            ${exp.paidBy === 'blues' ? '🔵 Blues' : '🟡 Oosties'}
                        </span>
                    </div>
                </div>
                <div class="expense-right-col">
                    <div class="expense-amt">£${exp.amount.toFixed(2)}</div>
                    <button class="del-btn" data-id="${exp.id}" aria-label="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Delete handlers
        el.querySelectorAll('.del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!confirm('Remove this expense?')) return;
                const id = parseInt(btn.dataset.id);
                saveExpenses(getExpenses().filter(e => e.id !== id));
                renderPanel();
            });
        });

        // Expand photo on tap
        el.querySelectorAll('.expense-thumb').forEach(img => {
            img.addEventListener('click', () => {
                showPhotoLightbox(img.src);
            });
        });
    }

    // ===== PHOTO LIGHTBOX =====
    function showPhotoLightbox(src) {
        const lb = document.createElement('div');
        lb.className = 'photo-lightbox';
        lb.innerHTML = `<img src="${src}" alt="Receipt"><button class="lb-close">✕</button>`;
        lb.addEventListener('click', () => lb.remove());
        document.body.appendChild(lb);
        setTimeout(() => lb.classList.add('show'), 10);
    }
});
