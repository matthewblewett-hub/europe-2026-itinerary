// Trip Group Profiles Logic

let tripGroup = [];

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

        // Avatar placeholder based on initial
        const initial = member.name ? member.name.charAt(0).toUpperCase() : '?';
        
        item.innerHTML = `
            <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #a855f7, #7c3aed); display:flex; align-items:center; justify-content:center; font-weight:bold; color:white; flex-shrink:0;">
                ${initial}
            </div>
            <div style="flex:1;">
                <div style="color:white; font-weight:600; font-size:0.95rem;">${member.name}</div>
                <div style="color:var(--text-secondary); font-size:0.8rem;">${member.relation || 'Member'}</div>
            </div>
            <button class="remove-member-btn" data-idx="${index}" style="background:transparent; border:none; color:#ef4444; cursor:pointer;"><i class="fas fa-trash"></i></button>
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

// Add Member
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-member-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const name = prompt("Enter member name:");
            if (!name) return;
            const relation = prompt("Enter relationship/role (e.g., Husband, Friend, Kids):");
            
            const newMember = { name, relation: relation || 'Member' };
            
            if (window.fbDb) {
                const updatedGroup = [...tripGroup, newMember];
                window.fbDb.ref('tripGroup').set(updatedGroup);
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
