@echo off
REM MongoDB Service Check - Windows

echo.
echo === MongoDB Service Checker ===
echo.

REM Check if MongoDB service exists
echo [1/3] Checking if MongoDB service exists...
sc query MongoDB > nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✓ MongoDB service found
) else (
    echo ✗ MongoDB service NOT found
    echo    Install MongoDB Community from: https://www.mongodb.com/try/download/community
    exit /b 1
)

REM Check if MongoDB service is running
echo [2/3] Checking if MongoDB is running...
sc query MongoDB | findstr "RUNNING" > nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✓ MongoDB service is RUNNING
) else (
    echo ✗ MongoDB service is NOT running
    echo.
    echo Starting MongoDB service...
    net start MongoDB
    if %ERRORLEVEL% == 0 (
        echo ✓ MongoDB started successfully
    ) else (
        echo ✗ Failed to start MongoDB
        echo   Try opening Services (services.msc) and start MongoDB manually
        exit /b 1
    )
)

REM Check if port 27017 is listening
echo [3/3] Checking if MongoDB port (27017) is listening...
netstat -ano | findstr ":27017" > nul 2>&1
if %ERRORLEVEL% == 0 (
    echo ✓ MongoDB port 27017 is listening
    echo.
    echo ✓ MongoDB is ready!
    echo.
) else (
    echo ⚠ MongoDB port 27017 not listening yet
    echo   Waiting a few seconds...
    timeout /t 3 /nobreak
    
    netstat -ano | findstr ":27017" > nul 2>&1
    if %ERRORLEVEL% == 0 (
        echo ✓ MongoDB port 27017 is now listening
        echo.
        echo ✓ MongoDB is ready!
    ) else (
        echo ✗ MongoDB port 27017 still not listening
        echo   Check MongoDB logs: C:\Program Files\MongoDB\Server\{version}\log\mongod.log
        exit /b 1
    )
)

pause
