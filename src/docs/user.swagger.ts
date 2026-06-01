export const userPaths = {
  "/api/v1/users/profile": {
    get: {
      tags: ["Users"],
      summary: "Current User Profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Profile fetched successfully",
        },
        401: {
          description: "Unauthorized",
        },
      },
    },
  },

  "/api/v1/users": {
    get: {
      tags: ["Users"],
      summary: "Get All Users",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Users fetched successfully",
        },
        403: {
          description: "Forbidden",
        },
      },
    },
  },

  "/api/v1/users/{id}": {
    delete: {
      tags: ["Users"],
      summary: "Delete User",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "User deleted",
        },
      },
    },
  },

  "/api/v1/users/{id}/role": {
    patch: {
      tags: ["Users"],
      summary: "Update User Role",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RoleUpdateRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Role updated successfully",
        },
      },
    },
  },

  "/api/v1/users/analytics": {
    get: {
      tags: ["Analytics"],
      summary: "User Analytics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Analytics fetched",
        },
      },
    },
  },

  "/api/v1/users/stats/signups": {
    get: {
      tags: ["Analytics"],
      summary: "Signup Statistics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Signup stats fetched",
        },
      },
    },
  },

  "/api/v1/users/stats/roles": {
    get: {
      tags: ["Analytics"],
      summary: "Role Statistics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Role stats fetched",
        },
      },
    },
  },
};