import express from "express";
import {createReport, getMyReports, getreport} from "../controller/report.Controller.js"
import { isDoctorAuthenticated, isPatientAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/createreport/:id', isDoctorAuthenticated, createReport);
router.get('/getmyreports/:id', getMyReports);
router.get('/getreport/:id', getreport);

export default router;