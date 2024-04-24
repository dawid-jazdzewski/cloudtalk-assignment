import { CommandBus, CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';

import { LoginEndpointResponse } from '@/app/auth/types';
import { UsersService } from '@/app/users/users.service';
import { InvalidPasswordException } from '@/app/auth/exceptions';

import { GenerateTokensCommand } from '../generate-tokens';

import { LoginUserCommand } from './login-user.command';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements IInferredCommandHandler<LoginUserCommand> {
  constructor(
    private readonly usersService: UsersService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ loginDto }: LoginUserCommand): Promise<LoginEndpointResponse> {
    const user = await this.usersService.validate(loginDto.username, loginDto.password);

    if (!user) throw new InvalidPasswordException();

    const { accessToken, expiresIn } = await this.commandBus.execute(
      new GenerateTokensCommand(user),
    );

    return {
      accessToken,
      expiresIn,
      user,
    };
  }
}
