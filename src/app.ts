import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userControllers from "./controllers/client/user";
import * as authControllers from "./controllers/client/auth";
import * as barbecueControllers from "./controllers/client/barbecue";
import * as participantsControllers from "./controllers/client/participants";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.post("/sign-up", userControllers.signUp);
app.post("/sign-in", authControllers.signIn);
app.get("/barbecues", authMiddleware, barbecueControllers.getBarbecues);
app.get("/barbecues/:id", authMiddleware, barbecueControllers.getBarbecueById);
app.get("/barbecues/:id/participants", authMiddleware, participantsControllers.getBarbecueParticipants);
app.post("/barbecues/:id/add-participants", authMiddleware, participantsControllers.addBarbecueParticipant);
app.post("/send-barbecue", authMiddleware, barbecueControllers.addBarbecue);
app.post("/participant/:id/check", authMiddleware, participantsControllers.checkPayment);
app.post("/participant/:id/uncheck", authMiddleware, participantsControllers.uncheckPayment);

export async function init() {
  await connectDatabase();
}

export default app;
