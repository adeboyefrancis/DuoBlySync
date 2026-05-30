import { Router } from "express";
import {
  createSession,
  getUserSessions,
} from "../controllers/session.controller";
const router = Router();
router.post("/", createSession);
router.get("/:email", getUserSessions);
export default router;
