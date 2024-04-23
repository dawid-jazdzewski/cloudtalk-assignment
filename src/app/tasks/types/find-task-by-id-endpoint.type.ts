import { ApiProperty } from '@nestjs/swagger';

import { TaskEntity } from '../entities';

export class FindTaskByIdEndpointResponse {
  @ApiProperty({ type: TaskEntity })
  task: TaskEntity;
}
