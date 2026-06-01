import { pool } from "../config/db";
import { IUser } from "../interfaces/user.interface";

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const result = await pool.query(
    `
        SELECT *
        FROM users
        WHERE email = $1
        `,
    [email],
  );

  return result.rows[0] || null;
};

export const createUser = async (user: IUser): Promise<IUser> => {
  const result = await pool.query(
    `
        INSERT INTO users
        (
          id,
          name,
          email,
          password,
          role
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5
        )
        RETURNING *
        `,
    [user.id, user.name, user.email, user.password, user.role],
  );

  return result.rows[0];
};

export const saveRefreshToken = async (
  id: string,
  userId: string,
  token: string,
  expiresAt: Date,
): Promise<void> => {
  await pool.query(
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
    [id, userId, token, expiresAt],
  );
};

export const findRefreshToken = async (token: string) => {
  const result = await pool.query(
    `
        SELECT *
        FROM refresh_tokens
        WHERE token = $1
        `,
    [token],
  );

  return result.rows[0] || null;
};

export const deleteRefreshToken = async (token: string): Promise<void> => {
  await pool.query(
    `
      DELETE
      FROM refresh_tokens
      WHERE token = $1
      `,
    [token],
  );
};

export const deleteAllUserTokens = async (userId: string): Promise<void> => {
  await pool.query(
    `
      DELETE
      FROM refresh_tokens
      WHERE user_id = $1
      `,
    [userId],
  );
};
