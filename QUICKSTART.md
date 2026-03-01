# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or Atlas)
- Git/Terminal

## Setup (Do This Once)

### 1. Backend Setup (Terminal 1)
```bash
cd backend
npm install
# Already has .env configured, just verify MONGO_URI is correct
npm run devBackend
# Wait for: ✓ MongoDB Connected
# Wait for: ✓ Server running on http://localhost:5000
```

### 2. Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm run dev
# Will open browser to http://localhost:3000
# Click on Admin Dashboard link or go to http://localhost:3000/admin
```

### 3. MongoDB (Terminal 3 - if using local)
```bash
mongod
# Keep this running in background
```

## Using Admin Dashboard

1. Go to http://localhost:3000/admin

2. **Fill Landing Section:**
   - Type "Hello" in Greeting
   - Type "Web Developer" in Role
   - Type your bio in Description
   - Click file input and upload a profile picture

3. **Add Projects:**
   - Click "+" button in Projects section
   - Fill: Title, Short description, Details, Link
   - Upload project image
   - Repeat for more projects

4. **Fill About Section:**
   - Type subtitle, bio, experience, number of projects
   - Click "+" to add skills
   - For each skill: enter name and level (0-100)

5. **Fill Footer Section:**
   - Enter footer title
   - Click "+" to add social links
   - Enter social media name (Twitter, LinkedIn, etc) and URL

6. **Save Portfolio**
   - Click "Save Portfolio" button at top
   - Wait for success message
   - ✅ All data + images saved to MongoDB!

## Verify Data Saved

### Option 1: Check in MongoDB
```bash
# In new terminal
mongosh
> use portfolioDB
> db.landings.find()
> db.projects.find()
> db.abouts.find()
> db.footers.find()
```

### Option 2: Check with Compass
- Download: https://www.mongodb.com/products/compass
- Connect to: mongodb://localhost:27017
- Browse: portfolioDB database

### Option 3: Check Frontend Pages
- Go to http://localhost:3000
- Should see your data on main website
- Images should load from `/uploads/filename`

## Common Issues

### ❌ "Cannot connect to MongoDB"
```bash
# Make sure MongoDB is running
mongod
# Or check if it's already running
Get-Process mongod
```

### ❌ "Cannot reach backend"
- Check if backend is running: http://localhost:5000/api/health
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Restart frontend: `npm run dev`

### ❌ "Images not uploading"
- Check /backend/uploads folder exists
- Check file is less than 5MB
- Check file is jpg/jpeg/png

### ❌ "Port 3000 or 5000 already in use"
```bash
# Find and kill process
netstat -ano | findstr :3000  # or :5000
taskkill /PID <PID> /F

# Or change port in frontend: npm run dev -- -p 3001
```

## Stopping Services

Just press `Ctrl+C` in each terminal:
- Terminal 1 (Backend): `Ctrl+C`
- Terminal 2 (Frontend): `Ctrl+C`
- Terminal 3 (MongoDB): `Ctrl+C`

## Next Time You Boot

Just do the same 3 terminal commands:
```bash
# Terminal 1
cd backend && npm run devBackend

# Terminal 2
cd frontend && npm run dev

# Terminal 3
mongod
```

## What's Working Now

✅ Admin panel to manage portfolio  
✅ Images upload to backend  
✅ Data saves to MongoDB  
✅ Frontend displays data from database  
✅ Full CRUD operations  

## File Locations

- Admin dashboard: `frontend/app/admin/page.tsx`
- API functions: `frontend/lib/api.ts`
- Backend models: `backend/models/`
- Backend routes: `backend/routes/`
- Images stored: `backend/uploads/`
- Database: MongoDB (local or Atlas)

---

That's it! You now have a fully integrated Next.js + MongoDB portfolio system.
