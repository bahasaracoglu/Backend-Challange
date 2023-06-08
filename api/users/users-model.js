const db = require("../../data/db-config");

async function getAll() {
  return await db("users as u")
    .join("roles as r", "u.user_id", "r.user_id")
    .select("u.*", "r.rolename");
}

async function getById(id) {
  const user = await db("users as u")
    .where("user_id", id)
    .select("u.user_id", "u.username", "u.email", "u.avatar_url")
    .first();
  return user;
}

async function getByUsernameOrEmail(username, email) {
  const user = await db("users").where(username).orWhere(email).first();
  return user;
}

async function getBy(filter) {
  const user = await db("users as u")
    .join("roles as r", "u.user_id", "r.user_id")
    .select("u.*", "r.rolename")
    .where(filter)
    .first();
  return user;
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);

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
