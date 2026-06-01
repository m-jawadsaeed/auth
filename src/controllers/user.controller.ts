import { Request, Response } from "express";

import {
  analyticsService,
  deleteUserService,
  getProfileService,
  getUsersService,
  roleStatsService,
  signupStatsService,
  updateRoleService,
} from "../services/user.service";

interface UserParams {
  id: string;
}

interface UpdateRoleBody {
  role: "USER" | "ADMIN";
}

export const profileController = async (req: Request, res: Response) => {
  const user = await getProfileService(req.user!.id);

  return res.status(200).json({
    success: true,
    data: user,
  });
};

export const getUsersController = async (_req: Request, res: Response) => {
  const users = await getUsersService();

  return res.status(200).json({
    success: true,
    data: users,
  });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const result = await deleteUserService(req.params.id as string);

  return res.status(200).json({
    success: true,
    ...result,
  });
};

export const updateRoleController = async (req: Request, res: Response) => {
  const user = await updateRoleService(req.params.id as string, req.body.role);

  return res.status(200).json({
    success: true,
    message: "Role updated successfully",
    data: user,
  });
};

export const analyticsController = async (_req: Request, res: Response) => {
  const analytics = await analyticsService();

  return res.status(200).json({
    success: true,
    data: analytics,
  });
};

export const signupStatsController = async (_req: Request, res: Response) => {
  const stats = await signupStatsService();

  return res.status(200).json({
    success: true,
    data: stats,
  });
};

export const roleStatsController = async (_req: Request, res: Response) => {
  const stats = await roleStatsService();

  return res.status(200).json({
    success: true,
    data: stats,
  });
};
