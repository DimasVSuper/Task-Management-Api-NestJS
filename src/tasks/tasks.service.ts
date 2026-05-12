import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskPriority, TaskStatus } from '../database/entities/task.entity';
import { Project } from '../database/entities/project.entity';
import { User } from '../database/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTasksDto } from './dto/query-tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(payload: CreateTaskDto): Promise<Task> {
    const project = await this.projectRepo.findOne({ where: { id: payload.projectId } });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    let assignedUser: User | null = null;
    if (payload.assignedUserId !== undefined) {
      assignedUser = await this.userRepo.findOne({ where: { id: payload.assignedUserId } });
      if (!assignedUser) {
        throw new NotFoundException('Assigned user not found');
      }
    }

    const task = new Task();
    task.title = payload.title;
    task.description = payload.description ?? null;
    task.status = payload.status ?? TaskStatus.TODO;
    task.priority = payload.priority ?? TaskPriority.MEDIUM;
    task.dueDate = payload.dueDate ? new Date(payload.dueDate) : null;
    task.project = project;
    task.projectId = project.id;
    task.assignedUser = assignedUser;
    task.assignedUserId = assignedUser?.id ?? null;

    return this.tasksRepo.save(task);
  }

  findAll(query: QueryTasksDto): Promise<Task[]> {
    const qb = this.tasksRepo.createQueryBuilder('task');

    qb.leftJoinAndSelect('task.project', 'project');
    qb.leftJoinAndSelect('task.assignedUser', 'assignedUser');
    qb.leftJoinAndSelect('task.comments', 'comments');

    if (query.status) {
      qb.andWhere('task.status = :status', { status: query.status });
    }

    if (query.priority) {
      qb.andWhere('task.priority = :priority', { priority: query.priority });
    }

    if (query.projectId) {
      qb.andWhere('task.projectId = :projectId', { projectId: query.projectId });
    }

    if (query.assignedUserId) {
      qb.andWhere('task.assignedUserId = :assignedUserId', {
        assignedUserId: query.assignedUserId,
      });
    }

    if (query.search) {
      qb.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? Math.min(query.limit, 100) : 10;

    qb.take(limit).skip((page - 1) * limit);
    qb.orderBy('task.createdAt', 'DESC');

    return qb.getMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['project', 'assignedUser', 'comments'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, payload: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (payload.title !== undefined) task.title = payload.title;
    if (payload.description !== undefined) task.description = payload.description;
    if (payload.status !== undefined) task.status = payload.status;
    if (payload.priority !== undefined) task.priority = payload.priority;
    if (payload.dueDate !== undefined) {
      task.dueDate = payload.dueDate ? new Date(payload.dueDate) : null;
    }

    if (payload.projectId !== undefined) {
      const project = await this.projectRepo.findOne({ where: { id: payload.projectId } });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      task.project = project;
      task.projectId = project.id;
    }

    if (payload.assignedUserId !== undefined) {
      if (payload.assignedUserId === null) {
        task.assignedUser = null;
        task.assignedUserId = null;
      } else {
        const assignedUser = await this.userRepo.findOne({
          where: { id: payload.assignedUserId },
        });
        if (!assignedUser) {
          throw new NotFoundException('Assigned user not found');
        }
        task.assignedUser = assignedUser;
        task.assignedUserId = assignedUser.id;
      }
    }

    return this.tasksRepo.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tasksRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
