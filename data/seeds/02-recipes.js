
exports.seed = function(knex) {
  return knex('recipes').insert([
    {
    title:"test",
    source:"",
    'prep time': "15",
    'cook time': "30",
    servings: "10",
    ingredients: "testing, testing",
    steps: "1. testing, 2. testing",},
  ]);
   
};
