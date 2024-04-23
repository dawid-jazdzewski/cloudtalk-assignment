import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from '@/app/users/entities';
import { ApiPropertyExample } from '@/utils';

export class LoginEndpointResponse {
  @ApiProperty({ example: ApiPropertyExample.ACCESS_TOKEN })
  accessToken: string;

  @ApiProperty({ example: ApiPropertyExample.ACCESS_TOKEN_EXPIRES_IN })
  expiresIn: number;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
