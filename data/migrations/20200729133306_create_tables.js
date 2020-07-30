
exports.up = function(knex) {
    return knex.schema
        .createTable("users", tbl => {
            tbl.increments("id");
            tbl.string("username", 128).notNullable().unique();
            tbl.string("email", 100).notNullable().unique();
            tbl.string("password", 256).notNullable();
        })

        .createTable("recipes", tbl => {
            tbl.increments("id");
            tbl.string("title", 150).notNullable();
            tbl.string("source", 100);
            tbl.string("prep time", 15).notNullable();
            tbl.string("cook time", 15).notNullable();
            tbl.integer("servings").notNullable();
            tbl.text("ingredients").notNullable();
            tbl.text("steps").notNullable();
        })

        .createTable("userrecipes", tbl => {
            tbl.increments();
            tbl.integer("user_id");
            tbl.foreign("user_id").references("users.id");
            tbl.integer("recipe_id");
            tbl.foreign("recipe_id").references("recipes.id")
        })
    
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("recipes")
        .dropTableIfExists("userrecipes")
};
