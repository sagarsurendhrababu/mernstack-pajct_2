import express from 'express';
const router = express.Router();
import userRouter from '../routers/userRouter.js';
import authRouter from '../routers/authRouter.js'

router.use("/user", userRouter);
router.use("/auth", authRouter);


export default router;