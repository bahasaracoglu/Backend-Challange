const JWT_SECRET = require("../config/config");
const jwt = require("jsonwebtoken");
const db = require("../data/db-config");

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

function decodeTokensPayload(token) {
  const decodedToken = jwt.verify(token, JWT_SECRET);
  return decodedToken;
}

async function logout(token) {
  await db("tokenBlackList").insert({ token: token });
}
function deleteFromBlackListToken(token) {
  return db("tokenBlackList").where("token", token).del();
}
function checkIsInsertBlackList(token) {
  return db("tokenBlackList").where("token", token).first();
}

module.exports = {
  generateToken,
  decodeTokensPayload,
  logout,
  deleteFromBlackListToken,
  checkIsInsertBlackList,
};
