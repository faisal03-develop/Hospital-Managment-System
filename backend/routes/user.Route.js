import express from "express";
import { registerUser, login, addNewAdmin, findAllDoctors, getUserDetails, adminLogout,userLogout } from "../controller/user.Controller.js";
import { isPatientAuthenticated, isAdminAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',isAdminAuthenticated, addNewAdmin)
router.get('/doctors', findAllDoctors)
router.get('/admin/me', isAdminAuthenticated, getUserDetails)
router.get('/user/me', isPatientAuthenticated, getUserDetails)
router.get('/admin/logout', isAdminAuthenticated, adminLogout)
router.get('/user/logout', isPatientAuthenticated, userLogout)


export default router;