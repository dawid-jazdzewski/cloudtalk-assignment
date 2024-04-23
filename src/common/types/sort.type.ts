import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { ApiPropertyExample } from '@/utils';

import { IsSortOrder } from '../validators';
import { upperCaseTransformer } from '../transformers';

export type SortDirection = 'ASC' | 'DESC';

export class SortQueryParams {
  @ApiPropertyOptional({ example: ApiPropertyExample.SORT_BY })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ example: ApiPropertyExample.SORT_ORDER })
  @IsSortOrder()
  @Transform(upperCaseTransformer)
  @IsOptional()
  sortOrder?: SortDirection;
}
