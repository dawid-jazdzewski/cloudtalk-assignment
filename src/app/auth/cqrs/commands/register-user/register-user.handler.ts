import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';

import { RegisterEndpointResponse } from '@/app/auth/types';
import { UsersService } from '@/app/users/users.service';
import { UserAlreadyExistsException } from '@/app/auth/exceptions';

import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements IInferredCommandHandler<RegisterUserCommand> {
  constructor(private readonly usersService: UsersService) {}

  async execute({ registerDto }: RegisterUserCommand): Promise<RegisterEndpointResponse> {
    const user = await this.usersService.findByUsername(registerDto.username);

    if (user) throw new UserAlreadyExistsException();

    const newUser = await this.usersService.createUser(registerDto);

    return { user: newUser };
  }
}
