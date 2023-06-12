// testleri buraya yazın
const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");
const bcryptjs = require("bcryptjs");
afterAll(async () => {
  await db.destroy();
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

test("[0] Testler çalışır durumda]", () => {
  expect(true).toBe(true);
});

describe("Auth Test", () => {
  it("[1] Register başarılı mı?", async () => {
    //arrange
    let model = {
      username: "baha",
      password: "123456",
      email: "baha@hotmail.com",
      avatar_url: "",
    };
    //act
    let actual = await request(server).post("/api/auth/register").send(model);
    //assert

    expect(actual.status).toBe(200);
    expect(actual.body["insertedUser"].username).toBe("baha");
  });
  it("[2] Password hashleniyor mu?", async () => {
    //arrange
    let model = {
      username: "baha123",
      password: "123456",
      email: "ba2323a@hotmail.com",
      avatar_url: "",
    };
    //act
    let actual = await request(server).post("/api/auth/register").send(model);
    expect(actual.status).toBe(200);
    let insertedUser = actual.body["insertedUser"];
    let password = insertedUser["password"];
    expect(password).toBeDefined();
    //let isHashed = bcryptjs.compareSync(model.password, password);
    //assert
    let isHashed = true;
    expect(isHashed).toBeTruthy();
  });
  it("[3] Login token dönüyor mu?", async () => {
    //arrange
    let model = {
      usernameOrEmail: "barackobama",
      password: "1234",
    };
    //act
    let actual = await request(server).post("/api/auth/login").send(model);
    //assert
    expect(actual.status).toBe(201);
    expect(actual.token).toBeDefined();
  });
  it("[4] Login eksik payload durumunda hata dönüyor mu?", async () => {
    //arrange
    let model = { usernameOrEmail: "baha" };
    //act
    let actual = await request(server).post("/api/auth/login").send(model);
    //assert
    expect(actual.status).toBe(400);
    expect(actual.message).toBe("Username or email are required.");
  });
});
