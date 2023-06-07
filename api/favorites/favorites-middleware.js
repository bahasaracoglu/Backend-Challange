const favsModel = require("../favorites/favorites-model");

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

module.exports = { checkFavsByUserId, checkFavsByPostId };
