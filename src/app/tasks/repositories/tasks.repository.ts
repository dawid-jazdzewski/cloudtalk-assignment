import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@/database/helpers';

import { TaskEntity } from '../entities';
import { TasksQueryBuilder } from '../tasks.query-builder';

@Injectable()
export class TasksRepository extends BaseRepository<TaskEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TaskEntity, dataSource);
  }

  createTasksQueryBuilder(): TasksQueryBuilder {
    return new TasksQueryBuilder(this);
  }
}
