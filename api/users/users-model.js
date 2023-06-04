const db = require("../../data/db-config");

async function getById(id) {
  const user = await db("users").where("user_id", id).first();
  return user;
}

async function getBy(username, email) {
  const user = await db("users").where(username).orWhere(email).first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users").insert(user);
  return getById(insertedUser);
}

module.exports = {
  getById,
  getBy,
  create,
};
