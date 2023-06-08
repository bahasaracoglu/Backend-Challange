const validators = require("../../helper/validators");
const tokenHelper = require("../../helper/token-helper");
const postsModel = require("./posts-model");

const checkPayload = (req, res, next) => {
  try {
    const { body, image_url } = req.body;
    const isUrl = validators.isImageUrl(image_url);

    if ((body.length > 0 && body.length <= 280) || isUrl) {
      next();
    } else if (body.length > 280) {
      res
        .status(400)
        .json({ mesasage: "Text cannot be more than 280 characters." });
    } else if (!body && !image_url) {
      res.status(400).json({ mesasage: "Text or image_url is must." });
    } else {
      res.status(400).json({ mesasage: "URL is not valid." });
    }
  } catch (error) {
    next(error);
  }
};

const isUserAllowed = async (req, res, next) => {
  try {
    const payload = tokenHelper.decodeTokensPayload(
      req.headers["authorization"]
    );
    const userId = req.params.user_id;
    if (payload.user_id == userId) {
      next();
    } else {
      res.status(400).json({
        message: `User with id:${payload.user_id} is not allowed.`,
      });
    }
  } catch (error) {
    next(error);
  }
};

const isUserOwnThisPost = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;
    const usersPosts = await postsModel.getBy({ user_id: user_id });
    const isAllowed = usersPosts.filter((post) => post.post_id == post_id);
    if (isAllowed.length === 0) {
      res.status(400).json({
        message: `No permission for this operation with user id:${user_id}.`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkPayload, isUserAllowed, isUserOwnThisPost };
