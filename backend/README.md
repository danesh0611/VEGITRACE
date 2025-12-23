# Google Earth Engine NDVI Analysis Backend

This folder contains the Python Flask backend that wraps the Google Earth Engine API.

## Setup Instructions

### 1. Install Earth Engine CLI and Authenticate

```bash
pip install earthengine-api
earthengine authenticate
```

This will open a browser to authorize access to Google Earth Engine.

### 2. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Backend Server

```bash
# Development mode
python ndvi_api.py

# Or with gunicorn (production)
gunicorn -w 4 -b 0.0.0.0:5000 ndvi_api:app
```

The server will start at `http://localhost:5000`

## API Endpoints

### Get NDVI for Single Year
```bash
curl "http://localhost:5000/api/ndvi?year=2023"
```

**Response:**
```json
{
  "success": true,
  "year": 2023,
  "sensor": "Sentinel-2",
  "resolution": "10m",
  "mean": 0.42,
  "min": 0.15,
  "max": 0.78,
  "distribution": {
    "low": 20,
    "moderate": 45,
    "high": 35
  },
  "timestamp": "2025-12-19T11:30:00"
}
```

### Get NDVI for Multiple Years (Batch)
```bash
curl -X POST "http://localhost:5000/api/ndvi/batch" \
  -H "Content-Type: application/json" \
  -d '{"years": [2020, 2021, 2022, 2023], "district": "Thanjavur"}'
```

### Get API Information
```bash
curl "http://localhost:5000/api/info"
```

## Environment Variables

Create a `.env` file:
```
FLASK_ENV=development
PORT=5000
```

## Satellite Selection Logic

The API automatically selects the best satellite based on year:

| Year       | Satellite | Resolution | Source |
|-----------|-----------|-----------|--------|
| 2015-2016 | Landsat 8 | 30m | USGS |
| 2017+     | Sentinel-2| 10m | ESA |

## Features

✓ Cloud-free NDVI computation
✓ Year range support (2015-2025)
✓ Automatic vegetation classification
✓ Statistics aggregation (mean, min, max)
✓ Distribution analysis
✓ CORS enabled for React frontend
✓ Error handling and validation

## Integration with React Frontend

Update `src/utils/api.js` to point to backend:

```javascript
const API_BASE_URL = 'http://localhost:5000';

export const fetchNDVIData = async (year) => {
  const response = await fetch(`${API_BASE_URL}/api/ndvi?year=${year}`);
  return response.json();
};
```

## Troubleshooting

### "Earth Engine not initialized"
Run: `earthengine authenticate`

### CORS errors
CORS is already enabled in `ndvi_api.py`. If issues persist, check that the Flask-CORS version matches.

### Timeout errors
Large GEE computations may take 30-60 seconds. The frontend has a timeout; increase if needed.

### Memory issues
Reduce `maxPixels` in the backend for faster processing at the cost of some accuracy.
