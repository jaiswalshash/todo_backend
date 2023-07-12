import express from "express";
import { getUserDetails, register, login, logout } from "../controllers/userFunctions.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout",isAuthenticated, logout);

router.get("/me", isAuthenticated, getUserDetails);


export default router;