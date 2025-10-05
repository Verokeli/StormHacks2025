// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

if (!process.env.GOOGLE_API_KEY) {
    console.error("Missing GOOGLE_API_KEY");
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------- Middleware ---------- */
// Use CORS only in development (Vite runs on a different origin)
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
}

// JSON body parser with sane limit
app.use(express.json({ limit: "1mb" }));

// Optional: trust reverse proxies in production (Heroku/Render/Railway)
if (isProd) app.set("trust proxy", 1);

/* ---------- Gemini client ---------- */
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

/* ---------- Health check ---------- */
app.get("/healthz", (_req, res) => {
    // Avoid caches for uptime monitors/load balancers
    res.set("Cache-Control", "no-store");
    res.json({ ok: true });
});

/* ---------- API routes ---------- */
app.post("/api/chat", async (req, res, next) => {
    try {
        const { history = [], message } = req.body ?? {};
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Missing message" });
        }

        // Build contents for Gemini
        const contents = [];
        for (const t of history) {
            if (t?.user) contents.push({ role: "user", parts: [{ text: t.user }] });
            if (t?.assistant) contents.push({ role: "model", parts: [{ text: t.assistant }] });
        }
        contents.push({ role: "user", parts: [{ text: message }] });

        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents
        });

        // Be tolerant to SDK return shape differences
        let reply = "No response.";
        if (result) {
            if (typeof result.text === "function") reply = result.text() ?? reply;
            else if (typeof result.text === "string") reply = result.text;
            else if (result.response && typeof result.response.text === "function") {
                reply = result.response.text() ?? reply;
            }
        }

        res.json({ reply });
    } catch (err) {
        // Let the centralized error handler format this
        next(err);
    }
});

/* ---------- Static in production ---------- */
// Serve the Vite build (dist/) from the project root in production
if (isProd) {
    const clientDist = path.join(__dirname, "..", "dist");
    app.use(express.static(clientDist));

    // SPA fallback: forward non-API routes to index.html
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

/* ---------- 404 & Error handlers ---------- */
// API 404 (only for unmatched routes; SPA handled above in prod)
app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not found" });
    }
    next(); // Let static/SPA handle in prod, or dev Vite handles on port 5173
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error("Server error:", err);
    const status = err.status || 500;
    const message = err.message || "Server error";
    res.status(status).json({ error: message });
});

/* ---------- Boot ---------- */
const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
    console.log(
        `Server listening on http://localhost:${PORT} (${isProd ? "production" : "development"})`
    );
});
