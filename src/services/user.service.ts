import { ApiError } from "../utils/apiError";

import {
  deleteUser,
  findUserById,
  getAllUsers,
  getRoleStats,
  getSignupStats,
  getUserAnalytics,
  updateUserRole,
} from "../repositories/user.repository";

export const getProfileService = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const getUsersService = async () => {
  return getAllUsers();
};

export const deleteUserService = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await deleteUser(userId);

  return {
    message: "User deleted successfully",
  };
};
export const analyticsService =
  async () => {

    return getUserAnalytics();
  };

  export const signupStatsService =
  async () => {

    return getSignupStats();
  };

  export const roleStatsService =
  async () => {

    return getRoleStats();
  };


  export const updateRoleService =
  async (
    userId: string,
    role: string
  ) => {

    const user =
      await findUserById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return updateUserRole(
      userId,
      role
    );
  };