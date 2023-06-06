const usersModel = require("./users-model");
const router = require("express").Router();

// brings all users
router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

/*
// brings all users
router.get("/", async (req, res, next) => {
  try {
  
  } catch (error) {}
});

// brings all users
router.get("/", async (req, res, next) => {
  try {

  } catch (error) {}
});*/

module.exports = router;
