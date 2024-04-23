import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiPropertyExample } from '@/utils';

export class EntityHelper extends BaseEntity {
  @ApiProperty({ example: ApiPropertyExample.UUID })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: ApiPropertyExample.CREATED_AT })
  @CreateDateColumn()
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
