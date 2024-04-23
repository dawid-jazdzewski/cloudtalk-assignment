import { ApiProperty } from '@nestjs/swagger';

import { TaskEntity } from '../entities';

export class UpdateTaskEndpointResponse {
  @ApiProperty({ type: TaskEntity })
  task: TaskEntity;
}
