import { QueryHandler, IInferredQueryHandler } from '@nestjs/cqrs';

import { MeEndpointResponse } from '@/app/auth/types';
import { UsersService } from '@/app/users/users.service';
import { UserNotFoundException } from '@/app/auth/exceptions';

import { GetMeQuery } from './get-me.query';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IInferredQueryHandler<GetMeQuery> {
  constructor(private readonly usersService: UsersService) {}

  async execute({ userId }: GetMeQuery): Promise<MeEndpointResponse> {
    const user = await this.usersService.findById(userId);

    if (!user) throw new UserNotFoundException();

    return { user };
  }
}
