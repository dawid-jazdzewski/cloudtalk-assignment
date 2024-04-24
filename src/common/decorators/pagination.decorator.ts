import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PaginationQueryParams } from '../types';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_MAX_LIMIT,
  PAGINATION_MIN_LIMIT,
  PAGINATION_DEFAULT_PAGE_NUMBER,
  PAGINATION_MIN_PAGE_NUMBER,
} from '../constants';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryParams => {
    const { query } = ctx.switchToHttp().getRequest();

    const rawLimit = +query?.limit || PAGINATION_DEFAULT_LIMIT;
    const rawPageNumber = +query?.page || PAGINATION_DEFAULT_PAGE_NUMBER;

    const limit = (() => {
      if (rawLimit > PAGINATION_MAX_LIMIT) return PAGINATION_MAX_LIMIT;
      if (rawLimit < PAGINATION_MIN_LIMIT) return PAGINATION_MIN_LIMIT;
      return rawLimit;
    })();

    const pageNumber = (() => {
      if (rawPageNumber < PAGINATION_MIN_PAGE_NUMBER) return PAGINATION_MIN_PAGE_NUMBER;
      return rawPageNumber;
    })();

    return { limit, pageNumber };
  },
);
