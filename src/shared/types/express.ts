import { AccessTokenPayload } from '../../application/dtos/auth/AccessTokenPayload';

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload;
        }
    }
}

export {};
