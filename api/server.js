const express = require("express");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "Welcome to my app!..." });
});

module.exports = server;
