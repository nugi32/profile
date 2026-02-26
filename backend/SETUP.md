# Backend Setup Guide

## Prerequisites

- Node.js (v14+)
- MongoDB (lokalt atau di cloud)
- npm atau yarn

## Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Buat file `.env` di folder `backend/`:

```bash
cp .env.example .env
```

Ubah isi `.env` dengan konfigurasi MongoDB Anda:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/portfolio

# Server Port (optional)
PORT=5000

# Environment
NODE_ENV=development
```

### MongoDB Connection Options

#### Option A: Local MongoDB
```env
MONGO_URI=mongodb://localhost:27017/portfolio
```

**Setup MongoDB Lokal:**
- Download: https://www.mongodb.com/try/download/community
- Install dan jalankan MongoDB service
- Verifika dengan `mongo` atau `mongosh` di terminal

#### Option B: MongoDB Atlas (Cloud)
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Setup MongoDB Atlas:**
1. Buat akun di https://www.mongodb.com/cloud/atlas
2. Buat cluster baru
3. Buat database user
4. Copy connection string
5. Ganti `<password>` dengan password user
6. Append `/portfolio` untuk nama database

### 3. Run Backend

```bash
npm run devBackend
```

Expected output jika berhasil:
```
=== Starting Backend Server ===
Environment: development
Port: 5000
MongoDB URI: ✓ Set
✓ MongoDB Connected
✓ Server running on http://localhost:5000
=============================
```

## API Endpoints

### Projects
- `GET /api/projects` - Ambil semua projects
- `POST /api/projects` - Buat project baru (dengan image file)
- `GET /api/projects/:id` - Ambil project spesifik
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Hapus project

### Landing Page
- `GET /api/landing` - Ambil landing page data
- `POST /api/landing` - Update landing page (dengan hero image)

### About
- `GET /api/about` - Ambil about data
- `POST /api/about` - Update about (dengan avatar)

### Contact
- `GET /api/contact` - Ambil contact info
- `POST /api/contact` - Update contact info

### Health Check
- `GET /api/health` - Check server & database status

## Testing API

### Using Postman atau insomnia

#### Test Upload Project
```
POST /api/projects
Content-Type: multipart/form-data

Form Data:
- title: "My Project"
- description: "Project description"
- link: "https://..."
- technologies: "React, Node.js"
- image: (select file)
```

#### Test Get Projects
```
GET /api/projects
```

## Troubleshooting

### Error: "MONGO_URI not set"
- Silakan pastikan file `.env` ada di folder `backend/`
- Jangan lupa untuk `npm install` sebelumnya

### Error: "Connection timeout"
- MongoDB service tidak running
- Jika lokal, pastikan MongoDB sudah dijalankan
- Jika Atlas, check connection string dan firewall IP whitelist

### Error: "Cannot find module"
- Jalankan `npm install` untuk install dependencies

### Image tidak tersimpan
- Pastikan folder `backend/uploads/` ada
- Check write permissions di folder
- Folder akan dibuat otomatis jika tidak ada

## Development

### File Structure
```
backend/
├── config/       # Database config
├── controllers/  # Business logic
├── models/       # MongoDB schemas
├── routes/       # API routes
├── middleware/   # Express middleware
├── uploads/      # User uploaded files (auto-created)
├── server.js     # Main server file
├── .env          # Environment variables (create this)
└── .env.example  # Template
```

### Environment
- **Development**: NODE_ENV=development (detailed logging)
- **Production**: NODE_ENV=production (minimal logging)

## Database Backup

### Export Database
```bash
mongodump --uri="mongodb://localhost:27017/portfolio" --out ./backup
```

### Import Database
```bash
mongorestore --uri="mongodb://localhost:27017/portfolio" ./backup/portfolio
```

## Performance Tips

1. **Index frequently queried fields** - Already configured in models
2. **Limit upload file size** - Currently 5MB max per image
3. **Use pagination for large datasets** - Can be implemented in getProjects()
4. **Enable MongoDB compression** - Add `compressors=snappy` to MONGO_URI

## Security Notes

- JANGAN share `.env` file atau MONGO_URI dengan orang lain
- Setup firewall IP whitelist di MongoDB Atlas
- Gunakan strong password untuk database user
- Enable CORS hanya untuk domains yang dipercaya

## Next Steps

1. ✓ Setup MongoDB
2. ✓ Create `.env` file
3. ✓ Run `npm install`
4. ✓ Run `npm run devBackend`
5. Test endpoints dengan Postman
6. Connect frontend ke backend API
