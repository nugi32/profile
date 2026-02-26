# MongoDB Quick Start - Windows PowerShell
# Run as Administrator!

Write-Host ""
Write-Host "═════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  MongoDB Quick Start (Windows)" -ForegroundColor Cyan
Write-Host "═════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = $false
try {
    $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]'Administrator')
}
catch {
    Write-Host "⚠ Unable to check admin status" -ForegroundColor Yellow
}

if (-not $isAdmin) {
    Write-Host "✗ This script requires Administrator privileges!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run PowerShell as Administrator:"
    Write-Host "  1. Right-click PowerShell"
    Write-Host "  2. Select 'Run as Administrator'"
    Write-Host "  3. Re-run this script"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/4] Checking MongoDB Service..." -ForegroundColor Yellow
$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue

if ($null -eq $mongoService) {
    Write-Host "✗ MongoDB service not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "MongoDB is not installed. Download from:"
    Write-Host "  https://www.mongodb.com/try/download/community"
    Write-Host ""
    Write-Host "Or use MongoDB Atlas (Cloud) instead - no installation needed!"
    Write-Host "  https://www.mongodb.com/cloud/atlas"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ MongoDB service found" -ForegroundColor Green

Write-Host ""
Write-Host "[2/4] Checking MongoDB Status..." -ForegroundColor Yellow

if ($mongoService.Status -eq "Running") {
    Write-Host "✓ MongoDB is already RUNNING" -ForegroundColor Green
} else {
    Write-Host "⚠ MongoDB is STOPPED, starting..." -ForegroundColor Yellow
    
    try {
        Start-Service -Name "MongoDB"
        Start-Sleep -Seconds 2
        
        $mongoService = Get-Service -Name "MongoDB"
        if ($mongoService.Status -eq "Running") {
            Write-Host "✓ MongoDB started successfully" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to start MongoDB" -ForegroundColor Red
            Write-Host ""
            Write-Host "Try manually:"
            Write-Host "  1. Press Win + R"
            Write-Host "  2. Type: services.msc"
            Write-Host "  3. Find 'MongoDB Server'"
            Write-Host "  4. Right-click and select 'Start'"
            Write-Host ""
            Read-Host "Press Enter to exit"
            exit 1
        }
    }
    catch {
        Write-Host "✗ Error starting MongoDB: $_" -ForegroundColor Red
        Write-Host ""
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "[3/4] Checking MongoDB Port (27017)..." -ForegroundColor Yellow

$portListening = $false
try {
    $netstat = netstat -ano | Select-String ":27017"
    if ($netstat) {
        $portListening = $true
    }
}
catch {
    Write-Host "⚠ Could not check port" -ForegroundColor Yellow
}

if ($portListening) {
    Write-Host "✓ MongoDB port 27017 is listening" -ForegroundColor Green
} else {
    Write-Host "⏳ Waiting for MongoDB port to listen... (5 sec)" -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
    try {
        $netstat = netstat -ano | Select-String ":27017"
        if ($netstat) {
            Write-Host "✓ MongoDB port is now listening" -ForegroundColor Green
        } else {
            Write-Host "⚠ MongoDB port not yet listening, continuing anyway..." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "⚠ Could not verify port" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "[4/4] Testing Connection..." -ForegroundColor Yellow

try {
    # Try to connect using mongoosh (if installed)
    $mongoOutput = mongosh "mongodb://127.0.0.1:27017" --eval "db.version()" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ MongoDB connection test successful!" -ForegroundColor Green
    } else {
        Write-Host "⚠ Connection test inconclusive" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠ Could not run full test (mongoosh may not be installed)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✓ MongoDB Setup Complete!" -ForegroundColor Green
Write-Host "═════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Go back to your terminal"
Write-Host "  2. Run: npm run devBackend"
Write-Host "  3. You should see: '✓ MongoDB Connected'"
Write-Host ""

Read-Host "Press Enter to close"
