const favsModel = require("../favorites/favorites-model");
const usersModel = require("../users/users-model");
const postsModel = require("../posts/posts-model");

const checkFavsByUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favPosts = await favsModel.getById(id);
    if (!favPosts || favPosts.length <= 0) {
      res
        .status(400)
        .json({ message: `Favorite posts for user id: ${id} is not found.` });
    } else {
      req.favPosts = favPosts;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkFavsByPostId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favUsers = await favsModel.getByPostId(id);
    if (!favUsers || favUsers.length <= 0) {
      res
        .status(400)
        .json({ message: `No user found who liked post id: ${id}.` });
    } else {
      req.favUsers = favUsers;
      next();
    }
  } catch (error) {
    next(error);
  }
};

//checks if the post favorited before
const isFavoritedBefore = async (req, res, next) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;
  const favPosts = await favsModel.getByPostId(postId);
  const isFavorited = favPosts.filter((post) => post.user_id == userId);

  if (isFavorited.length > 0) {
    res
      .status(400)
      .json({ message: `Post with the id: ${postId} is favorited before.` });
  } else {
    next();
  }
};

//checks if the post favorited before
const isPostInFavorites = async (req, res, next) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;
  const favPosts = await favsModel.getByPostId(postId);
  const isFavorited = favPosts.filter((post) => post.user_id == userId);

  if (isFavorited.length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: `Post with the id: ${postId} not found in favorites.` });
  }
};

const checkIds = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const postId = req.params.post_id;

    if (!userId || !postId) {
      res
        .status(400)
        .json({ message: `Can not add to favorite post id: ${postId}.` });
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

module.exports = {
  checkFavsByUserId,
  checkFavsByPostId,
  isFavoritedBefore,
  isPostInFavorites,
  checkIds,
};
