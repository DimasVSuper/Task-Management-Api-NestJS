Goal MVP

Bikin:

Task Management REST API

mirip:

Trello mini
Linear mini
Jira mini sederhana

Fokus:

clean architecture
auth
relational database
Redis caching
scalable NestJS structure
Kenapa TypeORM?

Karena:

sangat umum di ecosystem NestJS
decorator-based
integration Nest sangat natural
banyak dipakai di enterprise Nest apps

Dan kamu jadi belajar:

Entity-driven architecture

yang memang khas TypeORM.

MVP Features
1. Authentication Module
Features
register
login
current user profile
Endpoints
POST /auth/register
POST /auth/login
GET /auth/me
2. Users Module
Features
view profile
update profile
Endpoints
GET /users/:id
PATCH /users/:id
3. Projects Module
Features
create project
list projects
project detail
update project
delete project
Endpoints
POST /projects
GET /projects
GET /projects/:id
PATCH /projects/:id
DELETE /projects/:id
4. Tasks Module

Core utama.

Features
create task
list tasks
task detail
update task
delete task
pagination
filtering
search
Task Filters
Query params
status
priority
projectId
assignedUserId
search
page
limit

Contoh:

GET /tasks?status=TODO&page=1&limit=10
Task Endpoints
POST /tasks
GET /tasks
GET /tasks/:id
PATCH /tasks/:id
DELETE /tasks/:id
5. Comments Module (Optional MVP+)
Features
comment on task
list task comments
Endpoints
POST /tasks/:id/comments
GET /tasks/:id/comments
Database Design
User Entity
Fields
id
name
email
password
createdAt
updatedAt
Project Entity
Fields
id
name
description
ownerId
createdAt
updatedAt
Task Entity
Fields
id
title
description
status
priority
dueDate
projectId
assignedUserId
createdAt
updatedAt
Comment Entity
Fields
id
content
taskId
userId
createdAt
Enums
Task Status
TODO
IN_PROGRESS
DONE
Task Priority
LOW
MEDIUM
HIGH
Entity Relations
User → Projects
One user has many projects
Project → Tasks
One project has many tasks
User → Tasks
Task can be assigned to one user
Task → Comments
One task has many comments
Redis Requirements
1. Cache Task List

Cache:

GET /tasks

TTL:

60 seconds
2. Cache Project List

Cache:

GET /projects
3. Rate Limiting

Apply ke:

POST /auth/login
POST /auth/register
Folder Structure
src/
  auth/
  users/
  projects/
  tasks/
  comments/

  database/
  redis/

  common/
    guards/
    decorators/
    interceptors/
    filters/

  config/

  app.module.ts
  main.ts
Required Packages
TypeORM + MySQL
npm install @nestjs/typeorm typeorm mysql2
Redis
npm install ioredis
Config
npm install @nestjs/config
Auth
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
Types
npm install -D @types/passport-jwt @types/bcrypt
Validation
npm install class-validator class-transformer
Environment Variables
.env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=task_management

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

JWT_SECRET=supersecret
Software Requirements
1. Node.js
versi LTS terbaru
2. MySQL

Install:

MySQL Community Server

Buat database:

CREATE DATABASE task_management;
3. Redis

Windows:

Memurai Redis for Windows
atau WSL Ubuntu Redis
MVP Learning Goals

Kalau MVP ini selesai, kamu akan belajar:

NestJS modules
Controllers
Services
DTO
Validation
TypeORM entities
Relations
JWT auth
Guards
Redis caching
REST API design
Pagination
Filtering