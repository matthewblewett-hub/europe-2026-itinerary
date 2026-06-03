// expenses.js — Blues vs Oosties Trip Expense Splitter (v2: custom splits)

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

    // Split mode elements
    const splitEqualBtn   = document.getElementById('split-equal-btn');
    const splitCustomBtn  = document.getElementById('split-custom-btn');
    const equalSection    = document.getElementById('equal-split-section');
    const customSection   = document.getElementById('custom-split-section');
    const customPreview   = document.getElementById('custom-total-preview');
    const bluesInput      = document.getElementById('expense-blues');
    const oostiesInput    = document.getElementById('expense-oosties');
    const totalInput      = document.getElementById('expense-total');

    let selectedPaidBy = null;
    let capturedPhoto  = null;
    let splitMode      = 'equal'; // 'equal' | 'custom'

    // ===== STORAGE =====
    function getExpenses() {
        try { return JSON.parse(localStorage.getItem('eurotrip-expenses')) || []; }
        catch { return []; }
    }
    function saveExpenses(list) {
        localStorage.setItem('eurotrip-expenses', JSON.stringify(list));
    }

    // ===== SPLIT MODE TOGGLE =====
    splitEqualBtn.addEventListener('click', () => {
        splitMode = 'equal';
        splitEqualBtn.classList.add('active');
        splitCustomBtn.classList.remove('active');
        equalSection.style.display = 'block';
        customSection.style.display = 'none';
    });

    splitCustomBtn.addEventListener('click', () => {
        splitMode = 'custom';
        splitCustomBtn.classList.add('active');
        splitEqualBtn.classList.remove('active');
        customSection.style.display = 'block';
        equalSection.style.display = 'none';
    });

    // Auto-update total preview in custom mode
    function updateCustomPreview() {
        const b = parseFloat(bluesInput.value) || 0;
        const o = parseFloat(oostiesInput.value) || 0;
        customPreview.textContent = `Total: £${(b + o).toFixed(2)}`;
    }
    bluesInput.addEventListener('input', updateCustomPreview);
    oostiesInput.addEventListener('input', updateCustomPreview);

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
        const category = document.getElementById('expense-category').value;

        if (!desc) { shake('expense-desc'); return; }
        if (!selectedPaidBy) { shake('paid-by-row'); return; }

        let bluesShare, oostiesShare;

        if (splitMode === 'equal') {
            const total = parseFloat(totalInput.value);
            if (!total || total <= 0) { shake('expense-total'); return; }
            bluesShare   = Math.round((total / 2) * 100) / 100;
            oostiesShare = Math.round((total - bluesShare) * 100) / 100;
        } else {
            bluesShare   = parseFloat(bluesInput.value) || 0;
            oostiesShare = parseFloat(oostiesInput.value) || 0;
            if (bluesShare <= 0 && oostiesShare <= 0) { shake('custom-split-section'); return; }
        }

        const total = bluesShare + oostiesShare;

        // Who owes whom for this expense
        // If Blues paid: Oosties owe Blues their share
        // If Oosties paid: Blues owe Oosties their share
        const owestAmount = selectedPaidBy === 'blues' ? oostiesShare : bluesShare;
        const owesDirection = selectedPaidBy === 'blues' ? 'oosties-owes-blues' : 'blues-owes-oosties';

        const today = new Date();
        const dateLabel = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

        const list = getExpenses();
        list.unshift({
            id:           Date.now(),
            date:         dateLabel,
            description:  desc,
            total:        Math.round(total * 100) / 100,
            bluesShare,
            oostiesShare,
            paidBy:       selectedPaidBy,
            owestAmount,
            owesDirection,
            category,
            photo:        capturedPhoto || null
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
        splitMode      = 'equal';
        document.getElementById('expense-desc').value = '';
        document.getElementById('expense-category').value = 'food';
        totalInput.value = '';
        bluesInput.value = '';
        oostiesInput.value = '';
        customPreview.textContent = 'Total: £0.00';
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        photoHolder.style.display  = 'flex';
        photoInput.value = '';
        document.querySelectorAll('.paid-btn').forEach(b => b.classList.remove('active'));
        splitEqualBtn.classList.add('active');
        splitCustomBtn.classList.remove('active');
        equalSection.style.display = 'block';
        customSection.style.display = 'none';
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

        // Net balance: sum up what each couple owes the other
        let oostiesOwesBlues = 0;
        let bluesOwesOosties = 0;
        list.forEach(exp => {
            if (exp.owesDirection === 'oosties-owes-blues') oostiesOwesBlues += (exp.owestAmount || 0);
            else if (exp.owesDirection === 'blues-owes-oosties') bluesOwesOosties += (exp.owestAmount || 0);
        });

        const bluesPaid   = list.filter(e => e.paidBy === 'blues').reduce((s, e) => s + (e.total || 0), 0);
        const oostiesPaid = list.filter(e => e.paidBy === 'oosties').reduce((s, e) => s + (e.total || 0), 0);
        const total       = bluesPaid + oostiesPaid;

        const net = oostiesOwesBlues - bluesOwesOosties;
        let balanceHTML;
        if (total === 0) {
            balanceHTML = `<div class="balance-indicator balance-even">No expenses yet</div>`;
        } else if (Math.abs(net) < 0.005) {
            balanceHTML = `<div class="balance-indicator balance-even">✓ All square!</div>`;
        } else if (net > 0) {
            balanceHTML = `<div class="balance-indicator balance-blues">Oosties owe Blues <strong>£${net.toFixed(2)}</strong></div>`;
        } else {
            balanceHTML = `<div class="balance-indicator balance-oosties">Blues owe Oosties <strong>£${Math.abs(net).toFixed(2)}</strong></div>`;
        }

        el.innerHTML = `
            <div class="summary-couples">
                <div class="couple-card blues-card">
                    <div class="couple-emoji">🔵</div>
                    <div class="couple-name">Blues</div>
                    <div class="couple-paid">£${bluesPaid.toFixed(2)}</div>
                    <div class="couple-label">paid out</div>
                </div>
                <div class="couple-divider"></div>
                <div class="couple-card oosties-card">
                    <div class="couple-emoji">🟡</div>
                    <div class="couple-name">Oosties</div>
                    <div class="couple-paid">£${oostiesPaid.toFixed(2)}</div>
                    <div class="couple-label">paid out</div>
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

        el.innerHTML = list.map(exp => {
            const owedLabel = exp.paidBy === 'blues'
                ? `Oosties owe Blues £${(exp.owestAmount||0).toFixed(2)}`
                : `Blues owe Oosties £${(exp.owestAmount||0).toFixed(2)}`;

            const splitLabel = exp.bluesShare === exp.oostiesShare
                ? `50:50 · £${(exp.bluesShare||0).toFixed(2)} each`
                : `🔵 £${(exp.bluesShare||0).toFixed(2)} / 🟡 £${(exp.oostiesShare||0).toFixed(2)}`;

            return `
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
                            ${exp.paidBy === 'blues' ? '🔵 Blues paid' : '🟡 Oosties paid'}
                        </span>
                    </div>
                    <div class="expense-split-detail">${splitLabel}</div>
                    <div class="expense-owed-label">${owedLabel}</div>
                </div>
                <div class="expense-right-col">
                    <div class="expense-amt">£${(exp.total||0).toFixed(2)}</div>
                    <button class="del-btn" data-id="${exp.id}" aria-label="Delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
        }).join('');

        el.querySelectorAll('.del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!confirm('Remove this expense?')) return;
                const id = parseInt(btn.dataset.id);
                saveExpenses(getExpenses().filter(e => e.id !== id));
                renderPanel();
            });
        });

        el.querySelectorAll('.expense-thumb').forEach(img => {
            img.addEventListener('click', () => showPhotoLightbox(img.src));
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
