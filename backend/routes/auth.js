import express from "express";
import { registerUser, getUser, loginUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUser);

export default router;
