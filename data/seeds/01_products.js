/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("markets").truncate();
  await knex("markets").insert([
    { market_Id: 1, market_name: "Erdal Bakkal", number_of_branches: 1 },
    { market_Id: 2, market_name: "Ömür AVM", number_of_branches: 2 },
    { market_Id: 3, market_name: "Temel Gıda", number_of_branches: 4 },
  ]);

  await knex("products").truncate();
  await knex("products").insert([
    { product_id: 1, product_name: "domates", price: 30, market_Id: 2 },
    { product_id: 2, product_name: "biber", price: 20, market_Id: 1 },
    { product_id: 3, product_name: "soğan", price: 99999, market_Id: 3 },
  ]);
};
