import { ApiProperty } from '@nestjs/swagger';

import { TaskEntity } from '../entities';

export class CreateTaskEndpointResponse {
  @ApiProperty({ type: TaskEntity })
  task: TaskEntity;
}
