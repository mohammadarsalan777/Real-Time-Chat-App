import express from "express";
import { register } from "../controllers/user.controller.js";

export const router = express.Router();

// router.post("/register", register); ITS OK
router.route("/register").post(register); // It is perfect
