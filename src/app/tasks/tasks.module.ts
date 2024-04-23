import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities';
import { TasksService } from './tasks.service';
import { TasksRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksService],
})
export class TasksModule {}
