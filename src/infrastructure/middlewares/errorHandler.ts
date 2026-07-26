import { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
}
