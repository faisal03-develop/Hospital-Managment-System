import express from "express";
import { sendMesssage, getAllMessages } from "../controller/message.controller.js";
import {authenticate, authorizeRoles} from "../middleware/auth.js"

const router = express.Router();

router.post('/send', sendMesssage)
router.get('/getallmessages',authenticate, authorizeRoles('admin'), getAllMessages)

export default router;

