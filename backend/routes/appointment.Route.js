import express from "express";
import { bookAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment, getMyAppointments} from "../controller/appointment.Controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/bookappointment', isPatientAuthenticated, bookAppointment);
router.get('/getallappointments', isAdminAuthenticated, getAllAppointments);
router.put('/updateappointment/:id', isAdminAuthenticated, updateAppointmentStatus);
router.delete('/deleteappointment/:id', isAdminAuthenticated, deleteAppointment);
router.get('/getmyappointments', isPatientAuthenticated, getMyAppointments);

export default router;