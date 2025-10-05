require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
      {
        input: [
          {
            role: "user",
            content: [{ type: "text", text: userMessage }]
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const replyText = response.data?.output?.[0]?.content?.[0]?.text || "No reply";
    res.json({ reply: replyText });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ reply: "Error: Could not get response" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
