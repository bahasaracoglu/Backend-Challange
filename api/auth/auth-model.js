const db = require("../../data/db-config");

async function getById(id) {
  const user = await db("users").where("user_id", id).first();
  return user;
}

async function getBy(filter) {
  const user = await db("users").where(filter);
  return;
}

module.exports = {
  getById,
  getBy,
};
