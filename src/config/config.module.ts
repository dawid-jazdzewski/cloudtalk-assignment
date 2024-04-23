import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { configurationFiles } from './configuration-files';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      load: configurationFiles,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
