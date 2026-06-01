export const schemas = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "string",
        format: "uuid",
      },
      name: {
        type: "string",
        example: "Muhammad Jawad",
      },
      email: {
        type: "string",
        example: "jawad@example.com",
      },
      role: {
        type: "string",
        enum: ["USER", "ADMIN"],
        example: "USER",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  RegisterRequest: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        example: "Muhammad Jawad",
      },
      email: {
        type: "string",
        example: "jawad@example.com",
      },
      password: {
        type: "string",
        example: "Password123",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        example: "jawad@example.com",
      },
      password: {
        type: "string",
        example: "Password123",
      },
    },
  },

  RefreshRequest: {
    type: "object",
    required: ["refreshToken"],
    properties: {
      refreshToken: {
        type: "string",
      },
    },
  },

  RoleUpdateRequest: {
    type: "object",
    required: ["role"],
    properties: {
      role: {
        type: "string",
        enum: ["USER", "ADMIN"],
      },
    },
  },

  AuthResponse: {
    type: "object",
    properties: {
      accessToken: {
        type: "string",
      },
      refreshToken: {
        type: "string",
      },
    },
  },

  ErrorResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      message: {
        type: "string",
        example: "Unauthorized",
      },
    },
  },
};