import { Command } from '@nestjs-architects/typed-cqrs';

import { LoginDto } from '@/app/auth/dto';
import { LoginEndpointResponse } from '@/app/auth/types';

export class LoginUserCommand extends Command<LoginEndpointResponse> {
  constructor(public readonly loginDto: LoginDto) {
    super();
  }
}
