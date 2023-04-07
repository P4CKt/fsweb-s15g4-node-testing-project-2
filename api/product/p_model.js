const db = require("../../data/db-config");

async function getAll() {
  return await db("products");
}

async function getById(products_id) {
  return await db("products").where("product_id", products_id).first();
}
async function createNewProduct(body) {
  const nProduct = await db("products").insert(body);
  return getById(nProduct[0]);
}
async function update(products_Id, body) {
  await db("products").where("product_id", products_Id).update(body);
  return getById(products_Id);
}
async function remove(products_Id) {
  await db("products").where("product_id", products_Id).del();
}

module.exports = {
  getAll,
  getById,
  createNewProduct,
  update,
  remove,
};
