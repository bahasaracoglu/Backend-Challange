const router = require("express").Router();
const favModel = require("./favorites-model");
//const mw = require("./posts-middleware");
//const favsMw = require("../favorites/favorites-middleware");

// brings all posts for feed
router.post("/:user_id/:post_id", async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const postId = req.params.post_id;
    if (userId && postId) {
      await favModel.create({ user_id: userId, post_id: postId });
      res.status(200).json({ message: "Post added to favorites." });
    } else {
      res.status(400).json({ message: "Cannot add to favorites." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
