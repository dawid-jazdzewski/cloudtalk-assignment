import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { configureMainApp } from './utils';
import { SeedModule } from './database/seed/seed.module';
import { SeedService } from './database/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  configureMainApp(app);

  await app.listen(configService.app.port);

  if (configService.database.runSeed) {
    const seedApp = await NestFactory.create(SeedModule);
    const seedService = seedApp.get(SeedService);
    await seedService.run();

    await seedApp.close();
  }
}

void bootstrap();
