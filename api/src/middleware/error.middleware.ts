import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(`🚨 Error Core: ${err.message}`, err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err : {},
  });
};
