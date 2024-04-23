import { Module } from '@nestjs/common';

import { UsersModule } from '@/app/users/users.module';

import { UsersSeedService } from './users.seed.service';

@Module({
  imports: [UsersModule],
  providers: [UsersSeedService],
  exports: [UsersSeedService],
})
export class UsersSeedModule {}
