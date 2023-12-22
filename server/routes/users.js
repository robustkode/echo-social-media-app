import express from "express";
import {
  getUser,
  updateUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.put("/:id", verifyToken, updateUser);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
