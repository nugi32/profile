# Security Audit — Ringkasan Perbaikan

Audit dilakukan terhadap seluruh source code (auth, CORS, API routes, admin
actions, rendering di sisi publik). Poin bagus yang sudah ada sejak awal:
semua field CMS dirender lewat JSX biasa (bukan `dangerouslySetInnerHTML`),
jadi React otomatis meng-escape konten — tidak ada stored/reflected XSS yang
saya temukan di jalur render publik. Semua server action mutasi sudah
memvalidasi sesi admin sendiri-sendiri (bukan cuma mengandalkan middleware).
Filter query MongoDB dibatasi ke field & tipe yang dikenal di schema, jadi
tidak rentan NoSQL injection dari query string.

Berikut yang saya temukan dan perbaiki:

## 1. Next.js 16.2.10 — beberapa CVE kritis (npm audit)
`next@16.2.10` punya beberapa advisory severity **critical/high**, termasuk
kemungkinan RCE di server Windows, SSRF di Server Actions/rewrites, dan DoS.
**Fix:** upgrade ke `next@16.3.5` (versi stabil terbaru yang sudah dipatch)
+ `eslint-config-next` disamakan, lockfile di-regenerate. `npm audit` sekarang
menunjukkan **0 vulnerabilities** (termasuk transitive: postcss, sharp,
undici ikut terupdate).

## 2. Tidak ada security header sama sekali (termasuk anti-XSS: CSP)
Sebelumnya tidak ada `Content-Security-Policy`, `X-Frame-Options`,
`X-Content-Type-Options`, dll — jadi walau saat ini tidak ada XSS aktif,
tidak ada lapisan pertahanan kalau suatu saat ada kesalahan (mis. nanti ada
yang menambahkan `dangerouslySetInnerHTML` untuk rich text editor).
**Fix (`middleware.ts` + `app/layout.tsx`):**
- CSP dengan **nonce per-request** untuk `script-src` (+ `strict-dynamic`),
  jadi hanya script yang di-generate Next.js sendiri (dan satu inline script
  theme-flash yang sudah diberi nonce) yang boleh jalan — script asing yang
  disuntikkan lewat celah apa pun akan diblokir browser.
- `frame-ancestors 'none'` + `X-Frame-Options: DENY` → anti-clickjacking,
  penting untuk halaman `/admin`.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `Strict-Transport-Security`.
- Header ini sekarang berlaku untuk **semua route**, bukan cuma `/admin`.

## 3. Race condition bootstrap admin pertama via GitHub OAuth
Alur "first sign-in becomes admin" untuk credentials login sudah pakai lock
(`claimFirstAdminSetup`), tapi jalur GitHub OAuth di `lib/auth.ts` tidak —
dua orang yang sign-in GitHub bersamaan pada saat `admins` collection masih
kosong berpotensi sama-sama lolos jadi admin pertama.
**Fix:** jalur GitHub sekarang pakai lock yang sama + re-check setelah klaim
berhasil, konsisten dengan jalur register form.

## 4. CORS: header `Access-Control-Allow-Credentials: true` tidak perlu
Endpoint publik (`/api/[collection]`, `/api/[collection]/[id]`) adalah read-only & tanpa autentikasi — tidak pernah
butuh cookie sesi. Mengizinkan `Allow-Credentials: true` di situ tidak
memberi manfaat apa pun tapi menambah permukaan risiko kalau suatu saat
whitelist origin kebobolan/salah isi.
**Fix:** header itu dihapus dari kedua route publik tsb (config CORS admin
di `/api/cors` — yang memang butuh auth — tidak diubah).

## 5. Hardening kecil lainnya
- `bcrypt` cost factor dinaikkan dari **10 → 12** (di `lib/admins.ts` dan
  `scripts/create-admin.mjs`) untuk memperlambat brute-force offline kalau
  hash password pernah bocor.
- `poweredByHeader: false` di `next.config.ts` — tidak lagi mengekspos
  header `X-Powered-By: Next.js` (info disclosure kecil).

## Rekomendasi tambahan (tidak saya ubah, tapi perlu Anda pertimbangkan)
- **GitHub OAuth bootstrap**: siapa pun dengan akun GitHub bisa jadi admin
  pertama jika mereka membuka situs sebelum Anda mendaftar. Kalau Anda akan
  pakai `GITHUB_ID`/`GITHUB_SECRET`, sebaiknya set `ALLOWED_ADMIN_EMAILS` di
  `.env.local` *sebelum* deploy publik.
- Rate-limit login saat ini in-memory per instance (sudah didokumentasikan
  di kode) — cukup untuk single-instance, tapi tidak konsisten kalau nanti
  deploy multi-instance (mis. beberapa Vercel function berjalan paralel).
  Kalau butuh proteksi brute-force yang ketat, pertimbangkan Redis/Upstash
  atau rate-limit di edge/WAF.
- Build produksi di sandbox saya gagal hanya karena tidak ada akses jaringan
  ke `fonts.googleapis.com` (dibatasi environment saya) — `next/font/google`
  butuh fetch font saat build. Type-check (`tsc --noEmit`) dan lint sudah
  saya jalankan dan lolos bersih; build sesungguhnya akan berhasil di
  environment Anda yang punya akses internet normal.

## Cara pakai
1. Extract zip ini, replace project lama Anda (atau `npm install` langsung
   di folder ini).
2. `npm install`
3. `npm run build` lalu deploy seperti biasa.
