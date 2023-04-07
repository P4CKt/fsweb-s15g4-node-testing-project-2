const db = require("../../data/db-config");

async function getAll() {
  return await db("markets");
}

async function getById(market_Id) {
  return await db("markets").where("market_Id", market_Id).first();
}
async function createNewMarket(body) {
  const nMarket = await db("markets").insert(body);
  return getById(nMarket[0]);
}
async function update(market_Id, body) {
  await db("markets").where("market_Id", market_Id).update(body);
  return getById(market_Id);
}
async function remove(market_Id) {
  await db("markets").where("market_Id", market_Id).del();
}

module.exports = {
  getAll,
  getById,
  createNewMarket,
  update,
  remove,
};
