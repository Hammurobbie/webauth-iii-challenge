const db = require("../data/dbConfig");

module.exports = {
  find,
  findBy,
  add,
  remove,
  update
};

function find() {
  return db("users");
}

function findBy(username) {
  return db("users").where({ username });
}

function add(userData) {
  return db("users").insert(userData);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}
