const db = require("../../data/db-config");

async function getByCommentId(id) {
  const comment = await db("comments as c")
    .where("c.comment_id", id)
    .select("c.*")
    .first();
  return comment;
}

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

async function create(user_id, post_id, body) {
  const [created] = await db("comments as c").insert({
    user_id: user_id,
    post_id: post_id,
    body: body,
  });

  return getByCommentId(created);
}

async function update(user_id, post_id, body) {
  const updated = await db("comments as c")
    .update({
      user_id: user_id,
      post_id: post_id,
      body: body,
    })
    .where({ user_id: user_id, post_id: post_id });

  return getByCommentId(updated);
}

module.exports = { getByCommentId, getById, getByPostId, create, update };
