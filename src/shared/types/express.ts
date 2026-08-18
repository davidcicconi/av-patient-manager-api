import { AccessTokenPayload } from '../../application/dtos/auth/AccessTokenPayload';

declare module 'express-serve-static-core' {
    interface Request {
        user?: AccessTokenPayload;
    }
}

export {};
