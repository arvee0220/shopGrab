import express from "express";
import { registerUser, getUser, loginUser, logOutUser } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUser);
router.get("/logout", logOutUser);

export default router;
