import { pool } from "../config/db";

export const findUserById = async (id: string) => {
  const result = await pool.query(
    `
        SELECT
        id,
        name,
        email,
        role,
        created_at
        FROM users
        WHERE id = $1
        `,
    [id],
  );

  return result.rows[0] || null;
};

export const getAllUsers = async () => {
  const result = await pool.query(
    `
        SELECT
        id,
        name,
        email,
        role,
        created_at
        FROM users
        ORDER BY created_at DESC
        `,
  );

  return result.rows;
};

export const deleteUser = async (id: string): Promise<void> => {
  await pool.query(
    `
      DELETE
      FROM users
      WHERE id = $1
      `,
    [id],
  );
};

export const updateUserRole = async (userId: string, role: string) => {
  const result = await pool.query(
    `
        UPDATE users
        SET role = $1
        WHERE id = $2
        RETURNING *
        `,
    [role, userId],
  );

  return result.rows[0];
};

export const getUserAnalytics = async () => {
  const result = await pool.query(`
      SELECT
      id,
      email,
      role,

      ROW_NUMBER()
      OVER(
        ORDER BY created_at
      )
      AS user_number

      FROM users
    `);

  return result.rows;
};

export const getSignupStats = async () => {
  const result = await pool.query(`
      SELECT

      DATE(created_at)
      AS signup_date,

      COUNT(*) AS daily_count,

      SUM(COUNT(*))
      OVER(
        ORDER BY DATE(created_at)
      )
      AS running_total

      FROM users

      GROUP BY DATE(created_at)

      ORDER BY signup_date
    `);

  return result.rows;
};

export const getRoleStats = async () => {
  const result = await pool.query(`
      WITH role_stats AS (
        SELECT
        role,
        COUNT(*) total
        FROM users
        GROUP BY role
      )

      SELECT *
      FROM role_stats
    `);

  return result.rows;
};
