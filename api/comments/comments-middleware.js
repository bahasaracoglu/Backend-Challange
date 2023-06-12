const commentsModel = require("./comments-model");
const usersModel = require("../users/users-model");
const postsModel = require("../posts/posts-model");
const tokenHelper = require("../../helper/token-helper");

const checkCommentsByUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comments = await commentsModel.getById(id);
    if (!comments || comments.length <= 0) {
      res
        .status(400)
        .json({ message: `Comments for user id: ${id} is not found.` });
    } else {
      req.comments = comments;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCommentsByPostId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comments = await commentsModel.getByPostId(id);
    if (!comments || comments.length <= 0) {
      res
        .status(400)
        .json({ message: `No comments found for this post id: ${id}.` });
    } else {
      req.comments = comments;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
    const { body } = req.body;
    if (!userId || !postId || !body || body.trim().length > 280) {
      res
        .status(400)
        .json({ message: `Can not create comment for post id: ${postId}.` });
    } else {
      const isUserExist = await usersModel.getById(userId);
      const isPostExist = await postsModel.getById(postId);
      if (!isUserExist) {
        res
          .status(400)
          .json({ message: `Can not found user with id: ${userId}.` });
      } else if (!isPostExist) {
        res
          .status(400)
          .json({ message: `Can not found post with id: ${postId}.` });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

const isUserAllowed = async (req, res, next) => {
  try {
    const payload = tokenHelper.decodeTokensPayload(
      req.headers["authorization"]
    );
    const userId = req.params.user_id;

    if (payload.user_id == userId) {
      next();
    } else {
      res.status(400).json({ message: "Comment is not allowed." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCommentsByUserId,
  checkCommentsByPostId,
  checkPayload,
  isUserAllowed,
};
