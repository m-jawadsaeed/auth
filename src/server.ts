import app from "./app";
import { env } from "./config/env";
import { pool } from "./config/db";

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");

    console.log(" PostgreSQL Connected");

    app.listen(env.port, () => {
      console.log(` Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error(" Failed to connect DB", error);

    process.exit(1);
  }
};

startServer();
