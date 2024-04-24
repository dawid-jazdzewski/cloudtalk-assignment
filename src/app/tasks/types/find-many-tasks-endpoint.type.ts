import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginatedResponse } from '@/common/types';

import { TaskEntity, TaskEntityStatus } from '../entities';

class SerializedTaskEntity extends OmitType(TaskEntity, ['description']) {}

export class FindManyTasksEndpointResponse extends PaginatedResponse<SerializedTaskEntity> {
  @ApiProperty({ type: SerializedTaskEntity, isArray: true })
  data: SerializedTaskEntity[];
}

export class FindManyTasksSearchQueryParams {
  @ApiPropertyOptional({ enum: TaskEntityStatus, enumName: 'TaskEntityStatus' })
  @IsEnum(TaskEntityStatus)
  @IsOptional()
  status?: TaskEntityStatus;
}
