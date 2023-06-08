const router = require("express").Router();
const postsModel = require("./posts-model");
const postsMw = require("./posts-middleware");
const favsMw = require("../favorites/favorites-middleware");
const usersMw = require("../users/users-middleware");
const commentsMw = require("../comments/comments-middleware");
const restricted = require("../middleware/restricted");

// brings all posts for feed
router.get("/", async (req, res, next) => {
  try {
    const posts = await postsModel.getAll();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

// brings all posts of user with id
router.get("/:id", restricted, usersMw.isUserExist, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const posts = await postsModel.getBy({ user_id: user_id });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//creates new post
router.post("/", postsMw.checkPayload, async (req, res, next) => {
  try {
    const { body, image_url, user_id } = req.body;
    const newPost = { user_id: user_id, body: body, image_url: image_url };
    const insertedPost = await postsModel.create(newPost);
    if (!insertedPost) {
      next(error);
    } else {
      res
        .status(200)
        .json({ message: "New post successfully submitted.", insertedPost });
    }
  } catch (error) {
    next(error);
  }
});

//updates post

router.put("/:id", postsMw.checkPayload, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { body, image_url, user_id } = req.body;
    const newPost = {
      user_id: user_id,
      body: body,
      image_url: image_url,
    };
    const updatedPost = await postsModel.update(id, newPost);
    if (!updatedPost) {
      next(error);
    } else {
      res
        .status(200)
        .json({ message: "Edited post successfully submitted.", updatedPost });
    }
  } catch (error) {
    next(error);
  }
});

//deletes post

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPost = await postsModel.remove(id);
    if (!deletedPost) {
      res.status(400).json({ message: `Post with id: ${id} is not found.` });
    } else {
      res.status(200).json({ message: "Post removed successfully." });
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/favorites",
  favsMw.checkFavsByPostId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.favUsers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/comments",
  commentsMw.checkCommentsByPostId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.comments);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
