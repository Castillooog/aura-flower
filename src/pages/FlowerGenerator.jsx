import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedFlower from "../components/AnimatedFlower";

const COLOR_OPTIONS = [
  { label: "Rosa",       value: "rosa",      hex: "#F4A0B0" },
  { label: "Lavanda",    value: "lavanda",   hex: "#C9A0DC" },
  { label: "Rojo",       value: "rojo",      hex: "#E05C6A" },
  { label: "Azul cielo", value: "azul cielo",hex: "#87CEEB" },
  { label: "Melocotón",  value: "melocotón", hex: "#FFBFA0" },
  { label: "Blanco",     value: "blanco",    hex: "#F8F0F0" },
  { label: "Lila",       value: "lila",      hex: "#BFA0D4" },
  { label: "Dorado",     value: "dorado",    hex: "#F0C060" },
  { label: "Verde menta",value: "verde menta",hex: "#A8D8B0" },
  { label: "Coral",      value: "coral",     hex: "#FF8C7A" },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────
function IconFlower() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#F4C2C2" />
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#DDA0DD" opacity="0.5"
        style={{ transform: "rotate(60deg)", transformOrigin: "20px 20px" }} />
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#F4C2C2" opacity="0.8"
        style={{ transform: "rotate(120deg)", transformOrigin: "20px 20px" }} />
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#DDA0DD" opacity="0.6"
        style={{ transform: "rotate(180deg)", transformOrigin: "20px 20px" }} />
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#F4C2C2" opacity="0.7"
        style={{ transform: "rotate(240deg)", transformOrigin: "20px 20px" }} />
      <ellipse cx="20" cy="10" rx="5" ry="9" fill="#DDA0DD" opacity="0.5"
        style={{ transform: "rotate(300deg)", transformOrigin: "20px 20px" }} />
      <circle cx="20" cy="20" r="5" fill="#7b5455" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1v14M1 8h14M3.5 3.5l9 9M12.5 3.5l-9 9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronDown({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
      <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M1.5 7.5A6 6 0 0 1 13 4.5M13.5 7.5A6 6 0 0 1 2 10.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 2l2.5 2.5L11 7" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 8l-2.5 2.5L4 13" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Color Dropdown ────────────────────────────────────────────────────────────
function ColorSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = COLOR_OPTIONS.find((c) => c.value === value);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          borderRadius: "12px",
          background: selected ? `${selected.hex}22` : "#FFF5F5",
          border: open
            ? "1.5px solid #F4C2C2"
            : "1.5px solid transparent",
          boxShadow: open ? "0 0 0 4px rgba(244,194,194,0.15)" : "none",
          cursor: "pointer",
          transition: "all 0.2s",
          fontFamily: "'Inter', sans-serif",
          fontSize: "15px",
          color: selected ? "#1b1c1c" : "#827473",
        }}
      >
        {/* Color swatch */}
        <div style={{
          width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
          background: selected ? selected.hex : "transparent",
          border: selected ? "2px solid rgba(0,0,0,0.08)" : "2px dashed #d4c2c2",
          transition: "background 0.3s",
        }} />
        <span style={{ flex: 1, textAlign: "left" }}>
          {selected ? selected.label : "Elige un color…"}
        </span>
        <span style={{ color: "#827473" }}>
          <IconChevronDown open={open} />
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0, right: 0,
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(16px)",
              borderRadius: "14px",
              boxShadow: "0 8px 32px rgba(244,194,194,0.25), 0 2px 8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.8)",
              zIndex: 50,
              overflow: "hidden",
              padding: "6px",
            }}
          >
            {COLOR_OPTIONS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => { onChange(c.value); setOpen(false); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "9px 12px",
                  borderRadius: "10px",
                  border: "none",
                  background: value === c.value ? `${c.hex}33` : "transparent",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#1b1c1c",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => { if (value !== c.value) e.currentTarget.style.background = `${c.hex}18`; }}
                onMouseLeave={(e) => { if (value !== c.value) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                  background: c.hex,
                  border: "2px solid rgba(0,0,0,0.07)",
                  boxShadow: value === c.value ? `0 0 0 3px ${c.hex}55` : "none",
                  transition: "box-shadow 0.15s",
                }} />
                {c.label}
                {value === c.value && (
                  <svg style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 3" stroke="#7b5455" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Input styles helpers ──────────────────────────────────────────────────────
const inputBase = {
  fontFamily: "'Inter', sans-serif",
  background: "#FFF5F5",
  border: "1.5px solid transparent",
  color: "#1b1c1c",
  fontSize: "16px",
};
const focusIn  = (e) => { e.target.style.background = "#fff"; e.target.style.border = "1.5px solid #F4C2C2"; e.target.style.boxShadow = "0 0 0 4px rgba(244,194,194,0.15)"; };
const focusOut = (e) => { e.target.style.background = "#FFF5F5"; e.target.style.border = "1.5px solid transparent"; e.target.style.boxShadow = "none"; };

const labelStyle = { fontFamily: "'Inter', sans-serif", color: "#7b5455", fontWeight: 600 };

// ── Main component ────────────────────────────────────────────────────────────
export default function FlowerGenerator() {
  const [form, setForm]   = useState({ name: "", color: "", trait: "" });
  const [stage, setStage] = useState("form");
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");

  const selectedColor = COLOR_OPTIONS.find((c) => c.value === form.color);

  async function handleSubmit() {
    if (!form.name.trim() || !form.color || !form.trait.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setError("");
    setStage("loading");

    try {
      const apiUrl = import.meta.env.DEV ? "http://localhost:3001/api/claude" : "/api/claude";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Eres un poeta romántico. Para una persona llamada "${form.name}", cuyo color favorito es el "${form.color}" y lo que más le gusta físicamente de sí misma es "${form.trait}", escribe un mensaje especial de amor y admiración.

Responde SOLO con un objeto JSON válido, sin comillas de código, sin texto extra, con esta estructura exacta:
{
  "titulo": "un título poético corto (máx 6 palabras)",
  "mensaje": "un mensaje romántico y personalizado de 3-4 oraciones que mencione su nombre, su rasgo físico favorito y haga referencia sutil a su color favorito",
  "tipoFlor": "elige una sola flor que represente este color: rosa|girasol|orquídea|tulipán|lirio|margarita|lavanda|dalia",
  "adjetivos": ["adjetivo1", "adjetivo2", "adjetivo3"]
}`,
          }],
        }),
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${txt.slice(0,200)}`);
      }

      // Always read raw text first to preserve any noisy wrapper/streaming
      const txt = await response.text();
      console.log("Raw response text:", txt.slice ? txt.slice(0, 2000) : txt);
      let data;
      try {
        data = JSON.parse(txt);
      } catch (err) {
        // Not valid full JSON — keep the raw text for later extraction
        data = txt;
      }

      // Debug: log the raw response shape (helps diagnose why collectStrings may miss content)
      console.log("Raw assistant response:", data);

      // Robust text extraction: walk the response object and collect any string fragments
      function collectStrings(value) {
        const out = [];
        const seen = new WeakSet();
        function walk(v) {
          if (v == null) return;
          if (typeof v === "string") {
            out.push(v);
            return;
          }
          if (typeof v === "number" || typeof v === "boolean") return;
          if (Array.isArray(v)) {
            for (const item of v) walk(item);
            return;
          }
          if (typeof v === "object") {
            if (seen.has(v)) return;
            seen.add(v);
            for (const key of Object.keys(v)) walk(v[key]);
          }
        }
        walk(value);
        return out.join(" ");
      }

      const raw = collectStrings(data?.content) || collectStrings(data) || "";
      // Remove fenced code blocks and trim
      const clean = raw.replace(/```json|```/g, "").trim();
      if (!clean) {
        console.error("Empty or invalid assistant output:", raw, data);
        throw new Error("Respuesta vacía del asistente.");
      }

      // Try to parse JSON defensively. If it fails, try to extract a balanced
      // JSON object from the text (handles prefixes like "text " or other noise).
      function extractBalancedJson(text) {
        const start = text.indexOf("{");
        if (start === -1) return null;
        let depth = 0;
        for (let i = start; i < text.length; i++) {
          const ch = text[i];
          if (ch === "{") depth++;
          else if (ch === "}") {
            depth--;
            if (depth === 0) return text.slice(start, i + 1);
          }
        }
        return null;
      }

      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (err) {
        console.warn("Primary JSON.parse failed, attempting extraction from assistant text.", err);
        const extracted = extractBalancedJson(clean) || extractBalancedJson(raw) || null;
        // Fallback: simple regex to capture the first {...} block if present
        const regexMatch = (!extracted) ? (clean.match(/{[\s\S]*}/) || raw.match(/{[\s\S]*}/)) : null;
        const finalExtract = extracted || (regexMatch ? regexMatch[0] : null);
        if (finalExtract) {
          try {
            parsed = JSON.parse(finalExtract);
          } catch (err2) {
            console.error("Extraction succeeded but JSON.parse still failed:", extracted, err2);
            throw new Error("No se pudo parsear la respuesta JSON del asistente.", { cause: err2 });
          }
        } else {
          console.error("Failed to parse assistant JSON output and no JSON substring found:", clean, raw, err);
          throw new Error("No se pudo parsear la respuesta JSON del asistente.", { cause: err });
        }
      }

      setResult({ ...parsed, color: selectedColor });
      setStage("reveal");
    } catch (e) {
      console.error(e);
      setError("Algo salió mal al crear tu sorpresa. Intenta de nuevo.");
      setStage("form");
    }
  }

  function handleReset() {
    setForm({ name: "", color: "", trait: "" });
    setResult(null);
    setStage("form");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-16">
      <AnimatePresence mode="wait">

        {/* ── FORM ── */}
        {stage === "form" && (
          <motion.div key="form"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }}
            className="w-full max-w-lg"
          >
            <div className="rounded-3xl p-10" style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 8px 48px rgba(244,194,194,0.25), inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}>
              {/* Header icon */}
              <div className="flex justify-center mb-6"><IconFlower /></div>

              <h1 className="text-center text-4xl mb-2" style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700,
                color: "#7b5455", letterSpacing: "-0.02em",
              }}>
                Una Invitación
              </h1>
              <p className="text-center mb-8 text-sm" style={{
                fontFamily: "'Inter', sans-serif", color: "#504444", lineHeight: 1.6,
              }}>
                Permítenos cultivar un momento de belleza exclusivamente para ti.
              </p>

              {/* Name */}
              <div className="mb-5">
                <label className="block mb-2 text-xs uppercase tracking-widest" style={labelStyle}>
                  ¿Cuál es tu nombre?
                </label>
                <input
                  type="text" placeholder="Escribe aquí..."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl outline-none transition-all duration-300"
                  style={inputBase} onFocus={focusIn} onBlur={focusOut}
                />
              </div>

              {/* Color — custom dropdown */}
              <div className="mb-5">
                <label className="block mb-2 text-xs uppercase tracking-widest" style={labelStyle}>
                  ¿Cuál es tu color favorito?
                </label>
                <ColorSelect
                  value={form.color}
                  onChange={(val) => setForm({ ...form, color: val })}
                />
              </div>

              {/* Trait */}
              <div className="mb-7">
                <label className="block mb-2 text-xs uppercase tracking-widest" style={labelStyle}>
                  ¿Qué es lo que más te gusta físicamente de ti?
                </label>
                <textarea
                  placeholder="Escribe un detalle especial..."
                  value={form.trait}
                  onChange={(e) => setForm({ ...form, trait: e.target.value })}
                  rows={2}
                  className="w-full px-5 py-3.5 rounded-xl outline-none transition-all duration-300 resize-none"
                  style={inputBase} onFocus={focusIn} onBlur={focusOut}
                />
              </div>

              {error && (
                <p className="text-center text-sm mb-4"
                  style={{ color: "#ba1a1a", fontFamily: "'Inter', sans-serif" }}>
                  {error}
                </p>
              )}

              <button onClick={handleSubmit}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #7b5455 0%, #7f4b82 100%)",
                  color: "#fff", fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: "15px", letterSpacing: "0.02em",
                  boxShadow: "0 4px 24px rgba(127,75,130,0.35)", border: "none", cursor: "pointer",
                }}>
                Ver mi Sorpresa
                <IconSparkle />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {stage === "loading" && (
          <motion.div key="loading"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="28" stroke="url(#grad)"
                  strokeWidth="3" strokeLinecap="round" strokeDasharray="40 140" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="64" y2="64">
                    <stop stopColor="#F4C2C2" /><stop offset="1" stopColor="#DDA0DD" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#7b5455" }}>
              Cultivando tu momento…
            </p>
          </motion.div>
        )}

        {/* ── REVEAL ── */}
        {stage === "reveal" && result && (
          <motion.div key="reveal"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            <div className="rounded-3xl p-10 flex flex-col items-center text-center" style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 8px 64px rgba(244,194,194,0.3), inset 0 0 0 1px rgba(255,255,255,0.65)",
            }}>
              <motion.div
                initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
                className="mb-6">
                <AnimatedFlower color={result.color?.hex || "#F4C2C2"} type={result.tipoFlor || "rosa"} />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }} className="flex gap-2 flex-wrap justify-center mb-5">
                {result.adjetivos?.map((adj, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs uppercase tracking-widest"
                    style={{
                      background: "rgba(244,194,194,0.2)", color: "#7b5455",
                      fontFamily: "'Inter', sans-serif", fontWeight: 600,
                      border: "1px solid rgba(244,194,194,0.5)",
                    }}>
                    {adj}
                  </span>
                ))}
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontFamily: "'Playfair Display', serif", fontSize: "28px",
                  fontWeight: 700, color: "#7b5455", marginBottom: "16px", lineHeight: 1.3,
                }}>
                {result.titulo}
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "16px",
                  color: "#504444", lineHeight: 1.7, marginBottom: "32px",
                }}>
                {result.mensaje}
              </motion.p>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1 }} onClick={handleReset}
                className="px-8 py-3 rounded-full transition-all duration-200 hover:scale-[1.03] flex items-center gap-2"
                style={{
                  background: "transparent", border: "1.5px solid #F4C2C2",
                  color: "#7b5455", fontFamily: "'Inter', sans-serif",
                  fontWeight: 500, fontSize: "14px", cursor: "pointer",
                }}>
                <IconRefresh />
                Crear otra flor
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}