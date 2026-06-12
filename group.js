// Trip Group Profiles Logic

let tripGroup = [];
let cropper = null;

function renderGroupProfiles() {
    const list = document.getElementById('group-profiles-list');
    if (!list) return;

    list.innerHTML = '';
    
    if (tripGroup.length === 0) {
        list.innerHTML = '<p style="color:var(--text-secondary); font-size:0.85rem;">No group members added yet.</p>';
        return;
    }

    tripGroup.forEach((member, index) => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '10px';
        item.style.background = 'rgba(0,0,0,0.2)';
        item.style.padding = '10px';
        item.style.borderRadius = '8px';

        // Avatar
        let avatarHTML = '';
        if (member.photoUrl) {
            avatarHTML = `<img src="${member.photoUrl}" style="width:45px; height:45px; border-radius:50%; object-fit:cover; border: 2px solid #ec4899; flex-shrink:0;">`;
        } else {
            const initial = member.name ? member.name.charAt(0).toUpperCase() : '?';
            avatarHTML = `
                <div style="width:45px; height:45px; border-radius:50%; background:linear-gradient(135deg, #ec4899, #db2777); display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; flex-shrink:0; font-size: 1.2rem; border: 2px solid rgba(255,255,255,0.2);">
                    ${initial}
                </div>`;
        }
        
        item.innerHTML = `
            ${avatarHTML}
            <div style="flex:1;">
                <div style="color:white; font-weight:600; font-size:0.95rem;">${member.name}</div>
                <div style="color:var(--text-secondary); font-size:0.8rem;">${member.relation || 'Member'}</div>
            </div>
            <button class="remove-member-btn" data-idx="${index}" style="background:transparent; border:none; color:#ef4444; cursor:pointer; font-size: 1.1rem;"><i class="fas fa-trash"></i></button>
        `;
        list.appendChild(item);
    });

    // Attach delete listeners
    document.querySelectorAll('.remove-member-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.currentTarget.getAttribute('data-idx');
            if (confirm(`Remove ${tripGroup[idx].name} from the group?`)) {
                if (window.fbDb) {
                    tripGroup.splice(idx, 1);
                    window.fbDb.ref('tripGroup').set(tripGroup);
                }
            }
        });
    });
}

// Add Member Flow
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-member-btn');
    const modal = document.getElementById('add-member-modal');
    const closeBtn = document.getElementById('close-add-member');
    
    const photoInput = document.getElementById('member-photo-input');
    const placeholder = document.getElementById('member-placeholder');
    const cropContainer = document.getElementById('member-crop-container');
    const cropImage = document.getElementById('member-crop-image');
    
    const nameInput = document.getElementById('member-name-input');
    const roleSelect = document.getElementById('member-role-select');
    const relatedToSelect = document.getElementById('member-related-to');
    const saveBtn = document.getElementById('save-member-btn');
    const progressEl = document.getElementById('member-upload-progress');

    if (addBtn && modal) {
        addBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
            
            // Populate "Related To" dropdown
            relatedToSelect.innerHTML = '<option value="">Of... (Select Person)</option>';
            if (tripGroup.length > 0) {
                relatedToSelect.style.display = 'block';
                tripGroup.forEach(m => {
                    const opt = document.createElement('option');
                    opt.value = m.name;
                    opt.textContent = m.name;
                    relatedToSelect.appendChild(opt);
                });
            } else {
                relatedToSelect.style.display = 'none';
            }

            // Reset fields
            if (cropper) { cropper.destroy(); cropper = null; }
            photoInput.value = '';
            cropImage.src = '';
            cropContainer.style.display = 'none';
            placeholder.style.display = 'flex';
            nameInput.value = '';
            roleSelect.value = '';
            relatedToSelect.value = '';
            progressEl.textContent = '';
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
            if (cropper) { cropper.destroy(); cropper = null; }
        });

        // Photo Preview and Cropper initialization
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    placeholder.style.display = 'none';
                    cropContainer.style.display = 'block';
                    cropImage.src = e.target.result;
                    
                    if (cropper) cropper.destroy();
                    
                    // Initialize Cropper
                    cropper = new Cropper(cropImage, {
                        aspectRatio: 1, // Square for avatars
                        viewMode: 1,
                        autoCropArea: 0.8,
                        dragMode: 'move',
                        background: false
                    });
                };
                reader.readAsDataURL(file);
            }
        });

        // Save Logic
        saveBtn.addEventListener('click', async () => {
            const name = nameInput.value.trim();
            const role = roleSelect.value;
            const relatedTo = relatedToSelect.value;
            
            if (!name) {
                progressEl.textContent = 'Please enter a name.';
                progressEl.style.color = '#ef4444';
                return;
            }

            // Build relation string
            let relationStr = role;
            if (role && relatedTo) relationStr = `${role} of ${relatedTo}`;
            else if (!role && !relatedTo) relationStr = 'Member';

            saveBtn.disabled = true;
            saveBtn.textContent = 'Saving...';
            progressEl.textContent = 'Preparing profile...';
            progressEl.style.color = '#e2e8f0';

            let photoUrl = null;

            if (cropper) {
                progressEl.textContent = 'Compressing profile photo...';
                
                // Get cropped canvas
                const canvas = cropper.getCroppedCanvas({
                    width: 300,
                    height: 300
                });

                // Convert canvas to a compressed base64 JPEG string
                photoUrl = canvas.toDataURL('image/jpeg', 0.7);
            }

            const newMember = { name, relation: relationStr, photoUrl };
            
            if (window.fbDb) {
                const updatedGroup = [...tripGroup, newMember];
                window.fbDb.ref('tripGroup').set(updatedGroup).then(() => {
                    // Close and reset
                    modal.classList.remove('show');
                    setTimeout(() => modal.style.display = 'none', 300);
                    saveBtn.disabled = false;
                    saveBtn.textContent = 'Save Member';
                    if (cropper) { cropper.destroy(); cropper = null; }
                }).catch(err => {
                    progressEl.textContent = 'Database error: ' + err.message;
                    progressEl.style.color = '#ef4444';
                    saveBtn.disabled = false;
                    saveBtn.textContent = 'Save Member';
                });
            }
        });
    }

    // Initialize Firebase listener
    if (window.fbDb) {
        window.fbDb.ref('tripGroup').on('value', snap => {
            tripGroup = snap.val() || [];
            renderGroupProfiles();
        });
    }
});

// ===== AI DIARY GENERATOR =====
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-diary-btn');
    const diaryPhaseSelect = document.getElementById('diary-phase-select');
    const diaryStatus = document.getElementById('diary-status');
    
    const diaryModal = document.getElementById('diary-viewer-modal');
    const closeDiaryBtn = document.getElementById('close-diary-viewer');
    const diaryContent = document.getElementById('diary-viewer-content');

    if (generateBtn && diaryModal) {
        generateBtn.addEventListener('click', async () => {
            const phase = diaryPhaseSelect.value;
            
            generateBtn.disabled = true;
            diaryStatus.style.display = 'block';
            diaryStatus.textContent = 'Gathering memories... ⏳';

            try {
                // Filter itinerary based on phase selection
                let sliceStart = 0; let sliceEnd = itinerary.length;
                if (phase === 'phase1') { sliceStart = 0; sliceEnd = 6; } // London Weekend
                else if (phase === 'phase2') { sliceStart = 6; sliceEnd = 13; } // Cruise
                else if (phase === 'phase3') { sliceStart = 13; sliceEnd = itinerary.length; } // Roadtrip

                const itinerarySlice = itinerary.slice(sliceStart, sliceEnd);
                
                // Fetch quotes of the day
                let quotes = {};
                if (window.fbDb) {
                    const snap = await window.fbDb.ref('quotes').once('value');
                    quotes = snap.val() || {};
                }

                diaryStatus.textContent = 'AI is writing your diary... ✍️';
                
                const res = await fetch('/api/diary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phase: diaryPhaseSelect.options[diaryPhaseSelect.selectedIndex].text,
                        tripGroup,
                        completedActivities: window.completedActivities || {},
                        quotes,
                        itinerarySlice
                    })
                });

                if (!res.ok) throw new Error(await res.text());

                const data = await res.json();
                
                diaryStatus.style.display = 'none';
                generateBtn.disabled = false;
                
                // Inject the generated HTML and open modal
                diaryContent.innerHTML = data.html;
                diaryModal.style.display = 'block';
                // Force reflow
                diaryModal.offsetHeight;
                diaryModal.classList.add('show');
            } catch (err) {
                console.error(err);
                diaryStatus.textContent = '❌ Error generating diary: ' + err.message;
                generateBtn.disabled = false;
            }
        });

        closeDiaryBtn.addEventListener('click', () => {
            diaryModal.classList.remove('show');
            setTimeout(() => diaryModal.style.display = 'none', 300);
        });
    }
});
