import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(payload: Partial<User>): Promise<User> {
    const name = payload.name !== undefined ? String(payload.name) : undefined;
    const email = payload.email !== undefined ? String(payload.email) : undefined;
    const password = payload.password !== undefined ? String(payload.password) : undefined;

    if (!name || !email || !password) {
      throw new BadRequestException('name, email and password are required');
    }

    const existing = await this.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashed;

    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepo.find({ select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, payload: Partial<User>): Promise<User> {
    const user = await this.findOne(id);

    if (payload.name !== undefined) user.name = String(payload.name);
    if (payload.email !== undefined) user.email = String(payload.email);

    if (payload.password !== undefined) {
      user.password = await bcrypt.hash(String(payload.password), 10);
    }

    return this.usersRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const res = await this.usersRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('User not found');
  }
}
