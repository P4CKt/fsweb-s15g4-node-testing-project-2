const express = require("express");
const productRouter = require("./product/p_router");
const marketRouter = require("./market/m_router");

const server = express();

server.use(express.json());

server.use("/api/products", productRouter);
server.use("/api/markets", marketRouter);

server.use("/", async (req, res, next) => {
  res.status(200).json({ message: "Server is working" });
});

server.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Server.js tarafından handle edildi bu hata",
  });
});

module.exports = server;
