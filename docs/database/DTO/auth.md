# Auth DTOs

## RegisterDto
Fields:
- `name` (string, required)
- `email` (string, required, valid email)
- `password` (string, required, minimum 6 characters)

Validation rules:
- `@IsNotEmpty()` on `name`
- `@IsEmail()` on `email`
- `@IsNotEmpty()` and `@MinLength(6)` on `password`

Use:
- `POST /auth/register`

## LoginDto
Fields:
- `email` (string, required)
- `password` (string, required)

Validation rules:
- `@IsEmail()` on `email`
- `@IsNotEmpty()` and `@MinLength(6)` on `password`

Use:
- `POST /auth/login`
