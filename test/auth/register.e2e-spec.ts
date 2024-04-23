import { randomUUID } from 'crypto';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule } from './../utils';

describe('Register (e2e)', () => {
  let app: INestApplication;

  const username = `register.${randomUUID()}`;
  const password = 'SuperStrong8!';

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should fail to register user with weak password: (POST) /api/v1/auth/register', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        username,
        password: 'weak',
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.details.password).toBeDefined();
      });
  });

  it('Should register user with password: (POST) /api/v1/auth/register', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        username,
        password,
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.user.id).toBeDefined();
      });
  });

  it('Should fail to register user with existing username: (POST) /api/v1/auth/register', () => {
    return request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        username,
        password,
      })
      .expect(409);
  });
});
