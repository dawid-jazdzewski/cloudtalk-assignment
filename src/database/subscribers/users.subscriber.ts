import * as bcrypt from 'bcrypt';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ObjectLiteral,
  UpdateEvent,
} from 'typeorm';

import { UserEntity } from '@/app/users/entities';

@EventSubscriber()
export class UserEntityEventSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(private dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  afterLoad(entity: UserEntity): void {
    this.setPreviousPassword(entity);
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    await this.hashPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    await this.hashPassword(event.entity);
  }

  private setPreviousPassword(entity: UserEntity): void {
    entity._previousPassword = entity.password;
  }

  private async hashPassword(dto: ObjectLiteral | undefined): Promise<void> {
    if (dto?.password && dto?.previousPassword !== dto?.password) {
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
    }
  }
}
