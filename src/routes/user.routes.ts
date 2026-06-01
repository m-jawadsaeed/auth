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
 * @swagger
 * tags:
 *   name: Users
 *   description: User APIs
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Current User Profile
 *     tags: [Users]
 */
router.get(
  "/profile",
  authenticate,
  asyncHandler(profileController)
);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get All Users
 *     tags: [Users]
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(getUsersController)
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [Users]
 */
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(deleteUserController)
);

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: Update User Role
 *     tags: [Users]
 */
router.patch(
  "/:id/role",
  authenticate,
  authorize("ADMIN"),
  validate(roleSchema),
  asyncHandler(updateRoleController)
);

router.get(
  "/analytics",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(analyticsController)
);

router.get(
  "/stats/signups",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(signupStatsController)
);

router.get(
  "/stats/roles",
  authenticate,
  authorize("ADMIN"),
  asyncHandler(roleStatsController)
);

export default router;