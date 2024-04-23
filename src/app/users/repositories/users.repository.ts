import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '@/database/helpers';

import { UserEntity } from '../entities';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource);
  }
}
