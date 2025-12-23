# GEE Authentication Setup Guide

## 🔐 Step 1: Get Google Account

You need a Google account (personal or institutional).

## 🔓 Step 2: Sign Up for Earth Engine

1. Go to https://earthengine.google.com/
2. Click "Get Started" → "Sign Up"
3. Fill out the form:
   - Email: Your Google email
   - Organization: Your university/organization
   - Use case: Research/Educational
   - Country: Your country
4. Accept terms
5. Wait for approval (usually 1-2 hours)

## 💻 Step 3: Install Earth Engine CLI

```bash
pip install earthengine-api
```

## 🔑 Step 4: Authenticate

```bash
earthengine authenticate
```

This will:
1. Open a browser window
2. Ask you to sign in with your Google account
3. Request permission to access Earth Engine
4. Redirect to a page with an authorization code
5. Copy and paste the code back into terminal

Credentials are stored at:
- Windows: `C:\Users\{YourUsername}\.config\earthengine\credentials`
- Mac/Linux: `~/.config/earthengine/credentials`

## 🧪 Step 5: Verify Installation

```bash
python -c "import ee; ee.Initialize(); print('✓ Earth Engine initialized')"
```

## 🚀 Step 6: Run the Backend

```bash
cd backend
python ndvi_api.py
```

You should see:
```
✓ Earth Engine initialized successfully
🚀 NDVI API Server Starting
Local: http://localhost:5000
```

## 🐛 Troubleshooting

### "HTTP Error 401: Unauthorized"
- Your Earth Engine account approval is still pending
- Wait 1-2 hours and try again

### "Earth Engine not initialized"
- Run `earthengine authenticate` again
- Check that credentials file exists

### "Permission denied" on credentials file
```bash
# Fix permissions (Mac/Linux)
chmod 600 ~/.config/earthengine/credentials
```

### "Module not found" errors
```bash
pip install -r requirements.txt
```

### Timeout errors
Earth Engine computations can take 30-60 seconds.
- First time: Slower due to data loading
- Subsequent: Faster due to caching

## ✅ Verification Checklist

- [ ] Google account created
- [ ] Earth Engine signup approved
- [ ] `earthengine authenticate` completed
- [ ] Credentials file exists
- [ ] `pip install -r requirements.txt` successful
- [ ] Backend starts without errors
- [ ] React frontend at http://localhost:5173
- [ ] Select year and see data loading

## 📊 Next Steps

1. Open React frontend: http://localhost:5173
2. Backend automatically fetches real NDVI data from Google Earth Engine
3. Select different years (2015-2025)
4. View real satellite imagery and AI-generated reports

## 🎓 Resources

- [Earth Engine Signup](https://earthengine.google.com/signup/)
- [Earth Engine Python API Docs](https://developers.google.com/earth-engine/apidocs)
- [NDVI Calculation](https://developers.google.com/earth-engine/guides/reducers_intro)
- [Sentinel-2 Data](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2)
- [Landsat 8 Data](https://developers.google.com/earth-engine/datasets/catalog/LANDSAT_LC08_C02_T1_L2)

## 🆘 Need Help?

- Check backend logs: Terminal output
- Verify API running: `curl http://localhost:5000/api/health`
- Check React console: Browser DevTools → Console tab
- Review component files: `src/components/` and `src/utils/api.js`
