import express from "express";
import { bookAppointment, getAllAppointments, updateAppointmentStatus, getAppointments, deleteAppointment, getMyAppointments} from "../controller/appointment.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

router.post('/bookappointment', authenticate, authorizeRoles('patient'),  bookAppointment);  //patient can book appointment
router.get('/getallappointments', authenticate, authorizeRoles('admin'), getAllAppointments); //admin can get all appointments
router.put('/updateappointment/:id', authenticate, authorizeRoles('admin'), updateAppointmentStatus); //admin can update appointment status
router.delete('/deleteappointment/:id', authenticate, authorizeRoles('admin'), deleteAppointment); //admin can delete appointment
router.get('/getmyappointments', authenticate, authorizeRoles('patient'), getMyAppointments); //patient can get my appointments
router.get('/doctor/getAppointments', authenticate, authorizeRoles('doctor'), getAppointments); //doctor can get appointments

export default router;