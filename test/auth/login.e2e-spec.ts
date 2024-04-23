import { randomUUID } from 'crypto';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule, registerUser } from './../utils';

describe('Login (e2e)', () => {
  let app: INestApplication;

  const username = `login.${randomUUID()}`;
  const password = 'SuperStrong8!';

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();

    await registerUser(app, { username, password });
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should fail to login unexisting user: (POST) /api/v1/auth/login', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        username: `unexisting.${randomUUID()}`,
        password,
      })
      .expect(401);
  });

  it('Should fail to login user with wrong password: (POST) /api/v1/auth/login', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        username,
        password: 'WrongPassword8!',
      })
      .expect(401);
  });

  it('Should login user: (POST) /api/v1/auth/login', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        username,
        password,
      })
      .expect(200);
  });
});
