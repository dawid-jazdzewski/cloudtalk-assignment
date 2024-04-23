import { randomUUID } from 'crypto';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createTestingModule, loginUser, registerUser } from '../utils';

describe('Create task (e2e)', () => {
  let app: INestApplication;

  const username = `create-task.${randomUUID()}`;
  const password = 'SuperStrong8!';

  let accessToken = '';

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();

    await registerUser(app, { username, password });
    const response = await loginUser(app, { username, password });

    accessToken = response.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should fail to create task without authorization: (POST) /api/v1/tasks', () => {
    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .send({
        title: 'Task title',
        description: 'Task description',
      })
      .expect(401);
  });

  it('Should fail to create task without title or description: (POST) /api/v1/tasks', async () => {
    await request(app.getHttpServer())
      .post('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .send({
        description: 'Task description',
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.details.title).toBeDefined();
      });

    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Task title',
      })
      .expect(422)
      .expect(({ body }) => {
        expect(body.details.description).toBeDefined();
      });
  });

  it('Should create task: (POST) /api/v1/tasks', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Task title',
        description: 'Task description',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.task.id).toBeDefined();
        expect(body.task.title).toBe('Task title');
        expect(body.task.description).toBe('Task description');
        expect(body.task.status).toBe('backlog');
      });
  });

  it('Should create task with different status: (POST) /api/v1/tasks', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Task title',
        description: 'Task description',
        status: 'in_progress',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.task.id).toBeDefined();
        expect(body.task.title).toBe('Task title');
        expect(body.task.description).toBe('Task description');
        expect(body.task.status).toBe('in_progress');
      });
  });

  it('Validates that tasks were created: (GET) /api/v1/tasks', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.length).toBe(2);
      });
  });
});
