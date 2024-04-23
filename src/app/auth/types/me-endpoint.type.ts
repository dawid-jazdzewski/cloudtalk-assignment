import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '@/app/users/entities';

export class MeEndpointResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
