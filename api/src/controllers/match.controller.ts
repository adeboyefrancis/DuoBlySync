import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const requestMatch = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { mentor_email, text_email, mentorship_goals } = req.body;

    if (!mentor_email || !text_email) {
      res
        .status(400)
        .json({
          error:
            "Both mentor_email and text_email (mentee email) are required.",
        });
      return;
    }

    const { data, error } = await supabase
      .from("mentorship_matches")
      .insert([
        {
          mentor_email,
          text_email, // Represents matching target text email field reference
          mentorship_goals,
          status: "pending", // Matches your match_status_type enum exactly
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

export const updateMatchStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { matchId } = req.params;
    const { status } = req.body;

    // Aligns exactly with your schema enum values: active, paused, completed, cancelled
    const allowedStatuses = [
      "pending",
      "active",
      "paused",
      "completed",
      "cancelled",
    ];
    if (!allowedStatuses.includes(status)) {
      res
        .status(400)
        .json({
          error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}`,
        });
      return;
    }

    const { data, error } = await supabase
      .from("mentorship_matches")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", matchId)
      .select()
      .single();

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};
