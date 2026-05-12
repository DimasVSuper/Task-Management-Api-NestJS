import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { Comment } from './entities/comment.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? '127.0.0.1',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'db_task_management',
  entities: [User, Project, Task, Comment],
  synchronize: true, // for convenience in dev only
});

async function seed() {
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOne({
    where: { email: 'admin@example.com' },
  });
  if (!existing) {
    const user = userRepo.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password', // change to hashed password in production
    });
    await userRepo.save(user);
    console.log('Seeded user:', user.email);
  } else {
    console.log('User already exists:', existing.email);
  }

  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
