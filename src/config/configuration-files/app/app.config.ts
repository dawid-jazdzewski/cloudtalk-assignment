import { registerAs } from '@nestjs/config';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { validateConfig } from '@/config/utils';

import { AppConfig } from './app.config.type';

class AppEnvValidator {
  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  @Type(() => Number)
  APP_PORT: number;

  @IsString()
  @IsOptional()
  APP_API_PREFIX: string;
}

export const appConfig = registerAs<AppConfig>('app', () => {
  const validatedConfig = validateConfig(process.env, AppEnvValidator);

  return {
    port: validatedConfig.APP_PORT || 5432,
    name: validatedConfig.APP_NAME || 'NestJS APP',
    apiPrefix: validatedConfig.APP_API_PREFIX || 'api',
  };
});
