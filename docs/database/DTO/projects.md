# Projects DTO

## CreateProjectDto
Fields:
- `name` (string, required)
- `description` (string, optional)
- `ownerId` (number, required)

Validation rules:
- `@IsNotEmpty()` and `@IsString()` on `name`
- `@IsOptional()` and `@IsString()` on `description`
- `@IsNotEmpty()` on `ownerId`

Use:
- `POST /projects`

## UpdateProjectDto
Fields:
- `name` (string, optional)
- `description` (string, optional)
- `ownerId` (number, optional)

Validation rules:
- `@IsOptional()` and `@IsString()` on `name`
- `@IsOptional()` and `@IsString()` on `description`
- `@IsOptional()` on `ownerId`

Use:
- `PATCH /projects/:id`
