import { Request, Response } from "express";
import { supabase } from "../config/supabase";

// GET all skills
export const getAllSkills = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ success: true, count: data?.length || 0, data });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

// POST a new skill
export const createSkill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, industry_tags, type } = req.body;

    if (!name) {
      res.status(400).json({ error: "Skill name is required." });
      return;
    }

    const { data, error } = await supabase
      .from("skills")
      .insert([
        {
          name,
          description,
          industry_tags: industry_tags || [],
          type: type || "tool", // Uses your schema's general_skill_type enum fallback
        },
      ])
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(201).json({ success: true, data });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};
