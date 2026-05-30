// Import all routes
import express, { Request, Response } from "express";
import "dotenv/config"; // Load environment variables from .env file
import cors from "cors"; // Import CORS wrapper
import skillRoutes from "./routes/skill.routes";
import profileRoutes from "./routes/profile.routes";
import matchRoutes from "./routes/match.routes";
import messageRoutes from "./routes/message.routes";
import swipeRoutes from "./routes/swipe.routes";
import sessionRoutes from "./routes/session.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 5005;

// Global Entry Processing Middleware
app.use(cors()); // Allow CORS (Cross-Origin Resource Sharing) request from frontends
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
app.use("/api/messages", messageRoutes);
app.use("/api/swipes", swipeRoutes);
app.use("/api/sessions", sessionRoutes);

// Global Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(
    `🚀 DuoBlySync Backend API Local Engine listening cleanly on http://localhost:${PORT}`,
  );
});
