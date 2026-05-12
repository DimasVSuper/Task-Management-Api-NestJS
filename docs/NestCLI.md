# NestJS CLI Guide

Panduan ini membantu kamu menggunakan CLI NestJS untuk membuat struktur dasar aplikasi dan modul-modul utama di proyek `task-management-api-nest-js`.

## Persiapan

1. Pastikan kamu sudah menginstal Nest CLI secara global:

```bash
npm install -g @nestjs/cli
```

2. Atau gunakan npx untuk menjalankan CLI tanpa instalasi global:

```bash
npx nest
```

3. Pastikan `package.json` sudah berisi `@nestjs/cli` di devDependencies dan kamu sudah menjalankan `npm install`.

## Perintah dasar NestJS CLI

- `nest new <project-name>`: membuat proyek NestJS baru.
- `nest generate <schematic> <name>` atau `nest g <schematic> <name>`: membuat modul, controller, service, dsb.
- `nest build`: membangun aplikasi ke folder `dist`.
- `nest start`: menjalankan aplikasi.

## Rekomendasi struktur untuk MVP

Untuk MVP task management, gunakan modul berikut:

- `auth`
- `users`
- `projects`
- `tasks`
- `comments` (opsional)
- `common` untuk guards, pipes, decorators, interceptor, filter
- `database` untuk konfigurasi TypeORM
- `redis` untuk konfigurasi caching

## Perintah CLI yang direkomendasikan

Jalankan perintah ini di root proyek:

```bash
npx nest g module auth
npx nest g controller auth
npx nest g service auth

npx nest g module users
npx nest g controller users
npx nest g service users

npx nest g module projects
npx nest g controller projects
npx nest g service projects

npx nest g module tasks
npx nest g controller tasks
npx nest g service tasks

npx nest g module comments
npx nest g controller comments
npx nest g service comments

npx nest g module database
npx nest g module redis
npx nest g module common
```

Jika kamu ingin membuat file DTO atau guard manual, kamu bisa membuatnya tanpa CLI dengan struktur folder `src/<module>/dto`, `src/common/guards`, dsb.

## Contoh pembuatan resource lengkap

Untuk membuat modul bersama controller dan service sekaligus:

```bash
npx nest g resource tasks
```

Atau dengan opsi dan CRUD otomatis:

```bash
npx nest g resource tasks --no-spec --flat
```

Namun untuk kontrol penuh atas struktur dan naming, lebih baik tetap membuat modul, controller, service, dan DTO secara manual.

## Integrasi TypeORM dan entitas

Buat modul database dan entitas:

```bash
npx nest g module database
npx nest g service database
```

Kemudian buat folder `src/database/entities` dan entitas seperti `user.entity.ts`, `project.entity.ts`, `task.entity.ts`, `comment.entity.ts`.

## Auth dan JWT

Untuk auth, buat guard dan strategi JWT:

```bash
npx nest g guard auth/jwt
npx nest g provider auth/jwt-strategy
```

Lalu buat DTO untuk register/login di `src/auth/dto`.

## Tips penggunaan CLI

- Gunakan `--no-spec` jika kamu tidak ingin membuat file test otomatis.
- Gunakan `--flat` jika kamu ingin menempatkan file langsung dalam folder modul tanpa folder tambahan.
- Gunakan `--path` untuk menentukan folder target jika diperlukan.

## Contoh alur kerja implementasi

1. Buat modul dan service `auth`.
2. Buat modul dan service `users`.
3. Tambahkan modul `database` dan konfigurasi TypeORM.
4. Buat entitas dan relasi.
5. Implementasikan CRUD di `projects` dan `tasks`.
6. Tambahkan caching Redis dan rate-limiting.

## Perintah tambahan berguna

- `npm run start:dev`: jalankan mode development dengan watch.
- `npm run build`: membangun aplikasi.
- `npm run lint`: jalankan lint.
- `npm run test`: jalankan test unit.
- `npm run test:e2e`: jalankan test end-to-end.

## Ringkasannya

Gunakan NestJS CLI sebagai alat bantu cepat untuk membuat module/controller/service. Namun untuk MVP berkualitas, pastikan kamu menyesuaikan struktur kode, DTO, validasi, dan konfigurasi secara manual setelah file dibuat.