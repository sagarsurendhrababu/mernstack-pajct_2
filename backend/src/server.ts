import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import rootRouter from './routers/rootRouter.js'
import errorMiddleware from './middleware/errorMiddleware.js';

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api",rootRouter);
app.use(errorMiddleware);

mongoose.connect(process.env.DB as string)
.then(() => console.log("DB connected"))
.catch(err => console.log(err.message));

app.listen(process.env.PORT,() => {
    console.log("server connected at port " + process.env.PORT);
});
