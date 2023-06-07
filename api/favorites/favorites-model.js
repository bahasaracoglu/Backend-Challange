const db = require("../../data/db-config");

async function getById(id) {
  const favPosts = await db("favorites as f")
    .join("posts as p", "f.post_id", "=", "p.post_id")
    .where("f.user_id", id)
    .select("p.*");

  return favPosts;
}

module.exports = { getById };
