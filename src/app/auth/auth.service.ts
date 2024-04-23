import { Injectable } from '@nestjs/common';

import { UsersService } from '@/app/users/users.service';

import { LoginDto, RegisterDto } from './dto';
import { LoginEndpointResponse, MeEndpointResponse, RegisterEndpointResponse } from './types';
import {
  InvalidPasswordException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginEndpointResponse> {
    const user = await this.usersService.validate(loginDto.username, loginDto.password);

    if (!user) throw new InvalidPasswordException();

    const { accessToken, expiresIn } = this.tokensService.generate(user);

    return {
      accessToken,
      expiresIn,
      user,
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterEndpointResponse> {
    const user = await this.usersService.findByUsername(registerDto.username);

    if (user) throw new UserAlreadyExistsException();

    const newUser = await this.usersService.createUser(registerDto);

    return { user: newUser };
  }

  async getMe(id: string): Promise<MeEndpointResponse> {
    const user = await this.usersService.findById(id);

    if (!user) throw new UserNotFoundException();

    return { user };
  }
}
