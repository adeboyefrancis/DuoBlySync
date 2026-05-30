import { Router } from "express";
import {
  requestMatch,
  updateMatchStatus,
} from "../controllers/match.controller";

const router = Router();

router.post("/request", requestMatch);
router.patch("/:matchId/status", updateMatchStatus);

export default router;
