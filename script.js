document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('itinerary-container');
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-btn');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const learnMorePanel = document.getElementById('learn-more-panel');
    const learnMoreTitle = document.getElementById('learn-more-title');
    const learnMoreBody = document.getElementById('learn-more-body');
    const closeLearnMore = document.getElementById('close-learn-more');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    let currentPhase = "phase1";
    let currentDayForLearnMore = null;

    // ===== DARK / LIGHT MODE =====
    const savedTheme = localStorage.getItem('eurotrip-theme') || 'dark';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('eurotrip-theme', theme);
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
            document.getElementById('theme-color-meta').setAttribute('content', '#eef1f7');
        } else {
            themeIcon.className = 'fas fa-sun';
            document.getElementById('theme-color-meta').setAttribute('content', '#0d1b2a');
        }
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ===== WEATHER HELPERS =====
    function getWeatherInfo(code) {
        const map = {
            0:  { label: 'Clear Sky', icon: '☀️' },
            1:  { label: 'Mainly Clear', icon: '🌤️' },
            2:  { label: 'Partly Cloudy', icon: '⛅' },
            3:  { label: 'Overcast', icon: '☁️' },
            45: { label: 'Foggy', icon: '🌫️' },
            48: { label: 'Icy Fog', icon: '🌫️' },
            51: { label: 'Light Drizzle', icon: '🌦️' },
            53: { label: 'Drizzle', icon: '🌦️' },
            55: { label: 'Heavy Drizzle', icon: '🌧️' },
            61: { label: 'Light Rain', icon: '🌧️' },
            63: { label: 'Rain', icon: '🌧️' },
            65: { label: 'Heavy Rain', icon: '🌧️' },
            71: { label: 'Light Snow', icon: '🌨️' },
            73: { label: 'Snow', icon: '❄️' },
            75: { label: 'Heavy Snow', icon: '❄️' },
            80: { label: 'Rain Showers', icon: '🌦️' },
            81: { label: 'Showers', icon: '🌧️' },
            82: { label: 'Heavy Showers', icon: '⛈️' },
            95: { label: 'Thunderstorm', icon: '⛈️' },
            99: { label: 'Thunderstorm', icon: '⛈️' },
        };
        return map[code] || { label: 'Unknown', icon: '🌡️' };
    }

    function parseDateToISO(dateStr) {
        const months = { January:'01', February:'02', March:'03', April:'04', May:'05', June:'06',
                         July:'07', August:'08', September:'09', October:'10', November:'11', December:'12' };
        const parts = dateStr.trim().split(' ');
        const day = parts[1].padStart(2, '0');
        const month = months[parts[2]];
        const year = parts[3];
        if (!day || !month || !year) return null;
        return `${year}-${month}-${day}`;
    }

    async function fetchWeather(coords, dateStr) {
        const isoDate = parseDateToISO(dateStr);
        if (!isoDate || !coords) return null;
        const { lat, lon } = coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&timezone=auto&start_date=${isoDate}&end_date=${isoDate}`;
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            const data = await res.json();
            const d = data.daily;
            if (!d || !d.time || d.time.length === 0) return null;
            return {
                max: Math.round(d.temperature_2m_max[0]),
                min: Math.round(d.temperature_2m_min[0]),
                rain: d.precipitation_probability_max[0],
                code: d.weathercode[0],
            };
        } catch (e) {
            return null;
        }
    }

    function buildWeatherWidget(weather, location) {
        if (!weather) {
            return `<div class="weather-widget weather-unavailable">
                <i class="fas fa-cloud"></i>
                <span>Forecast not yet available</span>
            </div>`;
        }
        const { label, icon } = getWeatherInfo(weather.code);
        const rainColor = weather.rain >= 70 ? '#5b9bd5' : weather.rain >= 40 ? '#a3b1c6' : '#4caf50';
        return `<div class="weather-widget">
            <div class="weather-condition">
                <span class="weather-emoji">${icon}</span>
                <span class="weather-label">${label}</span>
                ${location ? `<span class="weather-location"><i class="fas fa-map-marker-alt"></i> ${location}</span>` : ''}
            </div>
            <div class="weather-stats">
                <div class="weather-stat">
                    <i class="fas fa-temperature-high" style="color:#f5a623"></i>
                    <span>${weather.max}°C</span>
                </div>
                <div class="weather-stat">
                    <i class="fas fa-temperature-low" style="color:#5b9bd5"></i>
                    <span>${weather.min}°C</span>
                </div>
                <div class="weather-stat">
                    <i class="fas fa-umbrella" style="color:${rainColor}"></i>
                    <span>${weather.rain !== null ? weather.rain + '% rain' : '—'}</span>
                </div>
            </div>
        </div>`;
    }

    // ===== PHASE 3 ROAD TRIP PROGRESS TRACKER =====
    function buildProgressTracker() {
        const phase3Days = itinerary.filter(d => d.phase === 'phase3');
        const total = phase3Days.length;
        if (total === 0) return '';

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find which day number we're on
        let currentDayNum = 0;
        let status = 'upcoming'; // 'upcoming', 'active', 'complete'

        const firstDay = parseDateToISO(phase3Days[0].date);
        const lastDay = parseDateToISO(phase3Days[total - 1].date);
        const firstDate = firstDay ? new Date(firstDay) : null;
        const lastDate = lastDay ? new Date(lastDay) : null;

        if (firstDate && lastDate) {
            if (today < firstDate) {
                status = 'upcoming';
                currentDayNum = 0;
            } else if (today > lastDate) {
                status = 'complete';
                currentDayNum = total;
            } else {
                status = 'active';
                for (let i = 0; i < phase3Days.length; i++) {
                    const isoD = parseDateToISO(phase3Days[i].date);
                    if (isoD) {
                        const d = new Date(isoD);
                        if (d <= today) currentDayNum = i + 1;
                    }
                }
            }
        }

        const pct = Math.round((currentDayNum / total) * 100);

        let statusMsg = '';
        if (status === 'upcoming') {
            const daysUntil = firstDate ? Math.ceil((firstDate - today) / (1000 * 60 * 60 * 24)) : '';
            statusMsg = `<span class="tracker-status upcoming">Starts in ${daysUntil} days 🚐</span>`;
        } else if (status === 'active') {
            statusMsg = `<span class="tracker-status active">Day ${currentDayNum} of ${total} · On the road! 🏕️</span>`;
        } else {
            statusMsg = `<span class="tracker-status complete">Road trip complete! 🎉</span>`;
        }

        return `
        <div class="trip-progress-tracker">
            <div class="tracker-header">
                <div class="tracker-title"><i class="fas fa-caravan"></i> UK Campervan Road Trip</div>
                ${statusMsg}
            </div>
            <div class="tracker-bar-wrap">
                <div class="tracker-bar-fill" style="width: ${pct}%"></div>
            </div>
            <div class="tracker-footer">
                <span>${currentDayNum} / ${total} days</span>
                <span>${pct}% complete</span>
            </div>
        </div>`;
    }

    // ===== RENDER ITINERARY =====
    async function renderItinerary() {
        container.innerHTML = '';

        // Show progress tracker for Phase 3
        if (currentPhase === 'phase3') {
            const trackerEl = document.createElement('div');
            trackerEl.innerHTML = buildProgressTracker();
            if (trackerEl.firstElementChild) container.appendChild(trackerEl.firstElementChild);
        }

        const daysToRender = itinerary.filter(day => (day.phase || 'phase1') === currentPhase);

        daysToRender.forEach((day, index) => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.dataset.dayId = day.id;
            if (day.bgImage) {
                card.style.backgroundImage = `linear-gradient(rgba(28, 37, 65, 0.7), rgba(28, 37, 65, 0.9)), url('${day.bgImage}')`;
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
            }

            // Check for saved rating
            const saved = loadDayData(day.id);
            const starBadge = saved.rating ? `<span class="card-star-badge">${'★'.repeat(saved.rating)}</span>` : '';

            card.innerHTML = `
                <div class="day-header">
                    <span class="day-date">${day.date}${starBadge}</span>
                    <span class="card-weather-badge" id="weather-badge-${day.id}"></span>
                </div>
                <h2 class="day-title">${day.title}</h2>
                <p class="day-overview">${day.overview}</p>
                <div class="view-details">
                    View Day Plan <i class="fas fa-arrow-right"></i>
                </div>
            `;

            card.addEventListener('click', () => openDayDetails(day));
            container.appendChild(card);

            // Stagger weather badge fetches to avoid rate limiting
            if (day.coords) {
                setTimeout(() => {
                    fetchWeather(day.coords, day.date).then(weather => {
                        const badge = document.getElementById(`weather-badge-${day.id}`);
                        if (badge && weather) {
                            const { icon } = getWeatherInfo(weather.code);
                            badge.innerHTML = `<span class="badge-emoji">${icon}</span><span class="badge-temp">${weather.max}°</span>`;
                        }
                    });
                }, index * 120);
            }
        });
    }

    // ===== PHASE TABS =====
    document.querySelectorAll('.phase-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPhase = e.target.getAttribute('data-phase');
            renderItinerary();
        });
    });

    // ===== TODAY DETECTION =====
    function getTodayString() {
        const today = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
    }

    const todayString = getTodayString();
    let currentDayObj = itinerary.find(day => day.date === todayString);

    if (currentDayObj) {
        currentPhase = currentDayObj.phase || 'phase1';
        document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.phase-btn[data-phase="${currentPhase}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    renderItinerary();

    if (currentDayObj) {
        openDayDetails(currentDayObj);
    }

    // ===== TODAY BANNER =====
    function parseItemTime(timeStr) {
        if (!timeStr) return null;
        const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
        if (!match) return null;
        return parseInt(match[1]) * 60 + parseInt(match[2]);
    }

    function initTodayBanner() {
        if (!currentDayObj) return;

        const banner = document.getElementById('today-banner');
        const bannerDayLabel = document.getElementById('banner-day-label');
        const bannerLocation = document.getElementById('banner-location');
        const bannerNowText = document.getElementById('banner-now-text');
        const bannerNextText = document.getElementById('banner-next-text');
        const bannerNext = document.getElementById('banner-next');

        // Work out day number context
        const phase3Days = itinerary.filter(d => d.phase === 'phase3');
        const phase3Idx = phase3Days.findIndex(d => d.id === currentDayObj.id);
        let dayLabel = 'Today';
        if (phase3Idx >= 0) {
            dayLabel = `UK Road Trip · Day ${phase3Idx + 1} of ${phase3Days.length}`;
        } else {
            const phDays = itinerary.filter(d => (d.phase || 'phase1') === (currentDayObj.phase || 'phase1'));
            const phIdx = phDays.findIndex(d => d.id === currentDayObj.id);
            if (phIdx >= 0) dayLabel = `Day ${phIdx + 1} of ${phDays.length}`;
        }

        bannerDayLabel.textContent = dayLabel;
        bannerLocation.textContent = currentDayObj.title || '';

        function updateNowNext() {
            const now = new Date();
            const nowMins = now.getHours() * 60 + now.getMinutes();
            const items = currentDayObj.items || [];

            // Find last item whose time has passed (NOW) and first upcoming (NEXT)
            let currentItem = null;
            let nextItem = null;

            for (let i = 0; i < items.length; i++) {
                const t = parseItemTime(items[i].time);
                if (t !== null) {
                    if (t <= nowMins) {
                        currentItem = items[i];
                    } else if (!nextItem) {
                        nextItem = items[i];
                    }
                }
            }

            // Fallback: if before first timed item, use first item as 'next'
            if (!currentItem && !nextItem && items.length > 0) {
                nextItem = items[0];
            }

            bannerNowText.textContent = currentItem
                ? `${currentItem.time} · ${currentItem.title}`
                : 'Day starting soon';

            if (nextItem) {
                bannerNextText.textContent = `${nextItem.time} · ${nextItem.title}`;
                bannerNext.style.display = 'flex';
            } else {
                bannerNext.style.display = 'none';
            }
        }

        updateNowNext();
        setInterval(updateNowNext, 60000); // refresh every minute

        banner.style.display = 'block';
        banner.onclick = () => openDayDetails(currentDayObj);
        banner.onkeydown = (e) => { if (e.key === 'Enter') openDayDetails(currentDayObj); };
    }

    initTodayBanner();

    // ===== OPEN DAY DETAILS =====
    let savedScrollY = 0;

    async function openDayDetails(day) {
        const cardEl = document.querySelector(`.day-card[data-day-id="${day.id}"]`);
        if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'instant', block: 'center' });
        }
        
        savedScrollY = window.scrollY;
        currentDayForLearnMore = day;
        window.__currentDayForQuotes = day.id;
        modalTitle.textContent = day.date;

        // Show/hide learn more button
        if (day.learnMore) {
            learnMoreBtn.classList.remove('hidden');
        } else {
            learnMoreBtn.classList.add('hidden');
        }

        if (day.bgImage) {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.backgroundImage = `linear-gradient(rgba(28, 37, 65, 0.85), rgba(28, 37, 65, 0.98)), url('${day.bgImage}')`;
            modalContent.style.backgroundSize = 'cover';
            modalContent.style.backgroundPosition = 'center';
        } else {
            const modalContent = document.querySelector('.modal-content');
            modalContent.style.backgroundImage = '';
        }

        let timelineHTML = '';
        day.items.forEach((item, index) => {
            let linksHTML = '';
            if (item.mapLink) linksHTML += `<a href="${item.mapLink}" target="_blank" class="action-btn"><i class="fas fa-map-marker-alt"></i> Map</a>`;
            if (item.link) linksHTML += `<a href="${item.link}" target="_blank" class="action-btn"><i class="fas fa-external-link-alt"></i> Info</a>`;
            if (item.ticketLink) linksHTML += `<a href="${item.ticketLink}" target="_blank" class="action-btn" style="background-color:#d08c60;color:white;border:none;"><i class="fas fa-ticket-alt"></i> Buy Tickets</a>`;
            if (item.drinksLink) linksHTML += `<a href="${item.drinksLink}" target="_blank" class="action-btn" style="background-color:#7b2cbf;color:white;border:none;"><i class="fas fa-cocktail"></i> Order Drinks</a>`;
            if (item.appLink) linksHTML += `<button onclick="handleAppOpen('${item.appLink}')" class="action-btn" style="cursor:pointer;border:none;background:#3a506b;color:white;padding:8px 12px;border-radius:6px;font-family:inherit;font-size:14px;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-mobile-alt"></i> Open App</button>`;
            if (item.extraLinks) {
                item.extraLinks.forEach(el => {
                    linksHTML += `<button onclick="openPDF('${el.url}','${el.label}')" class="action-btn" style="cursor:pointer;border:none;background:#3a506b;color:white;padding:8px 12px;border-radius:6px;font-family:inherit;font-size:14px;display:inline-flex;align-items:center;gap:6px;"><i class="fas fa-file-pdf"></i> ${el.label}</button>`;
                });
            }
            
            // Check if this activity is marked completed
            const isCompleted = window.completedActivities && window.completedActivities[day.id] && window.completedActivities[day.id][index];
            const checkIcon = isCompleted ? 'fa-check-circle' : 'fa-circle';
            const checkColor = isCompleted ? '#2ecc71' : 'rgba(255,255,255,0.3)';

            timelineHTML += `
                <div class="timeline-item">
                    <div class="timeline-icon"><i class="fas ${item.icon || 'fa-clock'}"></i></div>
                    <div class="timeline-content">
                        <div class="timeline-time">${item.time}</div>
                        <h3 class="timeline-title" style="display:flex; align-items:center; gap:8px;">
                            <button class="activity-check-btn" data-day-id="${day.id}" data-item-idx="${index}" style="background:none; border:none; color:${checkColor}; font-size:1.2rem; cursor:pointer; padding:0; transition: color 0.2s;">
                                <i class="far ${checkIcon}"></i>
                            </button>
                            ${item.title}
                        </h3>
                        <p class="timeline-desc">${item.description}</p>
                        ${linksHTML ? `<div class="timeline-links">${linksHTML}</div>` : ''}
                    </div>
                </div>`;
        });

        // Weather placeholder
        const weatherPlaceholder = `<div class="weather-widget weather-loading"><i class="fas fa-spinner fa-spin"></i><span>Loading forecast…</span></div>`;

        // Load saved rating & notes
        const saved = loadDayData(day.id);

        modalBody.innerHTML = weatherPlaceholder + `<div class="timeline">${timelineHTML}</div>`;

        // Add rating & notes section
        const ratingSection = document.getElementById('day-rating-section') || document.querySelector('.day-rating-section');
        loadRatingUI(day.id, saved);

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';

        // Fetch weather
        const weather = await fetchWeather(day.coords, day.date);
        const weatherHTML = buildWeatherWidget(weather, day.weatherLocation);
        const wWidget = modalBody.querySelector('.weather-widget');
        if (wWidget) wWidget.outerHTML = weatherHTML;
    }

    // ===== RATING & NOTES (localStorage) =====
    function loadDayData(dayId) {
        try {
            return JSON.parse(localStorage.getItem(`eurotrip-day-${dayId}`)) || {};
        } catch { return {}; }
    }

    function saveDayData(dayId, data) {
        localStorage.setItem(`eurotrip-day-${dayId}`, JSON.stringify(data));
    }

    function loadRatingUI(dayId, saved) {
        const stars = document.querySelectorAll('.star[data-star]');
        const valEl  = document.getElementById('star-val');
        const notesEl = document.getElementById('day-notes');
        const savedIndicator = document.getElementById('notes-saved');

        const currentRating = saved.rating || 0;
        renderStarDisplay(currentRating);

        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const rect = star.getBoundingClientRect();
                const isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
                const starNum = parseInt(star.dataset.star);
                const rating = isLeftHalf ? starNum - 0.5 : starNum;
                const current = loadDayData(dayId);
                saveDayData(dayId, { ...current, rating });
                renderStarDisplay(rating);
                refreshCardBadge(dayId, rating);
            });

            // Hover preview
            star.addEventListener('mousemove', (e) => {
                const rect = star.getBoundingClientRect();
                const isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
                const starNum = parseInt(star.dataset.star);
                renderStarDisplay(isLeftHalf ? starNum - 0.5 : starNum);
            });
        });

        document.getElementById('star-rating').addEventListener('mouseleave', () => {
            const cur = loadDayData(dayId);
            renderStarDisplay(cur.rating || 0);
        });

        function renderStarDisplay(rating) {
            stars.forEach(star => {
                const n = parseInt(star.dataset.star);
                star.classList.remove('full', 'half', 'empty');
                if (rating >= n)        star.classList.add('full');
                else if (rating >= n - 0.5) star.classList.add('half');
                else                    star.classList.add('empty');
            });
            if (valEl) valEl.textContent = rating > 0 ? `${rating} / 5` : '';
        }

        if (notesEl) {
            notesEl.value = saved.notes || '';
            let saveTimer;
            notesEl.oninput = () => {
                clearTimeout(saveTimer);
                saveTimer = setTimeout(() => {
                    const current = loadDayData(dayId);
                    saveDayData(dayId, { ...current, notes: notesEl.value });
                    if (savedIndicator) {
                        savedIndicator.classList.add('show');
                        setTimeout(() => savedIndicator.classList.remove('show'), 2000);
                    }
                }, 600);
            };
        }
    }

    function refreshCardBadge(dayId, rating) {
        const card = document.querySelector(`[data-day-id="${dayId}"]`);
        if (!card) return;
        const dateSpan = card.querySelector('.day-date');
        if (!dateSpan) return;
        const existing = dateSpan.querySelector('.card-star-badge');
        if (existing) existing.remove();
        if (rating > 0) {
            const badge = document.createElement('span');
            badge.className = 'card-star-badge';
            badge.textContent = ` ★${rating}`;
            dateSpan.appendChild(badge);
        }
    }

    // ===== CLOSE MODAL =====
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollY);
        currentDayForLearnMore = null;
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // ===== LEARN MORE PANEL =====
    learnMoreBtn.addEventListener('click', () => {
        if (!currentDayForLearnMore || !currentDayForLearnMore.learnMore) return;
        const lm = currentDayForLearnMore.learnMore;
        learnMoreTitle.textContent = lm.title;
        learnMoreBody.innerHTML = buildLearnMoreContent(lm);
        learnMorePanel.style.display = 'flex';
        setTimeout(() => learnMorePanel.classList.add('show'), 10);
    });

    closeLearnMore.addEventListener('click', () => {
        learnMorePanel.classList.remove('show');
        setTimeout(() => { learnMorePanel.style.display = 'none'; }, 400);
    });

    function buildLearnMoreContent(lm) {
        const highlightTags = (lm.highlights || []).map(h => `<span class="highlight-tag">${h}</span>`).join('');
        return `
            <p class="area-intro">${lm.intro}</p>

            <div class="area-fun-fact">
                <span class="area-fun-fact-icon">💡</span>
                <p>${lm.funFact}</p>
            </div>

            <div class="area-section">
                <div class="area-section-title"><i class="fas fa-landmark"></i> History</div>
                <p>${lm.history}</p>
            </div>

            <div class="area-section">
                <div class="area-section-title"><i class="fas fa-mountain"></i> Geography & Landscape</div>
                <p>${lm.geography}</p>
            </div>

            <div class="area-section">
                <div class="area-section-title"><i class="fas fa-map-pin"></i> Must-See Highlights</div>
                <div class="area-highlights">${highlightTags}</div>
            </div>
        `;
    }

    // ===== PDF OVERLAY =====
    window.openPDF = function(url, title) {
        document.getElementById('pdf-title').textContent = title;
        document.getElementById('pdf-object').data = url;
        document.getElementById('pdf-overlay').style.display = 'flex';
    };

    document.getElementById('close-pdf-btn').addEventListener('click', () => {
        document.getElementById('pdf-overlay').style.display = 'none';
        document.getElementById('pdf-object').data = '';
    });

    // ===== APP LINK HANDLER =====
    window.handleAppOpen = function(url) {
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
            setTimeout(() => console.log("App launch may have failed."), 2000);
        }
    };
});

// ===== ACTIVITY CHECK-OFFS (Phase 1) =====
window.completedActivities = {};

document.addEventListener('DOMContentLoaded', () => {
    if (window.fbDb) {
        window.fbDb.ref('completedActivities').on('value', snap => {
            window.completedActivities = snap.val() || {};
            // If modal is open, re-render the checks (naive approach: just toggle classes if we can find them)
            document.querySelectorAll('.activity-check-btn').forEach(btn => {
                const dayId = btn.getAttribute('data-day-id');
                const idx = btn.getAttribute('data-item-idx');
                const isCompleted = window.completedActivities[dayId] && window.completedActivities[dayId][idx];
                const icon = btn.querySelector('i');
                if (isCompleted) {
                    btn.style.color = '#2ecc71';
                    icon.className = 'far fa-check-circle';
                } else {
                    btn.style.color = 'rgba(255,255,255,0.3)';
                    icon.className = 'far fa-circle';
                }
            });
        });
    }
});

// Delegate click event for checkboxes since they are dynamically injected into the modal
document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.activity-check-btn');
    if (!btn || !window.fbDb) return;
    
    const dayId = btn.getAttribute('data-day-id');
    const idx = btn.getAttribute('data-item-idx');
    
    const currentlyCompleted = window.completedActivities[dayId] && window.completedActivities[dayId][idx];
    const newState = !currentlyCompleted;
    
    window.fbDb.ref(`completedActivities/${dayId}/${idx}`).set(newState);
});

// ===== TRIP MEMORIES MODULE =====
const memoriesFab = document.getElementById('memories-fab');
const memoriesPanel = document.getElementById('memories-panel');
const closeMemoriesBtn = document.getElementById('close-memories');

if (memoriesFab && memoriesPanel) {
    memoriesFab.addEventListener('click', () => {
        memoriesPanel.style.display = 'block';
        // Force reflow
        memoriesPanel.offsetHeight;
        memoriesPanel.classList.add('show');
    });
    
    closeMemoriesBtn.addEventListener('click', () => {
        memoriesPanel.classList.remove('show');
        setTimeout(() => memoriesPanel.style.display = 'none', 300);
    });
}
