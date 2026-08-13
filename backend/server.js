import "dotenv/config";
import express from "express";
import cors from "cors";
import portfolioRoutes from "./src/routes/portfolio.js";
import contactRoutes from "./src/routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({
    name: "Mohit Kumar Portfolio API",
    status: "ok",
    endpoints: [
      "GET  /api/all",
      "GET  /api/profile",
      "GET  /api/education",
      "GET  /api/skills",
      "GET  /api/experience",
      "GET  /api/projects",
      "GET  /api/certificates",
      "POST /api/contact",
      "GET  /api/contact (admin, requires x-admin-key header)",
    ],
  });
});

app.get("/api/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api", portfolioRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});
