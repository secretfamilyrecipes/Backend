const db = require("../data/dbConfig");

module.exports = {
  add,
  get,
  getBy,
  getById,
  update,
  remove
};

function get() {
  return db("users").select("id", "email").orderBy("id");
}

function getBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return getById(id);
  } catch (err) {
    throw err;
  }
}

function getById(id) {
  return db("users").where({ id }).first();
}
