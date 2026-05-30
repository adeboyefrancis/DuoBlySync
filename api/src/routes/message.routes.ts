import { Router } from "express";
import {
  sendMessage,
  getMatchMessages,
} from "../controllers/message.controller";
const router = Router();
router.post("/", sendMessage);
router.get("/:matchId", getMatchMessages);
export default router;
