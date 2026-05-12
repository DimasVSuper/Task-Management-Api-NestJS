import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../database/entities/comment.entity';
import { Task } from '../database/entities/task.entity';
import { User } from '../database/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(taskId: number, payload: CreateCommentDto): Promise<Comment> {
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const comment = new Comment();
    comment.content = payload.content;
    comment.task = task;
    comment.taskId = task.id;

    if (payload.userId !== undefined) {
      const user = await this.userRepo.findOne({ where: { id: payload.userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      comment.user = user;
      comment.userId = user.id;
    } else {
      comment.user = null;
      comment.userId = null;
    }

    return this.commentRepo.save(comment);
  }

  async findByTask(taskId: number): Promise<Comment[]> {
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.commentRepo.find({
      where: { taskId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
