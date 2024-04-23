import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { ApiPropertyExample } from '@/utils';

export class SearchQueryParams {
  @ApiPropertyOptional({ example: ApiPropertyExample.SEARCH_VALUE })
  @IsString()
  @IsOptional()
  searchValue?: string;
}
