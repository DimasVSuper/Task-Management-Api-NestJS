import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../database/entities/project.entity';
import { User } from '../database/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(payload: CreateProjectDto): Promise<Project> {
    const owner = await this.userRepo.findOne({ where: { id: payload.ownerId } });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const project = new Project();
    project.name = payload.name;
    project.description = payload.description ?? null;
    project.owner = owner;
    project.ownerId = owner.id;

    return this.projectRepo.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepo.find({ relations: ['owner'] });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: number, payload: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    if (payload.name !== undefined) project.name = payload.name;
    if (payload.description !== undefined) project.description = payload.description;

    if (payload.ownerId !== undefined) {
      const owner = await this.userRepo.findOne({ where: { id: payload.ownerId } });
      if (!owner) {
        throw new NotFoundException('Owner not found');
      }
      project.owner = owner;
      project.ownerId = owner.id;
    }

    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }
}
