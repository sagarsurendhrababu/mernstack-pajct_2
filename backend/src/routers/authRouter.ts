import express from 'express';
const router = express();
import authMiddleware from '../middleware/authMiddleware.js';
import {signupControler,signinControler, signoutControler, meControl, refreshCOntroler} from '../controllers/authController.js';

router.post("/signup", signupControler);
router.post("/signin", signinControler);
router.post("/signout", signoutControler);
router.get("/me", authMiddleware,  meControl);
router.get("/refresh", refreshCOntroler)

export default router;