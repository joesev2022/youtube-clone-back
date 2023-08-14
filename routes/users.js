import express from 'express';
import { deleteUser, getUser, likeVideo, subscribe, unsubscribe, updateUser } from '../controllers/user.js';

const router = express.Router();

//update user
router.put("/:id", updateUser)

//delete user
router.delete("/:id", deleteUser)

//get a user
router.get("/find/:id", getUser)

//subscribe a user
router.put("/sub/:id", subscribe)

//unsubscribe a user
router.put("/unsub/:id", unsubscribe)

// like a video
router.put("/like/:videoId", likeVideo)

//dislike a video
router.put("/dislike/:videoId", likeVideo)

export default router;