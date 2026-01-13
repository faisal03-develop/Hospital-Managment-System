import express from "express";
import { registerUser, login, addNewAdmin, findAllDoctors, getUserDetails, getDoctor, addNewDoctor, logout, getAllUsers,updateUser } from "../controller/user.controller.js";
import { isPatientAuthenticated, isAdminAuthenticated, isDoctorAuthenticated, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',isAdminAuthenticated, addNewAdmin)
router.get('/doctors', findAllDoctors)
router.get('/logout', logout)
router.post('/addnewdoctor', isAdminAuthenticated, addNewDoctor)
router.get("/me", isAuthenticated, getUserDetails);
router.get("/getallusers", isAdminAuthenticated, getAllUsers);
router.put("/updateUser/:id",isPatientAuthenticated, updateUser)
router.get('/getdoctor', isPatientAuthenticated, getDoctor)


// router.get('/admin/me', isAdminAuthenticated, getUserDetails)
// router.get('/doctor/me', isDoctorAuthenticated, getUserDetails)
// router.get('/patient/me', isPatientAuthenticated, getUserDetails)

export default router;