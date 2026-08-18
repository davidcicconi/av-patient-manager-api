import { Request, Response } from 'express';
import { BaseError } from '../BaseError';
import { ValidateError } from 'tsoa';

interface ValidationErrorResponse {
    error: string;
    message: string;
    details: {
        validationErrors: Record<string, string[]>;
        requestPath: string;
        timestamp: string;
    };
}

interface MalformedRequestErrorResponse {
    error: string;
    message: string;
    details: {
        syntaxError?: string;
        requestPath: string;
        timestamp: string;
        hint?: string;
    };
}

export function errorMiddleware(
    err: unknown,
    req: Request,
    res: Response,
): Response {
    const timestamp = new Date().toISOString();

    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            details: err.details,
        });
    } else if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);

        const validationErrors: Record<string, string[]> = {};

        Object.entries(err.fields).forEach(([field, fieldError]) => {
            if (
                fieldError &&
                typeof fieldError === 'object' &&
                'message' in fieldError
            ) {
                validationErrors[field] = [fieldError.message as string];
            } else if (typeof fieldError === 'string') {
                validationErrors[field] = [fieldError];
            } else {
                validationErrors[field] = ['Invalid value'];
            }
        });

        const response: ValidationErrorResponse = {
            error: 'ValidationError',
            message:
                'Request validation failed. Please check the required fields and their formats.',
            details: {
                validationErrors,
                requestPath: req.path,
                timestamp,
            },
        };

        return res.status(400).json(response);
    } else if (err instanceof SyntaxError && 'body' in err) {
        console.warn(`JSON Syntax Error for ${req.path}:`, err.message);

        const response: MalformedRequestErrorResponse = {
            error: 'MalformedRequestBody',
            message: 'Request body contains invalid JSON syntax.',
            details: {
                syntaxError: err.message,
                requestPath: req.path,
                timestamp,
                hint: 'Please ensure your JSON is properly formatted. Common issues: trailing commas, unquoted keys, or invalid escape sequences.',
            },
        };

        return res.status(400).json(response);
    } else if (
        err &&
        typeof err === 'object' &&
        'type' in err &&
        err.type === 'entity.parse.failed'
    ) {
        console.warn(`Body Parse Error for ${req.path}:`, err);

        const response: MalformedRequestErrorResponse = {
            error: 'InvalidRequestBody',
            message: 'Request body could not be parsed.',
            details: {
                requestPath: req.path,
                timestamp,
                hint: 'Please ensure your request body is valid JSON and matches the expected format.',
            },
        };

        return res.status(400).json(response);
    } else {
        console.error('Unexpected error:', err);
        return res.status(500).json({
            error: 'InternalServerError',
            message: 'An unexpected error occurred',
            details: {
                requestPath: req.path,
                timestamp,
            },
        });
    }
}
