import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Parsers
app.use(express.json());

// Heartbeat Verification Route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 DuoBlySync Backend API Local Engine listening cleanly on http://localhost:${PORT}`,
  );
});
