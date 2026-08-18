import { UserModel } from "../../../domain/models/UserModel";
import { AccessTokenPayload } from "../../dtos/auth/AccessTokenPayload";

export interface ITokenService {
  generateAccessToken(user: UserModel): Promise<string>;
  generateRefreshToken(userId: number): Promise<string>;
  verifyAccessToken(token: string): Promise<AccessTokenPayload>;
  verifyRefreshToken(token: string): { sub: number }
}
