import express from "express";
import {createUser, getAllUsers, getUser, deleteUser, updateProfile} from "./../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router
    .route('/')
    .get(verifyToken, getAllUsers)
    .post(createUser)

router
    .route('/id/:id')
    .get(getUser)
    .delete(verifyToken, deleteUser)
//     .patch(updateTour)

router.patch('/updateProfile', verifyToken, updateProfile)

export default router;


// router.get('/users/new', userController.showUserForm);
// router.post('/users', userController.createUser);
// router.get('/users', userController.listUsers);
