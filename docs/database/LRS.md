# LRS — Logical Relational Schema and Requirements Specification


## Logical Relational Schema

Desain relasional ini memastikan data terstruktur, mudah di-query, dan konsisten dengan domain task management.

### Konsep normalisasi
- Entitas disimpan di tabel terpisah
- Setiap tabel hanya menyimpan atribut yang relevan
- Relasi diwakili dengan foreign keys
- Data duplikat diminimalkan

### Tabel utama

#### users
- `id` bigint PK auto increment
- `name` varchar
- `email` varchar UNIQUE
- `password` varchar
- `createdAt` timestamp
- `updatedAt` timestamp

#### projects
- `id` bigint PK auto increment
- `name` varchar
- `description` text
- `ownerId` bigint FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

#### tasks
- `id` bigint PK auto increment
- `title` varchar
- `description` text
- `status` enum('TODO','IN_PROGRESS','DONE')
- `priority` enum('LOW','MEDIUM','HIGH')
- `dueDate` datetime NULL
- `projectId` bigint FK -> `projects.id`
- `assignedUserId` bigint NULL FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

#### comments
- `id` bigint PK auto increment
- `content` text
- `taskId` bigint FK -> `tasks.id`
- `userId` bigint FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

### Relasi logis
- `User` 1:N `Project` melalui `projects.ownerId`
- `Project` 1:N `Task` melalui `tasks.projectId`
- `User` 1:N `Task` melalui `tasks.assignedUserId`
- `Task` 1:N `Comment` melalui `comments.taskId`
- `User` 1:N `Comment` melalui `comments.userId`

### Foreign key behavior
- `projects.ownerId` -> `users.id` (`RESTRICT` atau `NO ACTION`)
- `tasks.projectId` -> `projects.id` (`CASCADE` saat project dihapus)
- `tasks.assignedUserId` -> `users.id` (`SET NULL` saat user dihapus)
- `comments.taskId` -> `tasks.id` (`CASCADE` saat task dihapus)
- `comments.userId` -> `users.id` (`SET NULL` atau `RESTRICT` sesuai kebijakan)

### Index dan performa
- `users.email` UNIQUE
- `projects.ownerId`
- `tasks.projectId`
- `tasks.assignedUserId`
- `tasks.status`
- `tasks.priority`
- `comments.taskId`

### TypeORM mapping
- Gunakan `@Entity()` untuk setiap tabel
- `@PrimaryGeneratedColumn()` untuk id
- `@CreateDateColumn()` dan `@UpdateDateColumn()` untuk timestamp
- `@Column({ type: 'enum', enum: TaskStatus })` untuk `status`
- `@Column({ nullable: true })` untuk `assignedUserId` dan `dueDate`
- `@ManyToOne()` + `@JoinColumn()` dan `@OneToMany()` untuk relasi
- `autoLoadEntities: true` di koneksi TypeORM

### Praktik database
- `createdAt` dan `updatedAt` otomatis
- Email user harus unik
- Hindari cascade tak terkontrol kecuali untuk cleanup task/comment
- Simpan password sebagai hash, bukan plain text

### Migration dan seed
- Buat migration untuk skema tabel
- Jangan andalkan `synchronize: true` di production
- Siapkan seed data untuk user admin, sample project, sample task, dan sample comment
