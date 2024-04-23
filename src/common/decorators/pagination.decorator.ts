import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PaginationQueryParams } from '../types';
import {
  PAGINATION_DEFAULT_LIMIT,
  PAGINATION_DEFAULT_PAGE,
  PAGINATION_MAX_LIMIT,
} from '../constants';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryParams => {
    const { query } = ctx.switchToHttp().getRequest();

    const rawLimit = +query?.limit || PAGINATION_DEFAULT_LIMIT;
    const rawPage = +query?.page || PAGINATION_DEFAULT_PAGE;

    const limit = (() => {
      if (rawLimit > PAGINATION_MAX_LIMIT) return PAGINATION_MAX_LIMIT;
      if (rawLimit < 1) return 1;
      return rawLimit;
    })();

    const page = (() => {
      if (rawPage < 1) return 1;
      return rawPage;
    })();

    return { limit, page };
  },
);
