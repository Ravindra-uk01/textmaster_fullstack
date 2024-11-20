import express from "express"
import { addThread, deleteThread, getAllThreads, getThread, updateThread, toggleThreadBookmark } from "../controllers/threadController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// router.get('/',verifyToken, getAllThreads);
// router.post('/', verifyToken , addThread);

router
    .route('/')
    .get(verifyToken, getAllThreads)
    .post(verifyToken , addThread)

router.route('/slug/:slug')
    .get(getThread)
    .patch(verifyToken, updateThread)
    .delete(verifyToken, deleteThread)

router.patch('/toggle_bookmark/slug/:slug', verifyToken, toggleThreadBookmark)

export default router;