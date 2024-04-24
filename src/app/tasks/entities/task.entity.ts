import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';

import { EntityHelper } from '@/database/helpers';
import { UserEntity } from '@/app/users/entities';
import { ApiPropertyExample } from '@/utils';

import { TaskSerialization } from '../serialization';

export enum TaskEntityStatus {
  BACKLOG = 'backlog',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

@Entity({ name: 'tasks', orderBy: { createdAt: 'DESC' } })
export class TaskEntity extends EntityHelper {
  @ApiProperty({ example: ApiPropertyExample.TASK_TITLE })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ example: ApiPropertyExample.TASK_DESCRIPTION })
  @Expose({ groups: [TaskSerialization.DETAILS] })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ enum: TaskEntityStatus, enumName: 'TaskEntityStatus' })
  @Column({
    type: 'enum',
    enumName: 'TaskEntityStatus',
    default: TaskEntityStatus.BACKLOG,
  })
  status: TaskEntityStatus;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  owner?: UserEntity;
}
