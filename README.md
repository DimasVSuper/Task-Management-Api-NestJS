# Task Management API NestJS

Proyek ini adalah aplikasi backend REST API sederhana untuk manajemen tugas. Dibangun dengan NestJS, TypeORM, MySQL, Redis, JWT, dan validasi request via class-validator.

## Tujuan Proyek
Proyek ini dibuat sebagai media pembelajaran saya untuk memahami NestJS lebih dalam. Pengembangan dilakukan dengan bantuan GitHub Copilot agar saya dapat belajar:

- struktur modul NestJS
- konsep entity, DTO, dan repository dengan TypeORM
- autentikasi JWT dan proteksi endpoint
- validasi request pada DTO
- pembuatan endpoint CRUD untuk users, projects, tasks, comments
- dokumentasi dan pengujian API menggunakan Postman

## Fitur Utama
- Autentikasi: register, login, current user
- Users: create, list, detail, update, delete
- Projects: create, list, detail, update, delete
- Tasks: create, list, detail, update, delete
- Comments: tambah komentar ke task dan lihat daftar komentar
- Dokumentasi API dan Postman collection untuk pengujian

## Struktur Dokumentasi
- `docs/API.md` — dokumentasi endpoint REST API
- `docs/ARCHITECTURE.md` — dependency dan arsitektur
- `docs/MVP.md` — daftar fitur MVP
- `docs/NestCLI.md` — panduan menggunakan NestJS CLI
- `docs/database/LRS.md` — skema relasional database
- `docs/database/DTO/` — dokumentasi DTO per modul
- `docs/database/Entities/README.md` — dokumentasi entity dan relasi
- `docs/POSTMAN/` — dokumentasi pengujian Postman

## Instalasi
1. Salin file `.env.example` menjadi `.env`
2. Sesuaikan konfigurasi database dan Redis jika diperlukan
3. Install dependency:
   ```bash
   npm install
   ```

## Menjalankan Aplikasi
```bash
npm run start:dev
```

Akses API di `http://localhost:3000`

## Menjalankan Test
```bash
npm run test
```

## Postman
Gunakan folder `docs/POSTMAN/` untuk pengujian:
- `README.md`
- `POSTMAN_TESTING.md`
- `task-management-api.postman_collection.json`
- `task-management-api.postman_environment.json`

## Catatan Pembelajaran
Proyek ini ditujukan sebagai latihan saya dalam menguasai NestJS dengan bantuan Copilot. Fokus utamanya adalah belajar dan memahami alur pengembangan, bukan hanya sekadar fitur.

## Lisensi
Proyek ini digunakan untuk tujuan pembelajaran.
