import { v4 as uuidv4 } from "uuid";

import { pool } from "../config/db";

import { ApiError } from "../utils/apiError";

import { hashPassword, comparePassword } from "../utils/bcrypt";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

import {
  LoginInput,
  RegisterInput,
  TokenPair,
} from "../interfaces/auth.interface";

import {
  createUser,
  deleteAllUserTokens,
  deleteRefreshToken,
  findRefreshToken,
  findUserByEmail,
  saveRefreshToken,
} from "../repositories/auth.repository";

export const registerService = async (payload: RegisterInput) => {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await createUser({
    id: uuidv4(),

    name: payload.name,

    email: payload.email,

    password: hashedPassword,

    role: "USER",

    created_at: new Date(),
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export const loginService = async (payload: LoginInput): Promise<TokenPair> => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = createAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    id: user.id,
    role: user.role,
  });

  await saveRefreshToken(
    uuidv4(),
    user.id,
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshService = async (oldToken: string): Promise<TokenPair> => {
  const client = await pool.connect();

  try {
    const storedToken = await findRefreshToken(oldToken);

    if (!storedToken) {
      try {
        const decoded = verifyRefreshToken(oldToken);

        await deleteAllUserTokens(decoded.id);
      } catch {}

      throw new ApiError(401, "Refresh token reuse detected");
    }

    const payload = verifyRefreshToken(oldToken);

    const accessToken = createAccessToken({
      id: payload.id,
      role: payload.role,
    });

    const refreshToken = createRefreshToken({
      id: payload.id,
      role: payload.role,
    });

    await client.query("BEGIN");

    await client.query(
      `
        DELETE
        FROM refresh_tokens
        WHERE token = $1
        `,
      [oldToken],
    );

    await client.query(
      `
        INSERT INTO refresh_tokens
        (
          id,
          user_id,
          token,
          expires_at
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4
        )
        `,
      [
        uuidv4(),
        payload.id,
        refreshToken,
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ],
    );

    await client.query("COMMIT");

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
};

export const logoutService = async (refreshToken: string) => {
  await deleteRefreshToken(refreshToken);

  return {
    message: "Logged out successfully",
  };
};
