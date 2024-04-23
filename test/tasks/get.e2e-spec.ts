import { randomUUID } from 'crypto';

import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { CreateTaskDto } from '@/app/tasks/dto';
import { TaskEntityStatus } from '@/app/tasks/entities';

import { createTask, createTestingModule, loginUser, registerUser } from '../utils';

const MOCK_TASKS: CreateTaskDto[] = [
  {
    title: 'Task title',
    description: 'Task description',
  },
  {
    title: 'Another title',
    description: 'Another description',
    status: TaskEntityStatus.IN_PROGRESS,
  },
  {
    title: 'Last title',
    description: 'Last description',
    status: TaskEntityStatus.COMPLETED,
  },
];

describe('Get tasks (e2e)', () => {
  let app: INestApplication;

  const username = `get-tasks.${randomUUID()}`;
  const password = 'SuperStrong8!';

  let accessToken = '';
  let taskId = '';

  beforeAll(async () => {
    app = await createTestingModule();
    await app.init();

    await registerUser(app, { username, password });
    const response = await loginUser(app, { username, password });

    accessToken = response.accessToken;

    for (const MOCK_TASK of MOCK_TASKS) {
      const { task } = await createTask(app, accessToken, MOCK_TASK);
      taskId = task.id;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should fail to get task without authorization: (GET) /api/v1/tasks', () => {
    return request(app.getHttpServer()).get('/api/v1/tasks').expect(401);
  });

  it('Validates that tasks were created: (GET) /api/v1/tasks', () => {
    return request(app.getHttpServer())
      .get('/api/v1/tasks')
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.length).toBe(3);
      });
  });

  it('Should fetch task by id: (GET) /api/v1/tasks/:id', () => {
    return request(app.getHttpServer())
      .get(`/api/v1/tasks/${taskId}`)
      .auth(accessToken, { type: 'bearer' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.task.id).toBe(taskId);
        expect(body.task.description).toBeDefined();
      });
  });

  describe('Sorting', () => {
    it('Validates that tasks are sorted by createdAt DESC by default: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          const [first, second, third] = body.data;

          const firstCreatedAt = new Date(first.createdAt).getTime();
          const secondCreatedAt = new Date(second.createdAt).getTime();
          const thirdCreatedAt = new Date(third.createdAt).getTime();

          expect(firstCreatedAt).toBeGreaterThan(secondCreatedAt);
          expect(secondCreatedAt).toBeGreaterThan(thirdCreatedAt);
        });
    });

    it('Should fetch tasks sorted by title ASC: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ sortBy: 'title', sortOrder: 'ASC' })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          const [first, second, third] = body.data;

          expect(first.title).toBe('Another title');
          expect(second.title).toBe('Last title');
          expect(third.title).toBe('Task title');
        });
    });

    it('Should fetch tasks sorted by title DESC: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ sortBy: 'title', sortOrder: 'DESC' })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          const [first, second, third] = body.data;

          expect(first.title).toBe('Task title');
          expect(second.title).toBe('Last title');
          expect(third.title).toBe('Another title');
        });
    });
  });

  describe('Pagination', () => {
    it('Should fetch first 2 tasks: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ limit: 2 })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.length).toBe(2);
          expect(body.hasNextPage).toBe(true);
        });
    });

    it('Should fetch tasks from page 2: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ limit: 1, page: 2 })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.length).toBe(1);
        });
    });
  });

  describe('Search', () => {
    it('Should filter tasks: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ searchValue: 'Another' })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.length).toBe(1);
          expect(body.data[0].title).toBe('Another title');
        });
    });
  });

  describe('Filtering', () => {
    it('Should fetch tasks in backlog: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ status: TaskEntityStatus.BACKLOG })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          body.data.forEach((task) => {
            expect(task.status).toBe(TaskEntityStatus.BACKLOG);
          });
        });
    });

    it('Should fetch tasks in_progress: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ status: TaskEntityStatus.IN_PROGRESS })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          body.data.forEach((task) => {
            expect(task.status).toBe(TaskEntityStatus.IN_PROGRESS);
          });
        });
    });

    it('Should fetch completed tasks: (GET) /api/v1/tasks', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/tasks')
        .query({ status: TaskEntityStatus.COMPLETED })
        .auth(accessToken, { type: 'bearer' })
        .expect(200)
        .expect(({ body }) => {
          body.data.forEach((task) => {
            expect(task.status).toBe(TaskEntityStatus.COMPLETED);
          });
        });
    });
  });
});
