@echo off
REM Quick Start Script for Thanjavur NDVI Platform
REM Windows batch script to setup and run the application

echo.
echo ======================================
echo   THANJAVUR NDVI PLATFORM
echo   Quick Start Script
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found. Please install Node.js 18+
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python not found. Please install Python 3.8+
    echo Download from: https://www.python.org/
    pause
    exit /b 1
)

echo [✓] Node.js found: 
node --version

echo [✓] Python found:
python --version

echo.
echo ======================================
echo   SETUP OPTIONS
echo ======================================
echo 1. Frontend Only (Mock Data)
echo 2. Full Stack (with Google Earth Engine)
echo 3. Just Install Dependencies
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" goto frontend_only
if "%choice%"=="2" goto full_stack
if "%choice%"=="3" goto install_only
goto invalid_choice

:frontend_only
echo.
echo [*] Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 goto error
echo [✓] Frontend ready!
echo.
echo Starting dev server...
call npm run dev
goto end

:full_stack
echo.
echo [*] Setting up full stack...
echo.
echo Step 1: Installing Python dependencies...
cd backend
call pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install Python dependencies
    goto error
)
echo [✓] Python dependencies installed

echo.
echo Step 2: Google Earth Engine Setup
echo.
echo You need to authenticate with Google Earth Engine.
echo This will open a browser for authorization.
echo.
echo Installing earthengine-api...
call pip install earthengine-api
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install earthengine-api
    goto error
)

echo.
echo Running: earthengine authenticate
call earthengine authenticate
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Authentication may have issues
)

echo [✓] Earth Engine setup complete

cd ..
echo.
echo Step 3: Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 goto error
echo [✓] Frontend dependencies installed

echo.
echo ======================================
echo   STARTUP INSTRUCTIONS
echo ======================================
echo.
echo You need TWO terminal windows:
echo.
echo TERMINAL 1 - Backend API:
echo   cd backend
echo   python ndvi_api.py
echo   (runs on http://localhost:5000)
echo.
echo TERMINAL 2 - Frontend:
echo   npm run dev
echo   (runs on http://localhost:5173)
echo.
echo Starting backend in new window...
start cmd /k "cd backend && python ndvi_api.py"

echo.
echo Waiting 3 seconds before starting frontend...
timeout /t 3 /nobreak

echo Starting frontend dev server...
call npm run dev
goto end

:install_only
echo.
echo [*] Installing frontend dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 goto error
echo [✓] Frontend dependencies installed

echo.
echo [*] Installing Python dependencies...
cd backend
call pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Python dependencies - some may have failed
)
cd ..
echo [✓] Python dependencies installed

echo.
echo Setup complete! Run:
echo   Frontend: npm run dev
echo   Backend: cd backend && python ndvi_api.py
goto end

:invalid_choice
echo [ERROR] Invalid choice. Please enter 1, 2, or 3.
goto full_stack

:error
echo.
echo [ERROR] Setup failed. Please check the error messages above.
echo.
pause
exit /b 1

:end
echo.
echo ======================================
echo   Session Ended
echo ======================================
pause
