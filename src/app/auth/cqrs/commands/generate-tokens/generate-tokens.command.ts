import { Command } from '@nestjs-architects/typed-cqrs';

import { TokensData } from '@/app/auth/types/token.type';
import { UserEntity } from '@/app/users/entities';

export class GenerateTokensCommand extends Command<TokensData> {
  constructor(public readonly user: UserEntity) {
    super();
  }
}
