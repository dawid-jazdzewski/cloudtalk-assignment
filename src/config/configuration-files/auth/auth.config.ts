import { registerAs } from '@nestjs/config';
import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

import { validateConfig } from '@/config/utils';

import { AuthConfig } from './auth.config.type';

class AuthEnvValidator {
  @IsString()
  AUTH_ACCESS_TOKEN_SECRET: string;

  @IsNumber()
  @Type(() => Number)
  AUTH_ACCESS_TOKEN_EXPIRES_IN: number;
}

export const authConfig = registerAs<AuthConfig>('auth', () => {
  const validatedConfig = validateConfig(process.env, AuthEnvValidator);

  return {
    accessTokenSecret: validatedConfig.AUTH_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: validatedConfig.AUTH_ACCESS_TOKEN_EXPIRES_IN,
  };
});
