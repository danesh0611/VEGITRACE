# 🚀 Complete Setup & Deployment Guide

## 📋 Prerequisites

- **Node.js 18+** with npm 9+
- **Python 3.8+**
- **Google Account** (for Earth Engine access)
- **Git** (optional)

---

## ⚡ Quick Start (5 minutes)

### Frontend Only (Mock Data)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Opens: http://localhost:5173
```

### Full Stack (Real Satellite Data)

```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
earthengine authenticate
python ndvi_api.py
# Runs on: http://localhost:5000

# Terminal 2: Frontend
npm install
npm run dev
# Opens: http://localhost:5173
```

---

## 📝 Step-by-Step Setup

### Phase 1: Environment Setup

#### 1.1 Create Python Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 1.2 Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### 1.3 Setup Earth Engine

```bash
pip install earthengine-api
earthengine authenticate

# Verify
python -c "import ee; ee.Initialize(); print('✓ OK')"
```

#### 1.4 Install Frontend Dependencies

```bash
cd ..
npm install
```

### Phase 2: Configuration

#### 2.1 Backend Configuration

Create `backend/.env`:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env if needed (usually defaults work)
```

#### 2.2 Frontend Configuration

Create `.env`:
```bash
cp .env.example .env
# VITE_API_URL=http://localhost:5000 (for local backend)
```

### Phase 3: Running the Application

#### 3.1 Start Backend (Terminal 1)

```bash
cd backend
python ndvi_api.py
```

Expected output:
```
✓ Earth Engine initialized successfully
🚀 NDVI API Server Starting
Local: http://localhost:5000
```

Test the API:
```bash
curl http://localhost:5000/api/health
```

#### 3.2 Start Frontend (Terminal 2)

```bash
npm run dev
```

Expected output:
```
  VITE v7.3.0  ready in 343 ms

  ➜  Local:   http://localhost:5173/
```

### Phase 3: Test the Application

1. **Open browser**: http://localhost:5173
2. **Select year**: Choose any year from 2015-2025
3. **View results**:
   - 🗺️ Map shows NDVI visualization
   - 📊 Statistics display real satellite data
   - 🤖 AI report generates interpretation

---

## 🏗️ Production Deployment

### Option 1: Deploy to Vercel (Frontend Only - Mock Data)

```bash
# Build frontend
npm run build

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Note:** Without backend, will use mock data.

### Option 2: Deploy Full Stack to Heroku

#### Backend (Python Flask)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-ndvi-app

# Set buildpack
heroku buildpacks:add heroku/python
heroku buildpacks:add heroku/nodejs

# Add Earth Engine credentials (if available)
heroku config:set EE_API_KEY=your_key

# Deploy
git push heroku main
```

#### Frontend (React + Vite)

Update `package.json`:
```json
{
  "homepage": "https://your-ndvi-app.herokuapp.com",
  "engines": {
    "node": "18.x"
  }
}
```

### Option 3: Docker Deployment

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      FLASK_ENV: production

  frontend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

Run:
```bash
docker-compose up
```

---

## 🔧 Development Commands

### Frontend
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint code
```

### Backend
```bash
python ndvi_api.py            # Run dev server
gunicorn -w 4 ndvi_api:app   # Production with 4 workers
```

---

## 🐛 Troubleshooting

### Issue: "Earth Engine not initialized"
```bash
earthengine authenticate
# Follow browser prompts
```

### Issue: "Cannot connect to backend"
1. Verify backend is running: `curl http://localhost:5000/api/health`
2. Check VITE_API_URL in `.env`
3. Check CORS settings in `backend/ndvi_api.py`

### Issue: NDVI data not loading
1. Check browser console for errors
2. Backend logs should show: "Computing NDVI for year X"
3. First query is slow (30-60s), subsequent queries are faster

### Issue: Port already in use
```bash
# Change backend port
export PORT=5001
python ndvi_api.py

# Update frontend .env
VITE_API_URL=http://localhost:5001
```

### Issue: Memory errors
Reduce `maxPixels` in `backend/ndvi_api.py`:
```python
maxPixels=1e12  # instead of 1e13
```

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│          React Frontend                         │
│  (Vite + Leaflet + React 19)                    │
│  http://localhost:5173                          │
└─────────────┬───────────────────────────────────┘
              │
              │ HTTP REST API
              │ CORS Enabled
              ▼
┌─────────────────────────────────────────────────┐
│        Flask Backend API                        │
│  (Python 3.8+ + Flask + CORS)                   │
│  http://localhost:5000                          │
│  - /api/ndvi                                    │
│  - /api/ndvi/batch                              │
│  - /api/health                                  │
└─────────────┬───────────────────────────────────┘
              │
              │ Python API
              │
              ▼
┌─────────────────────────────────────────────────┐
│     Google Earth Engine Cloud                   │
│  - Sentinel-2 (10m, post-2017)                  │
│  - Landsat-8 (30m, pre-2017)                    │
│  - NDVI computation                             │
│  - Statistical aggregation                      │
└─────────────────────────────────────────────────┘
```

---

## 📦 Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NDVIMap.jsx
│   │   │   ├── ReportGenerator.jsx
│   │   │   └── Statistics.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── ndvi_api.py
│   ├── requirements.txt
│   ├── .env
│   ├── GEE_SETUP.md
│   └── README.md
│
└── README.md
```

---

## 🚀 Next Steps

1. ✅ Setup complete
2. 🗺️ Select year and explore satellite data
3. 📊 View real NDVI statistics
4. 🤖 Read AI-generated reports
5. 📤 Deploy to production (optional)
6. 🔗 Integrate with other applications

---

## 📚 Learning Resources

- [Earth Engine Documentation](https://developers.google.com/earth-engine)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [NDVI Explanation](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index)

---

## 🎓 Viva/Interview Preparation

**Key talking points:**
1. "Dual-satellite approach shows maturity in geospatial analysis"
2. "REST API architecture ensures scalability"
3. "Real-time Earth Engine integration provides current data"
4. "Rule-based AI demonstrates domain expertise"

---

**Questions? Check:**
- `backend/GEE_SETUP.md` - Earth Engine setup
- `backend/README.md` - API documentation
- `README.md` - Project overview
- Browser console - JavaScript errors
- Terminal logs - Backend errors

---

**Happy coding! 🚀**
