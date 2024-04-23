import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginatedResponse } from '@/common/types';

import { TaskEntity, TaskEntityStatus } from '../entities';

export class FindManyTasksEndpointResponse extends PaginatedResponse<TaskEntity> {
  @ApiProperty({ type: TaskEntity, isArray: true })
  data: TaskEntity[];
}

export class FindManyTasksSearchQueryParams {
  @ApiPropertyOptional({ enum: TaskEntityStatus, enumName: 'TaskEntityStatus' })
  @IsEnum(TaskEntityStatus)
  @IsOptional()
  status?: TaskEntityStatus;
}
