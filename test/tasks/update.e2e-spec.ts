import { randomUUID } from 'crypto';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { CreateTaskDto } from '@/app/tasks/dto';

import { createTask, createTestingModule, loginUser, registerUser } from '../utils';

const MOCK_TASK: CreateTaskDto = {
  title: 'Task title',
  description: 'Task description',
};

describe('Update task (e2e)', () => {
  let app: INestApplication;

  const username = `update-task.${randomUUID()}`;
  const password = 'SuperStrong8!';

  let accessToken = '';
  let taskId = '';

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();

    await registerUser(app, { username, password });
    const response = await loginUser(app, { username, password });
    accessToken = response.accessToken;

    const { task } = await createTask(app, accessToken, MOCK_TASK);
    taskId = task.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should fail to update task without authorization: (PATCH) /api/v1/tasks/:id', () => {
    return request(app.getHttpServer())
      .patch(`/api/v1/tasks/${taskId}`)
      .send({
        title: 'Task title',
        description: 'Task description',
      })
      .expect(401);
  });

  it('Should update task title, description and status (PATCH) /api/v1/tasks/:id', () => {
    return request(app.getHttpServer())
      .patch(`/api/v1/tasks/${taskId}`)
      .auth(accessToken, { type: 'bearer' })
      .send({
        title: 'Updated title',
        description: 'Updated description',
        status: 'completed',
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body.task.title).toBe('Updated title');
        expect(body.task.description).toBe('Updated description');
        expect(body.task.status).toBe('completed');
      });
  });
});
