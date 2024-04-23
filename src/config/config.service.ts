import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { appConfig, authConfig, databaseConfig } from './configuration-files';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(appConfig.KEY)
    public app: ConfigType<typeof appConfig>,

    @Inject(authConfig.KEY)
    public auth: ConfigType<typeof authConfig>,

    @Inject(databaseConfig.KEY)
    public database: ConfigType<typeof databaseConfig>,
  ) {}
}
