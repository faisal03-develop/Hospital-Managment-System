import express from "express";
import { registerUser, login, addNewAdmin } from "../controller/user.Controller.js";
import { isPatientAuthenticated, isAdminAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',isAdminAuthenticated, addNewAdmin)

export default router;