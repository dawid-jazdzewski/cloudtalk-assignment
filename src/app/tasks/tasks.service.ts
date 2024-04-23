import { Injectable } from '@nestjs/common';

import { PaginationQueryParams, SearchQueryParams, SortQueryParams } from '@/common/types';

import { TasksRepository } from './repositories';
import {
  CreateTaskEndpointResponse,
  FindManyTasksEndpointResponse,
  FindManyTasksSearchQueryParams,
  FindTaskByIdEndpointResponse,
  UpdateTaskEndpointResponse,
} from './types';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskEntity } from './entities';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findManyTasks(
    userId: string,
    pagination: PaginationQueryParams,
    sort: SortQueryParams,
    search: SearchQueryParams,
    findManyTasksSearch: FindManyTasksSearchQueryParams,
  ): Promise<FindManyTasksEndpointResponse> {
    const [tasks, count] = await this.tasksRepository
      .createTasksQueryBuilder()
      .addPagination(pagination)
      .addSort(sort)
      .addSearch(search)
      .owner(userId)
      .status(findManyTasksSearch.status)
      .complete()
      .getManyAndCount();

    return this.tasksRepository.buildPaginatedResponse(tasks, count, pagination);
  }

  async findTaskById(userId: string, taskId: string): Promise<FindTaskByIdEndpointResponse> {
    const task = await this.tasksRepository.findOneOrFail({
      where: {
        id: taskId,
        owner: {
          id: userId,
        },
      },
    });

    return { task };
  }

  async findTasksByUserId(userId: string): Promise<TaskEntity[]> {
    return this.tasksRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<CreateTaskEndpointResponse> {
    const task = await this.tasksRepository.save(
      this.tasksRepository.create({
        ...createTaskDto,
        owner: {
          id: userId,
        },
      }),
    );

    return { task };
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskEndpointResponse> {
    const task = await this.tasksRepository.findOneOrFail({
      where: {
        id: taskId,
        owner: {
          id: userId,
        },
      },
    });

    const updatedTask = await this.tasksRepository.save(
      this.tasksRepository.merge(task, updateTaskDto),
    );

    return { task: updatedTask };
  }
}
