document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('itinerary-container');
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-btn');

    // Render Days
    itinerary.forEach(day => {
        const card = document.createElement('div');
        card.className = 'day-card';
        if (day.bgImage) {
            card.style.backgroundImage = `linear-gradient(rgba(28, 37, 65, 0.7), rgba(28, 37, 65, 0.9)), url('${day.bgImage}')`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
        card.innerHTML = `
            <div class="day-header">
                <span class="day-date">${day.date}</span>
            </div>
            <h2 class="day-title">${day.title}</h2>
            <p class="day-overview">${day.overview}</p>
            <div class="view-details">
                View Day Plan <i class="fas fa-arrow-right"></i>
            </div>
        `;
        
        card.addEventListener('click', () => openDayDetails(day));
        container.appendChild(card);
    });

    function openDayDetails(day) {
        modalTitle.textContent = day.date;
        
        if (day.bgImage) {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.backgroundImage = `linear-gradient(rgba(28, 37, 65, 0.85), rgba(28, 37, 65, 0.98)), url('${day.bgImage}')`;
            modalContent.style.backgroundSize = 'cover';
            modalContent.style.backgroundPosition = 'center';
        }
        
        let timelineHTML = '';
        day.items.forEach(item => {
            let linksHTML = '';
            
            if (item.mapLink) {
                linksHTML += `<a href="${item.mapLink}" target="_blank" class="action-btn"><i class="fas fa-map-marker-alt"></i> Map</a>`;
            }
            if (item.link) {
                linksHTML += `<a href="${item.link}" target="_blank" class="action-btn"><i class="fas fa-external-link-alt"></i> Info</a>`;
            }

            timelineHTML += `
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas ${item.icon || 'fa-clock'}"></i>
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-time">${item.time}</div>
                        <h3 class="timeline-title">${item.title}</h3>
                        <p class="timeline-desc">${item.description}</p>
                        ${linksHTML ? `<div class="timeline-links">${linksHTML}</div>` : ''}
                    </div>
                </div>
            `;
        });

        modalBody.innerHTML = timelineHTML;
        
        modal.style.display = 'flex';
        // Small delay for transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // match transition duration
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
