import { Router } from "express";
import { getAllSkills, createSkill } from "../controllers/skill.controller";

const router = Router();

// Base path: /api/skills
router.get("/", getAllSkills);
router.post("/", createSkill);

export default router;
