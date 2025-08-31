/**
 * Sample Data for AAGWA Interactive Map Testing
 * This file contains mock data for testing the GeoTIFF visualization system
 */

// Sample country boundaries (simplified for testing)
const sampleCountryBoundaries = {
    Benin: {
        type: "Feature",
        properties: {
            name: "Benin",
            population: "12.5M",
            area: "114,763 km²",
            capital: "Porto-Novo",
            code: "BEN"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [1.0, 6.0],
                [1.0, 12.0],
                [4.0, 12.0],
                [4.0, 6.0],
                [1.0, 6.0]
            ]]
        }
    },
    Senegal: {
        type: "Feature",
        properties: {
            name: "Senegal",
            population: "17.2M",
            area: "196,722 km²",
            capital: "Dakar",
            code: "SEN"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [-17.0, 12.0],
                [-17.0, 16.0],
                [-11.0, 16.0],
                [-11.0, 12.0],
                [-17.0, 12.0]
            ]]
        }
    },
    Ghana: {
        type: "Feature",
        properties: {
            name: "Ghana",
            population: "32.8M",
            area: "238,535 km²",
            capital: "Accra",
            code: "GHA"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [-3.0, 4.0],
                [-3.0, 11.0],
                [1.0, 11.0],
                [1.0, 4.0],
                [-3.0, 4.0]
            ]]
        }
    },
    Malawi: {
        type: "Feature",
        properties: {
            name: "Malawi",
            population: "19.1M",
            area: "118,484 km²",
            capital: "Lilongwe",
            code: "MWI"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [32.0, -17.0],
                [32.0, -9.0],
                [36.0, -9.0],
                [36.0, -17.0],
                [32.0, -17.0]
            ]]
        }
    },
    Uganda: {
        type: "Feature",
        properties: {
            name: "Uganda",
            population: "47.1M",
            area: "241,550 km²",
            capital: "Kampala",
            code: "UGA"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
                [29.0, -1.0],
                [29.0, 4.0],
                [35.0, 4.0],
                [35.0, -1.0],
                [29.0, -1.0]
            ]]
        }
    }
};

// Sample GeoTIFF metadata
const sampleGeoTiffMetadata = {
    width: 256,
    height: 256,
    bands: 1,
    dataType: "Float32",
    noDataValue: -9999,
    projection: "EPSG:4326",
    geotransform: [1.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    tiepoints: [{ x: 0, y: 0, z: 0, i: 0, j: 0, k: 0 }],
    pixelScale: [0.01, 0.01, 0.0]
};

// Sample raster data (simplified for testing)
const generateSampleRasterData = (width = 256, height = 256) => {
    const data = new Float32Array(width * height);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            
            // Create a simple pattern for testing
            const normalizedX = x / width;
            const normalizedY = y / height;
            
            // Generate some interesting patterns
            const value = Math.sin(normalizedX * Math.PI * 4) * 
                         Math.cos(normalizedY * Math.PI * 4) * 0.5 + 0.5;
            
            data[index] = value;
        }
    }
    
    return data;
};

// Sample agricultural data
const sampleAgriculturalData = {
    cropTypes: ["Maize", "Rice", "Cassava", "Yam", "Sorghum"],
    seasons: ["Rainy", "Dry"],
    years: [2020, 2021, 2022, 2023, 2024],
    
    // Sample crop yield data
    cropYields: {
        "Benin": {
            "Maize": { "2023": 1250000, "2024": 1320000 },
            "Rice": { "2023": 890000, "2024": 920000 },
            "Cassava": { "2023": 2100000, "2024": 2250000 }
        },
        "Senegal": {
            "Rice": { "2023": 1450000, "2024": 1580000 },
            "Millet": { "2023": 980000, "2024": 1050000 },
            "Sorghum": { "2023": 750000, "2024": 820000 }
        },
        "Ghana": {
            "Maize": { "2023": 3200000, "2024": 3400000 },
            "Cassava": { "2023": 18000000, "2024": 19200000 },
            "Yam": { "2023": 8500000, "2024": 9200000 }
        }
    },
    
    // Sample weather data
    weatherData: {
        "Benin": {
            "temperature": { "min": 22, "max": 35, "avg": 28.5 },
            "rainfall": { "annual": 1200, "seasonal": { "rainy": 900, "dry": 300 } },
            "humidity": { "min": 45, "max": 95, "avg": 75 }
        },
        "Senegal": {
            "temperature": { "min": 18, "max": 38, "avg": 28 },
            "rainfall": { "annual": 800, "seasonal": { "rainy": 600, "dry": 200 } },
            "humidity": { "min": 35, "max": 90, "avg": 65 }
        }
    }
};

// Sample soil data
const sampleSoilData = {
    "Benin": {
        "soilTypes": ["Ferric Luvisols", "Eutric Regosols", "Dystric Cambisols"],
        "pH": { "min": 5.5, "max": 7.2, "avg": 6.3 },
        "organicMatter": { "min": 0.8, "max": 2.5, "avg": 1.6 },
        "nitrogen": { "min": 0.05, "max": 0.15, "avg": 0.09 }
    },
    "Senegal": {
        "soilTypes": ["Ferric Luvisols", "Eutric Arenosols", "Dystric Cambisols"],
        "pH": { "min": 5.8, "max": 7.8, "avg": 6.8 },
        "organicMatter": { "min": 0.5, "max": 1.8, "avg": 1.1 },
        "nitrogen": { "min": 0.03, "max": 0.12, "avg": 0.07 }
    }
};

// Utility functions for data generation
const DataGenerator = {
    // Generate random GeoTIFF data
    generateRandomGeoTiff: (width = 256, height = 256, bands = 1) => {
        const data = [];
        
        for (let band = 0; band < bands; band++) {
            const bandData = new Float32Array(width * height);
            
            for (let i = 0; i < bandData.length; i++) {
                // Generate realistic agricultural data
                const baseValue = Math.random() * 0.3 + 0.1; // Base vegetation
                const noise = (Math.random() - 0.5) * 0.1;   // Random noise
                const pattern = Math.sin(i * 0.1) * Math.cos(i * 0.05) * 0.05; // Pattern
                
                bandData[i] = Math.max(0, Math.min(1, baseValue + noise + pattern));
            }
            
            data.push(bandData);
        }
        
        return data;
    },
    
    // Generate time series data
    generateTimeSeries: (points = 100, startDate = new Date('2020-01-01')) => {
        const data = [];
        const baseValue = 0.5;
        const trend = 0.001; // Slight upward trend
        const seasonality = 0.1; // Seasonal variation
        
        for (let i = 0; i < points; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            
            const seasonal = Math.sin((i / 365) * 2 * Math.PI) * seasonality;
            const trendComponent = i * trend;
            const noise = (Math.random() - 0.5) * 0.05;
            
            const value = baseValue + seasonal + trendComponent + noise;
            
            data.push({
                date: date.toISOString().split('T')[0],
                value: Math.max(0, Math.min(1, value))
            });
        }
        
        return data;
    },
    
    // Generate crop suitability data
    generateCropSuitability: (cropType, country) => {
        const baseSuitability = {
            "Maize": 0.7,
            "Rice": 0.6,
            "Cassava": 0.8,
            "Yam": 0.75,
            "Sorghum": 0.65
        };
        
        const countryFactors = {
            "Benin": 1.0,
            "Senegal": 0.9,
            "Ghana": 1.1,
            "Malawi": 0.95,
            "Uganda": 1.05
        };
        
        const base = baseSuitability[cropType] || 0.5;
        const countryFactor = countryFactors[country] || 1.0;
        
        // Add some spatial variation
        const spatialVariation = (Math.random() - 0.5) * 0.2;
        
        return Math.max(0, Math.min(1, base * countryFactor + spatialVariation));
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleCountryBoundaries,
        sampleGeoTiffMetadata,
        generateSampleRasterData,
        sampleAgriculturalData,
        sampleSoilData,
        DataGenerator
    };
} else {
    // Browser environment
    window.SampleData = {
        sampleCountryBoundaries,
        sampleGeoTiffMetadata,
        generateSampleRasterData,
        sampleAgriculturalData,
        sampleSoilData,
        DataGenerator
    };
}

console.log('📊 Sample data loaded for AAGWA Interactive Map testing');
