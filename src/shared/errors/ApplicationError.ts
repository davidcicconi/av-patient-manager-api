import { BaseError } from './BaseError.js';

export class ApplicationError extends BaseError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
    public readonly details?: unknown,
  ) {
    super('ApplicationError', message, statusCode, details);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
