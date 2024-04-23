import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserPayload = createParamDecorator(
  (param: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (param) return request.user[param];

    return request.user;
  },
);
