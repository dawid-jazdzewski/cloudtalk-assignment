import { Injectable } from '@nestjs/common';
import { DeepPartial, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities';
import { UsersRepository } from './repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { username: ILike(username) } });
  }

  async createUser(createUserDto: DeepPartial<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  async validate(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await this.comparePasswords(password, user.password))) {
      return user;
    }

    return null;
  }

  private async comparePasswords(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }
}
