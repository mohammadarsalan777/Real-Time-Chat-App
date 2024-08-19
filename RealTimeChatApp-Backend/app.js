import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routed
import { router } from "./routes/user.routes.js";
app.use("/api/v1/user/", router);

import messageRoute from "./routes/message.routes.js";
app.use("/api/v1/message/", messageRoute);
