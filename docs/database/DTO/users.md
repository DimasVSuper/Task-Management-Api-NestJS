# Users DTO

## CreateUserDto
Fields:
- `name` (string, required)
- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)

Validation rules:
- `@IsNotEmpty()` on `name`
- `@IsEmail()` on `email`
- `@IsNotEmpty()` and `@MinLength(6)` on `password`

Use:
- `POST /users`

## UpdateUserDto
Fields:
- `name` (string, optional)
- `email` (string, optional, valid email)
- `password` (string, optional, minimum 6 characters)

Validation rules:
- `@IsOptional()` on all fields
- `@IsEmail()` on `email`
- `@MinLength(6)` on `password`

Use:
- `PATCH /users/:id`
