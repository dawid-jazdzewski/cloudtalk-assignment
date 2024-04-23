import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@/config/config.service';

import { AccessTokenPayload } from '../types/token.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.auth.accessTokenSecret,
    });
  }
  async validate(payload: AccessTokenPayload): Promise<AccessTokenPayload | false> {
    if (!payload.userId) return false;

    return payload;
  }
}
