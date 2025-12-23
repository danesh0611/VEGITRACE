/**
 * Statistics Display Component
 * Shows NDVI metrics and satellite data information
 */

const Statistics = ({ ndviStats, year }) => {
  if (!ndviStats) {
    return <div className="stats-container">Loading data...</div>;
  }

  return (
    <div className="stats-container">
      <h3>📊 NDVI Statistics</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <label>Mean NDVI</label>
          <div className="stat-value">{ndviStats.mean?.toFixed(3) || "0.00"}</div>
          <p className="stat-description">Average vegetation index</p>
        </div>
        <div className="stat-box">
          <label>Max NDVI</label>
          <div className="stat-value">{ndviStats.max?.toFixed(3) || "0.00"}</div>
          <p className="stat-description">Peak vegetation</p>
        </div>
        <div className="stat-box">
          <label>Min NDVI</label>
          <div className="stat-value">{ndviStats.min?.toFixed(3) || "0.00"}</div>
          <p className="stat-description">Minimum coverage</p>
        </div>
      </div>

      {ndviStats.distribution && (
        <div className="distribution-info">
          <h4>Land Cover Distribution</h4>
          <div className="distribution-bars">
            <div className="bar-item">
              <div className="bar-label">High Vegetation</div>
              <div className="progress-bar">
                <div
                  className="progress-fill high"
                  style={{ width: `${ndviStats.distribution.high}%` }}
                ></div>
              </div>
              <span>{ndviStats.distribution.high}%</span>
            </div>
            <div className="bar-item">
              <div className="bar-label">Moderate Vegetation</div>
              <div className="progress-bar">
                <div
                  className="progress-fill moderate"
                  style={{ width: `${ndviStats.distribution.moderate}%` }}
                ></div>
              </div>
              <span>{ndviStats.distribution.moderate}%</span>
            </div>
            <div className="bar-item">
              <div className="bar-label">Low Vegetation</div>
              <div className="progress-bar">
                <div
                  className="progress-fill low"
                  style={{ width: `${ndviStats.distribution.low}%` }}
                ></div>
              </div>
              <span>{ndviStats.distribution.low}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="data-metadata">
        <p><strong>Region:</strong> Thanjavur District, Tamil Nadu</p>
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Satellite:</strong> {year < 2017 ? "Landsat 8" : "Sentinel-2"}</p>
        <p><strong>Resolution:</strong> {year < 2017 ? "30m" : "10m"}</p>
      </div>
    </div>
  );
};

export default Statistics;
