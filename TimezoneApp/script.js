class WorldTimeApp {
    constructor() {
        this.timezones = JSON.parse(localStorage.getItem('worldTimeTimezones')) || [];
        this.favorites = JSON.parse(localStorage.getItem('worldTimeFavorites')) || [];
        this.searchTimeout = null;
        this.updateInterval = null;
        this.selectedCities = new Set();
        
        this.popularCities = [
            { city: 'New York', timezone: 'America/New_York', country: 'USA' },
            { city: 'London', timezone: 'Europe/London', country: 'UK' },
            { city: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
            { city: 'Paris', timezone: 'Europe/Paris', country: 'France' },
            { city: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
            { city: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
            { city: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
            { city: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
            { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: 'Hong Kong' },
            { city: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
            { city: 'Toronto', timezone: 'America/Toronto', country: 'Canada' }
        ];

        this.cityDatabase = [
            { city: 'Istanbul', timezone: 'Europe/Istanbul', country: 'Turkey' },
            { city: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia' },
            { city: 'Beijing', timezone: 'Asia/Shanghai', country: 'China' },
            { city: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt' },
            { city: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexico' },
            { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina' },
            { city: 'Lagos', timezone: 'Africa/Lagos', country: 'Nigeria' },
            { city: 'Karachi', timezone: 'Asia/Karachi', country: 'Pakistan' },
            { city: 'Bangkok', timezone: 'Asia/Bangkok', country: 'Thailand' },
            { city: 'Jakarta', timezone: 'Asia/Jakarta', country: 'Indonesia' },
            { city: 'Manila', timezone: 'Asia/Manila', country: 'Philippines' },
            { city: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea' },
            { city: 'Tehran', timezone: 'Asia/Tehran', country: 'Iran' },
            { city: 'Baghdad', timezone: 'Asia/Baghdad', country: 'Iraq' },
            { city: 'Riyadh', timezone: 'Asia/Riyadh', country: 'Saudi Arabia' },
            { city: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', country: 'Malaysia' },
            { city: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh', country: 'Vietnam' },
            { city: 'Dhaka', timezone: 'Asia/Dhaka', country: 'Bangladesh' },
            { city: 'Yangon', timezone: 'Asia/Yangon', country: 'Myanmar' },
            { city: 'Kathmandu', timezone: 'Asia/Kathmandu', country: 'Nepal' },
            { city: 'Colombo', timezone: 'Asia/Colombo', country: 'Sri Lanka' },
            { city: 'Tashkent', timezone: 'Asia/Tashkent', country: 'Uzbekistan' },
            { city: 'Almaty', timezone: 'Asia/Almaty', country: 'Kazakhstan' },
            { city: 'Baku', timezone: 'Asia/Baku', country: 'Azerbaijan' },
            { city: 'Tbilisi', timezone: 'Asia/Tbilisi', country: 'Georgia' },
            { city: 'Yerevan', timezone: 'Asia/Yerevan', country: 'Armenia' },
            { city: 'Kiev', timezone: 'Europe/Kiev', country: 'Ukraine' },
            { city: 'Warsaw', timezone: 'Europe/Warsaw', country: 'Poland' },
            { city: 'Prague', timezone: 'Europe/Prague', country: 'Czech Republic' },
            { city: 'Vienna', timezone: 'Europe/Vienna', country: 'Austria' },
            { city: 'Zurich', timezone: 'Europe/Zurich', country: 'Switzerland' },
            { city: 'Rome', timezone: 'Europe/Rome', country: 'Italy' },
            { city: 'Madrid', timezone: 'Europe/Madrid', country: 'Spain' },
            { city: 'Amsterdam', timezone: 'Europe/Amsterdam', country: 'Netherlands' },
            { city: 'Brussels', timezone: 'Europe/Brussels', country: 'Belgium' },
            { city: 'Stockholm', timezone: 'Europe/Stockholm', country: 'Sweden' },
            { city: 'Copenhagen', timezone: 'Europe/Copenhagen', country: 'Denmark' },
            { city: 'Oslo', timezone: 'Europe/Oslo', country: 'Norway' },
            { city: 'Helsinki', timezone: 'Europe/Helsinki', country: 'Finland' },
            { city: 'Dublin', timezone: 'Europe/Dublin', country: 'Ireland' },
            { city: 'Edinburgh', timezone: 'Europe/London', country: 'Scotland' },
            { city: 'Lisbon', timezone: 'Europe/Lisbon', country: 'Portugal' },
            { city: 'Athens', timezone: 'Europe/Athens', country: 'Greece' },
            { city: 'Bucharest', timezone: 'Europe/Bucharest', country: 'Romania' },
            { city: 'Sofia', timezone: 'Europe/Sofia', country: 'Bulgaria' },
            { city: 'Belgrade', timezone: 'Europe/Belgrade', country: 'Serbia' },
            { city: 'Zagreb', timezone: 'Europe/Zagreb', country: 'Croatia' },
            { city: 'Casablanca', timezone: 'Africa/Casablanca', country: 'Morocco' },
            { city: 'Tunis', timezone: 'Africa/Tunis', country: 'Tunisia' },
            { city: 'Algiers', timezone: 'Africa/Algiers', country: 'Algeria' },
            { city: 'Tripoli', timezone: 'Africa/Tripoli', country: 'Libya' },
            { city: 'Khartoum', timezone: 'Africa/Khartoum', country: 'Sudan' },
            { city: 'Addis Ababa', timezone: 'Africa/Addis_Ababa', country: 'Ethiopia' },
            { city: 'Nairobi', timezone: 'Africa/Nairobi', country: 'Kenya' },
            { city: 'Kampala', timezone: 'Africa/Kampala', country: 'Uganda' },
            { city: 'Dar es Salaam', timezone: 'Africa/Dar_es_Salaam', country: 'Tanzania' },
            { city: 'Lusaka', timezone: 'Africa/Lusaka', country: 'Zambia' },
            { city: 'Harare', timezone: 'Africa/Harare', country: 'Zimbabwe' },
            { city: 'Johannesburg', timezone: 'Africa/Johannesburg', country: 'South Africa' },
            { city: 'Cape Town', timezone: 'Africa/Johannesburg', country: 'South Africa' },
            { city: 'Accra', timezone: 'Africa/Accra', country: 'Ghana' },
            { city: 'Abidjan', timezone: 'Africa/Abidjan', country: 'Ivory Coast' },
            { city: 'Dakar', timezone: 'Africa/Dakar', country: 'Senegal' },
            { city: 'Kinshasa', timezone: 'Africa/Kinshasa', country: 'DR Congo' },
            { city: 'Luanda', timezone: 'Africa/Luanda', country: 'Angola' },
            { city: 'Maputo', timezone: 'Africa/Maputo', country: 'Mozambique' },
            { city: 'Antananarivo', timezone: 'Indian/Antananarivo', country: 'Madagascar' },
            { city: 'Port Louis', timezone: 'Indian/Mauritius', country: 'Mauritius' },
            { city: 'Vancouver', timezone: 'America/Vancouver', country: 'Canada' },
            { city: 'Montreal', timezone: 'America/Montreal', country: 'Canada' },
            { city: 'Calgary', timezone: 'America/Edmonton', country: 'Canada' },
            { city: 'Winnipeg', timezone: 'America/Winnipeg', country: 'Canada' },
            { city: 'Chicago', timezone: 'America/Chicago', country: 'USA' },
            { city: 'Houston', timezone: 'America/Chicago', country: 'USA' },
            { city: 'Phoenix', timezone: 'America/Phoenix', country: 'USA' },
            { city: 'Denver', timezone: 'America/Denver', country: 'USA' },
            { city: 'Las Vegas', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'San Francisco', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'Seattle', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'Miami', timezone: 'America/New_York', country: 'USA' },
            { city: 'Atlanta', timezone: 'America/New_York', country: 'USA' },
            { city: 'Boston', timezone: 'America/New_York', country: 'USA' },
            { city: 'Washington DC', timezone: 'America/New_York', country: 'USA' },
            { city: 'Philadelphia', timezone: 'America/New_York', country: 'USA' },
            { city: 'Detroit', timezone: 'America/Detroit', country: 'USA' },
            { city: 'Minneapolis', timezone: 'America/Chicago', country: 'USA' },
            { city: 'New Orleans', timezone: 'America/Chicago', country: 'USA' },
            { city: 'Dallas', timezone: 'America/Chicago', country: 'USA' },
            { city: 'San Antonio', timezone: 'America/Chicago', country: 'USA' },
            { city: 'Salt Lake City', timezone: 'America/Denver', country: 'USA' },
            { city: 'Portland', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'San Diego', timezone: 'America/Los_Angeles', country: 'USA' },
            { city: 'Honolulu', timezone: 'Pacific/Honolulu', country: 'USA' },
            { city: 'Anchorage', timezone: 'America/Anchorage', country: 'USA' },
            { city: 'Guadalajara', timezone: 'America/Mexico_City', country: 'Mexico' },
            { city: 'Monterrey', timezone: 'America/Monterrey', country: 'Mexico' },
            { city: 'Tijuana', timezone: 'America/Tijuana', country: 'Mexico' },
            { city: 'Guatemala City', timezone: 'America/Guatemala', country: 'Guatemala' },
            { city: 'San Salvador', timezone: 'America/El_Salvador', country: 'El Salvador' },
            { city: 'Tegucigalpa', timezone: 'America/Tegucigalpa', country: 'Honduras' },
            { city: 'Managua', timezone: 'America/Managua', country: 'Nicaragua' },
            { city: 'San Jose', timezone: 'America/Costa_Rica', country: 'Costa Rica' },
            { city: 'Panama City', timezone: 'America/Panama', country: 'Panama' },
            { city: 'Havana', timezone: 'America/Havana', country: 'Cuba' },
            { city: 'Kingston', timezone: 'America/Jamaica', country: 'Jamaica' },
            { city: 'Port-au-Prince', timezone: 'America/Port-au-Prince', country: 'Haiti' },
            { city: 'Santo Domingo', timezone: 'America/Santo_Domingo', country: 'Dominican Republic' },
            { city: 'San Juan', timezone: 'America/Puerto_Rico', country: 'Puerto Rico' },
            { city: 'Caracas', timezone: 'America/Caracas', country: 'Venezuela' },
            { city: 'Bogota', timezone: 'America/Bogota', country: 'Colombia' },
            { city: 'Quito', timezone: 'America/Guayaquil', country: 'Ecuador' },
            { city: 'Lima', timezone: 'America/Lima', country: 'Peru' },
            { city: 'La Paz', timezone: 'America/La_Paz', country: 'Bolivia' },
            { city: 'Asuncion', timezone: 'America/Asuncion', country: 'Paraguay' },
            { city: 'Montevideo', timezone: 'America/Montevideo', country: 'Uruguay' },
            { city: 'Santiago', timezone: 'America/Santiago', country: 'Chile' },
            { city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Brasilia', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Recife', timezone: 'America/Recife', country: 'Brazil' },
            { city: 'Salvador', timezone: 'America/Bahia', country: 'Brazil' },
            { city: 'Fortaleza', timezone: 'America/Fortaleza', country: 'Brazil' },
            { city: 'Manaus', timezone: 'America/Manaus', country: 'Brazil' },
            { city: 'Belem', timezone: 'America/Belem', country: 'Brazil' },
            { city: 'Porto Alegre', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Curitiba', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Belo Horizonte', timezone: 'America/Sao_Paulo', country: 'Brazil' },
            { city: 'Melbourne', timezone: 'Australia/Melbourne', country: 'Australia' },
            { city: 'Brisbane', timezone: 'Australia/Brisbane', country: 'Australia' },
            { city: 'Perth', timezone: 'Australia/Perth', country: 'Australia' },
            { city: 'Adelaide', timezone: 'Australia/Adelaide', country: 'Australia' },
            { city: 'Darwin', timezone: 'Australia/Darwin', country: 'Australia' },
            { city: 'Canberra', timezone: 'Australia/Sydney', country: 'Australia' },
            { city: 'Auckland', timezone: 'Pacific/Auckland', country: 'New Zealand' },
            { city: 'Wellington', timezone: 'Pacific/Auckland', country: 'New Zealand' },
            { city: 'Christchurch', timezone: 'Pacific/Auckland', country: 'New Zealand' },
            { city: 'Suva', timezone: 'Pacific/Fiji', country: 'Fiji' },
            { city: 'Port Moresby', timezone: 'Pacific/Port_Moresby', country: 'Papua New Guinea' },
            { city: 'Noumea', timezone: 'Pacific/Noumea', country: 'New Caledonia' }
        ];

        // Combine all cities
        this.allCities = [...this.popularCities, ...this.cityDatabase];

        this.regions = [
            'Europe', 'Asia', 'America', 'Africa', 'Australia', 'Pacific'
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTimezones();
        this.updateCurrentTime();
        this.startTimeUpdates();
        this.updateFavoriteCount();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('citySearch');
        const clearSearch = document.getElementById('clearSearch');
        const suggestions = document.getElementById('searchSuggestions');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (clearSearch) {
                    clearSearch.classList.toggle('active', query.length > 0);
                }
                
                if (query.length > 0) {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = setTimeout(() => {
                        this.performSearch(query);
                    }, 300);
                } else if (suggestions) {
                    suggestions.classList.remove('active');
                }
            });
        }

        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                clearSearch.classList.remove('active');
                if (suggestions) suggestions.classList.remove('active');
            });
        }

        // Quick actions
        const addCurrentLocationBtn = document.getElementById('addCurrentLocation');
        if (addCurrentLocationBtn) {
            addCurrentLocationBtn.addEventListener('click', () => {
                this.addCurrentLocation();
            });
        }

        const showFavoritesBtn = document.getElementById('showFavorites');
        if (showFavoritesBtn) {
            showFavoritesBtn.addEventListener('click', () => {
                this.showFavorites();
            });
        }

        // FAB menu
        const fabMenu = document.getElementById('fabMenu');
        const fabMenuOptions = document.getElementById('fabMenuOptions');

        if (fabMenu && fabMenuOptions) {
            fabMenu.addEventListener('click', () => {
                fabMenuOptions.classList.toggle('active');
            });
        }

        const addMultipleBtn = document.getElementById('addMultiple');
        if (addMultipleBtn) {
            addMultipleBtn.addEventListener('click', () => {
                this.openMultipleAddModal();
                if (fabMenuOptions) fabMenuOptions.classList.remove('active');
            });
        }

        const exportDataBtn = document.getElementById('exportData');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                this.exportData();
                if (fabMenuOptions) fabMenuOptions.classList.remove('active');
            });
        }

        const importDataBtn = document.getElementById('importData');
        if (importDataBtn) {
            importDataBtn.addEventListener('click', () => {
                this.importData();
                if (fabMenuOptions) fabMenuOptions.classList.remove('active');
            });
        }

        // Modal events
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const cancelMultipleBtn = document.getElementById('cancelMultiple');
        if (cancelMultipleBtn) {
            cancelMultipleBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        const addSelectedBtn = document.getElementById('addSelected');
        if (addSelectedBtn) {
            addSelectedBtn.addEventListener('click', () => {
                this.addSelectedCities();
            });
        }

        // File input for import
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileImport(e);
            });
        }

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && suggestions) {
                suggestions.classList.remove('active');
            }
            if (!e.target.closest('.fab-menu') && !e.target.closest('.fab') && fabMenuOptions) {
                fabMenuOptions.classList.remove('active');
            }
        });
    }

    performSearch(query) {
        const suggestions = document.getElementById('searchSuggestions');
        if (!suggestions) return;

        const matches = this.allCities.filter(city => 
            city.city.toLowerCase().includes(query.toLowerCase()) ||
            city.country.toLowerCase().includes(query.toLowerCase()) ||
            city.timezone.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        if (matches.length > 0) {
            suggestions.innerHTML = matches.map(city => `
                <div class="suggestion-item" data-city="${city.city}" data-timezone="${city.timezone}" data-country="${city.country}">
                    <div class="suggestion-info">
                        <div class="suggestion-city">${city.city}, ${city.country}</div>
                        <div class="suggestion-timezone">${city.timezone}</div>
                    </div>
                    <div class="suggestion-time">${this.getTimeForTimezone(city.timezone)}</div>
                </div>
            `).join('');

            suggestions.classList.add('active');

            // Add click events to suggestions
            suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    const city = item.dataset.city;
                    const timezone = item.dataset.timezone;
                    const country = item.dataset.country;
                    this.addTimezone(city, timezone, country);
                    suggestions.classList.remove('active');
                    const searchInput = document.getElementById('citySearch');
                    const clearSearch = document.getElementById('clearSearch');
                    if (searchInput) searchInput.value = '';
                    if (clearSearch) clearSearch.classList.remove('active');
                });
            });
        } else {
            suggestions.classList.remove('active');
        }
    }

    addTimezone(city, timezone, country) {
        // Check if timezone already exists
        if (this.timezones.some(tz => tz.timezone === timezone)) {
            this.showNotification(`${city} is already added`, 'warning');
            return;
        }

        const newTimezone = {
            id: Date.now(),
            city,
            timezone,
            country,
            addedAt: new Date().toISOString()
        };

        this.timezones.unshift(newTimezone);
        this.saveTimezones();
        this.renderTimezones();
        this.showNotification(`${city} added successfully`, 'success');
    }

    addCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    // Use the browser's timezone
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const city = 'Current Location';
                    this.addTimezone(city, timezone, 'Local');
                },
                () => {
                    this.showNotification('Unable to get your location', 'error');
                }
            );
        } else {
            this.showNotification('Geolocation is not supported', 'error');
        }
    }

    removeTimezone(id) {
        this.timezones = this.timezones.filter(tz => tz.id !== id);
        this.favorites = this.favorites.filter(fav => fav !== id);
        this.saveTimezones();
        this.saveFavorites();
        this.renderTimezones();
        this.updateFavoriteCount();
        this.showNotification('Timezone removed', 'success');
    }

    toggleFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(id);
        }
        this.saveFavorites();
        this.renderTimezones();
        this.updateFavoriteCount();
    }

    showFavorites() {
        const favoriteTimezones = this.timezones.filter(tz => this.favorites.includes(tz.id));
        if (favoriteTimezones.length === 0) {
            this.showNotification('No favorite timezones found', 'warning');
            return;
        }

        // Temporarily filter to show only favorites
        const originalTimezones = [...this.timezones];
        this.timezones = favoriteTimezones;
        this.renderTimezones();
        
        // Reset after 3 seconds
        setTimeout(() => {
            this.timezones = originalTimezones;
            this.renderTimezones();
        }, 3000);
    }

    openMultipleAddModal() {
        const modal = document.getElementById('multipleAddModal');
        if (modal) {
            modal.classList.add('active');
            this.populatePopularCities();
            this.populateRegions();
        }
    }

    closeModal() {
        const modal = document.getElementById('multipleAddModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.selectedCities.clear();
    }

    populatePopularCities() {
        const container = document.getElementById('popularCities');
        if (!container) return;

        container.innerHTML = this.popularCities.map(city => `
            <div class="city-option" data-city="${city.city}" data-timezone="${city.timezone}" data-country="${city.country}">
                <strong>${city.city}</strong><br>
                <small>${city.country}</small>
            </div>
        `).join('');

        container.querySelectorAll('.city-option').forEach(option => {
            option.addEventListener('click', () => {
                option.classList.toggle('selected');
                const key = `${option.dataset.city}|${option.dataset.timezone}|${option.dataset.country}`;
                if (option.classList.contains('selected')) {
                    this.selectedCities.add(key);
                } else {
                    this.selectedCities.delete(key);
                }
            });
        });
    }

    populateRegions() {
        const container = document.getElementById('regionsContainer');
        if (!container) return;

        container.innerHTML = this.regions.map(region => `
            <button class="region-btn" data-region="${region}">${region}</button>
        `).join('');

        container.querySelectorAll('.region-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const region = btn.dataset.region;
                const regionCities = this.allCities.filter(city => {
                    if (region === 'America') return city.timezone.includes('America');
                    if (region === 'Europe') return city.timezone.includes('Europe');
                    if (region === 'Asia') return city.timezone.includes('Asia');
                    if (region === 'Africa') return city.timezone.includes('Africa');
                    if (region === 'Australia') return city.timezone.includes('Australia');
                    if (region === 'Pacific') return city.timezone.includes('Pacific');
                    return false;
                }).slice(0, 10);

                regionCities.forEach(city => {
                    const key = `${city.city}|${city.timezone}|${city.country}`;
                    this.selectedCities.add(key);
                });

                btn.classList.add('selected');
                this.showNotification(`${regionCities.length} cities from ${region} selected`, 'success');
            });
        });
    }

    addSelectedCities() {
        if (this.selectedCities.size === 0) {
            this.showNotification('No cities selected', 'warning');
            return;
        }

        let addedCount = 0;
        this.selectedCities.forEach(cityKey => {
            const parts = cityKey.split('|');
            if (parts.length === 3) {
                const [city, timezone, country] = parts;
                if (!this.timezones.some(tz => tz.timezone === timezone)) {
                    this.addTimezone(city, timezone, country);
                    addedCount++;
                }
            }
        });

        this.closeModal();
        this.showNotification(`${addedCount} cities added successfully`, 'success');
    }

    exportData() {
        const data = {
            timezones: this.timezones,
            favorites: this.favorites,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'worldtime-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully', 'success');
    }

    importData() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.timezones && Array.isArray(data.timezones)) {
                    this.timezones = data.timezones;
                    this.favorites = data.favorites || [];
                    this.saveTimezones();
                    this.saveFavorites();
                    this.renderTimezones();
                    this.updateFavoriteCount();
                    this.showNotification('Data imported successfully', 'success');
                } else {
                    this.showNotification('Invalid file format', 'error');
                }
            } catch (error) {
                this.showNotification('Error reading file', 'error');
            }
        };
        reader.readAsText(file);
    }

    renderTimezones() {
        const grid = document.getElementById('timezoneGrid');
        if (!grid) return;
        
        if (this.timezones.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clock"></i>
                    <h3>No timezones added yet</h3>
                    <p>Search for a city to get started!</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.timezones.map(timezone => this.createTimezoneCard(timezone)).join('');

        // Add event listeners to cards
        this.bindCardEvents();
    }

    createTimezoneCard(timezone) {
        const isFavorite = this.favorites.includes(timezone.id);
        const currentTime = this.getTimeForTimezone(timezone.timezone);
        const currentDate = this.getDateForTimezone(timezone.timezone);
        const timeInfo = this.getTimezoneInfo(timezone.timezone);

        return `
            <div class="timezone-card" data-id="${timezone.id}">
                <div class="card-header">
                    <div class="city-info">
                        <h3>${timezone.city}</h3>
                        <div class="timezone-name">${timezone.timezone}</div>
                    </div>
                    <div class="card-actions">
                        <button class="card-btn favorite-btn ${isFavorite ? 'active' : ''}" data-id="${timezone.id}">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="card-btn delete-btn" data-id="${timezone.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="time-display">
                    <div class="current-time-large">${currentTime}</div>
                    <div class="current-date-large">${currentDate}</div>
                </div>
                
                <div class="time-info">
                    <div class="info-item">
                        <div class="info-label">UTC Offset</div>
                        <div class="info-value">${timeInfo.offset}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Time Diff</div>
                        <div class="info-value">${timeInfo.difference}</div>
                    </div>
                </div>
            </div>
        `;
    }

    bindCardEvents() {
        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.favorite-btn').dataset.id);
                this.toggleFavorite(id);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('.delete-btn').dataset.id);
                if (confirm('Are you sure you want to remove this timezone?')) {
                    this.removeTimezone(id);
                }
            });
        });
    }

    getTimeForTimezone(timezone) {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(new Date());
        } catch (error) {
            return 'Invalid timezone';
        }
    }

    getDateForTimezone(timezone) {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(new Date());
        } catch (error) {
            return 'Invalid timezone';
        }
    }

    getTimezoneInfo(timezone) {
        try {
            const now = new Date();
            
            // Get UTC offset
            const formatter = new Intl.DateTimeFormat('en', {
                timeZone: timezone,
                timeZoneName: 'longOffset'
            });
            
            const parts = formatter.formatToParts(now);
            const offsetPart = parts.find(part => part.type === 'timeZoneName');
            const offsetString = offsetPart ? offsetPart.value : 'UTC+0';

            // Calculate time difference from local
            const localTime = new Date();
            const targetTime = new Date(localTime.toLocaleString('en-US', { timeZone: timezone }));
            const localTimeInUTC = new Date(localTime.toLocaleString('en-US', { timeZone: 'UTC' }));
            const targetTimeInUTC = new Date(targetTime.toLocaleString('en-US', { timeZone: 'UTC' }));
            
            const diffMs = targetTimeInUTC.getTime() - localTimeInUTC.getTime();
            const diffHours = Math.round(diffMs / (1000 * 60 * 60));
            const diffString = diffHours >= 0 ? `+${diffHours}h` : `${diffHours}h`;

            return {
                offset: offsetString.replace('GMT', 'UTC'),
                difference: diffString
            };
        } catch (error) {
            return {
                offset: 'UTC+0',
                difference: '+0h'
            };
        }
    }

    updateCurrentTime() {
        const timeElement = document.getElementById('currentTime');
        const dateElement = document.getElementById('currentDate');

        if (timeElement && dateElement) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const date = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            timeElement.textContent = time;
            dateElement.textContent = date;
        }
    }

    startTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateCurrentTime();
            
            // Update all timezone cards
            document.querySelectorAll('.timezone-card').forEach(card => {
                const id = parseInt(card.dataset.id);
                const timezone = this.timezones.find(tz => tz.id === id);
                if (timezone) {
                    const timeElement = card.querySelector('.current-time-large');
                    const dateElement = card.querySelector('.current-date-large');
                    
                    if (timeElement) {
                        timeElement.textContent = this.getTimeForTimezone(timezone.timezone);
                    }
                    if (dateElement) {
                        dateElement.textContent = this.getDateForTimezone(timezone.timezone);
                    }
                }
            });
        }, 1000);
    }

    updateFavoriteCount() {
        const favCountElement = document.getElementById('favCount');
        if (favCountElement) {
            favCountElement.textContent = this.favorites.length;
        }
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease-out forwards';
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    saveTimezones() {
        try {
            localStorage.setItem('worldTimeTimezones', JSON.stringify(this.timezones));
        } catch (error) {
            console.error('Failed to save timezones:', error);
        }
    }

    saveFavorites() {
        try {
            localStorage.setItem('worldTimeFavorites', JSON.stringify(this.favorites));
        } catch (error) {
            console.error('Failed to save favorites:', error);
        }
    }

    // Cleanup method
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }
}

// Additional CSS animations for notifications
const additionalStyles = `
    @keyframes slideOutNotification {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new WorldTimeApp();
        
        // Store app instance globally for cleanup
        window.worldTimeApp = app;
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            app.destroy();
        });
    } catch (error) {
        console.error('Failed to initialize WorldTimeApp:', error);
    }
});

// Handle visibility change (when tab becomes active/inactive)
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Restart updates when tab becomes visible
        const app = window.worldTimeApp;
        if (app && typeof app.updateCurrentTime === 'function') {
            app.updateCurrentTime();
        }
    }
});

// Export app class for global access if needed
window.WorldTimeApp = WorldTimeApp;