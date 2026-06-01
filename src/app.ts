import express from "express";
import helmet from "helmet";
import cors from "cors";

import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import { swaggerSpec } from "./docs/swagger";

import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Secure Auth API Running",
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;