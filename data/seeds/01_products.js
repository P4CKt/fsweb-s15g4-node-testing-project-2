/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").truncate();
  await knex("products").insert([
    { id: 1, product_name: "domates", price: 30 },
    { id: 2, product_name: "biber", price: 20 },
    { id: 3, product_name: "soğan", price: 99999 },
  ]);
};
