import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB as string)
.then(() => console.log("DB connected"))
.catch(err => console.log(err.message));

app.listen(process.env.PORT,() => {
    console.log("server connected at port " + process.env.PORT);
});
