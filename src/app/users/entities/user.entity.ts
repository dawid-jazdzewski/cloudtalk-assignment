import { Column, Entity, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { EntityHelper } from '@/database/helpers';
import { ApiPropertyExample } from '@/utils';

import { UserRoles } from '../enums';

@Entity({ name: 'users' })
export class UserEntity extends EntityHelper {
  @ApiProperty({ example: ApiPropertyExample.USER_USERNAME })
  @Column({ type: 'varchar', unique: true })
  @Index()
  username: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  _previousPassword?: string;

  @ApiProperty({ enum: UserRoles, enumName: 'UserRoles' })
  @Column({ enum: UserRoles, default: UserRoles.USER, enumName: 'UserRoles' })
  role: UserRoles;
}
