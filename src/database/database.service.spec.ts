import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { Comment } from './entities/comment.entity';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User, Project, Task, Comment]),
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TypeORM Connection', () => {
    it('should connect to the database', async () => {
      const connection = await service.getConnection();
      expect(connection).toBeDefined();
    });
  });

  describe('Database Entities', () => {
    it('should have the correct entities defined', () => {
      expect(User).toBeDefined();
      expect(Project).toBeDefined();
      expect(Task).toBeDefined();
      expect(Comment).toBeDefined();
    });
  });
});
