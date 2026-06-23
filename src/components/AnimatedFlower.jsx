import { motion } from "framer-motion";

// ── Color helpers ─────────────────────────────────────────────────────────────
function darken(hex, amount = 30) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
}
function lighten(hex, amount = 40) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
}

// ── Flower heads ──────────────────────────────────────────────────────────────
function RosaHead({ color, size = 1 }) {
  const s = size;
  const dark = darken(color); const light = lighten(color);
  const petals = [0,45,90,135,180,225,270,315];
  return (
    <g transform={`scale(${s})`}>
      {petals.map((a,i) => (
        <ellipse key={`o${i}`} cx="0" cy={-28*s} rx={10*s} ry={18*s} fill={light} opacity="0.85"
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      {petals.map((a,i) => (
        <ellipse key={`i${i}`} cx="0" cy={-22*s} rx={8*s} ry={14*s} fill={color}
          style={{ transformOrigin:"0 0", transform:`rotate(${a+22.5}deg)` }} />
      ))}
      <circle cx="0" cy="0" r={10*s} fill={dark} />
      <circle cx="0" cy="0" r={5*s} fill={lighten(dark,20)} />
    </g>
  );
}

function TulipHead({ color, size = 1 }) {
  const s = size;
  const petals = [270,330,30,90,150,210];
  return (
    <g transform={`scale(${s})`}>
      {petals.map((a,i) => (
        <path key={i}
          d={`M0,0 C-${8*s},-${16*s} -${11*s},-${32*s} -${3*s},-${42*s} C0,-${46*s} ${3*s},-${46*s} ${3*s},-${42*s} C${11*s},-${32*s} ${8*s},-${16*s} 0,0 Z`}
          fill={i%2===0 ? color : lighten(color,20)}
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      <circle cx="0" cy="0" r={7*s} fill={darken(color,15)} />
    </g>
  );
}

function MargueritaHead({ color, size = 1 }) {
  const s = size;
  const petals = Array.from({length:12},(_,i)=>i*30);
  return (
    <g transform={`scale(${s})`}>
      {petals.map((a,i) => (
        <ellipse key={i} cx="0" cy={-28*s} rx={7*s} ry={18*s} fill={color}
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      <circle cx="0" cy="0" r={13*s} fill="#F5C842" />
      <circle cx="0" cy="0" r={7*s} fill="#E0A800" />
    </g>
  );
}

function OrquidaHead({ color, size = 1 }) {
  const s = size;
  const dark = darken(color); const light = lighten(color,20);
  return (
    <g transform={`scale(${s})`}>
      {[270,30,150].map((a,i) => (
        <ellipse key={`l${i}`} cx="0" cy={-32*s} rx={12*s} ry={24*s} fill={light} opacity="0.9"
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      {[90,210].map((a,i) => (
        <ellipse key={`s${i}`} cx="0" cy={-26*s} rx={9*s} ry={19*s} fill={color}
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      <ellipse cx="0" cy={14*s} rx={13*s} ry={10*s} fill={dark} />
      <circle cx="0" cy="0" r={6*s} fill={lighten(dark,25)} />
    </g>
  );
}

function DaliaHead({ color, size = 1 }) {
  const s = size;
  const light = lighten(color,20);
  const rings = [
    { count:8, radius:18 },
    { count:13, radius:34 },
    { count:18, radius:50 },
  ];
  return (
    <g transform={`scale(${s})`}>
      {rings.map(({count, radius}, ri) =>
        Array.from({length:count},(_,i) => {
          const angle = (i*360)/count;
          const rad = (angle*Math.PI)/180;
          const cx = Math.sin(rad)*radius;
          const cy = -Math.cos(rad)*radius;
          return (
            <ellipse key={`${ri}-${i}`} cx={cx} cy={cy} rx={6} ry={11}
              fill={ri%2===0 ? color : light} opacity="0.9"
              style={{ transform:`rotate(${angle}deg)`, transformOrigin:`${cx}px ${cy}px` }} />
          );
        })
      )}
      <circle cx="0" cy="0" r={9} fill={darken(color)} />
    </g>
  );
}

function GirasolHead({ color, size = 1 }) {
  const s = size;
  const petals = Array.from({length:16},(_,i)=>i*(360/16));
  return (
    <g transform={`scale(${s})`}>
      {petals.map((a,i) => (
        <ellipse key={i} cx="0" cy={-36*s} rx={8*s} ry={24*s} fill={color}
          style={{ transformOrigin:"0 0", transform:`rotate(${a}deg)` }} />
      ))}
      <circle cx="0" cy="0" r={18*s} fill="#5C3D11" />
      <circle cx="0" cy="0" r={10*s} fill="#7A5230" />
    </g>
  );
}

function LavandaHead({ color, size = 1 }) {
  const s = size;
  const buds = [[0,-44],[-6,-36],[6,-36],[-4,-28],[4,-28],[-7,-20],[7,-20],[0,-14]];
  return (
    <g transform={`scale(${s})`}>
      <line x1="0" y1="0" x2="0" y2={-52*s} stroke="#6B8C5A" strokeWidth="2.5" strokeLinecap="round" />
      {buds.map(([x,y],i) => (
        <ellipse key={i} cx={x*s} cy={y*s} rx={5*s} ry={8*s} fill={color} opacity="0.9" />
      ))}
    </g>
  );
}

const FLOWER_HEADS = {
  rosa: RosaHead,
  girasol: GirasolHead,
  "orquídea": OrquidaHead,
  orquidea: OrquidaHead,
  "tulipán": TulipHead,
  tulipan: TulipHead,
  lirio: TulipHead,
  margarita: MargueritaHead,
  lavanda: LavandaHead,
  dalia: DaliaHead,
};

// ── Single stem + flower ──────────────────────────────────────────────────────
function FlowerStem({ x, stemHeight, leafSide, color, flowerType, size, delay }) {
  const HeadComponent = FLOWER_HEADS[flowerType?.toLowerCase()] ||
    FLOWER_HEADS[flowerType?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")] ||
    RosaHead;

  const leafX = leafSide === "left" ? -16 : 16;
  const leafCpX = leafSide === "left" ? -30 : 30;

  return (
    <motion.g
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: `${x}px 0px` }}
    >
      {/* Stem */}
      <path
        d={`M${x},0 Q${x + (leafSide==="left"?8:-8)},${-stemHeight*0.5} ${x},${-stemHeight}`}
        stroke="#6B8C5A" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d={`M${x},${-stemHeight*0.45} C${x+leafCpX},${-stemHeight*0.55} ${x+leafX},${-stemHeight*0.35} ${x},${-stemHeight*0.3} Z`}
        fill="#7DAB6A" opacity="0.9"
      />
      {/* Flower head */}
      <motion.g
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.7, type: "spring", bounce: 0.35 }}
        style={{ transformOrigin: `${x}px ${-stemHeight}px` }}
      >
        <g transform={`translate(${x}, ${-stemHeight})`}>
          <HeadComponent color={color} size={size} />
        </g>
      </motion.g>
    </motion.g>
  );
}

// ── Bouquet wrapper ───────────────────────────────────────────────────────────
// Generates 5-7 flowers with varied positions, heights and sizes
function generateStems(baseColor) {
  const light = lighten(baseColor, 25);
  const dark = darken(baseColor, 15);

  // 5 stems: positions, heights, sizes vary for a natural bouquet look
  return [
    { x: 0,   stemHeight: 130, leafSide: "left",  color: baseColor, size: 0.85, delay: 0.0 },
    { x: -38, stemHeight: 108, leafSide: "right", color: light,     size: 0.72, delay: 0.1 },
    { x: 38,  stemHeight: 112, leafSide: "left",  color: dark,      size: 0.72, delay: 0.15 },
    { x: -22, stemHeight: 90,  leafSide: "left",  color: lighten(baseColor,10), size: 0.62, delay: 0.22 },
    { x: 22,  stemHeight: 95,  leafSide: "right", color: darken(baseColor,8),   size: 0.62, delay: 0.27 },
  ];
}

// ── Ribbon bow ───────────────────────────────────────────────────────────────
function Ribbon({ color }) {
  const c = darken(color, 10);
  return (
    <g transform="translate(0, 10)">
      {/* Left loop */}
      <path d="M0,0 C-20,-18 -36,-10 -28,0 C-20,8 -8,4 0,0 Z" fill={c} opacity="0.7" />
      {/* Right loop */}
      <path d="M0,0 C20,-18 36,-10 28,0 C20,8 8,4 0,0 Z" fill={c} opacity="0.7" />
      {/* Left tail */}
      <path d="M0,0 C-10,10 -18,22 -14,32" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Right tail */}
      <path d="M0,0 C10,10 18,22 14,32" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Center knot */}
      <circle cx="0" cy="0" r="5" fill={lighten(c, 20)} />
    </g>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AnimatedFlower({ color = "#F4C2C2", type = "rosa" }) {
  const stems = generateStems(color);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        width="240" height="260"
        viewBox="-100 -200 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <g filter="url(#soft-glow)">
          {/* Stems & flowers */}
          {stems.map((s, i) => (
            <FlowerStem key={i} {...s} flowerType={type} />
          ))}

          {/* Gather point / wrap */}
          <motion.rect
            x="-18" y="-18" width="36" height="28" rx="4"
            fill={lighten(color, 30)} opacity="0.6"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            style={{ transformOrigin: "0px 0px" }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />

          {/* Ribbon */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", bounce: 0.4 }}
          >
            <Ribbon color={color} />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}