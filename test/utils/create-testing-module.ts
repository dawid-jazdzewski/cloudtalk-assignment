import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { configureMainApp } from '@/utils';

export const createTestingModule = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  configureMainApp(app);

  return app;
};
