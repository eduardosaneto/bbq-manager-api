import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import * as usersFactory from "../factories/usersFactory";
import { clearDatabase } from "../utils/database";

const test = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-in", () => {
  it("should answer status 200 for a sucessful login", async () => {
    const user = await usersFactory.createUser();
    const response = await test.post("/sign-in").send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should answer status 401 for incorrect email", async () => {
    const user = await usersFactory.createUser();
    const response = await test.post("/sign-in").send({ email: "test2@email.com", password: user.password });
    expect(response.status).toBe(401);
  });

  it("should answer status 401 for incorrect password", async () => {
    const user = await usersFactory.createUser();
    const response = await test.post("/sign-in").send({ email: user.email, password: "abcdefghi" });
    expect(response.status).toBe(401);
  });
});
