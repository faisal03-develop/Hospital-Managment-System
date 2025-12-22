import express from "express";
import { registerUser, login, addNewAdmin, findAllDoctors, getUserDetails } from "../controller/user.Controller.js";
import { isPatientAuthenticated, isAdminAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',isAdminAuthenticated, addNewAdmin)
router.get('/doctors', findAllDoctors)
router.get('/admin/me', isAdminAuthenticated, getUserDetails)
router.get('/user/me', isPatientAuthenticated, getUserDetails)

export default router;