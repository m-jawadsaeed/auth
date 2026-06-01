import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT),

  dbHost: process.env.DB_HOST!,

  dbPort: Number(process.env.DB_PORT),

  dbUser: process.env.DB_USER!,

  dbPassword: process.env.DB_PASSWORD!,

  dbName: process.env.DB_NAME!,

  accessTokenSecret:
    process.env.ACCESS_TOKEN_SECRET!,

  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET!,
};