import express from "express";
import { registerUser, login, addNewAdmin, findAllDoctors, getUserDetails, adminLogout, userLogout, addNewDoctor, doctorLogout } from "../controller/user.Controller.js";
import { isPatientAuthenticated, isAdminAuthenticated, isDoctorAuthenticated, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',isAdminAuthenticated, addNewAdmin)
router.get('/doctors', findAllDoctors)
router.get('/admin/me', isAdminAuthenticated, getUserDetails)
router.get('/doctor/me', isDoctorAuthenticated, getUserDetails)
router.get('/patient/me', isPatientAuthenticated, getUserDetails)
router.get('/admin/logout', isAdminAuthenticated, adminLogout)
router.get('/user/logout', isPatientAuthenticated, userLogout)
router.get('/doctor/logout', isDoctorAuthenticated, doctorLogout)
router.post('/addnewdoctor', isAdminAuthenticated, addNewDoctor)
router.get("/me", isAuthenticated, getUserDetails);


export default router;