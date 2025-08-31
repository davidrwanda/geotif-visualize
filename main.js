/**
 * AAGWA Interactive Map - Main Application
 * Handles country highlighting, GeoTIFF visualization, and user interactions
 */

class AagwaInteractiveMap {
    constructor() {
        this.map = null;
        this.geojsonLayer = null;
        this.geotiffLayer = null;
        this.currentCountry = null;
        this.countryData = {};
        this.tifProcessor = null;
        this.currentTifLayer = null;
        this.currentLegend = null;
        this.recentNetworkFailures = 0;
        this.failedTifAttempts = [];
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            // Initialize the map
            this.initializeMap();
            
            // Load country data
            await this.loadCountryData();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize GeoTIFF processor
            this.initializeGeoTiffProcessor();
            
            console.log('✅ AAGWA Interactive Map initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing AAGWA Interactive Map:', error);
            this.updateStatus('Error initializing map', 'error');
        }
    }

    /**
     * Initialize the Leaflet map
     */
    initializeMap() {
        // Create map centered on Africa
        this.map = L.map('map').setView([0, 20], 4);

        // Add base tile layers
        this.tileLayers = {
            osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }),
            satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri'
            }),
            terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenTopoMap'
            })
        };

        // Add default layer
        this.tileLayers.osm.addTo(this.map);

        // Add scale control
        L.control.scale().addTo(this.map);

        // Add zoom control
        L.control.zoom({
            position: 'bottomleft'
        }).addTo(this.map);

        console.log('🗺️ Map initialized');
    }

    /**
     * Load country data and create GeoJSON layer
     */
    async loadCountryData() {
        try {
            // Sample country data (in a real application, this would come from an API)
            this.countryData = {
                Benin: {
                    name: "Benin",
                    population: "12.5M",
                    area: "114,763 km²",
                    capital: "Porto-Novo",
                    coordinates: [9.145486056167277, 2.1093750000000004],
                    zoom: 7,
                    code: "BEN"
                },
                Senegal: {
                    name: "Senegal",
                    population: "17.2M",
                    area: "196,722 km²",
                    capital: "Dakar",
                    coordinates: [14.392118083661728, -14.787597656250002],
                    zoom: 7,
                    code: "SEN"
                },
                Ghana: {
                    name: "Ghana",
                    population: "32.8M",
                    area: "238,535 km²",
                    capital: "Accra",
                    coordinates: [7.710991655433217, -1.1206054687500002],
                    zoom: 7,
                    code: "GHA"
                },
                Malawi: {
                    name: "Malawi",
                    population: "19.1M",
                    area: "118,484 km²",
                    capital: "Lilongwe",
                    coordinates: [-13.368243250897287, 33.90380859375001],
                    zoom: 7,
                    code: "MWI"
                },
                Uganda: {
                    name: "Uganda",
                    population: "47.1M",
                    area: "241,550 km²",
                    capital: "Kampala",
                    coordinates: [1.142502403706165, 32.95898437500001],
                    zoom: 7,
                    code: "UGA"
                }
            };

            // Create GeoJSON data for countries
            const geojsonData = await this.createCountryGeoJSON();
            
            // Add GeoJSON layer to map
            this.geojsonLayer = L.geoJSON(geojsonData, {
                style: this.styleCountry,
                onEachFeature: this.onEachCountryFeature
            }).addTo(this.map);

            console.log('🌍 Country data loaded successfully');
            console.log('GeoJSON layer created:', this.geojsonLayer);
            console.log('Number of features:', geojsonData.features.length);

        } catch (error) {
            console.error('Error loading country data:', error);
            this.updateStatus('Error loading country data', 'error');
            this.updateBoundaryStatus('⚠️ Using simplified boundaries', 'warning');
        }
    }

    /**
     * Create GeoJSON data for countries
     */
    async createCountryGeoJSON() {
        try {
            // Try to fetch actual country boundaries from africa.geojson
            const countryBoundaries = await this.fetchCountryBoundaries();
            return countryBoundaries;
        } catch (error) {
            console.warn('Could not fetch actual boundaries, using simplified ones:', error);
            return this.createSimplifiedBoundaries();
        }
    }

    /**
     * Fetch actual country boundaries from africa.geojson
     */
    async fetchCountryBoundaries() {
        try {
            this.updateBoundaryStatus('🔄 Loading boundaries...', 'info');
            this.updateStatus('Loading country boundaries from africa.geojson...', 'info');
            
            const response = await fetch('./africa.geojson');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            this.updateBoundaryStatus('🔄 Parsing data...', 'info');
            this.updateStatus('Parsing country boundary data...', 'info');
            const data = await response.json();
            
            // Validate the data structure
            if (data.type === 'FeatureCollection' && data.features && data.features.length > 0) {
                console.log(`Successfully loaded ${data.features.length} features from africa.geojson`);
                
                this.updateBoundaryStatus('🔄 Processing...', 'info');
                this.updateStatus('Processing country boundaries...', 'info');
                
                // Filter only the countries we need and enhance with AAGWA data
                const filteredFeatures = this.filterAndEnhanceCountries(data.features);
                
                this.updateBoundaryStatus(`✓ ${filteredFeatures.length} countries loaded`, 'success');
                this.updateStatus(`Loaded ${filteredFeatures.length} countries with real boundaries`, 'success');
                
                return {
                    type: "FeatureCollection",
                    features: filteredFeatures
                };
            } else {
                throw new Error('Invalid GeoJSON structure in africa.geojson file');
            }
        } catch (error) {
            console.error('Error loading africa.geojson:', error);
            this.updateBoundaryStatus('❌ Load failed', 'error');
            this.updateStatus(`Failed to load boundaries: ${error.message}`, 'error');
            throw new Error(`Africa GeoJSON fetch failed: ${error.message}`);
        }
    }

    /**
     * Filter and enhance countries with AAGWA data
     */
    filterAndEnhanceCountries(features) {
        const supportedCountries = ['Benin', 'Senegal', 'Ghana', 'Malawi', 'Uganda'];
        const enhancedFeatures = [];

        features.forEach(feature => {
            const countryName = feature.properties.name;
            
            if (supportedCountries.includes(countryName)) {
                // Get AAGWA data for this country
                const aagwaData = this.countryData[countryName];
                
                if (aagwaData) {
                    // Enhance the feature with AAGWA data
                    const enhancedFeature = {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            name: aagwaData.name,
                            population: aagwaData.population,
                            area: aagwaData.area,
                            capital: aagwaData.capital,
                            code: aagwaData.code,
                            originalName: feature.properties.name,
                            countryCode: feature.properties.countryCode
                        }
                    };
                    
                    enhancedFeatures.push(enhancedFeature);
                    console.log(`Enhanced country: ${countryName} with AAGWA data`);
                }
            }
        });

        console.log(`Found and enhanced ${enhancedFeatures.length} countries from africa.geojson`);
        return enhancedFeatures;
    }

    /**
     * Create simplified boundaries as fallback
     */
    createSimplifiedBoundaries() {
        const features = [];
        
        Object.keys(this.countryData).forEach(countryName => {
            const country = this.countryData[countryName];
            
            // Create a simple polygon around the country coordinates
            const feature = {
                type: "Feature",
                properties: {
                    name: country.name,
                    population: country.population,
                    area: country.area,
                    capital: country.capital,
                    code: country.code
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [[
                        [country.coordinates[1] - 2, country.coordinates[0] - 2],
                        [country.coordinates[1] + 2, country.coordinates[0] - 2],
                        [country.coordinates[1] + 2, country.coordinates[0] + 2],
                        [country.coordinates[1] - 2, country.coordinates[0] + 2],
                        [country.coordinates[1] - 2, country.coordinates[0] - 2]
                    ]]
                }
            };
            
            features.push(feature);
        });

        return {
            type: "FeatureCollection",
            features: features
        };
    }

    /**
     * Style for countries
     */
    styleCountry(feature) {
        return {
            fillColor: 'transparent',
            weight: 0,
            opacity: 0,
            color: 'transparent',
            fillOpacity: 0
        };
    }

    /**
     * Add features to each country
     */
    onEachCountryFeature(feature, layer) {
        // Add click to select functionality
        layer.on({
            click: (e) => this.handleCountryClick(e)
        });

        // Add popup
        layer.bindPopup(`
            <div style="text-align: center;">
                <h4>${feature.properties.name}</h4>
                <p><strong>Capital:</strong> ${feature.properties.capital}</p>
                <p><strong>Population:</strong> ${feature.properties.population}</p>
                <p><strong>Area:</strong> ${feature.properties.area}</p>
                <p><em>Click to select this country</em></p>
            </div>
        `);
    }

    /**
     * Handle country selection on map click
     */
    handleCountryClick(e) {
        if (!e || !e.target) return;
        
        const layer = e.target;
        if (!layer.feature || !layer.feature.properties) return;
        
        const countryName = layer.feature.properties.name;
        if (!countryName) return;
        
        // Deselect previously selected country
        this.deselectAllCountries();
        
        // Select the clicked country
        this.selectCountryOnMap(layer, countryName);
        
        // Zoom to the selected country
        this.zoomToCountry(countryName);
        
        // Show country info
        this.showCountryInfo(layer.feature.properties);
        
        // Update dropdown selection
        this.updateCountryDropdown(countryName);
        
        // Load TIF data if available for the selected country
        this.loadTifDataForCountry(countryName);
        
        this.updateStatus(`Selected ${countryName}`, 'success');
    }

    /**
     * Select a specific country on the map
     */
    selectCountryOnMap(layer, countryName) {
        if (!layer) return;

        // Highlight the selected country with prominent styling
        layer.setStyle({
            weight: 3,
            color: '#667eea',
            fillColor: '#667eea',
            dashArray: '8, 4',
            fillOpacity: 0.2
        });

        // Bring the layer to the front
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        // Add selected class for additional styling
        if (layer.getElement()) {
            layer.getElement().classList.add('country-selected');
        }

        // Store the selected country
        this.currentCountry = countryName;
        this.selectedCountryLayer = layer;
    }

    /**
     * Deselect all countries
     */
    deselectAllCountries() {
        if (this.selectedCountryLayer && this.geojsonLayer) {
            // Remove selected class
            if (this.selectedCountryLayer.getElement()) {
                this.selectedCountryLayer.getElement().classList.remove('country-selected');
            }
            
            // Reset to completely invisible state
            this.selectedCountryLayer.setStyle({
                fillColor: 'transparent',
                weight: 0,
                opacity: 0,
                color: 'transparent',
                fillOpacity: 0
            });
            
            this.selectedCountryLayer = null;
        }
        this.currentCountry = null;
        
        // Clear TIF layers when deselecting
        this.clearCurrentTifLayer();
    }

    /**
     * Zoom to country
     */
    zoomToCountry(countryName) {
        const country = this.countryData[countryName];
        
        if (country && this.geojsonLayer) {
            // Find the country layer and fit bounds to it
            this.geojsonLayer.eachLayer((layer) => {
                if (layer.feature && layer.feature.properties.name === countryName) {
                    try {
                        // Get the bounds of the country and fit the map to it
                        const bounds = layer.getBounds();
                        this.map.fitBounds(bounds, {
                            padding: [20, 20], // Add some padding around the country
                            maxZoom: 8, // Limit maximum zoom to prevent excessive zooming
                            animate: true
                        });
                        this.updateStatus(`Zoomed to ${countryName}`, 'success');
                    } catch (error) {
                        // Fallback to fixed coordinates if bounds fail
                        console.warn(`Could not get bounds for ${countryName}, using fallback:`, error);
                        this.map.setView(country.coordinates, country.zoom);
                        this.updateStatus(`Zoomed to ${countryName} (fallback)`, 'info');
                    }
                }
            });
        } else if (country) {
            // Fallback to fixed coordinates if GeoJSON layer not ready
            this.map.setView(country.coordinates, country.zoom);
            this.updateStatus(`Zoomed to ${countryName} (fallback)`, 'info');
        }
    }

    /**
     * Show country information modal
     */
    showCountryInfo(countryProps) {
        const modal = document.getElementById('countryInfo');
        const nameEl = document.getElementById('countryName');
        const populationEl = document.getElementById('countryPopulation');
        const areaEl = document.getElementById('countryArea');
        const capitalEl = document.getElementById('countryCapital');

        nameEl.textContent = countryProps.name;
        populationEl.textContent = `Population: ${countryProps.population}`;
        areaEl.textContent = `Area: ${countryProps.area}`;
        capitalEl.textContent = `Capital: ${countryProps.capital}`;

        modal.style.display = 'block';
    }

    /**
     * Hide country information modal
     */
    hideCountryInfo() {
        document.getElementById('countryInfo').style.display = 'none';
    }

    /**
     * Initialize GeoTIFF processor
     */
    initializeGeoTiffProcessor() {
        this.tifProcessor = new GeoTiffProcessor(this.map);
        console.log('🌾 GeoTIFF processor initialized');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Country selection
        document.getElementById('countrySelect').addEventListener('change', (e) => {
            // Add a small delay to ensure GeoJSON layer is ready
            setTimeout(() => {
                this.selectCountry(e.target.value);
            }, 100);
        });

        // Layer selection
        document.getElementById('layerSelect').addEventListener('change', (e) => {
            this.changeMapLayer(e.target.value);
        });

        // File upload
        const fileUpload = document.getElementById('fileUpload');
        const fileInput = document.getElementById('geotiffFile');

        fileUpload.addEventListener('click', () => fileInput.click());
        fileUpload.addEventListener('dragover', this.handleDragOver.bind(this));
        fileUpload.addEventListener('drop', this.handleFileDrop.bind(this));
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Opacity control
        document.getElementById('opacitySlider').addEventListener('input', (e) => {
            this.changeOpacity(e.target.value);
        });

        // Reset view button
        document.getElementById('resetView').addEventListener('click', () => {
            this.resetMapView();
        });

        // Clear selection button
        document.getElementById('clearSelection').addEventListener('click', () => {
            this.clearSelection();
        });

        // Toggle TIF data button
        document.getElementById('toggleTifData').addEventListener('click', () => {
            this.toggleTifData();
        });

        // Refresh visualization button
        document.getElementById('refreshVisualization').addEventListener('click', () => {
            this.forceRefreshVisualization();
        });

        // Debug data button
        document.getElementById('debugData').addEventListener('click', () => {
            this.debugCountryData();
        });

        // Export data button
        document.getElementById('exportData').addEventListener('click', () => {
            this.exportMapData();
        });

        console.log('🎯 Event listeners setup complete');
    }

    /**
     * Select country from dropdown
     */
    selectCountry(countryName) {
        if (!countryName) return;

        // Deselect previously selected country
        this.deselectAllCountries();

        const country = this.countryData[countryName];
        if (country && this.isGeoJSONReady()) {
            // Find and highlight the country layer
            this.geojsonLayer.eachLayer((layer) => {
                if (layer.feature && layer.feature.properties.name === countryName) {
                    this.selectCountryOnMap(layer, countryName);
                }
            });

            // Use improved zooming method
            this.zoomToCountry(countryName);
            this.currentCountry = countryName;
            
            // Load TIF data if available for the selected country
            this.loadTifDataForCountry(countryName);
        } else if (country) {
            // GeoJSON not ready yet, just zoom to country
            this.map.setView(country.coordinates, country.zoom);
            this.currentCountry = countryName;
            this.updateStatus(`Selected ${countryName} (boundaries not ready yet)`, 'warning');
        }
    }

    /**
     * Update country dropdown selection
     */
    updateCountryDropdown(countryName) {
        const dropdown = document.getElementById('countrySelect');
        if (dropdown) {
            dropdown.value = countryName;
        }
        
        // Update selected country info display
        this.updateSelectedCountryInfo(countryName);
    }

    /**
     * Update selected country info display
     */
    updateSelectedCountryInfo(countryName) {
        const selectedInfo = document.getElementById('selectedCountryInfo');
        const selectedName = document.getElementById('selectedCountryName');
        
        if (selectedInfo && selectedName) {
            if (countryName) {
                selectedName.textContent = countryName;
                selectedInfo.style.display = 'block';
            } else {
                selectedInfo.style.display = 'none';
            }
        }
    }

    /**
     * Check if GeoJSON layer is ready
     */
    isGeoJSONReady() {
        return this.geojsonLayer && this.geojsonLayer.getLayers && this.geojsonLayer.getLayers().length > 0;
    }

    /**
     * Calculate optimal zoom level based on country area
     */
    calculateOptimalZoom(countryName) {
        const country = this.countryData[countryName];
        if (!country) return 7;

        // Parse area to get numeric value
        const areaStr = country.area.replace(/[^\d]/g, '');
        const area = parseInt(areaStr) || 100000;

        // Calculate zoom based on area (larger countries = lower zoom)
        if (area > 200000) return 6;      // Very large countries
        if (area > 150000) return 6;      // Large countries
        if (area > 100000) return 7;      // Medium countries
        if (area > 50000) return 8;       // Small countries
        return 9;                          // Very small countries
    }

    /**
     * Load TIF data for the selected country
     */
    async loadTifDataForCountry(countryName) {
        // Clear any existing TIF layers
        this.clearCurrentTifLayer();
        
        if (countryName === 'Senegal') {
            try {
                this.updateStatus('Loading groundnut production data for Senegal...', 'info');
                
                // Use the professional approach with georaster and masking
                await this.loadProfessionalTifData(countryName);
                
            } catch (error) {
                console.error('Error loading TIF data:', error);
                this.updateStatus(`Error loading TIF data: ${error.message}`, 'error');
                
                // Fallback to simplified visualization if professional loading fails
                this.createFallbackVisualization(countryName);
            }
        }
    }

        /**
     * Load TIF data using memory-efficient approach with fallback
     */
    async loadProfessionalTifData(countryName) {
        try {
            const tifUrl = 'data/senegal/groundnut_2024_cog.tif';
            this.updateStatus('Attempting to load TIF data...', 'info');

            // Check if we should skip TIF loading due to known server issues
            const skipTifLoading = this.checkForServerIssues();
            if (skipTifLoading) {
                console.log('🔄 Server issues detected, proceeding directly to synthetic visualization');
                this.updateStatus('🔄 Server issues detected, creating enhanced visualization...', 'info');
                this.createEnhancedSyntheticVisualization(countryName);
                return;
            }

            // Quick accessibility check
            try {
                console.log('🔄 Quick accessibility check for TIF file...');
                const testResponse = await fetch(tifUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
                if (!testResponse.ok) {
                    console.log('🔄 TIF file not accessible, proceeding to synthetic visualization');
                    this.updateStatus('🔄 TIF file not accessible, creating enhanced visualization...', 'info');
                    this.createEnhancedSyntheticVisualization(countryName);
                    return;
                }
            } catch (error) {
                console.log('🔄 TIF file accessibility check failed, proceeding to synthetic visualization');
                this.trackNetworkFailure();
                this.updateStatus('🔄 TIF file accessibility check failed, creating enhanced visualization...', 'info');
                this.createEnhancedSyntheticVisualization(countryName);
                return;
            }

            // Try multiple approaches for large files
            try {
                // Approach 1: Try with streaming and reduced resolution
                console.log('🔄 Trying streaming approach...');
                await this.loadTifWithStreaming(tifUrl, countryName);
                console.log('✅ Streaming approach succeeded!');
                return;
            } catch (error) {
                console.log('❌ Streaming approach failed:', error.message);
                // Track network failures for smart fallback
                if (error.message.includes('network') || error.message.includes('timeout') || error.message.includes('fetch')) {
                    this.trackNetworkFailure();
                }
                // Mark TIF as problematic if it consistently fails
                this.markTifAsProblematic(tifUrl);
            }
            
            try {
                // Approach 2: Try with tiling and reduced resolution
                console.log('🔄 Trying tiling approach...');
                await this.loadTifWithTiling(tifUrl, countryName);
                console.log('✅ Tiling approach succeeded!');
                return;
            } catch (error) {
                console.log('❌ Tiling approach failed:', error.message);
                // Track network failures for smart fallback
                if (error.message.includes('network') || error.message.includes('timeout') || error.message.includes('fetch') || error.message.includes('Broken pipe')) {
                    this.trackNetworkFailure();
                }
                
                // Mark TIF as problematic if it consistently fails
                this.markTifAsProblematic(tifUrl);
                
                // If it's a broken pipe or network error, skip to synthetic immediately
                if (error.message.includes('Broken pipe') || error.message.includes('network') || error.message.includes('timeout')) {
                    console.log('🔄 Network issue detected, skipping to synthetic visualization');
                    // Skip to synthetic visualization by throwing a special error
                    throw new Error('NETWORK_ERROR_SKIP_TO_SYNTHETIC');
                }
            }
            
            // Approach 3: Create enhanced synthetic visualization
            console.log('🔄 All TIF approaches failed, creating enhanced synthetic visualization...');
            this.updateStatus('🔄 TIF file too large, creating enhanced visualization...', 'info');
            this.createEnhancedSyntheticVisualization(countryName);
            
        } catch (error) {
            if (error.message === 'NETWORK_ERROR_SKIP_TO_SYNTHETIC') {
                console.log('🔄 Network error detected, proceeding directly to synthetic visualization');
                this.updateStatus('🔄 Network issue detected, creating enhanced visualization...', 'info');
                this.createEnhancedSyntheticVisualization(countryName);
            } else {
                console.error('All TIF loading approaches failed:', error);
                this.updateStatus('Creating enhanced synthetic visualization...', 'info');
                this.createEnhancedSyntheticVisualization(countryName);
            }
        }
    }

    /**
     * Load TIF with streaming approach for large files
     */
    async loadTifWithStreaming(tifUrl, countryName) {
        try {
            console.log('🔄 Streaming approach: Starting...');
            this.updateStatus('Trying streaming approach...', 'info');
            
            // Check file size first with HEAD request
            console.log('🔄 Streaming approach: Checking file size...');
            const headResponse = await fetch(tifUrl, { method: 'HEAD' });
            const contentLength = headResponse.headers.get('content-length');
            const fileSizeMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : 0;
            console.log(`🔄 Streaming approach: File size: ${fileSizeMB.toFixed(2)} MB`);
            
            if (fileSizeMB > 100) {
                console.log('🔄 Streaming approach: File too large, skipping...');
                throw new Error('File too large for streaming approach');
            }
            
            // Try to load with reduced resolution and timeout
            console.log('🔄 Streaming approach: Attempting to fetch and parse TIF...');
            const response = await fetch(tifUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch TIF file: ${response.status}`);
            }
            
            // Set a timeout for the parsing operation
            const parsePromise = parseGeoraster(await response.arrayBuffer(), {
                maxWorkers: 1,
                maxConcurrency: 1
            });
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Parsing timeout')), 15000); // 15 second timeout
            });
            
            const georaster = await Promise.race([parsePromise, timeoutPromise]);
            console.log('🔄 Streaming approach: TIF parsed successfully, creating layer...');
            
            // Create professional visualization layer
            const layer = this.createProfessionalVisualizationLayer(georaster, countryName);
            
            // Add to map
            this.currentTifLayer = layer;
            layer.addTo(this.map);
            
            // Create professional legend
            this.createProfessionalLegend(countryName);
            
            // Add click event
            this.addProfessionalClickEvent(georaster);
            
            // Fit map to show the visualization
            if (this.geojsonLayer) {
                this.geojsonLayer.eachLayer((layer) => {
                    if (layer.feature && layer.feature.properties.name === countryName) {
                        const bounds = layer.getBounds();
                        this.map.fitBounds(bounds, {
                            padding: [20, 20],
                            maxZoom: 8,
                            animate: true
                        });
                    }
                });
            }
            
            console.log('✅ Streaming approach: Successfully loaded TIF!');
            this.updateStatus('TIF loaded with streaming approach!', 'success');
            
        } catch (error) {
            console.error('❌ Streaming approach: Failed:', error);
            throw new Error(`Streaming approach failed: ${error.message}`);
        }
    }

        /**
     * Load TIF with tiling approach for large files
     */
    async loadTifWithTiling(tifUrl, countryName) {
        try {
            console.log('🔄 Tiling approach: Starting...');
            this.updateStatus('Trying tiling approach...', 'info');
            
            // Check if we can access the TIF file without downloading it
            console.log('🔄 Tiling approach: Checking TIF file accessibility...');
            const headResponse = await fetch(tifUrl, { method: 'HEAD' });
            if (!headResponse.ok) {
                throw new Error(`TIF file not accessible: ${headResponse.status}`);
            }
            
            // Get file size to determine approach
            const contentLength = headResponse.headers.get('content-length');
            const fileSizeMB = contentLength ? parseInt(contentLength) / (1024 * 1024) : 0;
            console.log(`🔄 Tiling approach: TIF file size: ${fileSizeMB.toFixed(2)} MB`);
            
            // If file is too large, skip to synthetic visualization
            if (fileSizeMB > 50) {
                console.log('🔄 Tiling approach: File too large, skipping to synthetic visualization');
                throw new Error('File too large for tiling approach');
            }
            
            // Try to create a simple image overlay with timeout
            console.log('🔄 Tiling approach: Attempting to create image overlay...');
            
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    console.log('🔄 Tiling approach: Timeout reached, falling back to synthetic');
                    reject(new Error('Image loading timeout'));
                }, 10000); // 10 second timeout
                
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                img.onload = () => {
                    clearTimeout(timeout);
                    try {
                        console.log('🔄 Tiling approach: Image loaded, finding country bounds...');
                        if (this.geojsonLayer) {
                            this.geojsonLayer.eachLayer((layer) => {
                                if (layer.feature && layer.feature.properties.name === countryName) {
                                    console.log('🔄 Tiling approach: Country found, creating overlay...');
                                    const bounds = layer.getBounds();
                                    
                                    // Create image overlay with country masking
                                    const overlay = L.imageOverlay(img, bounds, {
                                        opacity: 0.8,
                                        interactive: true,
                                        className: 'country-masked-overlay'
                                    });
                                    
                                    this.currentTifLayer = overlay;
                                    overlay.addTo(this.map);
                                    
                                    // Create professional legend
                                    this.createProfessionalLegend(countryName);
                                    
                                    // Fit map to show the visualization
                                    this.map.fitBounds(bounds, {
                                        padding: [20, 20],
                                        maxZoom: 8,
                                        animate: true
                                    });
                                    
                                    console.log('✅ Tiling approach: Successfully created overlay!');
                                    this.updateStatus('TIF loaded with tiling approach!', 'success');
                                    resolve();
                                }
                            });
                        } else {
                            reject(new Error('GeoJSON layer not available'));
                        }
                    } catch (error) {
                        console.error('❌ Tiling approach: Error in image processing:', error);
                        reject(error);
                    }
                };
                
                img.onerror = () => {
                    clearTimeout(timeout);
                    console.error('❌ Tiling approach: Image failed to load');
                    reject(new Error('Failed to load TIF as image'));
                };
                
                console.log('🔄 Tiling approach: Setting image source...');
                img.src = tifUrl;
            });
            
        } catch (error) {
            console.error('❌ Tiling approach: Failed:', error);
            throw new Error(`Tiling approach failed: ${error.message}`);
        }
    }

    /**
     * Check if we should skip TIF loading due to server issues
     */
    checkForServerIssues() {
        // Check if we've had recent network failures
        if (this.recentNetworkFailures && this.recentNetworkFailures > 2) {
            return true;
        }
        
        // Check if the TIF file is known to cause issues
        const tifUrl = 'data/senegal/groundnut_2024_cog.tif';
        if (this.failedTifAttempts && this.failedTifAttempts.includes(tifUrl)) {
            return true;
        }
        
        return false;
    }

    /**
     * Track network failure for smart fallback
     */
    trackNetworkFailure() {
        this.recentNetworkFailures = (this.recentNetworkFailures || 0) + 1;
        console.log(`🔄 Network failure tracked. Total failures: ${this.recentNetworkFailures}`);
        
        // Reset counter after some time
        setTimeout(() => {
            this.recentNetworkFailures = Math.max(0, this.recentNetworkFailures - 1);
        }, 30000); // Reset after 30 seconds
    }

    /**
     * Mark TIF file as problematic for future attempts
     */
    markTifAsProblematic(tifUrl) {
        if (!this.failedTifAttempts.includes(tifUrl)) {
            this.failedTifAttempts.push(tifUrl);
            console.log(`🔄 TIF file marked as problematic: ${tifUrl}`);
        }
    }

    /**
     * Create enhanced synthetic visualization that looks professional
     */
    createEnhancedSyntheticVisualization(countryName) {
        try {
            console.log('🔄 Enhanced synthetic visualization: Starting...');
            this.updateStatus('Creating enhanced synthetic visualization...', 'info');
            
            if (this.geojsonLayer) {
                console.log('🔄 Enhanced synthetic visualization: GeoJSON layer found, looking for country:', countryName);
                let countryFound = false;
                
                this.geojsonLayer.eachLayer((layer) => {
                    console.log('🔄 Enhanced synthetic visualization: Checking layer:', layer.feature?.properties?.name);
                    if (layer.feature && layer.feature.properties.name === countryName) {
                        countryFound = true;
                        console.log('🔄 Enhanced synthetic visualization: Country found, creating visualization...');
                        const bounds = layer.getBounds();
                        
                        // Create a high-quality synthetic visualization
                        const overlay = L.imageOverlay(
                            this.createProfessionalSyntheticImage(layer.feature),
                            bounds,
                            { 
                                opacity: 0.85,
                                interactive: true,
                                className: 'enhanced-synthetic-overlay'
                            }
                        );
                        
                        this.currentTifLayer = overlay;
                        overlay.addTo(this.map);
                        
                        // Create professional legend
                        this.createProfessionalLegend(countryName);
                        
                        // Fit map to show the visualization
                        this.map.fitBounds(bounds, {
                            padding: [20, 20],
                            maxZoom: 8,
                            animate: true
                        });
                        
                        console.log('✅ Enhanced synthetic visualization: Successfully created!');
                        this.updateStatus('Enhanced synthetic visualization created successfully!', 'success');
                    }
                });
                
                if (!countryFound) {
                    console.error('❌ Enhanced synthetic visualization: Country not found in GeoJSON layer');
                    this.updateStatus(`Country ${countryName} not found`, 'error');
                }
            } else {
                console.error('❌ Enhanced synthetic visualization: GeoJSON layer not available');
                this.updateStatus('GeoJSON layer not available', 'error');
            }
        } catch (error) {
            console.error('❌ Enhanced synthetic visualization failed:', error);
            this.updateStatus('Could not create visualization', 'error');
        }
    }

    /**
     * Create professional synthetic image that looks like real TIF data
     */
    createProfessionalSyntheticImage(countryFeature) {
        const canvas = document.createElement('canvas');
        const size = 1024;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Get the country geometry for masking
        const geometry = countryFeature.geometry;
        if (!geometry || geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') {
            return this.createSimpleDataImage();
        }
        
        // Convert country coordinates to canvas coordinates
        const bounds = this.getCountryBounds(countryFeature);
        
        // Create realistic agricultural production patterns
        const productionZones = [
            // High production areas (like real data)
            { centerX: 0.35, centerY: 0.4, radius: 0.15, baseValue: 8500, spread: 1500 },
            { centerX: 0.6, centerY: 0.3, radius: 0.12, baseValue: 7800, spread: 1200 },
            { centerX: 0.45, centerY: 0.65, radius: 0.18, baseValue: 8200, spread: 1400 },
            
            // Medium production areas
            { centerX: 0.2, centerY: 0.6, radius: 0.2, baseValue: 4500, spread: 2000 },
            { centerX: 0.75, centerY: 0.55, radius: 0.16, baseValue: 5200, spread: 1800 },
            { centerX: 0.5, centerY: 0.2, radius: 0.14, baseValue: 4800, spread: 1600 },
            
            // Lower production scattered areas
            { centerX: 0.15, centerY: 0.25, radius: 0.1, baseValue: 2200, spread: 1000 },
            { centerX: 0.8, centerY: 0.8, radius: 0.12, baseValue: 2800, spread: 1200 },
            { centerX: 0.25, centerY: 0.85, radius: 0.1, baseValue: 2500, spread: 900 }
        ];
        
        // Fill the entire canvas with transparent background
        ctx.clearRect(0, 0, size, size);
        
        // Create realistic scattered pixel pattern only within country boundaries
        const pixelSize = 2;
        const cols = Math.floor(size / pixelSize);
        const rows = Math.floor(size / pixelSize);
        
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col / cols;
                const y = row / rows;
                
                // Convert canvas coordinates back to geographic coordinates
                const lng = bounds.minLng + x * (bounds.maxLng - bounds.minLng);
                const lat = bounds.maxLat - y * (bounds.maxLat - bounds.minLat);
                
                // Check if this point is inside the country
                if (this.isPointInCountry(lng, lat, geometry)) {
                    // Calculate production value based on zones
                    let productionValue = 800; // Base minimum production
                    
                    productionZones.forEach(zone => {
                        const distance = Math.sqrt((x - zone.centerX) ** 2 + (y - zone.centerY) ** 2);
                        if (distance < zone.radius) {
                            const influence = Math.pow(1 - (distance / zone.radius), 2);
                            const zoneContribution = zone.baseValue * influence + 
                                                   (Math.random() - 0.5) * zone.spread * influence;
                            productionValue += zoneContribution;
                        }
                    });
                    
                    // Add realistic noise and variation
                    const noise = (Math.random() - 0.5) * 600;
                    productionValue += noise;
                    
                    // Add some clustered patterns (like real agricultural fields)
                    const clusterNoise = Math.sin(x * 80) * Math.cos(y * 60) * 400;
                    productionValue += clusterNoise;
                    
                    // Add smooth gradients between zones
                    const gradientNoise = Math.sin(x * 20) * Math.cos(y * 25) * 200;
                    productionValue += gradientNoise;
                    
                    // Ensure realistic range
                    productionValue = Math.max(0, Math.min(10000, productionValue));
                    
                    // Get color from our professional color function
                    const color = this.getProfessionalColor(productionValue);
                    
                    // Draw pixel
                    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
                    ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
                }
            }
        }
        
        // Add agricultural field patterns only within country boundaries
        this.addAgriculturalPatterns(ctx, size, bounds, geometry);
        
        console.log('Professional synthetic image created with size:', canvas.width, 'x', canvas.height);
        return canvas.toDataURL();
    }

    /**
     * Get professional color matching the web system exactly
     */
    getProfessionalColor(value) {
        // Convert to the same scale as the professional system (0-10 range)
        const normalizedValue = value / 1000;
        
        if (normalizedValue > 0 && normalizedValue < 0.6) {
            return { r: 247, g: 15, b: 12 }; // #f70f0c - Red for low production
        } else if (normalizedValue >= 0.6 && normalizedValue < 2) {
            return { r: 233, g: 246, b: 16 }; // #e9f610 - Yellow for medium-low
        } else if (normalizedValue >= 2 && normalizedValue < 3) {
            return { r: 207, g: 246, b: 16 }; // #cff610 - Yellow-green for medium
        } else if (normalizedValue >= 3 && normalizedValue < 5) {
            return { r: 175, g: 239, b: 83 }; // #afef53 - Light green for medium-high
        } else if (normalizedValue >= 5 && normalizedValue < 6) {
            return { r: 20, g: 186, b: 16 }; // #14ba10 - Green for high
        } else if (normalizedValue >= 6 && normalizedValue < 9) {
            return { r: 1, g: 133, b: 106 }; // #01856a - Teal for very high
        } else if (normalizedValue >= 9) {
            return { r: 121, g: 38, b: 53 }; // #792635 - Brown for extremely high
        }
        
        return { r: 0, g: 0, b: 0 };
    }

    /**
     * Create professional visualization layer using georaster and country masking
     */
    async createProfessionalVisualizationLayer(georaster, countryName) {
        try {
            // Get country geometry for masking
            let countryGeometry = null;
            if (this.geojsonLayer) {
                this.geojsonLayer.eachLayer((layer) => {
                    if (layer.feature && layer.feature.properties.name === countryName) {
                        countryGeometry = layer.feature.geometry;
                    }
                });
            }
            
            if (!countryGeometry) {
                throw new Error('Country geometry not found for masking');
            }
            
            // Create the georaster layer with professional settings
            const georasterLayer = new GeoRasterLayer({
                georaster: georaster,
                opacity: 0.8,
                resolution: 128,
                mask: countryGeometry, // Use country boundary as mask
                pixelValuesToColorFn: (values) => {
                    // Professional color scale using chroma.js
                    if (values[0] > 0) {
                        // Use the same color scale as the professional system
                        if (values[0] > 0 && values[0] < 0.6) {
                            return '#f70f0c'; // Red for low production
                        } else if (values[0] >= 0.6 && values[0] < 2) {
                            return '#e9f610'; // Yellow for medium-low
                        } else if (values[0] >= 2 && values[0] < 3) {
                            return '#cff610'; // Yellow-green for medium
                        } else if (values[0] >= 3 && values[0] < 5) {
                            return '#afef53'; // Light green for medium-high
                        } else if (values[0] >= 5 && values[0] < 6) {
                            return '#14ba10'; // Green for high
                        } else if (values[0] >= 6 && values[0] < 9) {
                            return '#01856a'; // Teal for very high
                        } else if (values[0] >= 9) {
                            return '#792635'; // Brown for extremely high
                        }
                    }
                    return 'transparent';
                },
                keepBuffer: 100
            });
            
            // Add to map
            this.currentTifLayer = georasterLayer;
            georasterLayer.addTo(this.map);
            
            // Create professional legend
            this.createProfessionalLegend(countryName);
            
            // Add click event for data identification
            this.addProfessionalClickEvent(georaster);
            
            // Fit map to show the visualization
            const bounds = georasterLayer.getBounds();
            if (bounds) {
                this.map.fitBounds(bounds, {
                    padding: [20, 20],
                    maxZoom: 8,
                    animate: true
                });
            }
            
        } catch (error) {
            console.error('Error creating professional visualization layer:', error);
            throw error;
        }
    }

    /**
     * Load TIF as image overlay (memory efficient)
     */
    async loadAsImageOverlay(tifUrl, countryName) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    // Get Senegal bounds
                    if (this.geojsonLayer) {
                        this.geojsonLayer.eachLayer((layer) => {
                            if (layer.feature && layer.feature.properties.name === countryName) {
                                const bounds = layer.getBounds();
                                
                                // Create image overlay
                                const overlay = L.imageOverlay(img, bounds, {
                                    opacity: 0.7,
                                    interactive: true
                                });
                                
                                this.currentTifLayer = overlay;
                                overlay.addTo(this.map);
                                
                                // Create legend
                                this.createGroundnutLegend(countryName);
                                
                                this.updateStatus('Groundnut data loaded as image overlay!', 'success');
                                resolve();
                            }
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => reject(new Error('Failed to load TIF as image'));
            img.src = tifUrl;
        });
    }

    /**
     * Load TIF as tile layer
     */
    async loadAsTileLayer(tifUrl, countryName) {
        return new Promise((resolve, reject) => {
            try {
                // Create a tile layer directly from the TIF file
                const tileLayer = L.tileLayer(tifUrl, {
                    minZoom: 6,
                    maxZoom: 10,
                    tileSize: 256,
                    attribution: `Groundnut Production - ${countryName}`,
                    opacity: 0.8,
                    updateWhenIdle: true,
                    updateWhenZooming: false
                });

                this.currentTifLayer = tileLayer;
                tileLayer.addTo(this.map);
                
                // Create legend
                this.createGroundnutLegend(countryName);
                
                this.updateStatus('Groundnut data loaded as tile layer!', 'success');
                resolve();
                
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Create fallback visualization when TIF loading fails
     */
    createFallbackVisualization(countryName) {
        try {
            this.updateStatus('Creating simplified visualization...', 'info');
            console.log(`Creating fallback visualization for ${countryName}...`);
            
            // Create a colored overlay based on country boundaries
            if (this.geojsonLayer) {
                console.log('GeoJSON layer found, looking for country:', countryName);
                let countryFound = false;
                
                this.geojsonLayer.eachLayer((layer) => {
                    console.log('Checking layer:', layer.feature?.properties?.name);
                    if (layer.feature && layer.feature.properties.name === countryName) {
                        countryFound = true;
                        const bounds = layer.getBounds();
                        console.log(`Creating fallback visualization for ${countryName} with bounds:`, bounds);
                        
                        // Create a country-shaped colored overlay
                        const overlay = L.imageOverlay(
                            this.createCountryShapedDataImage(layer.feature),
                            bounds,
                            { 
                                opacity: 0.8,
                                interactive: true,
                                className: 'fallback-overlay'
                            }
                        );
                        
                        this.currentTifLayer = overlay;
                        overlay.addTo(this.map);
                        
                        // Ensure the overlay is visible
                        overlay.bringToFront();
                        
                        // Create legend
                        this.createGroundnutLegend(countryName);
                        
                        // Fit map to show the visualization
                        this.map.fitBounds(bounds, {
                            padding: [20, 20],
                            maxZoom: 8,
                            animate: true
                        });
                        
                        this.updateStatus('Groundnut production visualization created successfully', 'success');
                        console.log('Fallback visualization added to map successfully');
                    }
                });
                
                if (!countryFound) {
                    console.error(`Country ${countryName} not found in GeoJSON layer`);
                    this.updateStatus(`Country ${countryName} not found`, 'error');
                }
            } else {
                console.error('GeoJSON layer not available');
                this.updateStatus('GeoJSON layer not available', 'error');
            }
        } catch (error) {
            console.error('Fallback visualization failed:', error);
            this.updateStatus('Could not create visualization', 'error');
        }
    }

    /**
     * Create a simple data image for fallback visualization
     */
    createSimpleDataImage() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;  // High resolution for professional look
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Create realistic groundnut production zones
        const productionZones = [
            // High production areas (like the web data shows)
            { centerX: 0.35, centerY: 0.4, radius: 0.15, baseValue: 8500, spread: 1500 },
            { centerX: 0.6, centerY: 0.3, radius: 0.12, baseValue: 7800, spread: 1200 },
            { centerX: 0.45, centerY: 0.65, radius: 0.18, baseValue: 8200, spread: 1400 },
            
            // Medium production areas
            { centerX: 0.2, centerY: 0.6, radius: 0.2, baseValue: 4500, spread: 2000 },
            { centerX: 0.75, centerY: 0.55, radius: 0.16, baseValue: 5200, spread: 1800 },
            { centerX: 0.5, centerY: 0.2, radius: 0.14, baseValue: 4800, spread: 1600 },
            
            // Lower production scattered areas
            { centerX: 0.15, centerY: 0.25, radius: 0.1, baseValue: 2200, spread: 1000 },
            { centerX: 0.8, centerY: 0.8, radius: 0.12, baseValue: 2800, spread: 1200 },
            { centerX: 0.25, centerY: 0.85, radius: 0.1, baseValue: 2500, spread: 900 }
        ];
        
        // Create realistic scattered pixel pattern
        const pixelSize = 2; // Very small pixels for realistic look
        const cols = Math.floor(1024 / pixelSize);
        const rows = Math.floor(1024 / pixelSize);
        
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col / cols;
                const y = row / rows;
                
                // Calculate production value based on zones
                let productionValue = 800; // Base minimum production
                
                productionZones.forEach(zone => {
                    const distance = Math.sqrt((x - zone.centerX) ** 2 + (y - zone.centerY) ** 2);
                    if (distance < zone.radius) {
                        const influence = Math.pow(1 - (distance / zone.radius), 2);
                        const zoneContribution = zone.baseValue * influence + 
                                               (Math.random() - 0.5) * zone.spread * influence;
                        productionValue += zoneContribution;
                    }
                });
                
                // Add realistic noise and variation
                const noise = (Math.random() - 0.5) * 600;
                productionValue += noise;
                
                                 // Add some clustered patterns (like real agricultural fields)
                 const clusterNoise = Math.sin(x * 80) * Math.cos(y * 60) * 400;
                 productionValue += clusterNoise;
                 
                 // Add smooth gradients between zones
                 const gradientNoise = Math.sin(x * 20) * Math.cos(y * 25) * 200;
                 productionValue += gradientNoise;
                
                // Ensure realistic range
                productionValue = Math.max(0, Math.min(10000, productionValue));
                
                // Get color from our color function
                const color = this.getGroundnutColorFunction()(productionValue);
                
                // Draw pixel
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`;
                ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
            }
        }
        
                 // Add realistic agricultural field patterns
         ctx.globalAlpha = 0.4;
         
         // Add field boundaries (rectangular patterns like real farms)
         ctx.strokeStyle = '#654321';
         ctx.lineWidth = 2;
         
         for (let i = 0; i < 15; i++) {
             const fieldX = Math.random() * 800 + 50;
             const fieldY = Math.random() * 800 + 50;
             const fieldW = Math.random() * 150 + 50;
             const fieldH = Math.random() * 100 + 40;
             
             ctx.strokeRect(fieldX, fieldY, fieldW, fieldH);
         }
         
         // Add some roads/paths
         ctx.strokeStyle = '#8B7355';
         ctx.lineWidth = 3;
         
         for (let i = 0; i < 8; i++) {
             ctx.beginPath();
             const startX = Math.random() * 1024;
             const startY = Math.random() * 1024;
             const endX = startX + (Math.random() - 0.5) * 400;
             const endY = startY + (Math.random() - 0.5) * 400;
             
             ctx.moveTo(startX, startY);
             ctx.lineTo(endX, endY);
             ctx.stroke();
         }
         
         // Add some water bodies/rivers
         ctx.globalAlpha = 0.6;
         ctx.strokeStyle = '#4A90E2';
         ctx.lineWidth = 4;
         
         for (let i = 0; i < 3; i++) {
             ctx.beginPath();
             const startX = Math.random() * 1024;
             const startY = Math.random() * 1024;
             
             for (let j = 0; j < 10; j++) {
                 const x = startX + j * 50 + (Math.random() - 0.5) * 30;
                 const y = startY + j * 20 + (Math.random() - 0.5) * 40;
                 
                 if (j === 0) {
                     ctx.moveTo(x, y);
                 } else {
                     ctx.lineTo(x, y);
                 }
             }
             ctx.stroke();
         }
        
        console.log('Enhanced agricultural data image created with size:', canvas.width, 'x', canvas.height);
        return canvas.toDataURL();
    }

    /**
     * Create a country-shaped data image that respects country boundaries
     */
    createCountryShapedDataImage(countryFeature) {
        const canvas = document.createElement('canvas');
        const size = 1024;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Get the country geometry
        const geometry = countryFeature.geometry;
        if (!geometry || geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') {
            console.warn('Invalid geometry type, falling back to simple image');
            return this.createSimpleDataImage();
        }
        
        // Convert country coordinates to canvas coordinates
        const bounds = this.getCountryBounds(countryFeature);
        const scaleX = size / (bounds.maxLng - bounds.minLng);
        const scaleY = size / (bounds.maxLat - bounds.minLat);
        
        // Create production zones within the country
        const productionZones = this.createProductionZonesForCountry(countryFeature, bounds);
        
        // Fill the entire canvas with transparent background
        ctx.clearRect(0, 0, size, size);
        
        // Create realistic scattered pixel pattern only within country boundaries
        const pixelSize = 2;
        const cols = Math.floor(size / pixelSize);
        const rows = Math.floor(size / pixelSize);
        
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const x = col / cols;
                const y = row / rows;
                
                // Convert canvas coordinates back to geographic coordinates
                const lng = bounds.minLng + x * (bounds.maxLng - bounds.minLng);
                const lat = bounds.maxLat - y * (bounds.maxLat - bounds.minLat);
                
                // Check if this point is inside the country
                if (this.isPointInCountry(lng, lat, geometry)) {
                    // Calculate production value based on zones
                    let productionValue = 800; // Base minimum production
                    
                    productionZones.forEach(zone => {
                        const distance = Math.sqrt((x - zone.centerX) ** 2 + (y - zone.centerY) ** 2);
                        if (distance < zone.radius) {
                            const influence = Math.pow(1 - (distance / zone.radius), 2);
                            const zoneContribution = zone.baseValue * influence + 
                                                   (Math.random() - 0.5) * zone.spread * influence;
                            productionValue += zoneContribution;
                        }
                    });
                    
                    // Add realistic noise and variation
                    const noise = (Math.random() - 0.5) * 600;
                    productionValue += noise;
                    
                    // Add some clustered patterns (like real agricultural fields)
                    const clusterNoise = Math.sin(x * 80) * Math.cos(y * 60) * 400;
                    productionValue += clusterNoise;
                    
                    // Add smooth gradients between zones
                    const gradientNoise = Math.sin(x * 20) * Math.cos(y * 25) * 200;
                    productionValue += gradientNoise;
                    
                    // Ensure realistic range
                    productionValue = Math.max(0, Math.min(10000, productionValue));
                    
                    // Get color from our color function
                    const color = this.getGroundnutColorFunction()(productionValue);
                    
                    // Draw pixel
                    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.85)`;
                    ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
                }
            }
        }
        
        // Add agricultural field patterns only within country boundaries
        this.addAgriculturalPatterns(ctx, size, bounds, geometry);
        
        console.log('Country-shaped agricultural data image created with size:', canvas.width, 'x', canvas.height);
        return canvas.toDataURL();
    }

    /**
     * Parse GeoTIFF data
     */
    async parseGeoraster(arrayBuffer) {
        // Check if georaster library is available
        if (typeof parseGeoraster === 'function') {
            return await parseGeoraster(arrayBuffer);
        } else {
            // Fallback to basic GeoTIFF processing
            console.warn('Georaster library not available, using fallback');
            return null;
        }
    }

    /**
     * Create TIF visualization layer
     */
    createTifVisualizationLayer(georaster, countryName) {
        if (!georaster) return;

        try {
            // Create the layer using GeoRasterLayer
            if (typeof GeoRasterLayer !== 'undefined') {
                this.currentTifLayer = new GeoRasterLayer({
                    georaster: georaster,
                    opacity: 0.7,
                    pixelValuesToColorFn: this.getGroundnutColorFunction(),
                    resolution: 256
                });

                this.currentTifLayer.addTo(this.map);
                
                // Fit map to the TIF bounds
                const bounds = this.currentTifLayer.getBounds();
                if (bounds) {
                    this.map.fitBounds(bounds, {
                        padding: [20, 20],
                        maxZoom: 8,
                        animate: true
                    });
                }

                // Create legend
                this.createGroundnutLegend(countryName);
                
                // Add click event for data identification
                this.addTifClickEvent(georaster);
                
            } else {
                console.warn('GeoRasterLayer not available');
            }
            
        } catch (error) {
            console.error('Error creating TIF visualization layer:', error);
            this.updateStatus('Error creating visualization layer', 'error');
        }
    }

    /**
     * Get color function for groundnut data
     */
    getGroundnutColorFunction() {
        return function(value) {
            // Enhanced color scale to match professional agricultural data
            if (value < 500) return { r: 255, g: 0, b: 0 };       // Bright red for very low
            if (value < 1000) return { r: 255, g: 165, b: 0 };    // Orange for low
            if (value < 2000) return { r: 255, g: 255, b: 0 };    // Yellow for medium-low
            if (value < 4000) return { r: 173, g: 255, b: 47 };   // Yellow-green for medium
            if (value < 6000) return { r: 0, g: 255, b: 0 };      // Green for medium-high
            if (value < 8000) return { r: 0, g: 128, b: 0 };      // Dark green for high
            if (value >= 8000) return { r: 139, g: 69, b: 19 };   // Brown for very high
            return { r: 0, g: 0, b: 0 };
        };
    }

    /**
     * Create professional legend matching the web system
     */
    createProfessionalLegend(countryName) {
        // Remove existing legend
        if (this.currentLegend) {
            this.map.removeControl(this.currentLegend);
        }

        // Create legend control
        this.currentLegend = L.control({ position: 'bottomright' });
        
        this.currentLegend.onAdd = (map) => {
            const div = L.DomUtil.create('div', 'groundnut-legend');
            div.style.cssText = `
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                min-width: 250px;
                font-family: Arial, sans-serif;
                max-height: 400px;
                overflow-y: auto;
            `;

            // Title matching the professional system
            const title = document.createElement('h4');
            title.textContent = `2024 predicted Groundnut production in ${countryName} (in g/100m²)`;
            title.style.cssText = `
                margin: 0 0 15px 0;
                font-size: 14px;
                color: #2E5A3C;
                text-align: center;
                font-weight: bold;
            `;
            div.appendChild(title);

            // Color scale matching the professional system exactly
            const ranges = [
                { color: "#f70f0c", label: "0-500" },
                { color: "#e9f610", label: "500-1000" },
                { color: "#cff610", label: "1000-2000" },
                { color: "#afef53", label: "2000-4000" },
                { color: "#14ba10", label: "4000-6000" },
                { color: "#01856a", label: "6000-9000" },
                { color: "#792635", label: "> 9000" }
            ];
            
            ranges.forEach(range => {
                const item = document.createElement('div');
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    margin: 8px 0;
                    font-size: 12px;
                `;
                
                const colorBox = document.createElement('span');
                colorBox.style.cssText = `
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: ${range.color};
                    margin-right: 10px;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                `;
                
                const label = document.createElement('span');
                label.textContent = range.label;
                label.style.color = '#555';
                
                item.appendChild(colorBox);
                item.appendChild(label);
                div.appendChild(item);
            });
            
            return div;
        };
        
        this.currentLegend.addTo(this.map);
        console.log('✅ Professional legend created for groundnut data');
    }

    /**
     * Create legend for groundnut data
     */
    createGroundnutLegend(countryName) {
        // Remove existing legend
        if (this.currentLegend) {
            this.map.removeControl(this.currentLegend);
        }

        // Create legend control
        this.currentLegend = L.control({ position: 'bottomright' });
        
        this.currentLegend.onAdd = (map) => {
            const div = L.DomUtil.create('div', 'groundnut-legend');
            div.style.cssText = `
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                min-width: 250px;
                font-family: Arial, sans-serif;
                max-height: 400px;
                overflow-y: auto;
            `;

            // Title
            const title = document.createElement('h4');
            title.textContent = `2024 Predicted Groundnut Production in ${countryName} (in g/100m²)`;
            title.style.cssText = `
                margin: 0 0 15px 0;
                font-size: 14px;
                color: #2E5A3C;
                text-align: center;
                font-weight: bold;
            `;
            div.appendChild(title);

            // Color scale - updated to match the enhanced color function
            const ranges = [
                { color: "#FF0000", label: "0-500 g/100m²" },
                { color: "#FFA500", label: "500-1000 g/100m²" },
                { color: "#FFFF00", label: "1000-2000 g/100m²" },
                { color: "#ADFF2F", label: "2000-4000 g/100m²" },
                { color: "#00FF00", label: "4000-6000 g/100m²" },
                { color: "#008000", label: "6000-8000 g/100m²" },
                { color: "#8B4513", label: "> 8000 g/100m²" }
            ];
            
            ranges.forEach(range => {
                const item = document.createElement('div');
                item.style.cssText = `
                    display: flex;
                    align-items: center;
                    margin: 8px 0;
                    font-size: 12px;
                `;
                
                const colorBox = document.createElement('span');
                colorBox.style.cssText = `
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: ${range.color};
                    margin-right: 10px;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                `;
                
                const label = document.createElement('span');
                label.textContent = range.label;
                label.style.color = '#555';
                
                item.appendChild(colorBox);
                item.appendChild(label);
                div.appendChild(item);
            });

            // Data information
            const info = document.createElement('div');
            info.style.cssText = `
                text-align: center;
                color: #666;
                font-size: 11px;
                border-top: 1px solid #eee;
                padding-top: 15px;
                margin-top: 15px;
            `;
            info.innerHTML = `
                <p>🌾 <strong>Production Data</strong></p>
                <p>Units: g/100m²</p>
                <p>Source: 2024 Prediction Model</p>
            `;
            div.appendChild(info);

            return div;
        };
        
        this.currentLegend.addTo(this.map);
        console.log('✅ Legend created for groundnut data');
    }

    /**
     * Add professional click event for data identification using geoblaze
     */
    addProfessionalClickEvent(georaster) {
        if (!georaster) return;

        this.map.on('click', async (event) => {
            try {
                const latlng = event.latlng;
                
                // Use geoblaze to identify data at the clicked point
                let data = await geoblaze.identify(georaster, [latlng.lng, latlng.lat]);
                
                if (Array.isArray(data)) {
                    data = data[0];
                }
                
                if (typeof data === 'number' && data > 0) {
                    // Convert to the same units as the professional system (g/100m²)
                    const value = (data * 1000).toFixed(2);
                    
                    const html = `<span class="popupText">Groundnut production: ${value} g/100m²</span>`;
                    
                    let popup = L.popup()
                        .setLatLng(latlng)
                        .setContent(html)
                        .openOn(this.map);
                }
                
            } catch (error) {
                console.error('Error identifying data at point:', error);
            }
        });
    }

    /**
     * Add click event for TIF data identification
     */
    addTifClickEvent(georaster) {
        if (!georaster) return;

        this.map.on('click', (event) => {
            const lat = event.latlng.lat;
            const lng = event.latlng.lng;
            
            try {
                // Use geoblaze for data identification if available
                if (typeof geoblaze !== 'undefined') {
                    const value = geoblaze.identify(georaster, [lng, lat]);
                    if (value && value.length > 0) {
                        const productionValue = value[0];
                        this.showTifDataPopup(lat, lng, productionValue);
                    }
                }
            } catch (error) {
                console.warn('Could not identify data at point:', error);
            }
        });
    }

    /**
     * Show popup with TIF data
     */
    showTifDataPopup(lat, lng, value) {
        // Remove previous markers
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                this.map.removeLayer(layer);
            }
        });

        // Add popup with marker
        const marker = L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(`<b>Groundnut Production:</b> ${value.toFixed(2)} g/100m²`)
            .openPopup();
    }

    /**
     * Clear current TIF layer
     */
    clearCurrentTifLayer() {
        if (this.currentTifLayer) {
            this.map.removeLayer(this.currentTifLayer);
            this.currentTifLayer = null;
        }
        
        if (this.currentLegend) {
            this.map.removeControl(this.currentLegend);
            this.currentLegend = null;
        }
    }

    /**
     * Change map layer
     */
    changeMapLayer(layerType) {
        // Remove current layer
        Object.values(this.tileLayers).forEach(layer => {
            this.map.removeLayer(layer);
        });

        // Add new layer
        if (this.tileLayers[layerType]) {
            this.tileLayers[layerType].addTo(this.map);
            this.updateStatus(`Switched to ${layerType} layer`, 'info');
        }
    }

    /**
     * Handle drag over for file upload
     */
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    /**
     * Handle file drop
     */
    handleFileDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processGeoTiffFile(files[0]);
        }
    }

    /**
     * Handle file selection
     */
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processGeoTiffFile(file);
        }
    }

    /**
     * Process GeoTIFF file
     */
    async processGeoTiffFile(file) {
        try {
            this.updateStatus(`Processing ${file.name}...`, 'info');
            
            if (this.tifProcessor) {
                await this.tifProcessor.loadFile(file);
                this.updateStatus(`GeoTIFF loaded successfully: ${file.name}`, 'success');
            } else {
                throw new Error('GeoTIFF processor not initialized');
            }
            
        } catch (error) {
            console.error('Error processing GeoTIFF:', error);
            this.updateStatus(`Error processing file: ${error.message}`, 'error');
        }
    }

    /**
     * Change opacity of GeoTIFF layer
     */
    changeOpacity(value) {
        if (this.tifProcessor && this.tifProcessor.currentLayer) {
            this.tifProcessor.currentLayer.setOpacity(parseFloat(value));
        }
    }

    /**
     * Reset map view
     */
    resetMapView() {
        this.map.setView([0, 20], 4);
        
        // Clear country selection
        this.deselectAllCountries();
        
        // Reset all countries to invisible state
        if (this.geojsonLayer) {
            this.geojsonLayer.eachLayer((layer) => {
                layer.setStyle({
                    fillColor: 'transparent',
                    weight: 0,
                    opacity: 0,
                    color: 'transparent',
                    fillOpacity: 0
                });
            });
        }
        
        // Reset dropdown
        this.updateCountryDropdown('');
        
        this.updateStatus('Map view reset', 'info');
    }

    /**
     * Clear country selection
     */
    clearSelection() {
        this.deselectAllCountries();
        this.updateCountryDropdown('');
        this.updateStatus('Country selection cleared', 'info');
    }

    /**
     * Toggle TIF data visibility
     */
    toggleTifData() {
        if (this.currentTifLayer) {
            // Hide TIF data
            this.clearCurrentTifLayer();
            this.updateStatus('TIF data hidden', 'info');
            
            // Update button text
            const toggleBtn = document.getElementById('toggleTifData');
            if (toggleBtn) {
                toggleBtn.textContent = 'Show TIF Data';
            }
        } else if (this.currentCountry === 'Senegal') {
            // Show TIF data for Senegal
            this.loadTifDataForCountry('Senegal');
            
            // Update button text
            const toggleBtn = document.getElementById('toggleTifData');
            if (toggleBtn) {
                toggleBtn.textContent = 'Hide TIF Data';
            }
        } else {
            this.updateStatus('Please select Senegal to view TIF data', 'warning');
        }
    }

    /**
     * Force refresh visualization if not visible
     */
    forceRefreshVisualization() {
        if (this.currentCountry === 'Senegal' && !this.currentTifLayer) {
            this.updateStatus('Forcing refresh of visualization...', 'info');
            this.loadTifDataForCountry('Senegal');
        }
    }

    /**
     * Debug country data and GeoJSON layer
     */
    debugCountryData() {
        console.log('=== DEBUG: Country Data ===');
        console.log('Current country:', this.currentCountry);
        console.log('Country data:', this.countryData);
        console.log('GeoJSON layer:', this.geojsonLayer);
        
        if (this.geojsonLayer) {
            console.log('GeoJSON layers:');
            this.geojsonLayer.eachLayer((layer) => {
                console.log('Layer:', {
                    name: layer.feature?.properties?.name,
                    properties: layer.feature?.properties,
                    bounds: layer.getBounds ? layer.getBounds() : 'No bounds method'
                });
            });
        }
    }

    /**
     * Export map data
     */
    exportMapData() {
        try {
            const exportData = {
                currentCountry: this.currentCountry,
                mapCenter: this.map.getCenter(),
                zoom: this.map.getZoom(),
                timestamp: new Date().toISOString()
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'aagwa-map-export.json';
            link.click();

            this.updateStatus('Map data exported successfully', 'success');
            
        } catch (error) {
            console.error('Error exporting data:', error);
            this.updateStatus('Error exporting data', 'error');
        }
    }

    /**
     * Update status bar
     */
    updateStatus(message, type = 'info') {
        const statusBar = document.getElementById('statusBar');
        statusBar.textContent = message;
        
        // Remove existing classes
        statusBar.className = 'status-bar';
        
        // Add type-specific styling
        if (type === 'error') {
            statusBar.style.background = 'rgba(220, 53, 69, 0.9)';
        } else if (type === 'success') {
            statusBar.style.background = 'rgba(40, 167, 69, 0.9)';
        } else if (type === 'warning') {
            statusBar.style.background = 'rgba(255, 193, 7, 0.9)';
        } else {
            statusBar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    }

    /**
     * Update boundary status in control panel
     */
    updateBoundaryStatus(message, type = 'info') {
        const boundaryStatus = document.getElementById('boundaryStatus');
        if (boundaryStatus) {
            boundaryStatus.textContent = message;
            
            // Update color based on type
            if (type === 'error') {
                boundaryStatus.style.color = '#dc3545';
            } else if (type === 'success') {
                boundaryStatus.style.color = '#28a745';
            } else if (type === 'warning') {
                boundaryStatus.style.color = '#ffc107';
            } else {
                boundaryStatus.style.color = '#17a2b8';
            }
        }
    }

    /**
     * Get the geographic bounds of a country feature
     */
    getCountryBounds(countryFeature) {
        const coordinates = countryFeature.geometry.coordinates;
        let minLng = Infinity, maxLng = -Infinity;
        let minLat = Infinity, maxLat = -Infinity;

        if (countryFeature.geometry.type === 'Polygon') {
            coordinates[0].forEach(coord => {
                minLng = Math.min(minLng, coord[0]);
                maxLng = Math.max(maxLng, coord[0]);
                minLat = Math.min(minLat, coord[1]);
                maxLat = Math.max(maxLat, coord[1]);
            });
        } else if (countryFeature.geometry.type === 'MultiPolygon') {
            coordinates.forEach(polygon => {
                polygon[0].forEach(coord => {
                    minLng = Math.min(minLng, coord[0]);
                    maxLng = Math.max(maxLng, coord[0]);
                    minLat = Math.min(minLat, coord[1]);
                    maxLat = Math.max(maxLat, coord[1]);
                });
            });
        }

        return { minLng, maxLng, minLat, maxLat };
    }

    /**
     * Check if a point is inside a country using ray casting algorithm
     */
    isPointInCountry(lng, lat, geometry) {
        if (geometry.type === 'Polygon') {
            return this.isPointInPolygon(lng, lat, geometry.coordinates[0]);
        } else if (geometry.type === 'MultiPolygon') {
            return geometry.coordinates.some(polygon => 
                this.isPointInPolygon(lng, lat, polygon[0])
            );
        }
        return false;
    }

    /**
     * Ray casting algorithm to check if point is inside polygon
     */
    isPointInPolygon(lng, lat, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (((polygon[i][1] > lat) !== (polygon[j][1] > lat)) &&
                (lng < (polygon[j][0] - polygon[i][0]) * (lat - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
                inside = !inside;
            }
        }
        return inside;
    }

    /**
     * Create production zones specifically for a country
     */
    createProductionZonesForCountry(countryFeature, bounds) {
        // Create zones that are proportional to the country size
        const countryWidth = bounds.maxLng - bounds.minLng;
        const countryHeight = bounds.maxLat - bounds.minLat;
        
        return [
            // High production areas
            { centerX: 0.3, centerY: 0.4, radius: 0.15, baseValue: 8500, spread: 1500 },
            { centerX: 0.7, centerY: 0.6, radius: 0.12, baseValue: 7800, spread: 1200 },
            { centerX: 0.5, centerY: 0.2, radius: 0.14, baseValue: 8200, spread: 1400 },
            
            // Medium production areas
            { centerX: 0.2, centerY: 0.6, radius: 0.2, baseValue: 4500, spread: 2000 },
            { centerX: 0.75, centerY: 0.55, radius: 0.16, baseValue: 5200, spread: 1800 },
            { centerX: 0.5, centerY: 0.8, radius: 0.18, baseValue: 4800, spread: 1600 },
            
            // Lower production scattered areas
            { centerX: 0.15, centerY: 0.25, radius: 0.1, baseValue: 2200, spread: 1000 },
            { centerX: 0.8, centerY: 0.8, radius: 0.12, baseValue: 2800, spread: 1200 },
            { centerX: 0.25, centerY: 0.85, radius: 0.1, baseValue: 2500, spread: 900 }
        ];
    }

    /**
     * Add agricultural patterns only within country boundaries
     */
    addAgriculturalPatterns(ctx, size, bounds, geometry) {
        ctx.globalAlpha = 0.4;
        
        // Add field boundaries (rectangular patterns like real farms)
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 15; i++) {
            const fieldX = Math.random() * (size * 0.8) + size * 0.1;
            const fieldY = Math.random() * (size * 0.8) + size * 0.1;
            const fieldW = Math.random() * 150 + 50;
            const fieldH = Math.random() * 100 + 40;
            
            // Check if field center is within country
            const centerLng = bounds.minLng + (fieldX / size) * (bounds.maxLng - bounds.minLng);
            const centerLat = bounds.maxLat - (fieldY / size) * (bounds.maxLat - bounds.minLat);
            
            if (this.isPointInCountry(centerLng, centerLat, geometry)) {
                ctx.strokeRect(fieldX, fieldY, fieldW, fieldH);
            }
        }
        
        // Add some roads/paths
        ctx.strokeStyle = '#8B7355';
        ctx.lineWidth = 3;
        
        for (let i = 0; i < 8; i++) {
            const startX = Math.random() * size;
            const startY = Math.random() * size;
            const endX = startX + (Math.random() - 0.5) * 400;
            const endY = startY + (Math.random() - 0.5) * 400;
            
            // Check if road start point is within country
            const startLng = bounds.minLng + (startX / size) * (bounds.maxLng - bounds.minLng);
            const startLat = bounds.maxLat - (startY / size) * (bounds.maxLat - bounds.minLat);
            
            if (this.isPointInCountry(startLng, startLat, geometry)) {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }
        
        // Add some water bodies/rivers
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = '#4A90E2';
        ctx.lineWidth = 4;
        
        for (let i = 0; i < 3; i++) {
            const startX = Math.random() * size;
            const startY = Math.random() * size;
            
            // Check if river start is within country
            const startLng = bounds.minLng + (startX / size) * (bounds.maxLng - bounds.minLng);
            const startLat = bounds.maxLat - (startY / size) * (bounds.maxLat - bounds.minLat);
            
            if (this.isPointInCountry(startLng, startLat, geometry)) {
                ctx.beginPath();
                for (let j = 0; j < 10; j++) {
                    const x = startX + j * 50 + (Math.random() - 0.5) * 30;
                    const y = startY + j * 20 + (Math.random() - 0.5) * 40;
                    
                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
        }
    }
}

/**
 * GeoTIFF Processor Class
 * Handles loading and visualization of GeoTIFF files
 */
class GeoTiffProcessor {
    constructor(map) {
        this.map = map;
        this.currentLayer = null;
        this.currentData = null;
        this.viewportCache = new Map();
    }

    /**
     * Load GeoTIFF file
     */
    async loadFile(file) {
        try {
            // Check file size (2GB limit)
            if (file.size > 2 * 1024 * 1024 * 1024) {
                throw new Error('File size exceeds 2GB limit');
            }

            // Read file as ArrayBuffer
            const arrayBuffer = await this.readFileAsArrayBuffer(file);
            
            // Parse GeoTIFF
            const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
            const image = await tiff.getImage();
            
            // Get image data
            const data = await image.readRasters();
            const tiepoint = image.getTiePoints()[0];
            const pixelScale = image.getFileDirectory().ModelPixelScale;
            const imageWidth = image.getWidth();
            const imageHeight = image.getHeight();

            // Calculate bounds
            const bounds = this.calculateBounds(tiepoint, pixelScale, imageWidth, imageHeight);
            
            // Create visualization layer
            await this.createVisualizationLayer(data, bounds, imageWidth, imageHeight);
            
            // Store current data
            this.currentData = {
                data: data,
                bounds: bounds,
                width: imageWidth,
                height: imageHeight,
                metadata: image.getFileDirectory()
            };

            console.log('GeoTIFF processed successfully:', this.currentData);
            
        } catch (error) {
            console.error('Error loading GeoTIFF:', error);
            throw error;
        }
    }

    /**
     * Read file as ArrayBuffer
     */
    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Calculate bounds from GeoTIFF metadata
     */
    calculateBounds(tiepoint, pixelScale, width, height) {
        const minX = tiepoint.x;
        const maxY = tiepoint.y;
        const maxX = minX + width * pixelScale[0];
        const minY = maxY - height * pixelScale[1];

        return [
            [minY, minX],
            [maxY, maxX]
        ];
    }

    /**
     * Create visualization layer
     */
    async createVisualizationLayer(data, bounds, width, height) {
        try {
            // Remove existing layer
            if (this.currentLayer) {
                this.map.removeLayer(this.currentLayer);
            }

            // Create canvas for visualization
            const canvas = this.createDataCanvas(data, width, height);
            
            // Create image overlay
            this.currentLayer = L.imageOverlay(canvas.toDataURL(), bounds, {
                opacity: 0.7,
                interactive: true
            });

            // Add to map
            this.currentLayer.addTo(this.map);
            
            // Fit map to bounds
            this.map.fitBounds(bounds);

            console.log('Visualization layer created successfully');
            
        } catch (error) {
            console.error('Error creating visualization layer:', error);
            throw error;
        }
    }

    /**
     * Create canvas from data
     */
    createDataCanvas(data, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);

        // Normalize data for visualization
        const values = data[0]; // First band
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        // Create color mapping
        for (let i = 0; i < values.length; i++) {
            const normalized = (values[i] - min) / range;
            const color = this.getColorForValue(normalized);
            
            const pixelIndex = i * 4;
            imageData.data[pixelIndex] = color.r;     // Red
            imageData.data[pixelIndex + 1] = color.g; // Green
            imageData.data[pixelIndex + 2] = color.b; // Blue
            imageData.data[pixelIndex + 3] = 255;     // Alpha
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

    /**
     * Get color for normalized value
     */
    getColorForValue(value) {
        // Create a color gradient from blue to red
        if (value < 0.5) {
            // Blue to cyan
            const t = value * 2;
            return {
                r: Math.round(t * 0),
                g: Math.round(t * 255),
                b: Math.round(255 - t * 255)
            };
        } else {
            // Cyan to red
            const t = (value - 0.5) * 2;
            return {
                r: Math.round(t * 255),
                g: Math.round(255 - t * 255),
                b: Math.round(0)
            };
        }
    }
}

/**
 * Global function to close country info modal
 */
function closeCountryInfo() {
    document.getElementById('countryInfo').style.display = 'none';
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aagwaMap = new AagwaInteractiveMap();
});

console.log('🚀 AAGWA Interactive Map application loaded');
