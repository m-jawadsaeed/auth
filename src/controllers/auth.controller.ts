import { Request, Response } from "express";

import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "../services/auth.service";

export const registerController = async (req: Request, res: Response) => {
  const user = await registerService(req.body);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const tokens = await loginService(req.body);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: tokens,
  });
};

export const refreshController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const tokens = await refreshService(refreshToken);

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: tokens,
  });
};

export const logoutController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  const result = await logoutService(refreshToken);

  return res.status(200).json({
    success: true,
    ...result,
  });
};
