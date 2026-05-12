import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../database/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const userRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    userRepo.findOne.mockResolvedValue(null);
    userRepo.save.mockImplementation(async (user) => ({ ...user, id: 1 }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should able to create a user', async () => {
    const user = await service.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id', expect.any(Number));
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'johndoe@email.com');
    expect(user).toHaveProperty('password', expect.any(String));
  });
});
