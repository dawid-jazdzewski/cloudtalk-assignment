import { Module } from '@nestjs/common';

import { ConfigModule } from '@/config/config.module';

import { DatabaseModule } from '../database.module';

import { SeedService } from './seed.service';
import { UsersSeedModule } from './providers/users/users.seed.module';
import { TasksSeedModule } from './providers/tasks/tasks.seed.module';

@Module({
  imports: [DatabaseModule, ConfigModule, UsersSeedModule, TasksSeedModule],
  providers: [SeedService],
})
export class SeedModule {}
