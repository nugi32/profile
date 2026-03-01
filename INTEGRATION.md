# Frontend-Backend Integration Guide

## What's Been Updated

### Backend Changes

#### 1. Updated Models
- **Landing**: greeting, role, description, profilePicture (sesuai admin form)
- **Project**: title, short, details, image, link (sesuai admin form)
- **About**: subTitle, whoIam, experience, projects, skills (dengan level)
- **Footer**: title, socialLinks (name + url) - NEW MODEL

#### 2. New Portfolio Endpoint
- `POST /api/portfolio` - Save seluruh portfolio data sekaligus
- `GET /api/portfolio` - Fetch seluruh portfolio data format admin

#### 3. New Routes
- `/api/footer` - CRUD untuk footer data
- `/api/portfolio` - Save/Get seluruh portfolio

### Frontend Changes

#### 1. Updated API Functions (lib/api.ts)
- New interfaces: LandingData, ProjectData, Skill, AboutData, SocialLink, FooterData
- New function: `savePortfolio()` - Upload semua data + images dalam satu request
- New function: `getPortfolio()` - Fetch data dalam format admin page
- Updated: `getLandingPage()`, `getProjects()`, `getAbout()`, `getFooter()`

#### 2. Updated Admin Page
- Import `savePortfolio` dari lib/api
- Simplified saveData function untuk menggunakan API function

#### 3. Environment Setup
- Created `.env.local` dengan NEXT_PUBLIC_API_URL

## How to Run

### Backend Setup

1. Navigate ke backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
```

4. Start MongoDB (if using local):
```bash
# Windows
mongod

# Or use PowerShell script
.\start-mongodb.ps1
```

5. Start backend:
```bash
npm run devBackend
# atau
node server.js
```

### Frontend Setup

1. Navigate ke frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser ke:
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## How to Use Admin Panel

1. Go to http://localhost:3000/admin
2. Fill in data:
   - **Landing Section**: greeting, role, description + profile picture
   - **Projects Section**: Add projects dengan title, short description, details, image, link
   - **About Section**: Bio info + skills dengan level
   - **Footer Section**: Title + social media links
3. Click "Save Portfolio" button
4. Data akan tersimpan di MongoDB

## Data Flow

1. Admin input data + upload images di frontend
2. Click "Save Portfolio"
3. Frontend collect semua data + file
4. POST ke `/api/portfolio` dengan FormData
5. Backend parse form data
6. Backend save/update ke MongoDB (Landing, Project, About, Footer models)
7. Frontend show success/error alert

## File Structure Summary

```
backend/
├── models/
│   ├── landing.js (updated)
│   ├── project.js (updated)
│   ├── about.js (updated)
│   ├── footer.js (NEW)
│   └── contact.js
├── controllers/
│   ├── landingController.js (updated)
│   ├── projectController.js (updated)
│   ├── aboutController.js (updated)
│   ├── footerController.js (NEW)
│   └── portfolioController.js (NEW)
├── routes/
│   ├── landingRoutes.js
│   ├── projectRoutes.js
│   ├── aboutRoutes.js
│   ├── footerRoutes.js (NEW)
│   └── portfolioRoutes.js (NEW)
└── server.js (updated)

frontend/
├── lib/
│   └── api.ts (updated)
├── app/
│   └── admin/
│       └── page.tsx (updated)
├── .env.local (NEW)
└── .env.example (NEW)
```

## Important Notes

1. **CORS**: Backend sudah setup CORS untuk semua origin - pastikan sudah adjust untuk production
2. **Images**: Semua images disimpan di `/uploads` folder di backend
3. **Upsert Logic**: Landing, About, Footer menggunakan upsert (hanya ada 1 entry, auto-update)
4. **Projects**: Delete all existing, then create new projects (clearup + refresh)
5. **MongoDB Connection**: Pastikan MongoDB sudah running sebelum start backend

## Troubleshooting

### ✗ Cannot connect to MongoDB
- Pastikan MongoDB sudah running
- Check MONGO_URI di .env file
- Untuk local: run `mongod` di terminal lain
- Untuk Atlas: check username/password dan connection string

### ✗ CORS error di frontend
- Check backend server sudah running
- Check NEXT_PUBLIC_API_URL di frontend/.env.local
- Pastikan port backend (default 5000) tidak conflict

### ✗ Image upload tidak bekerja
- Check `/uploads` folder exists di backend
- Check write permission di folder
- Lihat backend console untuk error message

## Next Steps

Untuk production deployment:
1. Update NEXT_PUBLIC_API_URL ke production backend URL
2. Update CORS origin di backend server.js
3. Use MongoDB Atlas untuk cloud database
4. Deploy frontend ke Vercel, backend ke Railway/Render/Heroku
