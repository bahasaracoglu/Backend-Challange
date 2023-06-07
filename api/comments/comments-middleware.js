const commentsModel = require("./comments-model");

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
        .json({ message: `Can not create comment for post id: ${id}.` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkCommentsByUserId, checkCommentsByPostId, checkPayload };
