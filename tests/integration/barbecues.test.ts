import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import faker from "faker";

import * as usersFactory from "../factories/usersFactory";
import * as authFactory from "../factories/authFactory";
import * as barbecuesFactory from "../factories/barbecuesFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await getConnection().close();
});

describe("GET /barbecues", () => {
  it("should answer status 200 when is sent a valid token", async () => {
    const user = await usersFactory.createUser();
    const session = await authFactory.createSession(user.id, user.email);
    await barbecuesFactory.createBarbecue();
    const response = await test.get("/barbecues").set("Authorization", `Bearer ${session.token}`);
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  it("should answer with status 401 for an invalid token authorization", async () => {
    const Unauthorized = await test.get("/barbecues");
    const response = await test.get("/barbecues").set("Authorization", "Bearer token");
    expect(Unauthorized.status).toBe(401);
    expect(response.status).toBe(401);
  });
});

describe("POST /send-barbecue", () => {
  it("should return status 201 for a sucessful barbecue addition", async () => {
    const user = await usersFactory.createUser();
    const session = await authFactory.createSession(user.id, user.email);
    const body = {
      name: faker.name.firstName(),
      date: "05/12",
      description: faker.lorem.lines(),
      observations: faker.lorem.lines(),
      amountCollected: 150,
      totalParticipants: 10,
      userId: 1,
    };
    const response = await supertest(app)
      .post("/send-barbecue")
      .send(body)
      .set("Authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(201);
  });
});
