const router = require("express").Router();
const usersModel = require("../users/users-model");
const { checkPayload, isUserExist } = require("./auth-middleware");

router.post("/register", checkPayload, isUserExist, async (req, res, next) => {
  const { username, password, email, avatar_url } = req.body;

  const newUser = {
    username: username,
    password: password,
    email: email,
    avatar_url: avatar_url,
  };

  try {
    const insertedUser = await usersModel.create(newUser);
    res
      .status(200)
      .json({ message: "User successfully created.", insertedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
