import { registerAs } from '@nestjs/config';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBooleanString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { validateConfig } from '@/config/utils';

import { DatabaseConfig } from './database.config.type';

class DatabaseEnvValidator {
  @IsOptional()
  @IsString()
  DATABASE_URL?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_TYPE?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_HOST?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  @Type(() => Number)
  DATABASE_PORT?: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  @IsOptional()
  DATABASE_PASSWORD?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_NAME?: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DATABASE_USERNAME?: string;

  @IsBooleanString()
  @IsOptional()
  DATABASE_SYNCHRONIZE?: string;

  @IsBooleanString()
  @IsOptional()
  DATABASE_LOGGING?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  DATABASE_MAX_CONNECTIONS?: number;

  @IsBooleanString()
  @IsOptional()
  DATABASE_SSL_ENABLED?: string;

  @IsBooleanString()
  @IsOptional()
  DATABASE_REJECT_UNAUTHORIZED?: string;

  @IsBooleanString()
  @IsOptional()
  DATABASE_RUN_MIGRATIONS?: string;

  @IsBooleanString()
  @IsOptional()
  DATABASE_RUN_SEED?: string;

  @IsString()
  @IsOptional()
  DATABASE_SEED_USERNAME?: string;

  @IsString()
  @IsOptional()
  DATABASE_SEED_PASSWORD?: string;
}

export const databaseConfig = registerAs<DatabaseConfig>('database', () => {
  const validatedConfig = validateConfig(process.env, DatabaseEnvValidator);

  return {
    type: validatedConfig.DATABASE_TYPE,
    url: validatedConfig.DATABASE_URL,
    host: validatedConfig.DATABASE_HOST,
    port: validatedConfig.DATABASE_PORT || 5432,
    password: validatedConfig.DATABASE_PASSWORD,
    name: validatedConfig.DATABASE_NAME,
    logging: validatedConfig.DATABASE_LOGGING === 'true',
    username: validatedConfig.DATABASE_USERNAME,
    synchronize: validatedConfig.DATABASE_SYNCHRONIZE === 'true',
    maxConnections: validatedConfig.DATABASE_MAX_CONNECTIONS || 100,
    sslEnabled: validatedConfig.DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized: validatedConfig.DATABASE_REJECT_UNAUTHORIZED === 'true',
    runMigrations: validatedConfig.DATABASE_RUN_MIGRATIONS === 'true',
    runSeed: validatedConfig.DATABASE_RUN_SEED === 'true',
    seedUsername: validatedConfig.DATABASE_SEED_USERNAME || 'example',
    seedPassword: validatedConfig.DATABASE_SEED_PASSWORD || 'SuperHard8!',
  };
});
