import jwt, { SignOptions } from 'jsonwebtoken';
import { ITokenService } from '../../application/services/interfaces/ITokenService';
import { UserModel } from '../../domain/models/UserModel';
import { AccessTokenPayload } from '../../application/dtos/auth/AccessTokenPayload';

export class JwtTokenService implements ITokenService {
    private readonly expiresIn: SignOptions['expiresIn'];

    constructor() {
        this.expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN! || '15m') as SignOptions['expiresIn'];
    }
    async generateAccessToken(user: UserModel): Promise<string> {
        const payload = { sub: user.id, role: user.roleId ?? null };
        const options: SignOptions = { expiresIn: this.expiresIn };
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, options);
    }

    async generateRefreshToken(userId: number): Promise<string> {
        const payload = { sub: userId };
        const options: SignOptions = { expiresIn: '7d' };
        return jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET ?? process.env.JWT_ACCESS_SECRET!,
            options
        );
    }

    async verifyAccessToken(token: string): Promise<AccessTokenPayload> {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET!
        ) as unknown as AccessTokenPayload;
    }

    verifyRefreshToken(token: string): { sub: number } {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET!
        ) as unknown as { sub: number };
    }
}
