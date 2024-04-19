const PrayerTimes = require("../model/PrayerTimesSchema");
const auth = require("../middlewares/auth");
const {
  PrayerTimeSend,
  PrayerTimeGet,
} = require("../controller/PrayerTimesController");

function prayerRoute(fastify, option, done) {
  fastify.post("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Prayer"],

      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
      },

      body: {
        type: "object",
        properties: {
          bomdod: {
            type: "boolean",
            default: true,
          },
          peshin: {
            type: "boolean",
            default: true,
          },
          asr: {
            type: "boolean",
            default: true,
          },
          shom: {
            type: "boolean",
            default: true,
          },
          xufton: {
            type: "boolean",
            default: true,
          },
        },
      },

      response: {
        201: {
          type: "object",
          properties: {
            message: {
              type: "string",
              default: "PrayerTime save successfully",
            },
            data: {
              type: "object",
              properties: {
                bomdod: {
                  type: "boolean",
                  default: true,
                },
                peshin: {
                  type: "boolean",
                  default: true,
                },
                asr: {
                  type: "boolean",
                  default: true,
                },
                shom: {
                  type: "boolean",
                  default: true,
                },
                xufton: {
                  type: "boolean",
                  default: true,
                },
                date: {
                  type: "string",
                },
                completed: {
                  type: "boolean",
                  default: true,
                },
                userId: {
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
          },
        },
      },
    },
    handler: PrayerTimeSend,
  });

  fastify.get("/", {
    preHandler: [auth(["user"])],
    schema: {
      tags: ["Prayer"],

      headers: {
        type: "object",
        properties: {
          authorization: { type: "string" },
        },
      },

      response: {
        200: {
          type: "object",
          properties: {
            message: {
              type: "string",
              default: "PrayerTimes was found",
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

    handler: PrayerTimeGet,
  });

  done();
}

module.exports = prayerRoute;
