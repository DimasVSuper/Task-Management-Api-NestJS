import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from '../database/entities/comment.entity';
import { Task } from '../database/entities/task.entity';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Task, User])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
