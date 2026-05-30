// Import all routes
import express, { Request, Response } from "express";
import skillRoutes from "./routes/skill.routes";
import profileRoutes from "./routes/profile.routes";
import matchRoutes from "./routes/match.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware to parse JSON bodies
app.use(express.json());

// Heartbeat Verification Route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

// Map Application API Routes
app.use("/api/skills", skillRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/matches", matchRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(
    `🚀 DuoBlySync Backend API Local Engine listening cleanly on http://localhost:${PORT}`,
  );
});
