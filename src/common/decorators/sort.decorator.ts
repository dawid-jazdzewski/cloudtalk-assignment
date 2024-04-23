import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { SortQueryParams } from '@/common/types';

export const Sort = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SortQueryParams => {
    const { query } = ctx.switchToHttp().getRequest();

    const sortBy = query?.sortBy;
    const sortOrder = query?.sortOrder;

    return { sortBy, sortOrder };
  },
);
