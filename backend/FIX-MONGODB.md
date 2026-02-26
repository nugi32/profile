# MongoDB Status & Quick Fix Guide

## Current Issue
❌ **MongoDB is not running** - Connection refused at `127.0.0.1:27017`

## Quick Fix (Windows)

### Option 1: Start MongoDB Service (Recommended)
```powershell
# Run as Administrator in PowerShell

# Check if running
Get-Service MongoDB

# If stopped, start it
Start-Service MongoDB

# Verify it started
Get-Service MongoDB
```

Or manually:
1. Press `Win + R`
2. Type `services.msc`
3. Find "MongoDB Server"
4. Right-click → "Start"
5. Restart your backend server

### Option 2: Use MongoDB Atlas (Cloud) - No Installation Needed

**Pros:**
- ✓ No local installation needed
- ✓ Free tier (512MB cloud database)
- ✓ Works from anywhere
- ✓ Automatic backups

**Steps:**

1. **Buat Akun** https://www.mongodb.com/cloud/atlas
   - Sign up dengan email

2. **Buat Organization** (skip untuk quick start)

3. **Create Project** "Portfolio"

4. **Build a Cluster**
   - Choose "M0 Sandbox" (Free 512MB)
   - Cloud Provider: AWS
   - Region: busan-ap-southeast-1 (closest to Indonesia)
   - Click "Create"

5. **Setup Network Access**
   - Go to Security → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for testing)
   - Click "Confirm"

6. **Create Database User**
   - Go to Security → Database Access
   - Click "Add New Database User"
   - Username: `admin`
   - Password: (generate strong password)
   - User Privileges: "Atlas admin"
   - Click "Add User"

7. **Get Connection String**
   - Go back to Databases
   - Click "Connect" button
   - Select "Drivers"
   - Copy connection string
   - Should look like:
     ```
     mongodb+srv://admin:PASSWORD@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
     ```

8. **Update `.env` in backend folder:**
   ```env
   MONGO_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```
   **Replace `PASSWORD` dengan password yang dibuat sebelumnya**

9. **Restart backend**
   ```bash
   npm run devBackend
   ```

   Expected output:
   ```
   ✓ MongoDB Connected
     Using: MongoDB Atlas (Cloud)
   ```

## Verify MongoDB is Working

After starting MongoDB:

```powershell
# Windows - Check if port 27017 is listening
netstat -ano | findstr ":27017"

# Should show something like:
# TCP    127.0.0.1:27017        0.0.0.0:0              LISTENING       1234
```

Or test via backend health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "mongodb": "Connected",
  "timestamp": "2026-02-26T..."
}
```

## Recommended Setup for Development

### Best: MongoDB Atlas (Cloud)
- Easiest to setup
- No local installation needed
- Free tier is sufficient for portfolio
- Works everywhere (laptop, desktop, phone network)

### Alternative: Local MongoDB
- Need to install MongoDB Community
- Need to manage service manually
- Portable (works offline)
- Slightly faster for local dev

## After MongoDB is Running

1. ✅ Backend akan auto-connect
2. ✅ Refresh admin dashboard at `http://localhost:3000/admin`
3. ✅ Try uploading a project
4. ✅ Should work without timeout errors!

## Still Getting Errors?

Check MongoDB logs:

**Windows:**
```powershell
# MongoDB Community logs
Get-Content "C:\Program Files\MongoDB\Server\6.0\log\mongod.log" -Tail 50
```

Make sure you don't have MongoDB running in multiple places or multiple instances binding to the same port.

## Troubleshooting Checklist

- [ ] MongoDB service running (check Services)
- [ ] `.env` file exists dengan MONGO_URI
- [ ] Port 27017 not blocked by firewall
- [ ] Network connection stable (if using Atlas)
- [ ] Backend restarted after MongoDB started
- [ ] Health check returns `"mongodb": "Connected"`

Once MongoDB connects, the "buffering timeout" errors will disappear!
