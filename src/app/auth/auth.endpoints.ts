import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ValidationException } from '@/common/exceptions';

import { LoginEndpointResponse, MeEndpointResponse, RegisterEndpointResponse } from './types';
import {
  InvalidPasswordException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from './exceptions';

export const RegisterEndpoint = () =>
  applyDecorators(
    Post('register'),
    HttpCode(HttpStatus.CREATED),
    ApiCreatedResponse({
      type: RegisterEndpointResponse,
      description: 'User successfully registered',
    }),
    ApiException(() => [ValidationException, UserAlreadyExistsException]),
  );

export const LoginEndpoint = () =>
  applyDecorators(
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOkResponse({ type: LoginEndpointResponse }),
    ApiException(() => [ValidationException, InvalidPasswordException]),
  );

export const MeEndpoint = () =>
  applyDecorators(
    Get('me'),
    HttpCode(HttpStatus.OK),
    UseGuards(AuthGuard('jwt')),
    ApiBearerAuth(),
    ApiOkResponse({ type: MeEndpointResponse }),
    ApiException(() => [UnauthorizedException, UserNotFoundException]),
  );
