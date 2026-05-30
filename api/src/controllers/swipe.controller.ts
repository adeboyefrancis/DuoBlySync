import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const recordSwipe = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { swiper_email, target_email, action, swiper_role, target_role } =
      req.body;

    if (
      !swiper_email ||
      !target_email ||
      !action ||
      !swiper_role ||
      !target_role
    ) {
      res
        .status(400)
        .json({ error: "Incomplete swipe event payload context." });
      return;
    }

    const { data, error } = await supabase
      .from("profile_swipes")
      .insert([
        { swiper_email, target_email, action, swiper_role, target_role },
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
