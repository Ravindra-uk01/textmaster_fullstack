import express from "express"
import { addThread, deleteThread, getAllThreads, getThread, updateThread } from "../controllers/threadController.js";

const router = express.Router();

router.get('/', getAllThreads);

router.route('/id/:id')
    .get(getThread)
    .post(addThread)
    .patch(updateThread)
    .delete(deleteThread)

export default router;