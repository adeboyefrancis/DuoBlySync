import { Router } from "express";
import {
  upsertUserProfile,
  getProfileByEmail,
} from "../controllers/profile.controller";
import { validateProfileBody } from "../middleware/validation.middleware";

const router = Router();

router.post("/sync", validateProfileBody, upsertUserProfile);
router.get("/:email", getProfileByEmail); // Using email query filters now

export default router;
