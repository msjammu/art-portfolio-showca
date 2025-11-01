@echo off
echo Art Studio by Akash - Quick Dev Server Start
echo ============================================
echo.

REM Add Node.js to PATH for current session
set "PATH=%PATH%;C:\Program Files\nodejs"

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js not found. Please install Node.js first.
    echo Run: winget install OpenJS.NodeJS.LTS
    pause
    exit /b 1
)

echo Starting development server...
echo The app will be available at: http://localhost:5000
echo Press Ctrl+C to stop the server
echo.

npm run dev