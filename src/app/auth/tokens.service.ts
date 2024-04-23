import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@/config/config.service';

import { UserEntity } from '../users/entities';

import { GenerateAccessTokenPayload, TokenData } from './types/token.type';

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generate(user: UserEntity): TokenData {
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
