import process from "process";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) return res.status(500).json({ error: "GROQ_API_KEY no configurada" });

  // Helper to safely read raw body and parse JSON when Vercel doesn't provide req.body
  async function parseRequestBody(req) {
    // If the platform already parsed the body, return it
    if (req.body && Object.keys(req.body).length > 0) return req.body;
    // Otherwise read the incoming stream
    return await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => { data += chunk; });
      req.on("end", () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve(parsed);
        } catch {
          // If parsing fails, resolve with raw text to allow downstream handling
          resolve({ __raw: data });
        }
      });
      req.on("error", () => resolve({}));
    });
  }

  try {
    const body = await parseRequestBody(req);
    const { messages, max_tokens } = body.__raw ? {} : body;

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

    // Extract textual content robustly from different provider shapes
    const rawContent = data?.choices?.[0]?.message?.content;
    let text = "";

    if (typeof rawContent === "string") {
      text = rawContent;
    } else if (Array.isArray(rawContent)) {
      text = rawContent
        .map((p) => {
          if (typeof p === "string") return p;
          if (typeof p === "object") return p.text || (p.content && (typeof p.content === "string" ? p.content : JSON.stringify(p.content))) || "";
          return "";
        })
        .join("");
    } else if (rawContent && typeof rawContent === "object") {
      text = rawContent.text || (rawContent.content && (typeof rawContent.content === "string" ? rawContent.content : JSON.stringify(rawContent.content))) || JSON.stringify(rawContent);
    }

    text = typeof text === "string" ? text : JSON.stringify(text);
    res.json({ content: [{ type: "text", text }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al contactar Groq" });
  }
}