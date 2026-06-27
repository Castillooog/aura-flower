import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Color helpers ─────────────────────────────────────────────────────────────
function darken(hex, amount = 30) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function lighten(hex, amount = 40) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

// ── Color options ─────────────────────────────────────────────────────────────
const COLOR_OPTIONS = [
  { label: "Rosa",        value: "rosa",        hex: "#F4A0B0" },
  { label: "Lavanda",     value: "lavanda",     hex: "#C9A0DC" },
  { label: "Rojo",        value: "rojo",        hex: "#E05C6A" },
  { label: "Azul cielo",  value: "azul cielo",  hex: "#87CEEB" },
  { label: "Melocotón",   value: "melocotón",   hex: "#FFBFA0" },
  { label: "Blanco",      value: "blanco",      hex: "#F8F0F0" },
  { label: "Lila",        value: "lila",        hex: "#BFA0D4" },
  { label: "Dorado",      value: "dorado",      hex: "#F0C060" },
  { label: "Verde menta", value: "verde menta", hex: "#A8D8B0" },
  { label: "Coral",       value: "coral",       hex: "#FF8C7A" },
];

// ── Flower SVG heads (inline, no import needed) ───────────────────────────────
function RosaHead({ color, size = 1 }) {
  const dark = darken(color); const light = lighten(color);
  const petals = [0,45,90,135,180,225,270,315];
  return (
    <g transform={`scale(${size})`}>
      {petals.map((a,i) => <ellipse key={`o${i}`} cx="0" cy={-28} rx={10} ry={18} fill={light} opacity="0.85" style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      {petals.map((a,i) => <ellipse key={`i${i}`} cx="0" cy={-22} rx={8} ry={14} fill={color} style={{ transformOrigin:"0 0", transform:`rotate(${a+22.5}deg)` }} />)}
      <circle cx="0" cy="0" r={10} fill={dark} />
      <circle cx="0" cy="0" r={5} fill={lighten(dark,20)} />
    </g>
  );
}

function TulipHead({ color, size = 1 }) {
  const petals = [270,330,30,90,150,210];
  return (
    <g transform={`scale(${size})`}>
      {petals.map((a,i) => <path key={i} d="M0,0 C-8,-16 -11,-32 -3,-42 C0,-46 3,-46 3,-42 C11,-32 8,-16 0,0 Z" fill={i%2===0?color:lighten(color,20)} style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      <circle cx="0" cy="0" r={7} fill={darken(color,15)} />
    </g>
  );
}

function MargueritaHead({ color, size = 1 }) {
  const petals = Array.from({length:12},(_,i)=>i*30);
  return (
    <g transform={`scale(${size})`}>
      {petals.map((a,i) => <ellipse key={i} cx="0" cy={-28} rx={7} ry={18} fill={color} style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      <circle cx="0" cy="0" r={13} fill="#F5C842" />
      <circle cx="0" cy="0" r={7} fill="#E0A800" />
    </g>
  );
}

function GirasolHead({ color, size = 1 }) {
  const petals = Array.from({length:16},(_,i)=>i*(360/16));
  return (
    <g transform={`scale(${size})`}>
      {petals.map((a,i) => <ellipse key={i} cx="0" cy={-36} rx={8} ry={24} fill={color} style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      <circle cx="0" cy="0" r={18} fill="#5C3D11" />
      <circle cx="0" cy="0" r={10} fill="#7A5230" />
    </g>
  );
}

function OrquidaHead({ color, size = 1 }) {
  const light = lighten(color,20); const dark = darken(color);
  return (
    <g transform={`scale(${size})`}>
      {[270,30,150].map((a,i) => <ellipse key={`l${i}`} cx="0" cy={-32} rx={12} ry={24} fill={light} opacity="0.9" style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      {[90,210].map((a,i) => <ellipse key={`s${i}`} cx="0" cy={-26} rx={9} ry={19} fill={color} style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />)}
      <ellipse cx="0" cy={14} rx={13} ry={10} fill={dark} />
      <circle cx="0" cy="0" r={6} fill={lighten(dark,25)} />
    </g>
  );
}

function LavandaHead({ color, size = 1 }) {
  const buds = [[0,-44],[-6,-36],[6,-36],[-4,-28],[4,-28],[-7,-20],[7,-20],[0,-14]];
  return (
    <g transform={`scale(${size})`}>
      <line x1="0" y1="0" x2="0" y2={-52} stroke="#6B8C5A" strokeWidth="2.5" strokeLinecap="round" />
      {buds.map(([x,y],i) => <ellipse key={i} cx={x} cy={y} rx={5} ry={8} fill={color} opacity="0.9" />)}
    </g>
  );
}

function DaliaHead({ color, size = 1 }) {
  const light = lighten(color,20);
  const rings = [{count:8,radius:18},{count:13,radius:34},{count:18,radius:50}];
  return (
    <g transform={`scale(${size})`}>
      {rings.map(({count,radius},ri) =>
        Array.from({length:count},(_,i) => {
          const angle=(i*360)/count, rad=(angle*Math.PI)/180;
          const cx=Math.sin(rad)*radius, cy=-Math.cos(rad)*radius;
          return <ellipse key={`${ri}-${i}`} cx={cx} cy={cy} rx={6} ry={11} fill={ri%2===0?color:light} opacity="0.9" style={{ transform:`rotate(${angle}deg)`, transformOrigin:`${cx}px ${cy}px` }} />;
        })
      )}
      <circle cx="0" cy="0" r={9} fill={darken(color)} />
    </g>
  );
}

const FLOWER_HEADS = {
  rosa: RosaHead, girasol: GirasolHead, orquídea: OrquidaHead, orquidea: OrquidaHead,
  tulipán: TulipHead, tulipan: TulipHead, lirio: TulipHead,
  margarita: MargueritaHead, lavanda: LavandaHead, dalia: DaliaHead,
};

// ── Romantic scene SVG ────────────────────────────────────────────────────────
function RomanticScene({ color1, color2, name1, name2, flor1, flor2, compatibilidad }) {
  const Head1 = FLOWER_HEADS[flor1?.toLowerCase()] || RosaHead;
  const Head2 = FLOWER_HEADS[flor2?.toLowerCase()] || RosaHead;

  return (
    <motion.svg
      width="340" height="320"
      viewBox="-170 -240 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={lighten(color1, 50)} stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="0" cy="-80" rx="160" ry="120" fill="url(#bgGlow)" />

      {/* Stars / sparkles */}
      {[[-120,-180],[-80,-210],[80,-200],[130,-170],[-50,-220],[60,-215],[0,-225]].map(([x,y],i) => (
        <motion.g key={i} initial={{ opacity:0, scale:0 }} animate={{ opacity:[0,1,0.5,1], scale:1 }}
          transition={{ delay: i*0.15, duration:2, repeat:Infinity, repeatType:"reverse" }}>
          <circle cx={x} cy={y} r={i%2===0?2:1.5} fill={i%3===0?color1:color2} opacity="0.8" />
        </motion.g>
      ))}

      {/* Left flower stem */}
      <motion.g initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:1, opacity:1 }}
        transition={{ delay:0.2, duration:0.7 }} style={{ transformOrigin:"−60px 0px" }}>
        <path d="M-60,0 Q-65,-60 -60,-120" stroke="#6B8C5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M-60,-60 C-80,-70 -85,-50 -65,-52 Z" fill="#7DAB6A" opacity="0.85" />
        <motion.g initial={{ scale:0, rotate:-20 }} animate={{ scale:1, rotate:0 }}
          transition={{ delay:0.6, type:"spring", bounce:0.4 }}>
          <g transform="translate(-60,-120)">
            <Head1 color={color1} size={0.75} />
          </g>
        </motion.g>
      </motion.g>

      {/* Right flower stem */}
      <motion.g initial={{ scaleY:0, opacity:0 }} animate={{ scaleY:1, opacity:1 }}
        transition={{ delay:0.35, duration:0.7 }} style={{ transformOrigin:"60px 0px" }}>
        <path d="M60,0 Q65,-60 60,-120" stroke="#6B8C5A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M60,-60 C80,-70 85,-50 65,-52 Z" fill="#7DAB6A" opacity="0.85" />
        <motion.g initial={{ scale:0, rotate:20 }} animate={{ scale:1, rotate:0 }}
          transition={{ delay:0.75, type:"spring", bounce:0.4 }}>
          <g transform="translate(60,-120)">
            <Head2 color={color2} size={0.75} />
          </g>
        </motion.g>
      </motion.g>

      {/* Center small flowers leaning toward each other */}
      <motion.g initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.9, type:"spring" }}>
        <path d="M-18,0 Q-12,-50 -8,-80" stroke="#6B8C5A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g transform="translate(-8,-80)">
          <Head1 color={lighten(color1,15)} size={0.5} />
        </g>
      </motion.g>
      <motion.g initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:1.0, type:"spring" }}>
        <path d="M18,0 Q12,-50 8,-80" stroke="#6B8C5A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g transform="translate(8,-80)">
          <Head2 color={lighten(color2,15)} size={0.5} />
        </g>
      </motion.g>

      {/* Animated heart between the two central flowers */}
      <motion.g
        initial={{ scale:0, opacity:0 }} animate={{ scale:[0,1.2,1], opacity:1 }}
        transition={{ delay:1.3, duration:0.6, type:"spring" }}
        style={{ transformOrigin:"0px -105px" }}
      >
        <motion.path
          d="M0,-97 C0,-97 -10,-110 -18,-105 C-26,-100 -26,-88 -14,-80 L0,-68 L14,-80 C26,-88 26,-100 18,-105 C10,-110 0,-97 0,-97 Z"
          fill={color1} opacity="0.9" filter="url(#glow)"
          animate={{ scale:[1,1.1,1] }}
          transition={{ delay:2, duration:2, repeat:Infinity, ease:"easeInOut" }}
          style={{ transformOrigin:"0px -90px" }}
        />
        <motion.path
          d="M0,-97 C0,-97 -10,-110 -18,-105 C-26,-100 -26,-88 -14,-80 L0,-68 L14,-80 C26,-88 26,-100 18,-105 C10,-110 0,-97 0,-97 Z"
          fill={color2} opacity="0.5"
          animate={{ scale:[1,1.15,1] }}
          transition={{ delay:2.3, duration:2, repeat:Infinity, ease:"easeInOut" }}
          style={{ transformOrigin:"0px -90px" }}
        />
      </motion.g>

      {/* Compatibility score arc */}
      <motion.path
        d={`M-70,-10 Q0,-50 70,-10`}
        stroke={`${color1}66`} strokeWidth="1.5" fill="none" strokeDasharray="4 4"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ delay:1.5, duration:1 }}
      />

      {/* Names */}
      <motion.text x="-60" y="20" textAnchor="middle" fontFamily="'Playfair Display', serif"
        fontSize="11" fill={darken(color1,20)} fontStyle="italic"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}>
        {name1}
      </motion.text>
      <motion.text x="60" y="20" textAnchor="middle" fontFamily="'Playfair Display', serif"
        fontSize="11" fill={darken(color2,20)} fontStyle="italic"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.9 }}>
        {name2}
      </motion.text>

      {/* Compatibility % */}
      <motion.text x="0" y="45" textAnchor="middle" fontFamily="'Inter', sans-serif"
        fontSize="10" fill="#7b5455" letterSpacing="2"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.1 }}>
        {compatibilidad}% compatibles
      </motion.text>

      {/* Floating petals */}
      {[[-100,-140,color1],[90,-160,color2],[-40,-195,color1],[50,-185,color2]].map(([x,y,c],i) => (
        <motion.ellipse key={i} cx={x} cy={y} rx="4" ry="6" fill={c} opacity="0.5"
          animate={{ y:[0,-15,0], rotate:[0,30,0], opacity:[0.5,0.8,0.5] }}
          transition={{ delay:i*0.4, duration:3+i*0.5, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </motion.svg>
  );
}

// ── Color picker dropdown ─────────────────────────────────────────────────────
function ColorPicker({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const selected = COLOR_OPTIONS.find(c => c.value === value);

  return (
    <div style={{ position:"relative" }}>
      <label style={{ display:"block", marginBottom:"6px", fontSize:"11px", fontFamily:"'Inter',sans-serif",
        fontWeight:600, color:"#7b5455", textTransform:"uppercase", letterSpacing:"0.1em" }}>
        {label}
      </label>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"11px 14px",
          borderRadius:"12px", background: selected?`${selected.hex}22`:"#FFF5F5",
          border:"1.5px solid transparent", cursor:"pointer", fontFamily:"'Inter',sans-serif",
          fontSize:"14px", color: selected?"#1b1c1c":"#827473", transition:"all 0.2s",
          ...(open?{border:"1.5px solid #F4C2C2", boxShadow:"0 0 0 4px rgba(244,194,194,0.15)"}:{}) }}>
        <div style={{ width:"18px", height:"18px", borderRadius:"50%", flexShrink:0,
          background: selected?selected.hex:"transparent",
          border: selected?"2px solid rgba(0,0,0,0.08)":"2px dashed #d4c2c2" }} />
        <span style={{ flex:1, textAlign:"left" }}>{selected?selected.label:"Elige un color…"}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transform:open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}>
          <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
            transition={{ duration:0.15 }}
            style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:100,
              background:"rgba(255,255,255,0.97)", backdropFilter:"blur(16px)", borderRadius:"12px",
              boxShadow:"0 8px 32px rgba(244,194,194,0.25), inset 0 0 0 1px rgba(255,255,255,0.8)",
              padding:"6px", maxHeight:"220px", overflowY:"auto" }}>
            {COLOR_OPTIONS.map(c => (
              <button key={c.value} type="button"
                onClick={() => { onChange(c.value); setOpen(false); }}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px", padding:"8px 10px",
                  borderRadius:"8px", border:"none", background:value===c.value?`${c.hex}33`:"transparent",
                  cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#1b1c1c" }}>
                <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:c.hex,
                  border:"2px solid rgba(0,0,0,0.07)", flexShrink:0 }} />
                {c.label}
                {value===c.value && (
                  <svg style={{ marginLeft:"auto" }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6l3.5 3.5L11 2" stroke="#7b5455" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

// ── Input styles ──────────────────────────────────────────────────────────────
const iBase = { fontFamily:"'Inter',sans-serif", background:"#FFF5F5", border:"1.5px solid transparent",
  color:"#1b1c1c", fontSize:"14px", width:"100%", borderRadius:"12px", padding:"11px 14px",
  outline:"none", transition:"all 0.2s", boxSizing:"border-box" };

function Field({ label, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display:"block", marginBottom:"6px", fontSize:"11px", fontFamily:"'Inter',sans-serif",
        fontWeight:600, color:"#7b5455", textTransform:"uppercase", letterSpacing:"0.1em" }}>
        {label}
      </label>
      <input {...props} style={{ ...iBase, ...(focused?{background:"#fff",border:"1.5px solid #F4C2C2",boxShadow:"0 0 0 4px rgba(244,194,194,0.15)"}:{}) }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
    </div>
  );
}

// ── Person card ───────────────────────────────────────────────────────────────
function PersonCard({ number, data, onChange, accentColor }) {
  return (
    <div style={{ flex:1, minWidth:"240px", borderRadius:"20px", padding:"24px", alignSelf:"stretch",
      background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)",
      boxShadow:"0 4px 24px rgba(244,194,194,0.15), inset 0 0 0 1px rgba(255,255,255,0.7)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
        <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:accentColor,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"14px", fontWeight:700, color:"#fff", fontFamily:"'Inter',sans-serif", flexShrink:0 }}>
          {number}
        </div>
        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"16px", color:"#7b5455", fontWeight:600 }}>
          Persona {number}
        </span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
        <Field label="Nombre" placeholder="¿Cómo te llamas?" value={data.name}
          onChange={e => onChange({ ...data, name:e.target.value })} />
        <ColorPicker label="Color favorito" value={data.color}
          onChange={val => onChange({ ...data, color:val })} />
        <Field label="Tu rasgo físico favorito" placeholder="Ej: mis ojos, mi sonrisa…"
          value={data.trait} onChange={e => onChange({ ...data, trait:e.target.value })} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LoveStory() {
  const [p1, setP1] = useState({ name:"", color:"", trait:"" });
  const [p2, setP2] = useState({ name:"", color:"", trait:"" });
  const [stage, setStage] = useState("form"); // form | loading | result
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const c1 = COLOR_OPTIONS.find(c => c.value === p1.color);
  const c2 = COLOR_OPTIONS.find(c => c.value === p2.color);

  async function handleGenerate() {
    if (!p1.name.trim() || !p1.color || !p1.trait.trim() ||
        !p2.name.trim() || !p2.color || !p2.trait.trim()) {
      setError("Por favor completa todos los campos de ambas personas.");
      return;
    }
    setError("");
    setStage("loading");

    try {
      const apiUrl = import.meta.env.DEV ? "http://localhost:3001/api/claude" : "/api/claude";
      const response = await fetch(apiUrl, {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          max_tokens: 1200,
          messages:[{
            role:"user",
            content:`Eres un narrador romántico y poeta. Dos personas quieren descubrir su historia de amor y compatibilidad floral.

Persona 1: nombre "${p1.name}", color favorito "${p1.color}", rasgo físico favorito "${p1.trait}"
Persona 2: nombre "${p2.name}", color favorito "${p2.color}", rasgo físico favorito "${p2.trait}"

Responde SOLO con un objeto JSON válido, sin texto extra, sin comillas de código, con esta estructura exacta:
{
  "compatibilidad": número entre 70 y 99,
  "florPersona1": "una flor de: rosa|girasol|orquídea|tulipán|lirio|margarita|lavanda|dalia",
  "florPersona2": "una flor de: rosa|girasol|orquídea|tulipán|lirio|margarita|lavanda|dalia",
  "florPareja": "una flor especial que representa su unión, de la misma lista",
  "tituloCuento": "título poético del cuento (máx 7 palabras)",
  "cuento": "historia de amor de 4-5 oraciones que mencione los nombres de ambas personas, sus rasgos físicos favoritos y haga referencia sutil a sus colores favoritos. Debe ser romántica, poética y con final feliz.",
  "mensajeCompatibilidad": "frase corta de 1 oración sobre por qué son compatibles"
}`
          }]
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const txt = await response.text();
      let data;
      try { data = JSON.parse(txt); } catch { data = txt; }

      // Extract text from response
      function collectStrings(value) {
        const out = [];
        const seen = new WeakSet();
        function walk(v) {
          if (v == null) return;
          if (typeof v === "string") { out.push(v); return; }
          if (typeof v !== "object") return;
          if (Array.isArray(v)) { v.forEach(walk); return; }
          if (seen.has(v)) return; seen.add(v);
          Object.keys(v).forEach(k => walk(v[k]));
        }
        walk(value);
        return out.join(" ");
      }

      const raw = collectStrings(data?.content) || collectStrings(data) || "";
      const clean = raw.replace(/```json|```/g,"").trim();
      if (!clean) throw new Error("Respuesta vacía.");

      function extractJson(text) {
        const start = text.indexOf("{"); if (start===-1) return null;
        let depth = 0;
        for (let i=start; i<text.length; i++) {
          if (text[i]==="{") depth++;
          else if (text[i]==="}") { depth--; if (depth===0) return text.slice(start,i+1); }
        }
        return null;
      }

      let parsed;
      try { parsed = JSON.parse(clean); }
      catch {
        const extracted = extractJson(clean) || extractJson(raw);
        if (extracted) parsed = JSON.parse(extracted);
        else throw new Error("No se pudo parsear la respuesta.");
      }

      setResult({ ...parsed, color1: c1, color2: c2, name1: p1.name, name2: p2.name });
      setStage("result");
    } catch(e) {
      console.error(e);
      setError("Algo salió mal. Intenta de nuevo.");
      setStage("form");
    }
  }

  function handleReset() {
    setP1({ name:"", color:"", trait:"" });
    setP2({ name:"", color:"", trait:"" });
    setResult(null);
    setStage("form");
  }

  return (
    <section style={{ padding:"60px 20px 80px", maxWidth:"900px", margin:"0 auto" }}>

      {/* Section header */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ textAlign:"center", marginBottom:"48px" }}>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", fontWeight:600, color:"#7b5455",
          letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"12px" }}>
          ✦ Compatibilidad & Historia ✦
        </p>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,42px)",
          fontWeight:700, color:"#7b5455", margin:"0 0 14px", letterSpacing:"-0.02em", lineHeight:1.2 }}>
          Historias de Amor
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:"#504444",
          maxWidth:"480px", margin:"0 auto", lineHeight:1.65 }}>
          Descubre qué flores os representan, cuánto os complementáis y el cuento que el universo escribió para vosotros.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">

        {/* ── FORM ── */}
        {stage === "form" && (
          <motion.div key="form" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }} transition={{ duration:0.5 }}>

            {/* Two person cards */}
            <div style={{ display:"flex", gap:"16px", flexWrap:"wrap", marginBottom:"24px", alignItems:"flex-start" }}>
              <PersonCard number={1} data={p1} onChange={setP1}
                accentColor={c1?.hex || "#F4A0B0"} />
              {/* Divider heart */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                minWidth:"40px", padding:"8px 0" }}>
                <motion.div animate={{ scale:[1,1.2,1] }}
                  transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 24 C14 24 2 16 2 9 C2 5 5 3 8 3 C10.5 3 12.5 4.5 14 6.5 C15.5 4.5 17.5 3 20 3 C23 3 26 5 26 9 C26 16 14 24 14 24 Z"
                      fill="#F4A0B0" opacity="0.8" />
                  </svg>
                </motion.div>
              </div>
              <PersonCard number={2} data={p2} onChange={setP2}
                accentColor={c2?.hex || "#C9A0DC"} />
            </div>

            {error && (
              <p style={{ textAlign:"center", color:"#ba1a1a", fontFamily:"'Inter',sans-serif",
                fontSize:"13px", marginBottom:"16px" }}>{error}</p>
            )}

            <div style={{ textAlign:"center" }}>
              <button onClick={handleGenerate}
                style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"15px",
                  color:"#fff", background:"linear-gradient(135deg,#7b5455 0%,#7f4b82 100%)",
                  border:"none", borderRadius:"9999px", padding:"14px 40px", cursor:"pointer",
                  boxShadow:"0 4px 24px rgba(127,75,130,0.35)", letterSpacing:"0.02em",
                  transition:"transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                ✦ Revelar nuestra historia
              </button>
            </div>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {stage === "loading" && (
          <motion.div key="loading" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            exit={{ opacity:0 }} style={{ textAlign:"center", padding:"60px 0" }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:3, repeat:Infinity, ease:"linear" }}
              style={{ display:"inline-block", marginBottom:"24px" }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="28" r="24" stroke="url(#lg)" strokeWidth="3"
                  strokeLinecap="round" strokeDasharray="40 110" />
                <defs>
                  <linearGradient id="lg" x1="0" y1="0" x2="56" y2="56">
                    <stop stopColor="#F4C2C2"/><stop offset="1" stopColor="#C9A0DC"/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", color:"#7b5455" }}>
              Tejiendo vuestra historia…
            </p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#827473", marginTop:"8px" }}>
              El universo está consultando las flores
            </p>
          </motion.div>
        )}

        {/* ── RESULT ── */}
        {stage === "result" && result && (
          <motion.div key="result" initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }}
            exit={{ opacity:0 }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>

            {/* Romantic SVG scene */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"32px" }}>
              <RomanticScene
                color1={result.color1?.hex || "#F4A0B0"}
                color2={result.color2?.hex || "#C9A0DC"}
                name1={result.name1} name2={result.name2}
                flor1={result.florPersona1} flor2={result.florPersona2}
                compatibilidad={result.compatibilidad}
              />
            </div>

            {/* Compatibility badge */}
            <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay:0.5 }}
              style={{ textAlign:"center", marginBottom:"28px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"12px",
                background:"rgba(255,255,255,0.75)", backdropFilter:"blur(12px)",
                borderRadius:"9999px", padding:"10px 24px",
                boxShadow:"0 4px 20px rgba(244,194,194,0.2), inset 0 0 0 1px rgba(255,255,255,0.8)" }}>
                <div style={{ width:"10px", height:"10px", borderRadius:"50%",
                  background:`linear-gradient(135deg,${result.color1?.hex},${result.color2?.hex})` }} />
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#7b5455", fontWeight:600 }}>
                  {result.compatibilidad}% compatibles
                </span>
                <div style={{ width:"10px", height:"10px", borderRadius:"50%",
                  background:`linear-gradient(135deg,${result.color2?.hex},${result.color1?.hex})` }} />
              </div>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#827473",
                marginTop:"10px", fontStyle:"italic" }}>
                {result.mensajeCompatibilidad}
              </p>
            </motion.div>

            {/* Flores */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.7 }}
              style={{ display:"flex", justifyContent:"center", gap:"12px",
                flexWrap:"wrap", marginBottom:"28px" }}>
              {[
                { label:`${result.name1} — ${result.florPersona1}`, hex: result.color1?.hex },
                { label:`Flor de pareja — ${result.florPareja}`, hex: "#F4C2C2" },
                { label:`${result.name2} — ${result.florPersona2}`, hex: result.color2?.hex },
              ].map((tag,i) => (
                <span key={i} style={{ padding:"6px 16px", borderRadius:"9999px",
                  background:`${tag.hex}22`, border:`1px solid ${tag.hex}66`,
                  fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"#7b5455", fontWeight:500 }}>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* Story */}
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.9 }}
              style={{ borderRadius:"24px", padding:"32px 36px", marginBottom:"28px",
                background:"rgba(255,255,255,0.72)", backdropFilter:"blur(20px)",
                boxShadow:"0 8px 48px rgba(244,194,194,0.2), inset 0 0 0 1px rgba(255,255,255,0.7)" }}>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"22px", fontWeight:700,
                color:"#7b5455", marginBottom:"16px", textAlign:"center", fontStyle:"italic" }}>
                {result.tituloCuento}
              </h3>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:"#504444",
                lineHeight:1.8, margin:0, textAlign:"center" }}>
                {result.cuento}
              </p>
            </motion.div>

            {/* Reset button */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
              style={{ textAlign:"center" }}>
              <button onClick={handleReset}
                style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", fontWeight:500,
                  color:"#7b5455", background:"transparent", border:"1.5px solid #F4C2C2",
                  borderRadius:"9999px", padding:"11px 28px", cursor:"pointer",
                  display:"inline-flex", alignItems:"center", gap:"8px", transition:"transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <path d="M1.5 7.5A6 6 0 0 1 13 4.5M13.5 7.5A6 6 0 0 1 2 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 2l2.5 2.5L11 7M4 8l-2.5 2.5L4 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Crear otra historia
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}