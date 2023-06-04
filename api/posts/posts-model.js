const db = require("../../data/db-config");

function getAll() {
  return db("posts");
}

module.exports = {
  getAll,
};
