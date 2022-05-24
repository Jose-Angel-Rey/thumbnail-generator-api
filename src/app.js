require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./utils/swagger");

const server = express();
const port = process.env.PORT || 4000;

// Middlewares
server.use(cors());
server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));
server.use(morgan("dev"));
server.use(routes);

// Swagger configuration
const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

server.listen(port, () => console.log(`Server is running on PORT ${port}`));

// This API is deployed on Heroku:
// https://thumbnail-generator-backend.herokuapp.com/