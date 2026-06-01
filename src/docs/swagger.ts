import { authPaths } from "./auth.swagger";
import { userPaths } from "./user.swagger";
import { schemas } from "./schemas.swagger";

export const swaggerSpec = {
  openapi: "3.0.0",

  info: {
    title: "AuthShield API",
    version: "1.0.0",
    description:
      "JWT Authentication, Refresh Token Rotation, RBAC, PostgreSQL, Zod Validation",
  },

  servers: [
    {
      url: "http://localhost:5000",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Authentication APIs",
    },
    {
      name: "Users",
      description: "User Management APIs",
    },
    {
      name: "Analytics",
      description: "Analytics APIs",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas,
  },

  paths: {
    ...authPaths,
    ...userPaths,
  },
};