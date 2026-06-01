import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT),

  dbHost: process.env.DB_HOST!,

  dbPort: Number(process.env.DB_PORT),

  dbUser: process.env.POSTGRES_USER!,

  dbPassword: process.env.POSTGRES_PASSWORD!,

  dbName: process.env.POSTGRES_DB!,

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,

  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
};