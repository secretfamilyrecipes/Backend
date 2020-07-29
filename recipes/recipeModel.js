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
  return db("receipes")
  .select("id", "title")
  .orderBy("title");
}

function getBy(filter) {
  return db("recipes")
  .where(filter)
  .orderBy("title");
}

async function add(recipe) {
  try {
    const [id] = await db("recipes")
    .insert(recipe, "id");

    return getById(id);
  } catch (err) {
    throw err;
  }
}

function getById(id) {
  return db("recipes")
  .where({ id })
  .first();
}

function update(id, changes) {
    return db('recipes')
      .where({ id })
      .update(changes);
  }
  
  function remove(id) {
    return db('recipes')
      .where('id', id)
      .del();
  }