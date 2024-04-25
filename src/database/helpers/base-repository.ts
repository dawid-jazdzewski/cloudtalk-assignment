import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { PaginationQueryParams } from '@/common/types';
import { PaginatedResponse } from '@/common/types/pagination.type';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  buildPaginatedResponse(
    data: T[],
    count: number,
    pagination: PaginationQueryParams,
  ): PaginatedResponse<T> {
    return {
      data,
      total: count,
      pageNumber: pagination.pageNumber,
      limit: pagination.limit,
      hasNextPage: count > pagination.limit * pagination.pageNumber,
    };
  }
}
