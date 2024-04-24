import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { LoginDto, RegisterDto } from './dto';
import { LoginUserCommand, RegisterUserCommand } from './cqrs/commands';
import { GetMeQuery } from './cqrs/queries';
import { LoginEndpointResponse, MeEndpointResponse, RegisterEndpointResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginEndpointResponse> {
    return this.commandBus.execute(new LoginUserCommand(loginDto));
  }

  async register(registerDto: RegisterDto): Promise<RegisterEndpointResponse> {
    return this.commandBus.execute(new RegisterUserCommand(registerDto));
  }

  async getMe(id: string): Promise<MeEndpointResponse> {
    return this.queryBus.execute(new GetMeQuery(id));
  }
}
