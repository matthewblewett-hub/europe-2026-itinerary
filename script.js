document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('itinerary-container');
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close-btn');

    let currentPhase = "phase1";

    async function renderItinerary() {
        container.innerHTML = '';
        
        // Filter days by phase
        const daysToRender = itinerary.filter(day => (day.phase || 'phase1') === currentPhase);

        daysToRender.forEach(day => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.dataset.dayId = day.id;
            if (day.bgImage) {
                card.style.backgroundImage = `linear-gradient(rgba(28, 37, 65, 0.7), rgba(28, 37, 65, 0.9)), url('${day.bgImage}')`;
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
            }
            card.innerHTML = `
                <div class="day-header">
                    <span class="day-date">${day.date}</span>
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

            // Async: fetch weather and inject badge
            if (day.coords) {
                fetchWeather(day.coords, day.date).then(weather => {
                    const badge = document.getElementById(`weather-badge-${day.id}`);
                    if (badge && weather) {
                        const { icon } = getWeatherInfo(weather.code);
                        badge.innerHTML = `<span class="badge-emoji">${icon}</span><span class="badge-temp">${weather.max}°</span>`;
                    }
                });
            }
        });
    }

    // Initialize Phase Tabs
    document.querySelectorAll('.phase-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentPhase = e.target.getAttribute('data-phase');
            renderItinerary();
        });
    });

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

    // Initial render
    renderItinerary();

    // If today is in the itinerary, automatically open it
    if (currentDayObj) {
        openDayDetails(currentDayObj);
    }

    // Weather code to description + emoji
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

    // Parse "Monday 1 June 2026" → "2026-06-01"
    function parseDateToISO(dateStr) {
        const months = { January:'01', February:'02', March:'03', April:'04', May:'05', June:'06',
                         July:'07', August:'08', September:'09', October:'10', November:'11', December:'12' };
        const parts = dateStr.trim().split(' ');
        // parts: ["Monday", "1", "June", "2026"]
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
                    <span>${weather.rain}% rain</span>
                </div>
            </div>
        </div>`;
    }

    async function openDayDetails(day) {
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
            if (item.ticketLink) {
                linksHTML += `<a href="${item.ticketLink}" target="_blank" class="action-btn" style="background-color: #d08c60; color: white; border: none;"><i class="fas fa-ticket-alt"></i> Buy Tickets</a>`;
            }
            if (item.drinksLink) {
                linksHTML += `<a href="${item.drinksLink}" target="_blank" class="action-btn" style="background-color: #7b2cbf; color: white; border: none;"><i class="fas fa-cocktail"></i> Order Drinks</a>`;
            }
            if (item.appLink) {
                linksHTML += `<button onclick="handleAppOpen('${item.appLink}')" class="action-btn" style="cursor:pointer; border:none; background:#3a506b; color:white; padding:8px 12px; border-radius:6px; font-family:inherit; font-size:14px; display:inline-flex; align-items:center; gap:6px;"><i class="fas fa-mobile-alt"></i> Open App</button>`;
            }
            if (item.extraLinks) {
                item.extraLinks.forEach(el => {
                    linksHTML += `<button onclick="openPDF('${el.url}', '${el.label}')" class="action-btn" style="cursor:pointer; border:none; background:#3a506b; color:white; padding:8px 12px; border-radius:6px; font-family:inherit; font-size:14px; display:inline-flex; align-items:center; gap:6px;"><i class="fas fa-file-pdf"></i> ${el.label}</button>`;
                });
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

        // Show a loading weather widget first, then fill it in
        const weatherPlaceholder = `<div class="weather-widget weather-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading forecast…</span>
        </div>`;

        modalBody.innerHTML = weatherPlaceholder + `<div class="timeline">${timelineHTML}</div>`;
        
        modal.style.display = 'flex';
        setTimeout(() => { modal.classList.add('show'); }, 10);
        document.body.style.overflow = 'hidden';

        // Fetch weather asynchronously and swap in the result
        const weather = await fetchWeather(day.coords, day.date);
        const weatherHTML = buildWeatherWidget(weather, day.weatherLocation);
        modalBody.querySelector('.weather-widget').outerHTML = weatherHTML;
        // Re-select since outerHTML replaced the node
        const newWidget = modalBody.querySelector('.weather-widget');
        if (newWidget) newWidget.outerHTML = weatherHTML;
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

    // PDF Overlay Logic
    window.openPDF = function(url, title) {
        document.getElementById('pdf-title').textContent = title;
        document.getElementById('pdf-object').data = url;
        document.getElementById('pdf-overlay').style.display = 'flex';
    };

    document.getElementById('close-pdf-btn').addEventListener('click', () => {
        document.getElementById('pdf-overlay').style.display = 'none';
        document.getElementById('pdf-object').data = '';
    });

    // App Open Logic
    window.handleAppOpen = function(url) {
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            // For custom app schemes (baapp://, avis://), setting location directly is best
            window.location.href = url;
            
            // Add a small safety fallback timeout in case the app isn't installed
            setTimeout(() => {
                // If we are still here after 2 seconds, the scheme failed silently (rare on iOS, but good practice)
                console.log("App launch may have failed.");
            }, 2000);
        }
    };
});
