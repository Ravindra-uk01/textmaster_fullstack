import express from "express"
import { addThread, deleteThread, getAllThreads, getThread, updateThread } from "../controllers/threadController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/', getAllThreads);

router.post('/', verifyToken , addThread);

router.route('/id/:id')
    .get(getThread)
    .patch(updateThread)
    .delete(deleteThread)

export default router;