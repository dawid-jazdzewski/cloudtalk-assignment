import { Injectable, Logger } from '@nestjs/common';

import { UsersSeedService } from './providers/users/users.seed.service';
import { TasksSeedService } from './providers/tasks/tasks.seed.service';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly usersSeedService: UsersSeedService,
    private readonly tasksSeedService: TasksSeedService,
  ) {}

  async run(): Promise<void> {
    this.logger.log('Seeding database');

    const user = await this.usersSeedService.run();
    await this.tasksSeedService.run(user);

    this.logger.log('Database seeded');
  }
}
