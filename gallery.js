// gallery.js — Travel Group Best Of Gallery (Firebase Storage + RTDB)

document.addEventListener('DOMContentLoaded', () => {
    const db         = window.fbDb;
    const storage    = window.fbStorage;
    const GAL_REF    = db ? db.ref('gallery') : null;

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

    let selectedFile    = null;
    let resizedBlob     = null;
    let fbListenerOn    = false;

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

    // ===== OPEN / CLOSE GALLERY PANEL =====
    galleryBtn.addEventListener('click', () => {
        galleryPanel.style.display = 'flex';
        setTimeout(() => galleryPanel.classList.add('show'), 10);
        attachListener();
    });
    closeGallery.addEventListener('click', () => {
        galleryPanel.classList.remove('show');
        setTimeout(() => { galleryPanel.style.display = 'none'; }, 400);
    });

    // ===== OPEN / CLOSE UPLOAD SHEET =====
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

    // ===== PHOTO SELECTION & RESIZE =====
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        selectedFile = file;
        resizedBlob  = null;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX    = 1400;
                const scale  = Math.min(1, MAX / Math.max(img.width, img.height));
                canvas.width  = Math.round(img.width  * scale);
                canvas.height = Math.round(img.height * scale);
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                // Show preview
                preview.src = canvas.toDataURL('image/jpeg', 0.88);
                preview.style.display = 'block';
                placeholder.style.display = 'none';
                // Store as blob for upload
                canvas.toBlob((blob) => { resizedBlob = blob; }, 'image/jpeg', 0.88);
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    });

    // ===== UPLOAD =====
    uploadBtn.addEventListener('click', async () => {
        const uploader = uploaderInput.value.trim();
        const caption  = captionInput.value.trim();
        const day      = daySelect.value;

        if (!resizedBlob && !selectedFile) { setProgress('📷 Please choose a photo first.', 'info'); return; }
        if (!uploader)   { uploaderInput.focus(); return; }

        localStorage.setItem('eurotrip-tracker-name', uploader);

        if (!storage || !GAL_REF) {
            setProgress('❌ Firebase Storage not available. Please enable Storage in Firebase Console.', 'error');
            return;
        }

        uploadBtn.disabled = true;
        setProgress('⬆️ Uploading…', 'info');

        const blobToUpload = resizedBlob || selectedFile;
        const filename     = `gallery/${Date.now()}_${uploader.replace(/\s+/g,'_')}.jpg`;
        const storageRef   = storage.ref(filename);
        const uploadTask   = storageRef.put(blobToUpload, { contentType: 'image/jpeg' });

        uploadTask.on(
            'state_changed',
            (snap) => {
                const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                setProgress(`⬆️ Uploading… ${pct}%`, 'info');
            },
            (err) => {
                uploadBtn.disabled = false;
                setProgress('❌ Upload failed: ' + err.message, 'error');
            },
            async () => {
                const url = await uploadTask.snapshot.ref.getDownloadURL();
                const record = {
                    url,
                    uploader,
                    caption:  caption || '',
                    day:      day || '',
                    ts:       Date.now(),
                    filename
                };
                GAL_REF.push(record)
                    .then(() => {
                        uploadBtn.disabled = false;
                        setProgress('✅ Photo added to gallery!', 'success');
                        setTimeout(closeUploadSheet, 1500);
                    })
                    .catch(e => {
                        uploadBtn.disabled = false;
                        setProgress('❌ Database error: ' + e.message, 'error');
                    });
            }
        );
    });

    // ===== FIREBASE LISTENER =====
    function attachListener() {
        if (fbListenerOn || !GAL_REF) { if (!GAL_REF) renderEmpty(); return; }
        fbListenerOn = true;
        GAL_REF.on('value', (snap) => {
            const raw    = snap.val() || {};
            const photos = Object.entries(raw)
                .map(([key, val]) => ({ ...val, fbKey: key }))
                .sort((a, b) => b.ts - a.ts);
            renderGallery(photos);
        });
    }

    // ===== RENDER GALLERY =====
    function renderGallery(photos) {
        if (!gridEl) return;
        if (photos.length === 0) { renderEmpty(); return; }

        gridEl.innerHTML = photos.map(p => `
            <div class="gallery-card" data-fbkey="${p.fbKey}">
                <div class="gallery-img-wrap" onclick="openLightbox('${p.url.replace(/'/g,"\\'")}','${(p.caption||'').replace(/'/g,"\\'")}','${(p.uploader||'').replace(/'/g,"\\'")}')">
                    <img src="${p.url}" alt="${p.caption || 'Trip photo'}" class="gallery-img" loading="lazy">
                </div>
                <div class="gallery-card-body">
                    ${p.caption ? `<div class="gallery-caption">${p.caption}</div>` : ''}
                    <div class="gallery-meta">
                        <span class="gallery-uploader">${p.uploader}</span>
                        ${p.day ? `<span class="gallery-day">${p.day}</span>` : ''}
                        <span class="gallery-date">${formatDate(p.ts)}</span>
                    </div>
                </div>
                <button class="gallery-del-btn" data-fbkey="${p.fbKey}" data-filename="${p.filename||''}" aria-label="Delete photo">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>`).join('');

        gridEl.querySelectorAll('.gallery-del-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!confirm('Remove this photo from the gallery?')) return;
                const key  = btn.dataset.fbkey;
                const file = btn.dataset.filename;
                if (key && GAL_REF) GAL_REF.child(key).remove();
                if (file && storage) storage.ref(file).delete().catch(() => {});
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
    window.openLightbox = function(url, caption, uploader) {
        const lb = document.createElement('div');
        lb.className = 'photo-lightbox';
        lb.innerHTML = `
            <div class="gallery-lightbox-inner" onclick="event.stopPropagation()">
                <img src="${url}" alt="${caption}">
                ${caption ? `<div class="gallery-lb-caption">${caption}</div>` : ''}
                ${uploader ? `<div class="gallery-lb-uploader">📷 ${uploader}</div>` : ''}
            </div>
            <button class="lb-close">✕</button>`;
        lb.addEventListener('click', () => lb.remove());
        document.body.appendChild(lb);
        setTimeout(() => lb.classList.add('show'), 10);
    };

    // ===== HELPERS =====
    function resetUploadForm() {
        selectedFile = null; resizedBlob = null;
        captionInput.value = '';
        daySelect.value    = '';
        photoInput.value   = '';
        preview.src = ''; preview.style.display = 'none';
        placeholder.style.display = 'flex';
        progressEl.textContent = '';
        progressEl.className   = 'tracker-status';
    }

    function setProgress(msg, type) {
        progressEl.textContent = msg;
        progressEl.className   = `tracker-status tracker-status-${type}`;
    }

    function formatDate(ts) {
        return new Date(ts).toLocaleDateString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
    }
});
