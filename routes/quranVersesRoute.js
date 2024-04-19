const {
  quranVersesPost,
  quranVersesGet,
} = require("../controller/QuranVersesController");

function quranVersesRoute(fastify, options, next) {
  fastify.post("/", {
    schema: {
      tags: ["Quran Verses"],

      body: {
        type: "object",
        properties: {
          text: {
            type: "string",
          },
        },
      },

      response: {
        201: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
        400: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
      },
    },
    handler: quranVersesPost,
  });

  fastify.get("/", {
    schema: {
      tags: ["Quran Verses"],

      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            data: {
              type: "array",
            },
          },
        },
        400: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
          },
        },
        500: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
      },
    },
    handler: quranVersesGet,
  });

  next();
}

module.exports = quranVersesRoute;
