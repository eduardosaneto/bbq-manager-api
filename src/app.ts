import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userControllers from "./controllers/client/user";
import * as authControllers from "./controllers/client/auth";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.post("/sign-up", userControllers.signUp);
app.post("/sign-in", authControllers.signIn);
app.get("/barbecues", authMiddleware, barbecueControllers.getBarbecues);

export async function init() {
  await connectDatabase();
}

export default app;
