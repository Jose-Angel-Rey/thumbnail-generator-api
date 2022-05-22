const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Thumbnail generator API",
      version: "1.0.0",
      description:
        "API developed to generate thumbnails from an image uploaded from the client side.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Jose-Angel-Rey",
        url: "https://github.com/Jose-Angel-Rey",
      },
    },
    servers: [
      {
        url: "https://thumbnail-generator-backend.herokuapp.com/api",
        variables: {
          username: {
            default: "demo",
            description:
              "this value is assigned by the service provider, in this example `gigantic-server.com`",
          },
        },
      },
    ],
  },
  apis: ["./src/documentation/*.yml"],
};

module.exports = swaggerOptions;
