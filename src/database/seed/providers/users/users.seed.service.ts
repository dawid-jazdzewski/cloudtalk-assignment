import { Injectable, Logger } from '@nestjs/common';

import { UsersService } from '@/app/users/users.service';
import { ConfigService } from '@/config/config.service';
import { UserEntity } from '@/app/users/entities';

import { SeedServiceProvider } from '../../types';

@Injectable()
export class UsersSeedService implements SeedServiceProvider {
  private readonly logger = new Logger(UsersSeedService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async run(): Promise<null | UserEntity> {
    if (await this.userExists()) {
      this.logger.verbose('User already exists');
      return null;
    }

    this.logger.log('Seeding user');

    return this.usersService.createUser({
      username: this.configService.database.seedUsername,
      password: this.configService.database.seedPassword,
    });
  }

  async userExists(): Promise<boolean> {
    const user = await this.usersService.findByUsername(this.configService.database.seedUsername);
    return !!user;
  }
}
