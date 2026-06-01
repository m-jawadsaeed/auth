import { Router } from "express";

import {
  analyticsController,
  deleteUserController,
  getUsersController,
  profileController,
  roleStatsController,
  signupStatsController,
  updateRoleController,
} from "../controllers/user.controller";

import { asyncHandler } from "../utils/asyncHandler";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { validate } from "../middleware/validate.middleware";

import { roleSchema } from "../validators/user.validator";

const router = Router();

/**
 * Current authenticated user's profile
 */
router.get(
  "/profile",
  authenticate,
  asyncHandler(profileController)
);

/**
 * Admin: Get all users
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(getUsersController)
);

/**
 * Admin: Delete user
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(deleteUserController)
);

/**
 * Admin: Update user role
 */
router.patch(
  "/:id/role",
  authenticate,
  authorize("ADMIN"),
  validate(roleSchema),
  asyncHandler(updateRoleController)
);

/**
 * Admin: Analytics dashboard
 */
router.get(
  "/analytics",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(analyticsController)
);

/**
 * Admin: Signup statistics
 */
router.get(
  "/stats/signups",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(signupStatsController)
);

/**
 * Admin: Role distribution statistics
 */
router.get(
  "/stats/roles",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(roleStatsController)
);

export default router;