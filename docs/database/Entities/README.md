# Entity Documentation

## User
Fields:
- `id` bigint PK
- `name` string
- `email` string unique
- `password` string (hashed)
- `createdAt` timestamp
- `updatedAt` timestamp

Relations:
- `projects`: One user owns many projects
- `assignedTasks`: One user can be assigned many tasks
- `comments`: One user can write many comments

## Project
Fields:
- `id` bigint PK
- `name` string
- `description` text
- `ownerId` bigint FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

Relations:
- `owner`: Many-to-one user
- `tasks`: One project has many tasks

## Task
Fields:
- `id` bigint PK
- `title` string
- `description` text
- `status` enum (TODO, IN_PROGRESS, DONE)
- `priority` enum (LOW, MEDIUM, HIGH)
- `dueDate` datetime nullable
- `projectId` bigint FK -> `projects.id`
- `assignedUserId` bigint nullable FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

Relations:
- `project`: Many-to-one project
- `assignedUser`: Many-to-one user
- `comments`: One task has many comments

## Comment
Fields:
- `id` bigint PK
- `content` text
- `taskId` bigint FK -> `tasks.id`
- `userId` bigint nullable FK -> `users.id`
- `createdAt` timestamp
- `updatedAt` timestamp

Relations:
- `task`: Many-to-one task
- `user`: Many-to-one user (optional)
