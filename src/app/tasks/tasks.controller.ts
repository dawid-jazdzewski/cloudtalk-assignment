import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, Search, Sort } from '@/common/decorators';
import { PaginationQueryParams, SearchQueryParams, SortQueryParams } from '@/common/types';

import { UserPayload } from '../auth/decorators';

import {
  CreateTaskEndpointResponse,
  FindManyTasksEndpointResponse,
  FindManyTasksSearchQueryParams,
  FindTaskByIdEndpointResponse,
  UpdateTaskEndpointResponse,
} from './types';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import {
  CreateTaskEndpoint,
  FindManyTasksEndpoint,
  FindTaskByIdEndpoint,
  UpdateTaskEndpoint,
} from './tasks.endpoints';
import { FindManyTasksSearch } from './decorators';

@ApiTags('Tasks')
@UseGuards(AuthGuard('jwt'))
@Controller({ version: '1' })
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @FindManyTasksEndpoint()
  async findManyTasks(
    @UserPayload('userId') userId: string,
    @Pagination() pagination: PaginationQueryParams,
    @Sort() sort: SortQueryParams,
    @Search() search: SearchQueryParams,
    @FindManyTasksSearch() findManyTasksSearch: FindManyTasksSearchQueryParams,
  ): Promise<FindManyTasksEndpointResponse> {
    return this.tasksService.findManyTasks(userId, pagination, sort, search, findManyTasksSearch);
  }

  @FindTaskByIdEndpoint()
  async findTaskById(
    @UserPayload('userId') userId: string,
    @Param('id') taskId: string,
  ): Promise<FindTaskByIdEndpointResponse> {
    return this.tasksService.findTaskById(userId, taskId);
  }

  @CreateTaskEndpoint()
  async createTask(
    @UserPayload('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskEndpointResponse> {
    return this.tasksService.createTask(userId, createTaskDto);
  }

  @UpdateTaskEndpoint()
  async updateTask(
    @UserPayload('userId') userId: string,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskEndpointResponse> {
    return this.tasksService.updateTask(userId, taskId, updateTaskDto);
  }
}
