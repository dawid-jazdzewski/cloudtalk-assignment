import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConnectionProvider } from './postgres.connection.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConnectionProvider,
    }),
  ],
})
export class PostgresConnectionModule {}
