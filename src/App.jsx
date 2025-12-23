import { useState } from 'react';
import './App.css';

const DISTRICTS = [
  'Thanjavur',
  'Ariyalur',
  'Cuddalore',
  'Nagapattinam',
  'Perambalur',
  'Tiruchirapalli',
  'Pudhukottai'
];

const NDVI_DATA = {
  
  'Thanjavur': {
    2010: {
      mean: 0.380,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Annual agricultural patterns with seasonal variations.',
      status: 'moderate'
    },
    2015: {
      mean: 0.535,
      interpretation: 'High vegetation due to prolonged greenness.',
      context: 'Despite high NDVI, extreme rainfall caused waterlogging and crop losses.',
      status: 'warning'
    },
    2020: {
      mean: 0.30,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Cropping patterns were affected by irrigation delays and pandemic-related disruptions.',
      status: 'moderate'
    },
    2025: {
      mean: 0.343,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agriculture faced climate variability, unseasonal rainfall, and localized crop damage.',
      status: 'moderate'
    }
  },
  'Ariyalur': {
    2010: {
      mean: 0.433,
      interpretation: 'Moderate-high vegetation with seasonal variations.',
      context: 'Agricultural landscape with mixed cropping patterns.',
      status: 'good'
    },
    2015: {
      mean:0.489,
      interpretation: 'High vegetation with strong agricultural presence.',
      context: 'Good vegetation coverage indicating healthy agricultural conditions.',
      status: 'good'
    },
    2020: {
      mean: 0.414,
      interpretation: 'Moderate-high vegetation with seasonal variations.',
      context: 'Agricultural landscape with mixed cropping patterns.',
      status: 'good'
    },
    2025:{
      mean: 0.323,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    }
  },
  'Cuddalore': {
    2010: {
      mean: 0.438,
      interpretation: 'High-moderate vegetation with healthy agricultural coverage.',
      context: 'Strong vegetation presence with good agricultural conditions.',
      status: 'good'
    },
    2015: {
      mean: 0.504,
      interpretation: 'High vegetation with strong agricultural presence.',
      context: 'Good vegetation coverage indicating healthy agricultural conditions.',
      status: 'good'
    },
    2020: {
      mean: 0.399,
      interpretation: 'Moderate-high vegetation with healthy agricultural presence.',
      context: 'Good agricultural conditions with stable vegetation coverage during the year.',
      status: 'good'
    },
    2025: {
      mean: 0.311,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    }
  },
  'Nagapattinam': {
    2010: {
      mean: 0.451,
      interpretation: 'High-moderate vegetation with healthy agricultural coverage.',
      context: 'Strong vegetation presence with good agricultural conditions.',
      status: 'good'
    },
    2015:{
      mean:0.482,
      interpretation: 'High vegetation with strong agricultural presence.',
      context: 'Good vegetation coverage indicating healthy agricultural conditions.',
      status: 'good'
    },
    2020:{
      mean: 0.396,
      interpretation: 'Moderate-high vegetation with healthy agricultural presence.',
      context: 'Good agricultural conditions with stable vegetation coverage during the year.',
      status: 'good'
    },
    2025:{
      mean: 0.310,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    }
  },
  'Perambalur': {
    2010: {
      mean: 0.391,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },
    2020:{
      mean: 0.373,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },
    2025:{
      mean: 0.275,
      interpretation: 'Low vegetation coverage indicating sparse agricultural activity.',
      context: 'Dry conditions leading to reduced vegetation and agricultural stress.',
      status: 'low'
    }
  },
  'Tiruchirappalli': {
    2010: {
      mean: 0.389,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },

    2020:{
      mean: 0.376,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },
    2025:{
      mean: 0.287,
      interpretation: 'Low vegetation coverage indicating sparse agricultural activity.',
      context: 'Dry conditions leading to reduced vegetation and agricultural stress.',
      status: 'low'
    }
  },
  'Pudhukkottai': {
    2010:{
      mean :0.405,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },
    2020:{
      meam: 0.379,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Agricultural landscape with seasonal variations and moderate vegetation coverage.',
      status: 'moderate'
    },
    2025:{
      mean: 0.287,
      interpretation: 'Low vegetation coverage indicating sparse agricultural activity.',
      context: 'Dry conditions leading to reduced vegetation and agricultural stress.',
      status: 'low'
    }
  }
    };


const MAP_URLS = {
  'Thanjavur': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/thanjavur2010',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/thanjavur2025',
    2015: 'https://valued-module-445514-k1.projects.earthengine.app/view/thanjavur2015',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/thanjavur2020'
  },
  'Ariyalur': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/ariyalur2010',
    2015: 'https://valued-module-445514-k1.projects.earthengine.app/view/ariyalur2015',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/ariyalur2020',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/ariyalur2025'
  },
  'Cuddalore': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/cuddalore2010',
    2015: 'https://valued-module-445514-k1.projects.earthengine.app/view/cuddalore2015',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/cuddalore2020',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/cuddalore2025'
  },
  'Nagapattinam': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/nagapattinam2010',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/nagapattinam2020',
    2015: 'https://valued-module-445514-k1.projects.earthengine.app/view/nagapattinam2015',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/nagapattinam2025'
  },
  'Perambalur': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/perambalur2010',
    2015: 'https://valued-module-445514-k1.projects.earthengine.app/view/perambalur2015',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/perambalur2020',
    
    2025: 'https://mssrf-481604.projects.earthengine.app/view/perambalur2025'
  },
  'Tiruchirapalli': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/tiruchirapalli2010',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/tiruchirappalli2020',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/tiruchirappalli2025'
  },
  'Pudhukottai': {
    2010: 'https://valued-module-445514-k1.projects.earthengine.app/view/pudhukottai2010',
    2020: 'https://mssrf-481604.projects.earthengine.app/view/pudhukkottai2020',
    2025: 'https://mssrf-481604.projects.earthengine.app/view/pudhukkottai2025'
  }
};

function App() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedDistrict, setSelectedDistrict] = useState('Thanjavur');
  
  const getCurrentNDVIData = () => {
    const districtData = NDVI_DATA[selectedDistrict];
    if (districtData && districtData[selectedYear]) {
      return districtData[selectedYear];
    }
    return {
      mean: 0.38,
      interpretation: 'Moderate vegetation dominated by seasonal agriculture.',
      context: 'Annual agricultural patterns with seasonal variations.',
      status: 'moderate'
    };
  };

  const getNDVICategory = (ndvi) => {
    if (ndvi > 0.45) return 'Permanent Vegetation';
    if (ndvi >= 0.30) return 'Seasonal Vegetation';
    return 'No Vegetation';
  };

  const getStatusColor = (ndvi) => {
    if (ndvi > 0.45) return '#10b981';
    if (ndvi >= 0.30) return '#f59e0b';
    return '#ef4444';
  };

  const getSatellite = () => {
    if (selectedYear >= 2020) return { name: 'Sentinel-2', resolution: '10m' };
    if (selectedYear === 2015) return { name: 'Landsat-8', resolution: '30m' };
    return { name: 'Landsat-5', resolution: '30m' };
  };

  const getMapUrl = () => {
    if (MAP_URLS[selectedDistrict] && MAP_URLS[selectedDistrict][selectedYear]) {
      return MAP_URLS[selectedDistrict][selectedYear];
    }
    return 'about:blank';
  };

  const ndviData = getCurrentNDVIData();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🌱 NDVI Analysis - {selectedDistrict} District</h1>
          <p className="subtitle">Normalized Difference Vegetation Index Monitoring</p>
        </div>
      </header>

      <main className="app-main">
        <div className="instruction-banner">
          <h3>📍 Map Layers Guide:</h3>
          <ul className="instruction-list">
            <li><strong>Median NDVI</strong> – Select this layer to visualize the median vegetation condition of the district.</li>
            <li><strong>Vegetation Classification</strong> – Enable this layer to view different vegetation and land cover classes.</li>
            <li><strong>Boundary</strong> – Turn on this layer to display the district boundary on the map.</li>
          </ul>
        </div>
        <div className="layout-container">
          <div className="left-panel">
            <div className="controls-section">
              <div className="selector-wrapper">
                <div className="selector-item">
                  <label htmlFor="year-select" className="label">
                    📅 Select Year:
                  </label>
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="selector-input"
                  >
                    <option value={2010}>2010</option>
                    <option value={2015}>2015</option>
                    <option value={2020}>2020</option>
                    <option value={2025}>2025</option>
                  </select>
                </div>
                <div className="selector-item">
                  <label htmlFor="district-select" className="label">
                    📍 Select District:
                  </label>
                  <select
                    id="district-select"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="selector-input"
                  >
                    {DISTRICTS.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="satellite-info-card">
              <h3 className="satellite-title">📡 Active Satellite</h3>
              <div className="sat-single">
                <div className="sat-main">
                  <span className="sat-emoji">🛰️</span>
                  <div>
                    <h4>{getSatellite().name}</h4>
                    <p>{getSatellite().resolution} Resolution</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <div className="stats-grid">
                <div className="stat-card ndvi-card">
                  <div className="stat-label">Mean NDVI</div>
                  <div className="stat-value" style={{ color: getStatusColor(ndviData.mean) }}>
                    {ndviData.mean.toFixed(3)}
                  </div>
                  <div className="stat-category">{getNDVICategory(ndviData.mean)}</div>
                </div>

                <div className="stat-card year-card">
                  <div className="stat-label">Analysis Year</div>
                  <div className="stat-value">{selectedYear}</div>
                  <div className="stat-category">Agricultural Season</div>
                </div>

                <div className="stat-card location-card">
                  <div className="stat-label">District</div>
                  <div className="stat-value">{selectedDistrict}</div>
                  <div className="stat-category">Tamil Nadu, India</div>
                </div>
              </div>

              <div className="interpretation-card">
                <h3 className="interpretation-title">📊 NDVI Interpretation</h3>
                <div className="interpretation-content">
                  <p className="interpretation-text">
                    {ndviData.interpretation}
                  </p>
                  <div className="interpretation-scale">
                    <div className="scale-item">
                      <span className="scale-color high"></span>
                      <span className="scale-label">Permanent Vegetation (&gt; 0.45)</span>
                    </div>
                    <div className="scale-item">
                      <span className="scale-color moderate"></span>
                      <span className="scale-label">Seasonal Vegetation (0.30 - 0.45)</span>
                    </div>
                    <div className="scale-item">
                      <span className="scale-color low"></span>
                      <span className="scale-label">No Vegetation (&lt; 0.30)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="context-card">
                <h3 className="context-title">🌾 Year-Specific Agricultural Context</h3>
                <p className="context-text">
                  {ndviData.context}
                </p>
              </div>

              <div className="methods-card">
                <h3 className="methods-title">🔬 Methodology</h3>
                <div className="methods-content">
                  <div className="method-item">
                    <span className="method-icon">📡</span>
                    <div>
                      <strong>Data Source:</strong> {getSatellite().name} Satellite
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">📊</span>
                    <div>
                      <strong>Calculation:</strong> NDVI = (NIR - RED) / (NIR + RED)
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">🗺️</span>
                    <div>
                      <strong>Processing:</strong> Google Earth Engine cloud platform
                    </div>
                  </div>
                  <div className="method-item">
                    <span className="method-icon">📅</span>
                    <div>
                      <strong>Temporal:</strong> Annual median composite for each year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="map-card">
              <div className="map-header">
                <div className="map-header-content">
                  <h2>🛰️ Satellite NDVI Map</h2>
                  <p className="map-description">Real-time Earth Engine Analysis</p>
                </div>
                <span className="map-info">Google Earth Engine</span>
              </div>
              <div className="map-container">
                <iframe
                  src={getMapUrl()}
                  title="NDVI Map"
                  className="earth-engine-map"
                  frameBorder="0"
                  allowFullScreen=""
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 GIS Analysis Project | {selectedDistrict} District NDVI Monitoring</p>
      </footer>
    </div>
  );
}

export default App;
