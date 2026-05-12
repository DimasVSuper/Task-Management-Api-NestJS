import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskPriority, TaskStatus } from '../../database/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  projectId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  assignedUserId?: number;
}
