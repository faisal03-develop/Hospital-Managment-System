import express from "express";
import { registerUser, login, addNewAdmin } from "../controller/user.Controller.js";

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin', addNewAdmin)

export default router;