const favsModel = require("../favorites/favorites-model");

const checkFavsById = async (req, res, next) => {
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

module.exports = { checkFavsById };
