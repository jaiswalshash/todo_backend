import express from "express";
import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js"; 
import { connectDB } from "./dataBase/db.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use("/api/v1/users" ,userRouter);
server.use("/api/v1/tasks", taskRouter);

server.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

config({
    path: "./dataBase/config.env"
})
connectDB();

server.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

server.listen(process.env.PORT, ()=> {
    console.log(`Server is up and running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}Mode` );
})

server.use(errorMiddleware);
