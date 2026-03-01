✅ INTEGRASI NEXT.JS FRONTEND DENGAN BACKEND MONGODB SELESAI

## Ringkasan Perubahan

### Backend (Express.js + MongoDB)
✅ 4 Model Mongoose diupdate sesuai struktur admin form:
  - Landing: greeting, role, description, profilePicture
  - Project: title, short, details, image, link
  - About: subTitle, whoIam, experience, projects, skills[]
  - Footer: title, socialLinks[] (MODEL BARU)

✅ 5 API Endpoints baru/diupdate:
  - POST /api/portfolio - Save semua data + images sekaligus
  - GET /api/portfolio - Fetch data dalam format admin
  - POST/GET /api/footer - CRUD footer
  - Controllers & routes lengkap untuk semua model

### Frontend (Next.js 14)
✅ API functions diupdate di lib/api.ts:
  - Interfaces baru sesuai model
  - savePortfolio() - kirim semua data + files dalam 1 request
  - getPortfolio() - fetch data format admin
  - Updated: getLandingPage, getProjects, getAbout, getFooter

✅ Admin Page diupdate:
  - Simplified save function pakai savePortfolio
  - Support multiple file uploads (landing + projects)

✅ Environment setup:
  - frontend/.env.local dengan NEXT_PUBLIC_API_URL
  - backend/.env siap pakai untuk local MongoDB

## Cara Menggunakan

### Step 1: Setup Backend
```bash
cd backend
npm install
# Edit .env jika diperlukan (default sudah benar untuk local MongoDB)
npm run devBackend
# Expected output: ✓ MongoDB Connected ✓ Server running on http://localhost:5000
```

### Step 2: MongoDB
```bash
# Pastikan MongoDB sudah running:
mongod

# Atau di terminal lain, jalankan PowerShell script:
.\backend\start-mongodb.ps1
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install
npm run dev
# Buka http://localhost:3000/admin
```

### Step 4: Test Admin Panel
1. Buka http://localhost:3000/admin
2. Isi semua section:
   - **Landing**: greeting, role, description + upload profile picture
   - **Projects**: tambah projects dengan image
   - **About**: bio, skills dengan level
   - **Footer**: title + social links
3. Click "Save Portfolio" button
4. Cek MongoDB untuk memastikan data tersimpan

## File-File Penting

Backend:
```
backend/
├── models/landing.js ← UPDATED
├── models/project.js ← UPDATED
├── models/about.js ← UPDATED
├── models/footer.js ← NEW
├── controllers/portfolioController.js ← NEW
├── routes/portfolioRoutes.js ← NEW
└── server.js ← UPDATED (added routes)
```

Frontend:
```
frontend/
├── lib/api.ts ← COMPLETELY REWRITTEN
├── app/admin/page.tsx ← UPDATED (import savePortfolio)
├── .env.local ← NEW
└── .env.example ← NEW
```

Dokumentasi:
```
├── INTEGRATION.md ← Panduan lengkap
├── CHECKLIST.md ← Verification checklist
├── README_CHANGES.md ← Ini file
```

## Data Structure

Admin form sekarang save dalam struktur:
```json
{
  "Landingdata": {
    "section": "LandingPage",
    "data": {
      "greeting": "...",
      "role": "...",
      "description": "...",
      "profilePicture": "..."
    }
  },
  "ProjectsData": {
    "section": "ProjectsPage",
    "data": [
      {
        "title": "...",
        "short": "...",
        "details": "...",
        "image": "...",
        "link": "..."
      }
    ]
  },
  "AboutMeData": {
    "subTitle": "...",
    "whoIam": "...",
    "experience": "...",
    "projects": "...",
    "skills": [
      {
        "name": "...",
        "level": 0-100
      }
    ]
  },
  "FooterData": {
    "title": "...",
    "socialLinks": [
      {
        "name": "...",
        "url": "..."
      }
    ]
  }
}
```

## Penting!

1. **Port Harus Berbeda**:
   - Frontend: 3000 (Next.js default)
   - Backend: 5000 (Express default)
   - MongoDB: 27017 (MongoDB default)

2. **MongoDB Harus Running**:
   - Check dengan: `Get-Process mongod` (Windows)
   - Atau: `mongosh` untuk test connection

3. **Images Save Location**:
   - Semua images disimpan di: `/backend/uploads/`
   - Accessible via: `http://localhost:5000/uploads/filename`

4. **CORS Already Configured**:
   - Backend sudah allow semua origin
   - Untuk production, update server.js line 17

## Database Info

Database: `portfolioDB`
Collections: `landings`, `projects`, `abouts`, `footers`, `contacts`

Check dengan MongoDB Compass atau mongosh:
```bash
mongosh
> show databases
> use portfolioDB
> show collections
> db.landings.find()
```

## Troubleshooting

**Backend tidak konek MongoDB:**
```bash
# Check .env file
cat backend/.env

# Check if mongod running
Get-Process mongod

# Start MongoDB
mongod
```

**Frontend cannot reach backend:**
- Check NEXT_PUBLIC_API_URL di frontend/.env.local
- Check backend server sudah running
- Check port 5000 tidak ada yang pakai: `netstat -ano | findstr :5000`

**Images tidak upload:**
- Check `/backend/uploads/` folder exist
- Check file permissions
- Check file size dalam limits

## Next Steps

1. ✅ Test di local development
2. Setup MongoDB Atlas untuk production
3. Deploy frontend ke Vercel
4. Deploy backend ke Railway/Render/Heroku
5. Update NEXT_PUBLIC_API_URL ke production API

---
Integration selesai! Sekarang frontend dan backend sudah fully connected dengan MongoDB.
Semua data dari admin form tersimpan di database dan bisa diakses dari public pages.
