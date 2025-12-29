import express from "express";
import { bookAppointment } from "../controller/appointment.Controller.js";
import { isPatientAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post('/bookappointment', isPatientAuthenticated, bookAppointment);

export default router;