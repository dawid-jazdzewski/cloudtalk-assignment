import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { FindManyTasksSearchQueryParams } from '../types';

export const FindManyTasksSearch = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindManyTasksSearchQueryParams => {
    const { query } = ctx.switchToHttp().getRequest();

    const status = query?.status;

    return { status };
  },
);
