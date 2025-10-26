@echo off
echo ========================================
echo    RCB UNIVERSE - QUICK START
echo    Ee Sala Cup Namde!
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/4] Starting Backend Server...
start cmd /k "cd backend && echo Installing backend dependencies... && npm install && echo Starting backend server... && npm run dev"
timeout /t 3 /nobreak >nul
echo Backend server starting on http://localhost:5000
echo.

echo [3/4] Starting Frontend Server...
start cmd /k "cd frontend && echo Installing frontend dependencies... && npm install && echo Starting frontend server... && npm start"
timeout /t 3 /nobreak >nul
echo Frontend server starting on http://localhost:3000
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo    RCB Universe is starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Your browser should open automatically.
echo If not, visit http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
