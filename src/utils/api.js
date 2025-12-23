/**
 * API utilities for fetching NDVI data from backend
 */

// Debug: Log API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('[API] Base URL:', API_BASE_URL);
console.log('[API] Env vars:', import.meta.env.VITE_API_URL);

/**
 * Fetch NDVI data for a specific year
 * @param {number} year - Year to fetch data for (2015-2025)
 * @returns {Promise<Object>} NDVI statistics and metadata
 */
export const fetchNDVIData = async (year) => {
  const url = `${API_BASE_URL}/api/ndvi?year=${year}&district=Thanjavur`;
  console.log('[API] Fetching:', url);
  
  try {
    const response = await fetch(url);
    console.log('[API] Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('[API] Response data:', data);
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch NDVI data');
    }
    
    return {
      mean: data.mean,
      min: data.min,
      max: data.max,
      distribution: data.distribution,
      sensor: data.sensor,
      resolution: data.resolution,
      year: data.year,
      image: data.image  // Add image data
    };
  } catch (error) {
    console.error('[API] Error fetching NDVI data:', error);
    // Return mock data for fallback
    return generateMockData(year);
  }
};

/**
 * Fetch NDVI data for multiple years (batch query)
 * @param {number[]} years - Array of years
 * @returns {Promise<Object[]>} Array of NDVI statistics
 */
export const fetchNDVIBatch = async (years) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ndvi/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        years,
        district: 'Thanjavur'
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching batch NDVI data:', error);
    return years.map(year => generateMockData(year));
  }
};

/**
 * Check API health status
 * @returns {Promise<boolean>} True if API is healthy
 */
export const checkAPIHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
};

/**
 * Get API information
 * @returns {Promise<Object>} API metadata and endpoints
 */
export const getAPIInfo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/info`);
    if (!response.ok) throw new Error('Failed to fetch API info');
    return await response.json();
  } catch (error) {
    console.error('Error fetching API info:', error);
    return null;
  }
};

/**
 * Generate mock NDVI data for testing/fallback
 * @param {number} year - Year to generate data for
 * @returns {Object} Mock NDVI statistics
 */
export const generateMockData = (year) => {
  // More realistic mock data based on year
  const baseNDVI = 0.35;
  const yearVariation = {
    2015: -0.05, // Waterlogging impact
    2020: -0.08, // COVID disruption
    2024: 0.02   // Improved practices
  };
  
  const variation = yearVariation[year] || (Math.random() - 0.5) * 0.1;
  const meanNDVI = Math.max(0.15, Math.min(0.55, baseNDVI + variation));
  
  return {
    mean: parseFloat(meanNDVI.toFixed(3)),
    min: parseFloat((meanNDVI - 0.20).toFixed(3)),
    max: parseFloat((meanNDVI + 0.35).toFixed(3)),
    distribution: {
      low: Math.floor(Math.random() * 25),
      moderate: Math.floor(Math.random() * 40) + 30,
      high: Math.floor(Math.random() * 35) + 20
    },
    sensor: year < 2017 ? 'Landsat 8' : 'Sentinel-2',
    resolution: year < 2017 ? '30m' : '10m',
    year
  };
};

export default {
  fetchNDVIData,
  fetchNDVIBatch,
  checkAPIHealth,
  getAPIInfo,
  generateMockData
};
