@echo off
echo ================================================
echo    IT PORTFOLIO - QUICK START
echo ================================================
echo.
echo This script will help you start both applications
echo.
echo Starting Portfolio Frontend and Admin Dashboard...
echo.

REM Start Portfolio Frontend
start "Portfolio Frontend" cmd /k "cd portfolio-frontend && echo Installing dependencies... && npm install && echo Starting portfolio frontend... && npm run dev"

REM Wait a moment
timeout /t 3 /nobreak > nul

REM Start Admin Dashboard
start "Admin Dashboard" cmd /k "cd admin-dashboard && echo Installing dependencies... && npm install && echo Starting admin dashboard... && npm start"

echo.
echo ================================================
echo Both applications are starting...
echo ================================================
echo.
echo Portfolio Frontend: http://localhost:5173
echo Admin Dashboard: http://localhost:5174
echo.
echo Press any key to exit this window...
pause > nul
