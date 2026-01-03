import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Post & Comments & User REST API",
      version: "1.0.0",
      description:
        "A simple Express REST API for managing posts, comments, and users",
      contact: {
        name: "Li-am Hemo & Anna Eden",
        email: "developer@example.com",
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT authorization header using the Bearer scheme",
        },
      },

      schemas: {
        User: {
          type: "object",
          required: ["username", "email", "password"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the user",
              example: "648a1f4e2f8fb814c8a1e1a1",
            },
            username: {
              type: "string",
              description: "Username of the user",
              example: "john_doe",
            },
            email: {
              type: "string",
              description: "Email address of the user",
              format: "email",
              example: "john.doe@example.com",
            },
            password: {
              type: "string",
              description: "Password of the user",
              minLength: 6,
              example: "password123",
            },
          },
        },
        Post: {
          type: "object",
          required: ["content", "authorID"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the post",
              example: "648a1f4e2f8fb814c8a1e1a2",
            },
            content: {
              type: "string",
              description: "Content of the post",
              example: "This is the content of my first post.",
            },
            authorID: {
              type: "string",
              description: "ID of the author who created the post",
              example: "648a1f4e2f8fb814c8a1e1a1",
            },
          },
        },
        Comment: {
          type: "object",
          required: ["relatedPostID", "description", "userCreatorID"],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the comment",
              example: "648a1f4e2f8fb814c8a1e1a3",
            },
            relatedPostID: {
              type: "string",
              description: "ID of the post this comment is related to",
              example: "648a1f4e2f8fb814c8a1e1a2",
            },
            description: {
              type: "string",
              description: "Description of the comment",
              example: "This is a great post!",
            },
            userCreatorID: {
              type: "string",
              description: "ID of the user who created this comment",
              example: "648a1f4e2f8fb814c8a1e1a1",
            },
          },
        },

        //Add schemas here of login etc.

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
              example: "An error occurred",
            },
            status: {
              type: "number",
              description: "HTTP status code",
              example: 400,
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Validation failed",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "Invalid email format",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Access token is missing or invalid",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Unauthorized: Invalid or missing token",
                status: 401,
              },
            },
          },
        },
        NotFoundError: {
          description: "The specified resource was not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Resource not found",
                status: 404,
              },
            },
          },
        },
        ValidationError: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Internal server error",
                status: 500,
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./dist/src/routes/*.js",
    "./dist/src/controllers/*.js",
  ],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
