import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './app/auth/auth.module';
import { TasksModule } from './app/tasks/tasks.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'tasks',
        module: TasksModule,
      },
    ]),
  ],
})
export class RoutesModule {}
