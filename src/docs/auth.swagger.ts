export const authPaths = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register User",
      description: "Create a new user account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
        },
        400: {
          description: "Validation Error",
        },
      },
    },
  },

  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login User",
      description: "Authenticate user and return JWT tokens",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
        },
        401: {
          description: "Invalid credentials",
        },
      },
    },
  },

  "/api/v1/auth/refresh": {
    post: {
      tags: ["Auth"],
      summary: "Refresh Access Token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Token refreshed successfully",
        },
      },
    },
  },

  "/api/v1/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout User",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RefreshRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Logout successful",
        },
      },
    },
  },
};