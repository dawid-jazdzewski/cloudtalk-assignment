import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@/config/config.service';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';
import { JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';

@Module({
  imports: [
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
  providers: [AuthService, TokensService, JwtStrategy],
})
export class AuthModule {}
