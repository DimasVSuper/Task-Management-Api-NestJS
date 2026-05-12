# Comments DTO

## CreateCommentDto
Fields:
- `content` (string, required)
- `userId` (number, optional)

Validation rules:
- `@IsNotEmpty()` on `content`
- `@IsString()` on `content`
- `@Type(() => Number)` and `@IsInt()` on `userId`

Use:
- `POST /tasks/:id/comments`
