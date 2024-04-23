import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginEndpointResponse, MeEndpointResponse, RegisterEndpointResponse } from './types';
import { LoginDto, RegisterDto } from './dto';
import { UserPayload } from './decorators';
import { LoginEndpoint, MeEndpoint, RegisterEndpoint } from './auth.endpoints';

@ApiTags('Auth')
@Controller({ version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @RegisterEndpoint()
  async register(@Body() registerDto: RegisterDto): Promise<RegisterEndpointResponse> {
    return this.authService.register(registerDto);
  }

  @LoginEndpoint()
  async login(@Body() loginDto: LoginDto): Promise<LoginEndpointResponse> {
    return this.authService.login(loginDto);
  }

  @MeEndpoint()
  async getMe(@UserPayload('userId') userId: string): Promise<MeEndpointResponse> {
    return this.authService.getMe(userId);
  }
}
