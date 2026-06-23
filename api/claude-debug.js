import process from "process";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) return res.status(500).json({ error: "GROQ_API_KEY no configurada" });

  try {
    const { messages, max_tokens } = req.body;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({ model: "llama-3.1-8b-instant", max_tokens: max_tokens || 1000, messages }),
    });

    const data = await response.json();
    // Return provider's raw JSON for inspection
    res.status(200).json({ provider: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al contactar Groq", detail: String(err) });
  }
}
