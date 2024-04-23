import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '@/config/config.service';

@Injectable()
export class PostgresConnectionProvider implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.database.type,
      url: this.configService.database.url,
      host: this.configService.database.host,
      port: this.configService.database.port,
      username: this.configService.database.username,
      password: this.configService.database.password,
      database: this.configService.database.name,
      synchronize: this.configService.database.synchronize,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.database.logging,
      migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      migrationsRun: this.configService.database.runMigrations,
      maxQueryExecutionTime: 150,
      cli: {
        migrationsDir: 'src/database/migrations',
      },
      extra: {
        max: this.configService.database.maxConnections,
      },
      autoLoadEntities: true,
    } as TypeOrmModuleOptions;
  }
}
