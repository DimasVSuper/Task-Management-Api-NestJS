# Tasks DTO

## CreateTaskDto
Fields:
- `title` (string, required)
- `description` (string, optional)
- `status` (enum, optional)
- `priority` (enum, optional)
- `dueDate` (ISO string, optional)
- `projectId` (number, required)
- `assignedUserId` (number, optional)

Validation rules:
- `@IsNotEmpty()` and `@IsString()` on `title`
- `@IsOptional()` and `@IsString()` on `description`
- `@IsOptional()` and `@IsEnum(TaskStatus)` on `status`
- `@IsOptional()` and `@IsEnum(TaskPriority)` on `priority`
- `@IsOptional()` and `@IsDateString()` on `dueDate`
- `@IsNotEmpty()`, `@Type(() => Number)`, `@IsInt()` on `projectId`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()` on `assignedUserId`

Use:
- `POST /tasks`

## UpdateTaskDto
Fields:
- `title` (string, optional)
- `description` (string, optional)
- `status` (enum, optional)
- `priority` (enum, optional)
- `dueDate` (ISO string, optional)
- `assignedUserId` (number, optional)
- `projectId` (number, optional)

Validation rules:
- `@IsOptional()` and `@IsString()` on `title`
- `@IsOptional()` and `@IsString()` on `description`
- `@IsOptional()` and `@IsEnum(TaskStatus)` on `status`
- `@IsOptional()` and `@IsEnum(TaskPriority)` on `priority`
- `@IsOptional()` and `@IsDateString()` on `dueDate`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()` on `assignedUserId`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()` on `projectId`

Use:
- `PATCH /tasks/:id`

## QueryTasksDto
Fields:
- `status` (enum, optional)
- `priority` (enum, optional)
- `projectId` (number, optional)
- `assignedUserId` (number, optional)
- `search` (string, optional)
- `page` (number, optional)
- `limit` (number, optional)

Validation rules:
- `@IsOptional()` and `@IsEnum(TaskStatus)` on `status`
- `@IsOptional()` and `@IsEnum(TaskPriority)` on `priority`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()` on `projectId`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()` on `assignedUserId`
- `@IsOptional()` and `@IsString()` on `search`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()`, `@IsPositive()` on `page`
- `@IsOptional()`, `@Type(() => Number)`, `@IsInt()`, `@IsPositive()` on `limit`

Use:
- `GET /tasks`
