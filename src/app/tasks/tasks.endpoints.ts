import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  SerializeOptions,
  UnauthorizedException,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

import { ValidationException } from '@/common/exceptions';
import { PaginationQueryParams, SearchQueryParams, SortQueryParams } from '@/common/types';

import { TaskSerialization } from './serialization';
import {
  CreateTaskEndpointResponse,
  FindManyTasksEndpointResponse,
  FindManyTasksSearchQueryParams,
  FindTaskByIdEndpointResponse,
  UpdateTaskEndpointResponse,
} from './types';

export const FindManyTasksEndpoint = () =>
  applyDecorators(
    Get(),
    HttpCode(HttpStatus.OK),
    ApiBearerAuth(),
    ApiOkResponse({ type: FindManyTasksEndpointResponse }),
    ApiException(() => [UnauthorizedException]),
    ApiQuery({ name: 'pagination', type: PaginationQueryParams }),
    ApiQuery({ name: 'search', type: SearchQueryParams }),
    ApiQuery({ name: 'sort', type: SortQueryParams }),
    ApiQuery({ name: 'findManyTasksSearch', type: FindManyTasksSearchQueryParams }),
  );

export const FindTaskByIdEndpoint = () =>
  applyDecorators(
    Get(':id'),
    HttpCode(HttpStatus.OK),
    SerializeOptions({ groups: [TaskSerialization.DETAILS] }),
    ApiBearerAuth(),
    ApiOkResponse({ type: FindTaskByIdEndpointResponse }),
    ApiException(() => [UnauthorizedException]),
  );

export const CreateTaskEndpoint = () =>
  applyDecorators(
    Post(),
    HttpCode(HttpStatus.CREATED),
    SerializeOptions({ groups: [TaskSerialization.DETAILS] }),
    ApiBearerAuth(),
    ApiCreatedResponse({ type: CreateTaskEndpointResponse }),
    ApiException(() => [UnauthorizedException, ValidationException]),
  );

export const UpdateTaskEndpoint = () =>
  applyDecorators(
    Patch(':id'),
    HttpCode(HttpStatus.OK),
    SerializeOptions({ groups: [TaskSerialization.DETAILS] }),
    ApiBearerAuth(),
    ApiOkResponse({ type: UpdateTaskEndpointResponse }),
    ApiException(() => [UnauthorizedException, ValidationException, NotFoundException]),
  );
