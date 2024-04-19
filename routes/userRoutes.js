const {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  logoutUser,
} = require("../controller/UserController");
const auth = require("../middlewares/auth");

function userRoutes(fastify, options, done) {
  //* Register user
  fastify.post("/register", {
    schema: {
      tags: ["User"],

      body: {
        type: "object",
        properties: {
          username: { type: "string", default: "Akhat" },
          password: { type: "string", default: "123456" },
          birthday: { type: "string", default: new Date("2005/03/02") },  
        },
      },
      response: {
        201: {
          description: "User Created",
          type: "object",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
          },
        },
        400: {
          description: "Bad Request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    handler: registerUser,
  });

  //* Login user
  fastify.post("/login", {
    schema: {
      tags: ["User"],

      body: {
        type: "object",
        properties: {
          username: { type: "string", default: "Akhat" },
          password: { type: "string", default: "123456" },
        },
      },
      response: {
        200: {
          description: "User authenticated",
          type: "object",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
          },
        },
        400: {
          description: "Bad Request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    handler: loginUser,
  });

  //* delete user
  fastify.delete("/:id", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["User"],
      description: "To delete a user, send 'me' to params.",
      params: {
        type: "object",
        properties: {
          id: { type: "string", default: "me" },
        },
      },

      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
      },

      response: {
        200: {
          description: "User deleted",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        400: {
          description: "Bad Request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    handler: deleteUser,
  });

  //* get user
  fastify.get("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["User"],

      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
      },

      response: {
        200: {
          description: "User Data",
          type: "object",
          properties: {
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                _id: { type: "string" },
                username: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                birthday: {
                  type: "string",
                },
                age: {
                  type: "string",
                },
                obligatoryTime: {
                  type: "string",
                },
                createdAt: {
                  type: "string",
                },
              },
            },
          },
        },
        400: {
          description: "Bad Request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },

    handler: getUsers,
  });

  fastify.post("/logout", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Log Out"],

      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
      },

      response: {
        200: {
          description: "User logged out",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        400: {
          description: "Bad Request",
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          properties: {
            error: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    handler: logoutUser,
  });

  done();
}

module.exports = userRoutes;
