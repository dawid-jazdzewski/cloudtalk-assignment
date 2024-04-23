import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { TasksModule } from './app/tasks/tasks.module';
import { RoutesModule } from './routes.module';

@Module({
  imports: [AuthModule, ConfigModule, DatabaseModule, TasksModule, UsersModule, RoutesModule],
})
export class AppModule {}
