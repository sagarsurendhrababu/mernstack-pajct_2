import express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import {userGet, userUpdatePass, userUpdateRole, userDelete, userCreate} from '../controllers/userController.js';

router.get("/users", authMiddleware, roleMiddleware(["admin","superadmin"]), userGet);
router.put("/password/:id", userUpdatePass);
router.put("/role/:id", userUpdateRole);
router.delete("/", userDelete);
router.post("/user", userCreate);

export default router;
