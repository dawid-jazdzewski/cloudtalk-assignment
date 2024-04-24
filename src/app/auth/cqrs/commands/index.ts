import { GenerateTokensCommand, GenerateTokensHandler } from './generate-tokens';
import { LoginUserCommand, LoginUserHandler } from './login-user';
import { RegisterUserCommand, RegisterUserHandler } from './register-user';

export { GenerateTokensCommand, LoginUserCommand, RegisterUserCommand };

export const AuthCommandsHandlers = [GenerateTokensHandler, LoginUserHandler, RegisterUserHandler];
