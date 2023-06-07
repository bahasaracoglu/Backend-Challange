const usersModel = require("./users-model");

const checkId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const existingUser = await usersModel.getById(id);
    if (!existingUser) {
      res.status(400).json({ message: `User with id: ${id} is not found.` });
    }
  } catch (error) {}
};
