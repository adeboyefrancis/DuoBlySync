import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const sendMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { match_id, sender_email, receiver_email, content, message_type } =
      req.body;

    if (!match_id || !sender_email || !receiver_email || !content) {
      res.status(400).json({ error: "Missing core message components." });
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          match_id,
          sender_email,
          receiver_email,
          content,
          message_type: message_type || "text",
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

export const getMatchMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { matchId } = req.params;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("match_id", matchId)
      .order("created_at", { ascending: true });

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
