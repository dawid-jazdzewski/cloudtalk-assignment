import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

import { ApiPropertyExample } from '@/utils';

export class LoginDto {
  @ApiProperty({ example: ApiPropertyExample.USER_USERNAME })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: ApiPropertyExample.USER_PASSWORD })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
