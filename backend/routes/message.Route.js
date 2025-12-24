import express from "express";
import { sendMesssage, getAllMessages } from "../controller/message.Controller.js";
import {isAdminAuthenticated} from "../middleware/auth.js"

const router = express.Router();

router.post('/send', sendMesssage)
router.get('/getallmessages',isAdminAuthenticated , getAllMessages)

export default router;

