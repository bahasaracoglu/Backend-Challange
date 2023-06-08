const tokenHelper = require("../../helper/token-helper");
const { JWT_SECRET } = require("../../config/config");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ message: "Token is required" });
    } else {
      jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          await tokenHelper.deleteFromBlackListToken(token);
          res.status(401).json({ message: "Token not valid." });
        } else {
          let isLogoutBefore = await tokenHelper.checkIsInsertBlackList(token);
          if (isLogoutBefore) {
            res.status(400).json({
              message: "User is logged out before. Please login",
            });
          } else {
            req.decodedToken = decodedToken;
            next();
          }
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
