const usersModel = require("./users-model");
//const favsModel = require("../favorites/favorites-model");
const favsMw = require("../favorites/favorites-middleware");
const usersMw = require("./users-middleware");
const commentsMw = require("../comments/comments-middleware");
const router = require("express").Router();
const restricted = require("../middleware/restricted");

// brings all users
router.get("/", usersMw.checkRole, async (req, res, next) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// brings user with id
router.get(
  "/:id",
  usersMw.isUserExist,
  usersMw.isOwnProfile,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await usersModel.getById(id);
      const userExceptPassword = {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url,
      };
      res.status(200).json(userExceptPassword);
    } catch (error) {
      next(error);
    }
  }
);

// deletes user
router.delete(
  "/:id",
  usersMw.isUserExist,
  usersMw.isOwnProfile,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedUser = await usersModel.remove(id);
      if (!deletedUser) {
        res.status(400).json({ message: `User with id: ${id} is not found.` });
      } else {
        res
          .status(200)
          .json({ message: `User with id: ${id} removed successfully.` });
      }
    } catch (error) {
      next(error);
    }
  }
);

// brings users favorited posts
router.get(
  "/:id/favorites",
  restricted,
  favsMw.checkFavsByUserId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.favPosts);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/comments",
  restricted,
  commentsMw.checkCommentsByUserId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.comments);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
