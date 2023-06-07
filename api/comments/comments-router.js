const router = require("express").Router();
const commentsModel = require("./comments-model");
const commentsMw = require("./comments-middleware");

router.post(
  "/:user_id/:post_id",
  commentsMw.checkPayload,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const postId = req.params.post_id;
      const addedComment = await commentsModel.create(
        userId,
        postId,
        req.body.body
      );
      if (addedComment) {
        res.status(200).json({ message: "Comment submitted successfully." });
      } else {
        res.status(400).json({ message: "Cannot submit comment." });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
