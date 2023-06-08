const db = require("../../data/db-config");

//brings favorited post with favorite_id
async function getByFavId(id) {
  const favedPost = await db("favorites").where("favorite_id", id).first();
  return favedPost;
}

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
    .select("u.username", "u.user_id", { favorited_at: "f.created_at" });

  return favoritedByUsers;
}

async function create(user_id, post_id) {
  const [favorited] = await db("favorites as f").insert({
    user_id: user_id,
    post_id: post_id,
  });
  return getByFavId(favorited);
}

function remove(user_id, post_id) {
  return db("favorites as f")
    .where({ user_id: user_id, post_id: post_id })
    .del();
}

module.exports = { getByFavId, getById, getByPostId, create, remove };
