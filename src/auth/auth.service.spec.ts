import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn().mockImplementation((payload) => Promise.resolve({
      id: 1,
      name: payload.name,
      email: payload.email,
      password: bcrypt.hashSync(payload.password, 10),
    })),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('test-token'),
  };

  beforeEach(async () => {
    mockUsersService.findByEmail.mockClear();
    mockUsersService.create.mockClear();
    mockJwtService.sign.mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('seharusnya terdefinisikan', () => {
    expect(service).toBeDefined();
  });

  it('seharusnya dapat memvalidasi kredensial pengguna', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    const user = await service.validateUser('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  it('seharusnya dapat melakukan login', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    const loginDto = { email: 'test@example.com', password: 'password' };
    const result = await service.login(loginDto);
    expect(result).toHaveProperty('accessToken', 'test-token');
  });

  it('seharusnya dapat melakukan registrasi', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);

    const registerDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };
    const result = await service.register(registerDto);
    expect(result).toBeDefined();
    expect(result.email).toBe(registerDto.email);
  });

  it('seharusnya menolak registrasi dengan email yang sudah terdaftar', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    const registerDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };

    await expect(service.register(registerDto)).rejects.toThrow('Email already registered');
  });

  it('seharusnya menolak login dengan kredensial yang tidak valid', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    const loginDto = { email: 'test@example.com', password: 'wrong-password' };
    await expect(service.login(loginDto)).rejects.toThrow('Invalid credentials');
  });

  it('seharusnya menolak login dengan email yang tidak terdaftar', async () => {
    mockUsersService.findByEmail.mockResolvedValue(null);
    const loginDto = { email: 'nonexistent@example.com', password: 'password' };
    await expect(service.login(loginDto)).rejects.toThrow('Invalid credentials');
  });

  it('seharusnya menolak registrasi dengan email yang sudah terdaftar', async () => {
    mockUsersService.findByEmail.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: bcrypt.hashSync('password', 10),
    });

    const registerDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    };

    await expect(service.register(registerDto)).rejects.toThrow('Email already registered');
  });

  it('seharusnya menolak registrasi dengan data yang tidak lengkap', async () => {
    const registerDto = {
      name: 'Test User',
      email: '',
      password: 'password',
    };
    await expect(service.register(registerDto)).rejects.toThrow('Email already registered');
  });
});