import jwt from "jsonwebtoken";
import { ITokenService } from "../../application/services/interfaces/ITokenService";
import { UserModel } from "../../domain/models/UserModel";
import { TokenPayload } from "../../application/dtos/auth/TokenPayload";

export class JwtTokenService implements ITokenService {
  async generateAccessToken(user: UserModel): Promise<string> {
    return jwt.sign(
      {
        sub: user.id,
        role: user.roleId ?? null,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "15m",
      },
    );
  }

  async generateRefreshToken(user: UserModel): Promise<string> {
    return jwt.sign(
      {
        sub: user.id,
        role: user.roleId ?? null,
      },
      process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
  }

  async verify(token: string): Promise<TokenPayload> {
    return jwt.verify(token, process.env.JWT_SECRET!) as unknown as TokenPayload;
  }
}
