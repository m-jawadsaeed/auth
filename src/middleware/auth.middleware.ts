import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";

import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError(401, "Authorization header missing"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Token missing"));
  }

  try {
    const decoded = verifyAccessToken(token);

    req.user = decoded;

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
