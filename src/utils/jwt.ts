import jwt from "jsonwebtoken";

import { env } from "../config/env";

import { JwtPayload } from "../interfaces/auth.interface";

export const createAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.accessTokenSecret, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.refreshTokenSecret, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.accessTokenSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.refreshTokenSecret) as JwtPayload;
};
