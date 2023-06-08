const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");
const restrict = require("./middleware/restricted");

const postsRouter = require("../api/posts/posts-router");
const authRouter = require("../api/auth/auth-router");
const usersRouter = require("../api/users/users-router");
const favRouter = require("../api/favorites/favorites-router");
const commentsRouter = require("../api/comments/comments-router");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/api/users", restrict, usersRouter);
server.use("/api/posts", postsRouter);
server.use("/api/auth", authRouter);
server.use("/api/favorites", restrict, favRouter);
server.use("/api/comments", restrict, commentsRouter);

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
