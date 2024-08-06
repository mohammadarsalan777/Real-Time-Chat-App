import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

import { router } from "./routes/user.routes.js";
app.use("/api/real-time-chat-app/auth/login", router);
