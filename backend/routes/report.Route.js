import express from "express";
import {createReport} from "../controller/report.Controller.js"
import { isDoctorAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/createreport/:id', isDoctorAuthenticated, createReport);

export default router;