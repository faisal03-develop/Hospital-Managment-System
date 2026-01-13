import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./db/dbConnection.js";
import MessageRoute from "./routes/message.route.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import UserRoute from "./routes/user.route.js";
import AppointmentRoute from "./routes/appointment.route.js";
import ReportRoute from "./routes/report.route.js"


const app = express();

config({path: "./config/config.env"})
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use('/api/v1/message' , MessageRoute);
app.use('/api/v1/user' , UserRoute);
app.use('/api/v1/appointment' , AppointmentRoute);
app.use('/api/v1/report', ReportRoute);


dbConnection();

app.use(errorMiddleware);

export default app;