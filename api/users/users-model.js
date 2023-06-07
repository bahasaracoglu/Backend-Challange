const db = require("../../data/db-config");

async function getAll() {
  return db("users as u").select(
    "u.user_id",
    "u.username",
    "u.email",
    "u.avatar_url"
  );
}

async function getById(id) {
  const user = await db("users").where("user_id", id).first();
  return user;
}

async function getByUsernameOrEmail(username, email) {
  const user = await db("users").where(username).orWhere(email).first();
  return user;
}

async function getBy(filter) {
  const user = await db("users").where(filter).first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users").insert(user);
  return getById(insertedUser);
}

async function remove(id) {
  return db("users").where("user_id", id).del();
}

module.exports = {
  getAll,
  getByUsernameOrEmail,
  getById,
  getBy,
  create,
  remove,
};
