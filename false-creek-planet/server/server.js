// Minimal Gemini proxy server (keep your API key on the server)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors({ origin: true })); // dev: allow localhost origins
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { history = [], message } = req.body;

        // Build conversation for Gemini
        const contents = [];
        for (const t of history) {
            if (t?.user) contents.push({ role: "user", parts: [{ text: t.user }] });
            if (t?.assistant) contents.push({ role: "model", parts: [{ text: t.assistant }] });
        }
        contents.push({ role: "user", parts: [{ text: message }] });

        const resp = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents
        });

        res.json({ reply: resp.text });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message ?? "Server error" });
    }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Gemini proxy on http://localhost:${PORT}`));
