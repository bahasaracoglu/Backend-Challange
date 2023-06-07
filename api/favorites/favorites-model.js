const db = require("../../data/db-config");

//gets users liked posts (returns array with post objects)
async function getById(id) {
  const favPosts = await db("favorites as f")
    .join("posts as p", "f.post_id", "=", "p.post_id")
    .where("f.user_id", id)
    .select("p.*");

  return favPosts;
}

//gets users who favorited the post (returns array with users)
async function getByPostId(id) {
  const favoritedByUsers = await db("favorites as f")
    .join("users as u", "f.user_id", "=", "u.user_id")
    .where("f.post_id", id)
    .select("u.username", { favorited_at: "f.created_at" });

  return favoritedByUsers;
}

function create(user_id, post_id) {
  return db("favorites as f").insert({ user_id: user_id, post_id: post_id });
}

module.exports = { getById, getByPostId, create };
