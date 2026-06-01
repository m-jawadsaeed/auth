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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags: [Auth]
 */
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  asyncHandler(registerController)
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 */
router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  asyncHandler(loginController)
);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh Tokens
 *     tags: [Auth]
 */
router.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(refreshController)
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout User
 *     tags: [Auth]
 */
router.post(
  "/logout",
  validate(refreshSchema),
  asyncHandler(logoutController)
);

export default router;