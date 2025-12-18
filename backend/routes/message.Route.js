import express from "express";
import { sendMesssage } from "../controller/message.Controller.js";


const router = express.Router();

router.post('/send', sendMesssage)

export default router;

