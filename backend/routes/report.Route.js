import express from "express";
import {createReport, getMyReports} from "../controller/report.Controller.js"
import { isDoctorAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/createreport/:id', isDoctorAuthenticated, createReport);
router.get('/getmyreports/:id', getMyReports);

export default router;