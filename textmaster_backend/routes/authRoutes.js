import express from "express";
import { login, signup, forgetPassword, resetPassword, updatePasssword } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

router.post('/forget_password', forgetPassword);
router.patch('/reset_password/:token', resetPassword);
router.patch('/updateMyPassword',verifyToken, updatePasssword);


export default router;