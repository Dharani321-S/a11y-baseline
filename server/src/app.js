import express from "express";
import { validateRequest } from "./validate.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => res.json({ ok: true }));

  app.post("/api/requests", (req, res) => {
    const errors = validateRequest(req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });
    const reference = "SR-" + Date.now().toString(36).toUpperCase();
    res.status(201).json({ reference });
  });

  return app;
}
