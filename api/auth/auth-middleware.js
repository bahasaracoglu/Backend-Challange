const usersModel = require("../users/users-model");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");

function checkPayload(req, res, next) {
  const { username, password, email } = req.body;

  let usernameCheck = username || username.length > 2;
  let passwordCheck = password || password.length > 5;
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

//login için usernameOrEmail kontrol eder
function checkPayloadLogin(req, res, next) {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || usernameOrEmail.length < 0 || !password) {
      res.status(400).json({ message: "Username or email are required." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

//isUserAlreadyExist kayıt olurken db'de bu isimde bir kullanıcı olup olmadığını sorgular.//
async function isUserAlreadyExist(req, res, next) {
  const { username, email } = req.body;

  // Kullanıcı adı ve e-posta adresi kontrolü

  try {
    const existingUser = await usersModel.getByUsernameOrEmail(
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

async function hashedPassword(req, res, next) {
  try {
    const hashedpassword = bcryptjs.hashSync(req.body.password, 8);
    req.body.password = hashedpassword;
    next();
  } catch (error) {
    next(error);
  }
}

//isUserExist login olurken kullanıcının db'de olup olmadığını kontrol eder
async function isUserExist(req, res, next) {
  try {
    const { usernameOrEmail } = req.body;
    let existingUser;
    if (validator.isEmail(usernameOrEmail)) {
      // Eğer giriş verisi e-posta adresi ise
      existingUser = await usersModel.getBy({ email: usernameOrEmail });
    } else {
      // Eğer giriş verisi kullanıcı adı ise
      existingUser = await usersModel.getBy({
        username: usernameOrEmail,
      });
    }

    if (existingUser) {
      req.currentUser = existingUser;
      next();
    } else {
      res.status(401).json({ message: "Invalid user or password" });
    }
  } catch (error) {
    next(error);
  }
}

//loginde password kontrolü ve akabinde token yaratılması
async function passwordCheck(req, res, next) {
  const password = req.body.password;
  const dbPassword = req.currentUser.password;
  const isPasswordMatch = bcryptjs.compareSync(password, dbPassword);

  try {
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid user or password" });
    } else {
      let payload = {
        user_id: req.currentUser.user_id,
        username: req.currentUser.username,
        rolename: req.currentUser.rolename,
        avatar_url: req.currentUser.avatar_url,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
      req.token = token;
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkPayload,
  checkPayloadLogin,
  isUserAlreadyExist,
  hashedPassword,
  isUserExist,
  passwordCheck,
};
