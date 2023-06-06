const postModel = require("./posts-model");
const validators = require("../../helper/validators");

const checkPayload = (req, res, next) => {
  try {
    const { body, image_url } = req.body;
    const isUrl = validators.isImageUrl(image_url);

    if (
      (body.length > 0 && body.length <= 280) ||
      (isUrl && image_url.length > 0)
    ) {
      next();
    } else if (body.length > 280) {
      res
        .status(400)
        .json({ mesasage: "Text cannot be more than 280 characters." });
    } else if (!isUrl) {
      res.status(400).json({ mesasage: "URL is not valid." });
    } else {
      res.status(400).json({ mesasage: "Text or image_url is must." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkPayload };
