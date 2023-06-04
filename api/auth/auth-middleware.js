const usersModel = require("../users/users-model");
const validator = require("validator");

function checkPayload(req, res, next) {
  const { username, password, email } = req.body;

  let usernameCheck = username || username.length > 3;
  let passwordCheck = password || password.length > 6;
  let emailCheck = validator.isEmail(email);

  try {
    if (!usernameCheck) {
      res
        .status(400)
        .json({ message: "Username must be at least 3 characters." });
    } else if (!passwordCheck) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters." });
    } else if (!emailCheck) {
      res.status(400).json({ message: "Email address is not valid." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function isUserExist(req, res, next) {
  const { username, email } = req.body;

  // Kullanıcı adı ve e-posta adresi kontrolü

  try {
    const existingUser = await usersModel.getBy(
      { username: username },
      { email: email }
    );

    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "This username is already in use." });
      } else if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "This email address is already in use." });
      }
    } else {
      if (!req.body.avatar_url) {
        req.body.avatar_url =
          "https://i.pinimg.com/564x/b9/68/3d/b9683d3fe3f25bca278364f64f215c2a.jpg";
      }
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkPayload, isUserExist };
