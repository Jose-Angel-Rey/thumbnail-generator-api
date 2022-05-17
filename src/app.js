require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const server = express();

const port = process.env.PORT || 4000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ limit: "10mb", extended: true }));
server.use(express.static("../public"));
server.use(morgan("dev"));
server.use(routes);

server.listen(port, () => console.log(`Server is running on PORT ${port}`));
