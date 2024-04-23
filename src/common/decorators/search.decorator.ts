import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { SearchQueryParams } from '@/common/types';

export const Search = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SearchQueryParams => {
    const { query } = ctx.switchToHttp().getRequest();

    const searchValue = query?.searchValue;

    return { searchValue };
  },
);
