import express from "express";
import { registerUser, login, addNewAdmin, findAllDoctors, getUserDetails, getDoctor, addNewDoctor, logout, getAllUsers,updateUser } from "../controller/user.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', login)
router.post('/addnewadmin',authenticate, authorizeRoles('admin'), addNewAdmin)
router.get('/doctors', findAllDoctors)
router.get('/logout', logout)
router.post('/addnewdoctor', authenticate, authorizeRoles('admin'), addNewDoctor)
router.get("/me", authenticate, getUserDetails);
router.get("/getallusers", authenticate, authorizeRoles('admin'), getAllUsers);
router.put("/updateUser/:id",authenticate, authorizeRoles('patient'), updateUser)
router.get('/getdoctor', authenticate, authorizeRoles('patient'), getDoctor)


// router.get('/admin/me', isAdminAuthenticated, getUserDetails)
// router.get('/doctor/me', isDoctorAuthenticated, getUserDetails)
// router.get('/patient/me', isPatientAuthenticated, getUserDetails)

export default router;