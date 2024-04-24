import { Command } from '@nestjs-architects/typed-cqrs';

import { RegisterDto } from '@/app/auth/dto';
import { RegisterEndpointResponse } from '@/app/auth/types';

export class RegisterUserCommand extends Command<RegisterEndpointResponse> {
  constructor(public readonly registerDto: RegisterDto) {
    super();
  }
}
