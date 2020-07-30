
exports.seed = function(knex) {
  return knex('users').insert([
    {username: "test", email: "test@test.com", password:"testing"},
  ]);

};
