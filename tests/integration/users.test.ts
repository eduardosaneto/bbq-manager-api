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
