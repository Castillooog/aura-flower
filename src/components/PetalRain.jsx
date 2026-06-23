import { useEffect, useRef } from "react";

const PETAL_COLORS = [
  "rgba(244,194,194,0.55)",
  "rgba(221,160,221,0.45)",
  "rgba(248,220,220,0.5)",
  "rgba(209,168,224,0.4)",
  "rgba(255,182,193,0.5)",
];

function createPetal(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: -20,
    size: 8 + Math.random() * 12,
    speedY: 0.6 + Math.random() * 1.2,
    speedX: (Math.random() - 0.5) * 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2.5,
    opacity: 0.4 + Math.random() * 0.5,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.015 + Math.random() * 0.02,
  };
}

function drawPetal(ctx, p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rotation * Math.PI) / 180);
  ctx.globalAlpha = p.opacity;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  // Organic petal shape using bezier curves
  ctx.moveTo(0, -p.size);
  ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.8, p.size * 0.3, 0, p.size);
  ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.3, -p.size * 0.6, -p.size * 0.6, 0, -p.size);
  ctx.fill();
  ctx.restore();
}

export default function PetalRain() {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Seed with initial petals
    for (let i = 0; i < 28; i++) {
      const p = createPetal(canvas);
      p.y = Math.random() * canvas.height; // spread initially
      petalsRef.current.push(p);
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((p, i) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.6;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          petalsRef.current[i] = createPetal(canvas);
        }

        drawPetal(ctx, p);
      });

      // Occasionally add a new petal up to max
      if (petalsRef.current.length < 35 && Math.random() < 0.015) {
        petalsRef.current.push(createPetal(canvas));
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}