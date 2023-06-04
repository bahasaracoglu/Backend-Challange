const router = require("express").Router();
const postsModel = require("./posts-model");

router.get("/", async (req, res, next) => {
  try {
    const posts = await postsModel.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
