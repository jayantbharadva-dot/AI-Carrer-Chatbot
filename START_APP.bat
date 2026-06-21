@echo off
REM ============================================================
REM AI Career Chatbot - Desktop App Setup (Windows)
REM No Python needed! Pure HTML + JS + Electron
REM ============================================================
echo.
echo  AI Career Guidance Chatbot - Desktop App
echo  ==========================================
echo  No Python needed! Pure JavaScript app.
echo.

echo [1/3] Checking Node.js...
node --version
IF ERRORLEVEL 1 (
  echo  ERROR: Node.js not found!
  echo  Please download from: https://nodejs.org
  pause
  exit /b
)

echo [2/3] Installing dependencies...
npm install

echo [3/3] Launching Desktop App...
npm start

pause
