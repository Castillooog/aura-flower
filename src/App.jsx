import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { useState } from "react";
import PetalRain from "./components/PetalRain";
import FlowerGenerator from "./pages/FlowerGenerator";
import LoveStory from "./pages/LoveStory";

const NAV_ITEMS = [
  { label: "Nuestro Jardín",    section: "jardin" },
  { label: "Historias de Amor", section: "historias" },
  { label: "Guía de Regalos",   section: "jardin" }, // placeholder
];

export default function App() {
  const [section, setSection] = useState("jardin");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 20% 20%, #ffdad9 0%, #fbf9f8 45%, #ffd6fc 100%)",
        position: "relative",
      }}
    >
      {/* Falling petals */}
      <PetalRain />

      {/* Nav */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        {/* Logo — vuelve al inicio */}
        <span
          onClick={() => setSection("jardin")}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#7b5455",
            fontStyle: "italic",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          Aura Flowers
        </span>

        <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              onClick={(e) => { e.preventDefault(); setSection(item.section); }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#7b5455",
                textDecoration: "none",
                fontWeight: section === item.section ? 600 : 500,
                borderBottom: section === item.section && item.section === "historias"
                  ? "2px solid #F4A0B0"
                  : "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#fff",
              background: "#7b5455",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 22px",
              cursor: "pointer",
            }}
          >
            Send Love
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {section === "jardin"    && <FlowerGenerator />}
        {section === "historias" && <LoveStory />}
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "32px 40px",
          borderTop: "1px solid rgba(212,194,194,0.3)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: "16px",
              color: "#7b5455",
              margin: 0,
            }}
          >
            Aura Flowers
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#827473",
              margin: "4px 0 0",
            }}
          >
            © 2024 Aura Flowers. Crafted with love.
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacidad", "Términos", "Contacto"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "#827473",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}