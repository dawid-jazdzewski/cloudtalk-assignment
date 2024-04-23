import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { LoginDto, RegisterDto } from '@/app/auth/dto';
import { LoginEndpointResponse, RegisterEndpointResponse } from '@/app/auth/types';
import { CreateTaskDto } from '@/app/tasks/dto';
import { CreateTaskEndpointResponse } from '@/app/tasks/types';

export const registerUser = async (
  app: INestApplication,
  user: RegisterDto,
): Promise<RegisterEndpointResponse> => {
  return request(app.getHttpServer())
    .post('/api/v1/auth/register')
    .send(user)
    .expect(201)
    .then(({ body }) => body);
};

export const loginUser = async (
  app: INestApplication,
  user: LoginDto,
): Promise<LoginEndpointResponse> => {
  return request(app.getHttpServer())
    .post('/api/v1/auth/login')
    .send(user)
    .expect(200)
    .then(({ body }) => body);
};

export const createTask = async (
  app: INestApplication,
  accessToken: string,
  task: CreateTaskDto,
): Promise<CreateTaskEndpointResponse> => {
  return request(app.getHttpServer())
    .post('/api/v1/tasks')
    .auth(accessToken, { type: 'bearer' })
    .send(task)
    .expect(201)
    .then(({ body }) => body);
};
