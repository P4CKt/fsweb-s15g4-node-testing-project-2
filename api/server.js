const express = require("express");
const productRouter = require("./producst/router");

const server = express();

server.use(express.json());

server.use("/api/products", productRouter);

module.exports = server;
