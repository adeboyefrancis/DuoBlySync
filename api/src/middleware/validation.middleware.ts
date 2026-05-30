import { Request, Response, NextFunction } from "express";

export const validateProfileBody = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { user_email, display_name, headline, role } = req.body;

  if (!user_email || !display_name || !headline || !role) {
    res
      .status(400)
      .json({
        error:
          "Missing mandatory fields: user_email, display_name, headline, and role.",
      });
    return;
  }

  if (!["mentor", "mentee"].includes(role)) {
    res
      .status(400)
      .json({ error: 'Role must be either "mentor" or "mentee".' });
    return;
  }

  next();
};
