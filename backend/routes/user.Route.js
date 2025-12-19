import express from "express";
import { registerUser, login } from "../controller/user.Controller.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)

export default router;