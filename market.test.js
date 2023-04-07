const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("server test", () => {
  it("[1] Server Çalışıyor mu? /", async () => {
    const res = await superTest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: "Server is working" });
  }, 1000);
});
describe("markets server test", () => {
  it("[2] Tüm marketler geliyor mu?/", async () => {
    const res = await superTest(server).get("/api/markets");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  }, 1000);
});
describe("markets server test", () => {
  it("[3] Marketleri İd ile çağırabiliyor mu ", async () => {
    const res = await superTest(server).get("/api/markets/1");
    expect(res.status).toBe(200);
    expect(res.body.market_name).toBe("Erdal Bakkal");
  }, 1000);
});
describe("markets server test", () => {
  it("[4] Yeni Market ekliyor mu ?", async () => {
    let test = {
      market_Id: 4,
      market_name: "Test Bakkal",
      number_of_branches: 2,
    };
    const res = await superTest(server).post("/api/markets").send(test);
    expect(res.status).toBe(201);
    expect(res.body.market_name).toBe("Test Bakkal");
  }, 1000);
});
describe("markets server test", () => {
  it("[5] Market değiştirilebiliyor mu ? ?", async () => {
    let test = {
      market_Id: 2,
      market_name: "Kest Bakkal",
      number_of_branches: 1,
    };
    const res = await superTest(server).put("/api/markets/2").send(test);
    expect(res.status).toBe(201);
    expect(res.body.market_name).toBe("Kest Bakkal");
  }, 1000);
});
describe("Product server test", () => {
  it("[6] Tüm Productlar geliyor mu?/", async () => {
    const res = await superTest(server).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  }, 1000);
});
describe("Product server test", () => {
  it("[7] Product İd ile çağırabiliyor mu? ", async () => {
    const res = await superTest(server).get("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body.product_name).toBe("domates");
  }, 1000);
});
describe("Product server test", () => {
  it("[8] Yeni Product ekliyor mu ?", async () => {
    let test = {
      price: 60,
      product_name: "Nohut",
      market_Id: 2,
    };
    const res = await superTest(server).post("/api/products").send(test);
    expect(res.status).toBe(201);
    expect(res.body.product_name).toBe("Nohut");
  }, 1000);
});
describe("Product server test", () => {
  it("[9] Product değiştirilebiliyor mu ? ?", async () => {
    let test = {
      price: 10,
      product_name: "Marul",
      market_Id: 1,
    };
    const res = await superTest(server).put("/api/products/2").send(test);
    expect(res.status).toBe(201);
    expect(res.body.price).toEqual(10);
  }, 1000);
});
it("[10] Olmayan products hatası dönüyr mu? /", async () => {
  const res = await superTest(server).get("/api/products/99");
  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Product's not found");
}, 1000);
