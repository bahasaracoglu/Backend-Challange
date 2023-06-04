/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema

    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username").notNullable().unique();
      users.string("password").notNullable();
      users.string("emal").notNullable().unique();
      users
        .string("avatar_url")
        .defaultTo(
          "https://i.pinimg.com/564x/b9/68/3d/b9683d3fe3f25bca278364f64f215c2a.jpg"
        );
    })

    .createTable("posts", (posts) => {
      posts.increments("post_id");
      posts.string("body", 280);
      posts.timestamp("created_at").defaultTo(knex.fn.now());
      posts.string("image_url");
      posts
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })

    .createTable("favorites", (favorites) => {
      favorites.increments("favorite_id");
      favorites
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      favorites
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema
    .dropTableIfExists("favorites")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
