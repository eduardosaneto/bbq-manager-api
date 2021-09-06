import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userControllers from "./controllers/client/user";
import * as authControllers from "./controllers/client/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userControllers.signUp);
app.post("/sign-in", authControllers.signIn);

export async function init() {
  await connectDatabase();
}

export default app;
