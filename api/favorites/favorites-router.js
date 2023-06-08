const router = require("express").Router();
const favModel = require("./favorites-model");
//const mw = require("./posts-middleware");
const favsMw = require("../favorites/favorites-middleware");

// adds post to favorites
router.post(
  "/:user_id/:post_id",
  favsMw.isUserAllowed,
  favsMw.isFavoritedBefore,
  favsMw.checkIds,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const postId = req.params.post_id;
      if (userId && postId) {
        const favoritedPost = await favModel.create(userId, postId);
        res
          .status(200)
          .json({ message: "Post added to favorites.", favoritedPost });
      } else {
        res.status(400).json({ message: "Cannot add to favorites." });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:user_id/:post_id",
  favsMw.isUserAllowed,
  favsMw.isPostInFavorites,

  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const postId = req.params.post_id;
      if (userId && postId) {
        await favModel.remove(userId, postId);
        res
          .status(200)
          .json({ message: `Post with id: ${postId} removed from favorites.` });
      } else {
        res.status(400).json({
          message: `Cannot remove the post with id: ${postId} from favorites.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
