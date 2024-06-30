import express from "express";
import { registerUser, getUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/user/:id", getUser);

export default router;
