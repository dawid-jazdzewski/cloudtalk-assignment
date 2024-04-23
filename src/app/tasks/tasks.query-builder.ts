import { BaseQueryBuilder } from '@/common/query-builders';
import { SearchQueryParams } from '@/common/types';

import { TaskEntity, TaskEntityStatus } from './entities';
import { TasksRepository } from './repositories';

export class TasksQueryBuilder extends BaseQueryBuilder<TaskEntity> {
  constructor(tasksRepository: TasksRepository) {
    super(tasksRepository.createQueryBuilder('task'), tasksRepository);
  }

  addSearch(search: SearchQueryParams): this {
    const searchableFields = [`${this.queryBuilder.alias}.title`];

    super.addSearch(search, searchableFields);

    return this;
  }

  owner(userId: string): this {
    this.queryBuilder.andWhere(`${this.queryBuilder.alias}.ownerId = :userId`, { userId });

    return this;
  }

  status(status?: TaskEntityStatus): this {
    if (!status) return this;

    this.queryBuilder.andWhere(`${this.queryBuilder.alias}.status = :status`, { status });

    return this;
  }
}
