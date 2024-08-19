import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const messageRoute = express.Router();

messageRoute.route("/send/:id").post(isAuthenticated, sendMessage);
messageRoute.route("/:id").post(isAuthenticated, getMessage);

export default messageRoute;
