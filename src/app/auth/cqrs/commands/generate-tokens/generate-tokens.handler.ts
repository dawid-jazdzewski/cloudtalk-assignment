import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { GenerateAccessTokenPayload, TokensData } from '@/app/auth/types';
import { ConfigService } from '@/config/config.service';

import { GenerateTokensCommand } from './generate-tokens.command';

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler implements IInferredCommandHandler<GenerateTokensCommand> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute({ user }: GenerateTokensCommand): Promise<TokensData> {
    const accessTokenPayload: GenerateAccessTokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(accessTokenPayload);

    return {
      accessToken,
      expiresIn: this.configService.auth.accessTokenExpiresIn,
    };
  }
}
