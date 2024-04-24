import { Brackets, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

import { PaginationQueryParams, SearchQueryParams, SortQueryParams } from '../types';

export class BaseQueryBuilder<T extends ObjectLiteral> {
  protected queryBuilder: SelectQueryBuilder<T>;
  protected repository: Repository<T>;

  constructor(queryBuilder: SelectQueryBuilder<T>, repository: Repository<T>) {
    this.queryBuilder = queryBuilder;
    this.repository = repository;
  }

  addPagination(pagination: PaginationQueryParams): this {
    this.queryBuilder
      .limit(pagination.limit)
      .offset((pagination.pageNumber - 1) * pagination.limit);

    return this;
  }

  addSearch(search: SearchQueryParams, fields: string[]): this {
    if (!search.searchValue) return this;

    this.queryBuilder.andWhere(
      new Brackets((qb) => {
        fields.forEach((field) => {
          qb.orWhere(`${field} ILIKE :search`, { search: `%${search.searchValue}%` });
        });
      }),
    );

    return this;
  }

  addSort(sort: SortQueryParams): this {
    if (!sort.sortBy) return this;

    this.queryBuilder.orderBy(`${this.queryBuilder.alias}.${sort.sortBy}`, sort.sortOrder);

    return this;
  }

  complete(): SelectQueryBuilder<T> {
    return this.queryBuilder;
  }
}
