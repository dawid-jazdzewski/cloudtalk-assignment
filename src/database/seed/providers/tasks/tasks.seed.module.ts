import { Module } from '@nestjs/common';

import { TasksModule } from '@/app/tasks/tasks.module';

import { TasksSeedService } from './tasks.seed.service';

@Module({
  imports: [TasksModule],
  providers: [TasksSeedService],
  exports: [TasksSeedService],
})
export class TasksSeedModule {}
