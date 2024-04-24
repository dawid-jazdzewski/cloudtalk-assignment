import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigService } from '@/config/config.service';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthCommandsHandlers } from './cqrs/commands';
import { AuthQueriesHandlers } from './cqrs/queries';

@Module({
  imports: [
    CqrsModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.auth.accessTokenSecret,
        signOptions: { expiresIn: configService.auth.accessTokenExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ...AuthCommandsHandlers, ...AuthQueriesHandlers],
})
export class AuthModule {}
