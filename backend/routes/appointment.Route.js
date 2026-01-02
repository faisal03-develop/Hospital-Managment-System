import express from "express";
import { bookAppointment, getAllAppointments, updateAppointmentStatus, getAppointments, deleteAppointment, getMyAppointments} from "../controller/appointment.Controller.js";
import { isAdminAuthenticated, isPatientAuthenticated, isDoctorAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/bookappointment', isPatientAuthenticated, bookAppointment);
router.get('/getallappointments', isAdminAuthenticated, getAllAppointments);
router.put('/updateappointment/:id', isAdminAuthenticated, updateAppointmentStatus);
router.delete('/deleteappointment/:id', isAdminAuthenticated, deleteAppointment);
router.get('/getmyappointments', isPatientAuthenticated, getMyAppointments);
router.get('/doctor/getAppointments', isDoctorAuthenticated, getAppointments);

export default router;