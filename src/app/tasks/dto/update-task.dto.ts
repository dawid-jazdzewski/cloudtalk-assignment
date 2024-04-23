import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { ApiPropertyExample } from '@/utils';

import { TaskEntityStatus } from '../entities';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: ApiPropertyExample.TASK_TITLE })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: ApiPropertyExample.TASK_DESCRIPTION })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: TaskEntityStatus, enumName: 'TaskEntityStatus' })
  @IsEnum(TaskEntityStatus)
  @IsOptional()
  status?: TaskEntityStatus;
}
