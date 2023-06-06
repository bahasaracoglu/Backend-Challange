const db = require("../../data/db-config");

function getAll() {
  return db("posts");
}

async function getById(id) {
  const post = await db("posts").where("post_id", id).first();
  return post;
}

async function create(post) {
  const [insertedPost] = await db("posts").insert(post);
  return getById(insertedPost);
}

async function remove(id) {
  await db("posts").where("id", id).del();
  return getById(id);
}

async function update(id, post) {
  return db("posts")
    .where("id", id)
    .update({ body: post.body, image_url: post.image_url });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
