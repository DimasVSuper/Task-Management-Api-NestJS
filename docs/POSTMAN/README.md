# Postman Documentation

Dokumentasi ini menjelaskan cara menggunakan Postman untuk menguji API `task-management-api-nest-js`.

## Isi folder
- `POSTMAN_TESTING.md` — panduan pengujian endpoint dan urutan request.
- `task-management-api.postman_collection.json` — koleksi Postman untuk semua endpoint.
- `task-management-api.postman_environment.json` — environment variable Postman.

## Cara pakai
1. Buka Postman.
2. Buat environment baru atau gunakan environment global.
3. Tambahkan variable berikut (atau impor `task-management-api.postman_environment.json`):
   - `baseUrl` misalnya `http://localhost:3000`
   - `token` kosong pada awalnya
   - `authUserId` kosong
   - `testUserId` kosong
   - `projectId` kosong
   - `taskId` kosong
4. Impor `task-management-api.postman_collection.json` ke Postman.
5. Impor `task-management-api.postman_environment.json` sebagai environment.
6. Jalankan request sesuai urutan di `POSTMAN_TESTING.md`.

## Catatan terstruktur
- `authUserId` akan terisi ketika register berhasil.
- `token` akan terisi saat login berhasil.
- `projectId` akan terisi setelah create project berhasil.
- `taskId` akan terisi setelah create task berhasil.
- `testUserId` akan terisi setelah create user berhasil.

## Tujuan
- Memverifikasi endpoint auth, users, projects, tasks, comments
- Menguji alur register/login dan penggunaan token JWT
- Menguji CRUD pada resources utama dengan ID dinamis
