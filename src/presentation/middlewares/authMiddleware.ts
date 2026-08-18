import { NextFunction, Request, Response } from 'express';
import { JwtTokenService } from '../../infrastructure/auth/JwtTokenService';

const jwtService = new JwtTokenService();

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                message: 'No autenticado',
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        const payload = await jwtService.verifyAccessToken(token);

        req.user = payload;

        next();
    } catch {
        res.status(401).json({
            message: 'Token inválido o expirado',
        });
    }
};
