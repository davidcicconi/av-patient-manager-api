import { ApplicationError } from '../../shared/errors/ApplicationError.js';

export class UnauthorizedError extends ApplicationError {
    constructor(message: string, statusCode: number = 401, details?: unknown) {
        super(message, statusCode, details);
    }
}