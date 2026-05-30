import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const upsertUserProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      user_email,
      display_name,
      headline,
      role,
      bio,
      location,
      target_industry,
      industry,
    } = req.body;

    // Choose destination table depending on the specified marketplace role
    const targetTable =
      role === "mentor" ? "mentor_profiles" : "mentee_profiles";

    // Structure basic column object ensuring mandatory fields match defaults
    const payload: any = {
      user_email,
      display_name,
      headline,
      bio,
      location,
      updated_at: new Date().toISOString(),
    };

    if (role === "mentor") {
      payload.industry = industry || "technology"; // Fallback enum value
    } else {
      payload.target_industry = target_industry || "technology";
    }

    const { data, error } = await supabase
      .from(targetTable)
      .upsert(payload, { onConflict: "user_email" })
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        message: `${role} profile synchronized successfully.`,
        data,
      });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

export const getProfileByEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.params;
    const { role } = req.query; // pass ?role=mentor or ?role=mentee as a query flag

    if (!role || (role !== "mentor" && role !== "mentee")) {
      res
        .status(400)
        .json({
          error:
            "Valid role query parameter (?role=mentor/mentee) is required.",
        });
      return;
    }

    const targetTable =
      role === "mentor" ? "mentor_profiles" : "mentee_profiles";

    const { data, error } = await supabase
      .from(targetTable)
      .select("*")
      .eq("user_email", email)
      .maybeSingle();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    if (!data) {
      res
        .status(404)
        .json({ error: "Profile not found for this email address." });
      return;
    }

    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};
