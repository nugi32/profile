# Fix: Upload Timeout Error

## Error Message
```
Upload failed: {"message":"Operation `projects.insertOne()` buffering timed out after 10000ms"}
```

## Root Causes
1. **MongoDB tidak running/connected** - Server tidak bisa connect ke database
2. **MONGO_URI salah** - Connection string tidak valid
3. **Network timeout** - Koneksi ke database terlalu lambat
4. **Database server down** - MongoDB service tidak aktif

## Solutions

### ✓ Step 1: Verify MongoDB is Running

#### Windows
```powershell
# Check if MongoDB service running
Get-Service | Where-Object {$_.Name -like "*mongo*"}

# Or manually start:
# 1. Open Services (services.msc)
# 2. Find "MongoDB" service
# 3. Right-click → Start
```

#### Mac
```bash
# Check if running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community
```

#### Linux
```bash
# Check if running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### ✓ Step 2: Check .env file

Pastikan `backend/.env` memiliki:
```env
MONGO_URI=mongodb://127.0.0.1:27017/portfolioDB
PORT=5000
NODE_ENV=development
```

### ✓ Step 3: Test Database Connection

Buat file `test-db.js` di folder backend:

```javascript
require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("Testing MongoDB connection...");
    console.log("URI:", process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    });
    
    console.log("✓ MongoDB Connected Successfully!");
    
    // List all databases
    const admin = mongoose.connection.db.admin();
    const databases = await admin.listDatabases();
    console.log("Available databases:", databases.databases.map(db => db.name));
    
    await mongoose.connection.close();
  } catch (error) {
    console.error("✗ Connection Failed:", error.message);
    process.exit(1);
  }
}

testConnection();
```

Run test:
```bash
node test-db.js
```

Expected output:
```
Testing MongoDB connection...
URI: mongodb://127.0.0.1:27017/portfolioDB
✓ MongoDB Connected Successfully!
Available databases: [ 'admin', 'config', 'local', 'portfolioDB' ]
```

### ✓ Step 4: Clear Cache & Restart

```bash
# Kill any existing node process
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -9 node

# Remove node_modules cache (optional)
rm -rf backend/node_modules
npm install

# Restart backend
npm run devBackend
```

### ✓ Step 5: Check MongoDB Logs

#### Windows (MongoDB Community)
```
C:\Program Files\MongoDB\Server\{version}\log\mongod.log
```

#### Mac
```bash
tail -f /usr/local/var/log/mongodb/mongo.log
```

#### Linux
```bash
sudo journalctl -u mongod -f
```

Look for errors like:
- "bind() failed" - Port sudah digunakan
- "Unable to lock file" - Permission issue
- "Unclean shutdown" - Restart MongoDB

## Alternative: Use MongoDB Atlas (Cloud)

Jika local MongoDB bermasalah, gunakan cloud:

1. **Buat akun**: https://www.mongodb.com/cloud/atlas
2. **Buat cluster** gratis (M0 - 512MB)
3. **Setup network access** (allow all IPs)
4. **Create database user**
5. **Copy connection string**:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
   ```
6. **Update .env**:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolioDB?retryWrites=true&w=majority
   ```

## Quick Checklist

- [ ] MongoDB service running
- [ ] `.env` file exists dengan MONGO_URI
- [ ] Port 27017 tidak blocked (default MongoDB port)
- [ ] Network connection stabil
- [ ] Backend dapat di-restart tanpa error
- [ ] `GET /api/health` return `{"status":"OK"}`

## If Still Not Working

1. Check console output untuk error messages
2. Increase timeout di server.js (line 30):
   ```javascript
   serverSelectionTimeoutMS: 10000, // Increase ini dari 5000 ke 10000
   ```
3. Check firewall/antivirus tidak block MongoDB
4. Update MongoDB ke latest version
5. Reinstall MongoDB completely

## Questions?

Test endpoints:
```bash
# Check backend health
curl http://localhost:5000/api/health

# Should return:
# {"status":"OK","mongodb":"Connected","timestamp":"2024-02-26T..."}
```
