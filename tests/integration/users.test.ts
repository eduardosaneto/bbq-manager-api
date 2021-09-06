import "../../src/setup";
import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";
import faker from "faker";

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

describe("POST /sign-up", () => {
  it("should answer status 201 for a new user registered", async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      password: "123456",
      confirmPassword: "123456",
    };
    const response = await test.post("/sign-up").send(user);
    expect(response.status).toBe(201);
  });

  it("should answer status 409 for an email already registered", async () => {
    const user = await usersFactory.createUser();
    const newUser = {
      email: user.email,
      name: faker.name.firstName(),
      password: "456789",
      confirmPassword: "456789",
    };
    const response = await test.post("/sign-up").send(newUser);
    expect(response.status).toBe(409);
  });

  it("should answer status 400 for a missing email", async () => {
    const user = {
      email: "",
      name: faker.name.firstName(),
      password: "123456",
      confirmPassword: "123456",
    };
    const response = await test.post("/sign-up").send(user);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for a missing password", async () => {
    const user = {
      email: "test@test.com",
      name: faker.name.firstName(),
      password: "",
      confirmPassword: "",
    };
    const response = await test.post("/sign-up").send(user);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for an invalid password confirmation", async () => {
    const user = {
      email: "test@test.com",
      name: faker.name.firstName(),
      password: "123456",
      confirmPassword: "1233555",
    };
    const response = await test.post("/sign-up").send(user);
    expect(response.status).toBe(400);
  });

  it("should answer status 400 for invalid email", async () => {
    const user = {
      email: "test.emai.com",
      name: faker.name.firstName(),
      password: "123456",
      confirmPassword: "123456",
    };
    const response = await test.post("/sign-up").send(user);
    expect(response.status).toBe(400);
  });
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
