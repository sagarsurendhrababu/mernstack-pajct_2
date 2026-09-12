import express from 'express';
const router = express();
import {signupControler,signinControler, signoutControler} from '../controllers/authController.js';

router.post("/signup", signupControler);
router.post("/signin", signinControler);
router.post("/signout", signoutControler);

export default router;