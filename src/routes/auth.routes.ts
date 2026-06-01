import { Router } from "express";

import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from "../controllers/auth.controller";

import { asyncHandler } from "../utils/asyncHandler";

import { validate } from "../middleware/validate.middleware";

import { authLimiter } from "../middleware/rateLimiter";

import {
  registerSchema,
  loginSchema,
  refreshSchema,
} from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  asyncHandler(registerController)
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  asyncHandler(loginController)
);

router.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(refreshController)
);

router.post(
  "/logout",
  validate(refreshSchema),
  asyncHandler(logoutController)
);

export default router;