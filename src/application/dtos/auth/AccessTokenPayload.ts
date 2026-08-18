// application/dtos/TokenPayload.ts

export interface AccessTokenPayload {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
