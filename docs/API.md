# API Documentation

## Authentication

### POST /auth/register
Request body:
- `name` (string, required)
- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)

Response:
- `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

### POST /auth/login
Request body:
- `email` (string, required)
- `password` (string, required)

Response:
- `accessToken` (JWT)

### GET /auth/me
Headers:
- `Authorization: Bearer <accessToken>`

Response:
- `id`
- `name`
- `email`

## Users

### POST /users
Request body:
- `name` (string)
- `email` (string)
- `password` (string)

Response:
- `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

### GET /users
Response:
- array of user objects

### GET /users/:id
Response:
- user object

### PATCH /users/:id
Request body:
- `name` (string, optional)
- `email` (string, optional)
- `password` (string, optional)

Response:
- updated user object

### DELETE /users/:id
Response:
- no content

## Projects

### POST /projects
Request body:
- `name` (string, required)
- `description` (string, optional)
- `ownerId` (number, required)

Response:
- project object

### GET /projects
Response:
- array of project objects with owner

### GET /projects/:id
Response:
- project object with owner

### PATCH /projects/:id
Request body:
- `name` (string, optional)
- `description` (string, optional)
- `ownerId` (number, optional)

Response:
- updated project object

### DELETE /projects/:id
Response:
- no content

## Tasks

### POST /tasks
Request body:
- `title` (string, required)
- `description` (string, optional)
- `status` (TODO | IN_PROGRESS | DONE, optional)
- `priority` (LOW | MEDIUM | HIGH, optional)
- `dueDate` (ISO string, optional)
- `projectId` (number, required)
- `assignedUserId` (number, optional)

Response:
- task object

### GET /tasks
Query params:
- `status`
- `priority`
- `projectId`
- `assignedUserId`
- `search`
- `page`
- `limit`

Response:
- array of task objects

### GET /tasks/:id
Response:
- task object with project, assigned user, comments

### PATCH /tasks/:id
Request body:
- same fields as create task, optional

Response:
- updated task object

### DELETE /tasks/:id
Response:
- no content

## Comments

### POST /tasks/:id/comments
Request body:
- `content` (string, required)
- `userId` (number, optional)

Response:
- comment object

### GET /tasks/:id/comments
Response:
- array of comment objects
Response: no content

## Projects

### POST /projects
Request body:
- `name` (string, required)
- `description` (string, optional)
- `ownerId` (number, required)

Response: project data

### GET /projects
Response: list of projects with owner

### GET /projects/:id
Response: project detail

### PATCH /projects/:id
Request body:
- `name` (string, optional)
- `description` (string, optional)
- `ownerId` (number, optional)

Response: updated project

### DELETE /projects/:id
Response: no content

## Tasks

### POST /tasks
Request body:
- `title` (string, required)
- `description` (string, optional)
- `status` (TODO | IN_PROGRESS | DONE, optional)
- `priority` (LOW | MEDIUM | HIGH, optional)
- `dueDate` (ISO string, optional)
- `projectId` (number, required)
- `assignedUserId` (number, optional)

Response: task data

### GET /tasks
Query params:
- `status`
- `priority`
- `projectId`
- `assignedUserId`
- `search`
- `page`
- `limit`

Response: paginated task list

### GET /tasks/:id
Response: task detail with project, assigned user, comments

### PATCH /tasks/:id
Request body: same fields as create task, all optional

Response: updated task

### DELETE /tasks/:id
Response: no content

## Comments

### POST /tasks/:id/comments
Request body:
- `content` (string, required)
- `userId` (number, optional)

Response: comment data

### GET /tasks/:id/comments
Response: list of comments for task
