/**
 * AI-based Report Generator for NDVI Analysis
 * Uses rule-based logic to interpret satellite data
 */

const generateNDVIReport = (year, meanNDVI, ndviDistribution) => {
  let report = "";

  // Base interpretation based on NDVI values
  if (meanNDVI > 0.45) {
    report = "High vegetation cover indicating robust crop growth and lush greenness throughout the agricultural year. ";
    report += "This suggests favorable monsoon patterns and well-distributed rainfall supporting sustained plant development. ";
  } else if (meanNDVI > 0.30) {
    report = "Moderate vegetation dominated by seasonal agriculture with typical growth cycles. ";
    report += "The district maintained reasonable crop production with mixed conditions affecting different growing phases. ";
  } else if (meanNDVI > 0.20) {
    report = "Below-average vegetation cover suggesting stress conditions affecting crop yields. ";
    report += "Possible causes include drought, erratic rainfall, or suboptimal farming practices. ";
  } else {
    report = "Low vegetation index indicating severe agricultural stress or significant crop loss. ";
    report += "This could be due to extreme drought, flooding, or other climatic disasters. ";
  }

  // Add year-specific context
  if (year < 2017) {
    report += `\n\nData Source: Landsat 8 (30m resolution). `;
    report += "This period marked transitional agricultural practices in Thanjavur. ";
  } else {
    report += `\n\nData Source: Sentinel-2 (10m resolution). `;
    report += "High-resolution monitoring reveals detailed crop health patterns. ";
  }

  // Historical context by year
  const yearContext = {
    2015: "However, 2015 experienced severe waterlogging due to excess monsoon rainfall, affecting rice paddies and causing significant crop damage despite high NDVI values.",
    2016: "The year saw recovery from previous flooding, with farmers implementing better water management strategies.",
    2017: "Introduction of advanced satellite data coincided with improved crop planning and resource allocation.",
    2018: "Moderate rainfall patterns led to balanced agricultural outcomes with typical seasonal variations.",
    2019: "Water conservation measures became critical due to late monsoon onset affecting initial planting phases.",
    2020: "COVID-19 disruptions affected agricultural supply chains and labor availability, impacting overall farming cycles.",
    2021: "Post-pandemic recovery in agricultural activities with renewed focus on sustainable farming practices.",
    2022: "Unseasonal rainfall and temperature fluctuations created challenging farming conditions.",
    2023: "Improved monsoon patterns supported better crop development compared to previous years.",
    2024: "Climate variability continues with erratic rainfall patterns affecting traditional cropping calendars.",
    2025: "Current patterns show adaptation to climate change with farmers adopting drought-resistant crop varieties."
  };

  if (yearContext[year]) {
    report += `\n\n${yearContext[year]}`;
  }

  // NDVI classification insights
  if (ndviDistribution) {
    const { high, moderate, low } = ndviDistribution;
    report += `\n\nDetailed Analysis:\n`;
    report += `• High vegetation zones: ${high}% of cultivated area\n`;
    report += `• Moderate vegetation zones: ${moderate}% of cultivated area\n`;
    report += `• Low vegetation zones: ${low}% of cultivated area\n`;

    if (high > 60) {
      report += "\nThe extensive high-vegetation coverage suggests excellent growing conditions and well-established agricultural infrastructure.";
    } else if (low > 40) {
      report += "\nThe significant low-vegetation area warrants attention from agricultural planners for soil conservation and crop diversification strategies.";
    }
  }

  return report;
};

const ReportGenerator = ({ year, ndviStats }) => {
  const report = generateNDVIReport(
    year,
    ndviStats?.mean || 0,
    ndviStats?.distribution || null
  );

  return (
    <div className="report-container">
      <h3>🤖 AI-Generated Agricultural Report</h3>
      <div className="report-content">
        <p>{report}</p>
      </div>
      <div className="report-metadata">
        <small>Generated for: Thanjavur District | Year: {year}</small>
      </div>
    </div>
  );
};

export default ReportGenerator;
