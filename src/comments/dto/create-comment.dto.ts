import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;
}

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  content?: string;
}
