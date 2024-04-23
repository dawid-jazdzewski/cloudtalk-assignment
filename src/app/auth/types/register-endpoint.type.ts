import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '@/app/users/entities';

export class RegisterEndpointResponse {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
