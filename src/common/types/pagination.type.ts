import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

import { ApiPropertyExample } from '@/utils';

export class PaginationQueryParams {
  @ApiPropertyOptional({ example: ApiPropertyExample.PAGINATION_PAGE })
  @IsNumber()
  @IsOptional()
  pageNumber: number;

  @ApiPropertyOptional({ example: ApiPropertyExample.PAGINATION_LIMIT })
  @IsNumber()
  @IsOptional()
  limit: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({ example: ApiPropertyExample.PAGINATION_TOTAL })
  total: number;

  @ApiProperty({ example: ApiPropertyExample.PAGINATION_PAGE })
  pageNumber: number;

  @ApiProperty({ example: ApiPropertyExample.PAGINATION_LIMIT })
  limit: number;

  @ApiProperty({ example: ApiPropertyExample.PAGINATION_HAS_NEXT_PAGE })
  hasNextPage: boolean;

  data: T[];
}
