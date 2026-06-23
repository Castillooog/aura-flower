import express from "express";
import cors from "cors";
import process from "process";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/api/claude", async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY no configurada" });
  }

  try {
    const { messages, max_tokens } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: max_tokens || 1000,
        messages,
      }),
    });

    const data = await response.json();
    // Normalize to Anthropic-style response so frontend doesn't need changes
    const text = data.choices?.[0]?.message?.content || "";
    res.json({ content: [{ type: "text", text }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al contactar Groq" });
  }
});

app.listen(3001, () => {
  console.log("🌸 Proxy corriendo en http://localhost:3001");
});