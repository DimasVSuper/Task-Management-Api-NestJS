# Postman Testing Guide

## Environment variables
Gunakan Postman environment dengan variable:
- `baseUrl` = `http://localhost:3000`
- `token` = ``
- `authUserId` = ``
- `testUserId` = ``
- `projectId` = ``
- `taskId` = ``

## Urutan pengujian
1. `Auth / Register`
2. `Auth / Login`
3. `Auth / Get Profile`
4. `Users / Create User`
5. `Users / Get User by ID`
6. `Users / Update User`
7. `Users / Delete User`
8. `Projects / Create Project`
9. `Projects / Get Project by ID`
10. `Projects / Update Project`
11. `Projects / Delete Project`
12. `Tasks / Create Task`
13. `Tasks / Get Task by ID`
14. `Tasks / Update Task`
15. `Tasks / Delete Task`
16. `Comments / Create Comment`
17. `Comments / List Comments`

## 1. Auth
### Register
- Method: `POST`
- URL: `{{baseUrl}}/auth/register`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password"
}
```
- Expected: user object tanpa password
- Setelah berhasil, variable `authUserId` akan terisi otomatis jika menggunakan collection.

### Login
- Method: `POST`
- URL: `{{baseUrl}}/auth/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password"
}
```
- Expected: JWT access token
- Setelah berhasil, token akan tersimpan di variable `token`.

### Get current user
- Method: `GET`
- URL: `{{baseUrl}}/auth/me`
- Header:
  - `Authorization: Bearer {{token}}`
- Expected: user profile

## 2. Users
### Create User
- Method: `POST`
- URL: `{{baseUrl}}/users`
- Body (JSON):
```json
{
  "name": "Another User",
  "email": "another@example.com",
  "password": "password"
}
```
- Setelah berhasil, variable `testUserId` akan terisi otomatis.

### List Users
- Method: `GET`
- URL: `{{baseUrl}}/users`

### Get User by ID
- Method: `GET`
- URL: `{{baseUrl}}/users/{{testUserId}}`

### Update User
- Method: `PATCH`
- URL: `{{baseUrl}}/users/{{testUserId}}`
- Body (JSON):
```json
{
  "name": "Updated User"
}
```

### Delete User
- Method: `DELETE`
- URL: `{{baseUrl}}/users/{{testUserId}}`

## 3. Projects
### Create Project
- Method: `POST`
- URL: `{{baseUrl}}/projects`
- Body (JSON):
```json
{
  "name": "Project A",
  "description": "Contoh project",
  "ownerId": {{authUserId}}
}
```
- Setelah berhasil, variabel `projectId` akan terisi otomatis.

### List Projects
- Method: `GET`
- URL: `{{baseUrl}}/projects`

### Get Project by ID
- Method: `GET`
- URL: `{{baseUrl}}/projects/{{projectId}}`

### Update Project
- Method: `PATCH`
- URL: `{{baseUrl}}/projects/{{projectId}}`
- Body (JSON):
```json
{
  "description": "Updated description"
}
```

### Delete Project
- Method: `DELETE`
- URL: `{{baseUrl}}/projects/{{projectId}}`

## 4. Tasks
### Create Task
- Method: `POST`
- URL: `{{baseUrl}}/tasks`
- Body (JSON):
```json
{
  "title": "Task 1",
  "description": "Task sample",
  "projectId": {{projectId}},
  "assignedUserId": {{authUserId}},
  "status": "TODO",
  "priority": "MEDIUM"
}
```
- Setelah berhasil, variabel `taskId` akan terisi otomatis.

### List Tasks
- Method: `GET`
- URL: `{{baseUrl}}/tasks`

### Get Task by ID
- Method: `GET`
- URL: `{{baseUrl}}/tasks/{{taskId}}`

### Update Task
- Method: `PATCH`
- URL: `{{baseUrl}}/tasks/{{taskId}}`
- Body (JSON):
```json
{
  "status": "IN_PROGRESS"
}
```

### Delete Task
- Method: `DELETE`
- URL: `{{baseUrl}}/tasks/{{taskId}}`

## 5. Comments
### Add Comment to Task
- Method: `POST`
- URL: `{{baseUrl}}/tasks/{{taskId}}/comments`
- Body (JSON):
```json
{
  "content": "This is a comment",
  "userId": {{authUserId}}
}
```

### List Task Comments
- Method: `GET`
- URL: `{{baseUrl}}/tasks/{{taskId}}/comments`

## Catatan tambahan
- Gunakan header `Content-Type: application/json` untuk semua request JSON.
- Gunakan variable `{{baseUrl}}`, `{{token}}`, `{{authUserId}}`, `{{testUserId}}`, `{{projectId}}`, dan `{{taskId}}`.
- Jalankan request sesuai urutan di atas agar ID dan token otomatis terisi.
- Jika perlu ulang pengujian, ganti nilai email menjadi unik agar register tidak gagal karena user sudah ada.
