import express from "express";
import {createReport, getMyReports, getreport, getAllReports} from "../controller/report.controller.js"
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post('/createreport/:id', authenticate, authorizeRoles('doctor'), createReport);
router.get('/getmyreports/:id', getMyReports);
router.get('/getreport/:id', getreport);
router.get('/getallreports', authenticate, authorizeRoles('admin'), getAllReports);

export default router;