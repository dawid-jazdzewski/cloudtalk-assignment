import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiPropertyExample } from '@/utils';

import { TaskEntityStatus } from '../entities';

export class CreateTaskDto {
  @ApiProperty({ example: ApiPropertyExample.TASK_TITLE })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: ApiPropertyExample.TASK_DESCRIPTION })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ enum: TaskEntityStatus, enumName: 'TaskEntityStatus' })
  @IsEnum(TaskEntityStatus)
  @IsOptional()
  status?: TaskEntityStatus;
}
