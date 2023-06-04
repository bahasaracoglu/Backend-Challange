const router = require("express").Router();
const { checkPayload } = require("./auth-middleware");

router.post("/register", checkPayload, (req, res, next) => {
  const { username, password, email, avatar_url } = req.body;
  try {
  } catch (error) {}
});
