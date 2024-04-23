import { Injectable, Logger } from '@nestjs/common';

import { UserEntity } from '@/app/users/entities';
import { TasksService } from '@/app/tasks/tasks.service';
import { TaskEntityStatus } from '@/app/tasks/entities';

import { SeedServiceProvider } from '../../types';

@Injectable()
export class TasksSeedService implements SeedServiceProvider {
  private readonly logger = new Logger(TasksSeedService.name);

  constructor(private readonly tasksService: TasksService) {}

  async run(user: UserEntity | null): Promise<void> {
    if (!user) {
      this.logger.verbose('No user created, skipping task seeding');
      return;
    }

    if (await this.taskExists(user.id)) {
      this.logger.verbose('Tasks already exist');
      return;
    }

    this.logger.log('Seeding tasks');

    await this.tasksService.createTask(user.id, {
      title: 'Task 1',
      description: 'Task 1 description',
    });

    await this.tasksService.createTask(user.id, {
      title: 'Task 2',
      description: 'Task 2 description',
      status: TaskEntityStatus.IN_PROGRESS,
    });

    await this.tasksService.createTask(user.id, {
      title: 'Task 3',
      description: 'Task 3 description',
      status: TaskEntityStatus.COMPLETED,
    });
  }

  async taskExists(userId: string): Promise<boolean> {
    const tasks = await this.tasksService.findTasksByUserId(userId);
    return tasks.length > 0;
  }
}
