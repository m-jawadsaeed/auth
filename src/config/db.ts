import { Pool } from "pg";
import { env } from "./env";

export const pool = new Pool({
  host: env.dbHost,

  port: env.dbPort,

  user: env.dbUser,

  password: env.dbPassword,

  database: env.dbName,

  min: 2,

  max: 20,

  idleTimeoutMillis: 30000,
});
