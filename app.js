import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import { connetToDatabase } from './database/mongodb.js';
import threadRouter from './routes/thread.route.js';
import commentRouter from './routes/comment.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(errorMiddleware)

app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/threads", threadRouter)
app.use("/api/v1/comments", commentRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Discussion Chat Api");
})

app.listen(PORT, async (req, res) => {
    console.log(`Server is running on port ${PORT}`);
    await connetToDatabase()
})