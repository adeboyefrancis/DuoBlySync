import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const createSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      match_id,
      mentor_email,
      mentee_email,
      title,
      scheduled_date,
      session_type,
      format,
    } = req.body;

    const { data, error } = await supabase
      .from("mentorship_sessions")
      .insert([
        {
          match_id,
          mentor_email,
          mentee_email,
          title,
          scheduled_date,
          session_type,
          format,
          status: "scheduled",
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

export const getUserSessions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email } = req.params;

    // Fetch sessions where the user is either the mentor or the mentee
    const { data, error } = await supabase
      .from("mentorship_sessions")
      .select("*")
      .or(`mentor_email.eq.${email},mentee_email.eq.${email}`)
      .order("scheduled_date", { ascending: true });

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
