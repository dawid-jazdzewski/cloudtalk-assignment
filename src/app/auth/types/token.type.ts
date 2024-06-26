import { UserRoles } from '@/app/users/enums';

export interface TokenData {
  accessToken: string;
  expiresIn: number;
}

export interface GenerateAccessTokenPayload {
  userId: string;
  username: string;
  role: UserRoles;
}

export interface AccessTokenPayload extends GenerateAccessTokenPayload {
  iat: number;
  exp: number;
}
