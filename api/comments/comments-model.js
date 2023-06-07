const db = require("../../data/db-config");

//gets users comments (returns array with comment objects)
async function getById(id) {
  const commentsOfUser = await db("comments as c")
    .where("c.user_id", id)
    .select("c.*");

  return commentsOfUser;
}

//gets users who favorited the post (returns array with users)
async function getByPostId(id) {
  const commentsForPost = await db("comments as c")
    .where("c.post_id", id)
    .select("c.*");

  return commentsForPost;
}

function create(user_id, post_id, body) {
  return db("comments as c").insert({
    user_id: user_id,
    post_id: post_id,
    body: body,
  });
}

module.exports = { getById, getByPostId, create };
