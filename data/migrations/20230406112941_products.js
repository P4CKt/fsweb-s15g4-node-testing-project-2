/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("markets", (tbl) => {
      tbl.increments("market_Id");
      tbl.string("market_name").notNullable().unique();
      tbl.integer("number_of_branches").notNullable();
    })
    .createTable("products", (tbl) => {
      tbl.increments("product_id");
      tbl.string("product_name").notNullable();
      tbl.integer("price").notNullable();
      tbl
        .integer("market_Id")
        .notNullable()
        .unsigned()
        .references("market_Id")
        .inTable("markets")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products").dropTableIfExists("markets");
};
