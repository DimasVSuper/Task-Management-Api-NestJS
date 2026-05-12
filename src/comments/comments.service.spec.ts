import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Comment } from '../database/entities/comment.entity';
import { Task } from '../database/entities/task.entity';
import { User } from '../database/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepo: { save: jest.Mock; find: jest.Mock };
  let taskRepo: { findOne: jest.Mock };
  let userRepo: { findOne: jest.Mock };

  beforeEach(async () => {
    commentRepo = {
      save: jest.fn(),
      find: jest.fn(),
    };

    taskRepo = {
      findOne: jest.fn(),
    };

    userRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: commentRepo,
        },
        {
          provide: getRepositoryToken(Task),
          useValue: taskRepo,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment with a valid task and user', async () => {
    const task: Partial<Task> = { id: 1 };
    const user: Partial<User> = { id: 1 };
    const dto: CreateCommentDto = {
      content: 'This is a comment',
      userId: 1,
    };

    taskRepo.findOne.mockResolvedValue(task);
    userRepo.findOne.mockResolvedValue(user);
    commentRepo.save.mockResolvedValue({
      id: 1,
      content: 'This is a comment',
      taskId: 1,
      userId: 1,
      task,
      user,
    });

    const result = await service.create(1, dto);

    expect(taskRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(commentRepo.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: 1,
      content: 'This is a comment',
      taskId: 1,
      userId: 1,
    });
  });

  it('should create a comment without a userId', async () => {
    const task: Partial<Task> = { id: 2 };
    const dto: CreateCommentDto = {
      content: 'Comment without user',
    };

    taskRepo.findOne.mockResolvedValue(task);
    commentRepo.save.mockResolvedValue({
      id: 2,
      content: 'Comment without user',
      taskId: 2,
      userId: null,
      task,
      user: null,
    });

    const result = await service.create(2, dto);

    expect(taskRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
    expect(userRepo.findOne).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      id: 2,
      content: 'Comment without user',
      taskId: 2,
      userId: null,
    });
  });

  it('should throw NotFoundException when task does not exist', async () => {
    taskRepo.findOne.mockResolvedValue(null);

    await expect(service.create(99, { content: 'x' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw NotFoundException when user does not exist', async () => {
    taskRepo.findOne.mockResolvedValue({ id: 3 });
    userRepo.findOne.mockResolvedValue(null);

    await expect(
      service.create(3, { content: 'x', userId: 99 }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return comments for a valid task', async () => {
    const task: Partial<Task> = { id: 4 };
    const fakeComments = [
      { id: 1, content: 'a', taskId: 4, user: null, createdAt: new Date() },
    ];

    taskRepo.findOne.mockResolvedValue(task);
    commentRepo.find.mockResolvedValue(fakeComments);

    const result = await service.findByTask(4);

    expect(taskRepo.findOne).toHaveBeenCalledWith({ where: { id: 4 } });
    expect(commentRepo.find).toHaveBeenCalledWith({
      where: { taskId: 4 },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    expect(result).toBe(fakeComments);
  });

  it('should throw NotFoundException when finding comments for missing task', async () => {
    taskRepo.findOne.mockResolvedValue(null);

    await expect(service.findByTask(999)).rejects.toThrow(
      NotFoundException,
    );
  });
});
