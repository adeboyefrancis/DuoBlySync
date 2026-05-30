import { Router } from "express";
import { recordSwipe } from "../controllers/swipe.controller";
const router = Router();
router.post("/", recordSwipe);
export default router;
