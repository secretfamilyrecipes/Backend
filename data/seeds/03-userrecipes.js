
exports.seed = function(knex) {
  return knex('userrecipes').insert([
    {user_id: 1, recipe_id: 1},
  ]);
};
