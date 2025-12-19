import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./db/dbConnection.js";
import MessageRoute from "./routes/message.Route.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import UserRoute from "./routes/user.Route.js";

const app = express();
config({path: "./config/config.env"})
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
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


dbConnection();

app.use(errorMiddleware);

export default app;