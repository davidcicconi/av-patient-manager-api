import { UserModel } from "../../../domain/models/UserModel";
import { TokenPayload } from "../../dtos/auth/TokenPayload";

export interface ITokenService {
  generateAccessToken(user: UserModel): Promise<string>;
  generateRefreshToken(user: UserModel): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
}
