import express from "express";
import { bookAppointment, getAllAppointments } from "../controller/appointment.Controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/bookappointment', isPatientAuthenticated, bookAppointment);
router.get('/getallappointments', isAdminAuthenticated, getAllAppointments);

export default router;