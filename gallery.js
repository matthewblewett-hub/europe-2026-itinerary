// gallery.js — Travel Group Best Of Gallery
// Stores compressed base64 images in Firebase Realtime Database (no Storage plan needed)

document.addEventListener('DOMContentLoaded', () => {
    const db      = window.fbDb;
    const GAL_REF = db ? db.ref('gallery') : null;

    const galleryBtn    = document.getElementById('gallery-btn');
    const galleryPanel  = document.getElementById('gallery-panel');
    const closeGallery  = document.getElementById('close-gallery');
    const openUpload    = document.getElementById('open-upload-btn');
    const uploadModal   = document.getElementById('upload-photo-modal');
    const closeUpload   = document.getElementById('close-upload');
    const photoInput    = document.getElementById('gallery-photo-input');
    const preview       = document.getElementById('gallery-preview');
    const placeholder   = document.getElementById('gallery-placeholder');
    const uploaderInput = document.getElementById('gallery-uploader');
    const captionInput  = document.getElementById('gallery-caption');
    const daySelect     = document.getElementById('gallery-day');
    const progressEl    = document.getElementById('upload-progress');
    const uploadBtn     = document.getElementById('upload-photo-btn');
    const gridEl        = document.getElementById('gallery-grid');

    let compressedDataUrl = null;
    let fbListenerOn      = false;

    // ===== POPULATE DAY DROPDOWN =====
    if (typeof itinerary !== 'undefined' && daySelect) {
        itinerary.forEach(day => {
            const opt = document.createElement('option');
            opt.value = day.title || day.date;
            opt.textContent = `${day.date} — ${day.title || ''}`;
            daySelect.appendChild(opt);
        });
    }

    // ===== RESTORE NAME =====
    uploaderInput.value = localStorage.getItem('eurotrip-tracker-name') || '';

    // ===== OPEN GALLERY =====
    galleryBtn.addEventListener('click', () => {
        galleryPanel.style.display = 'flex';
        setTimeout(() => galleryPanel.classList.add('show'), 10);
        attachListener();
    });

    closeGallery.addEventListener('click', () => {
        galleryPanel.classList.remove('show');
        setTimeout(() => { galleryPanel.style.display = 'none'; }, 400);
    });

    // ===== UPLOAD SHEET =====
    openUpload.addEventListener('click', openUploadSheet);
    closeUpload.addEventListener('click', closeUploadSheet);
    uploadModal.addEventListener('click', (e) => { if (e.target === uploadModal) closeUploadSheet(); });

    function openUploadSheet() {
        resetUploadForm();
        uploadModal.style.display = 'flex';
        setTimeout(() => uploadModal.classList.add('show'), 10);
    }
    function closeUploadSheet() {
        uploadModal.classList.remove('show');
        setTimeout(() => { uploadModal.style.display = 'none'; }, 350);
    }

    // ===== PHOTO SELECTION & COMPRESS =====
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        compressedDataUrl = null;
        setProgress('🔄 Compressing photo…', 'info');

        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                // Target max 900px on longest side, quality 0.72 → ~80-150KB
                const MAX   = 900;
                const scale = Math.min(1, MAX / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width  = Math.round(img.width  * scale);
                canvas.height = Math.round(img.height * scale);
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

                compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
                const kb = Math.round(compressedDataUrl.length * 0.75 / 1024);

                preview.src           = compressedDataUrl;
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                setProgress(`✅ Photo ready (${kb}KB)`, 'success');
            };
            img.onerror = () => setProgress('❌ Could not read image.', 'error');
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    });

    // ===== SAVE PHOTO =====
    uploadBtn.addEventListener('click', () => {
        const uploader = uploaderInput.value.trim();
        const caption  = captionInput.value.trim();
        const day      = daySelect.value;

        if (!compressedDataUrl) { setProgress('📷 Please choose a photo first.', 'info'); return; }
        if (!uploader)          { uploaderInput.focus(); return; }
        if (!GAL_REF)           { setProgress('❌ Firebase not connected.', 'error'); return; }

        localStorage.setItem('eurotrip-tracker-name', uploader);
        uploadBtn.disabled = true;
        setProgress('💾 Saving to gallery…', 'info');

        GAL_REF.push({
            dataUrl:  compressedDataUrl,
            uploader,
            caption:  caption || '',
            day:      day    || '',
            ts:       Date.now()
        })
        .then(() => {
            uploadBtn.disabled = false;
            setProgress('✅ Photo added to gallery!', 'success');
            setTimeout(closeUploadSheet, 1400);
        })
        .catch(err => {
            uploadBtn.disabled = false;
            setProgress('❌ Save failed: ' + err.message, 'error');
        });
    });

    // ===== FIREBASE LISTENER =====
    function attachListener() {
        if (fbListenerOn || !GAL_REF) return;
        fbListenerOn = true;
        GAL_REF.on('value', (snap) => {
            const raw    = snap.val() || {};
            const photos = Object.entries(raw)
                .map(([key, val]) => ({ ...val, fbKey: key }))
                .sort((a, b) => b.ts - a.ts);
            renderGallery(photos);
        });
    }

    // ===== RENDER GALLERY GRID =====
    function renderGallery(photos) {
        if (!gridEl) return;
        if (photos.length === 0) { renderEmpty(); return; }

        gridEl.innerHTML = photos.map(p => `
            <div class="gallery-card">
                <div class="gallery-img-wrap" onclick="openGalleryLightbox(${JSON.stringify(p.dataUrl)},${JSON.stringify(p.caption||'')},${JSON.stringify(p.uploader||'')})">
                    <img src="${p.dataUrl}" alt="${p.caption || 'Trip photo'}" class="gallery-img" loading="lazy">
                </div>
                <div class="gallery-card-body">
                    ${p.caption ? `<div class="gallery-caption">${p.caption}</div>` : ''}
                    <div class="gallery-meta">
                        <span class="gallery-uploader">${p.uploader}</span>
                        ${p.day ? `<span class="gallery-day">${p.day}</span>` : ''}
                        <span class="gallery-date">${formatDate(p.ts)}</span>
                    </div>
                </div>
                <button class="gallery-del-btn" data-fbkey="${p.fbKey}" aria-label="Delete photo">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`).join('');

        gridEl.querySelectorAll('.gallery-del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!confirm('Remove this photo?')) return;
                if (GAL_REF) GAL_REF.child(btn.dataset.fbkey).remove();
            });
        });
    }

    function renderEmpty() {
        if (!gridEl) return;
        gridEl.innerHTML = `
            <div class="no-quotes" style="grid-column:1/-1">
                <i class="fas fa-images" style="font-size:2.5rem;color:#a855f7;margin-bottom:12px;display:block"></i>
                <p>No photos yet — tap <strong>+ Add Photo</strong> to share your first shot!</p>
            </div>`;
    }

    // ===== LIGHTBOX =====
    window.openGalleryLightbox = function(dataUrl, caption, uploader) {
        const lb = document.createElement('div');
        lb.className = 'photo-lightbox';
        lb.innerHTML = `
            <div class="gallery-lightbox-inner" onclick="event.stopPropagation()">
                <img src="${dataUrl}" alt="${caption}">
                ${caption  ? `<div class="gallery-lb-caption">${caption}</div>`  : ''}
                ${uploader ? `<div class="gallery-lb-uploader">📷 ${uploader}</div>` : ''}
            </div>
            <button class="lb-close">✕</button>`;
        lb.addEventListener('click', () => lb.remove());
        document.body.appendChild(lb);
        setTimeout(() => lb.classList.add('show'), 10);
    };

    // ===== HELPERS =====
    function resetUploadForm() {
        compressedDataUrl = null;
        captionInput.value = ''; daySelect.value = ''; photoInput.value = '';
        preview.src = ''; preview.style.display = 'none';
        placeholder.style.display = 'flex';
        setProgress('', '');
    }
    function setProgress(msg, type) {
        progressEl.textContent = msg;
        progressEl.className   = type ? `tracker-status tracker-status-${type}` : 'tracker-status';
    }
    function formatDate(ts) {
        return new Date(ts).toLocaleDateString('en-GB', { day:'numeric', month:'short' });
    }
});
