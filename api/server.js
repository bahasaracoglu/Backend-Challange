const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");

const postsRouter = require("../api/posts/posts-router");
const authRouter = require("../api/auth/auth-router");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/posts", postsRouter);
server.use("/api/auth", authRouter);

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
