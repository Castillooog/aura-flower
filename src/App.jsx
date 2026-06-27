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
  { label: "Guía de Regalos",   section: "jardin" },
];

export default function App() {
  const [section, setSection] = useState("jardin");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 20%, #ffdad9 0%, #fbf9f8 45%, #ffd6fc 100%)",
      position: "relative",
    }}>
      <PetalRain />

      {/* ── Header ── */}
      <header style={{
        position: "relative", zIndex: 20,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px clamp(16px, 5vw, 40px)",
      }}>
        {/* Logo */}
      <img
        src="/Aura-Flower.jpg"
        alt="Aura Flowers"
        onClick={() => { setSection("jardin"); setMenuOpen(false); }}
        style={{
          height: "48px",
          width: "auto",
          cursor: "pointer",
          objectFit: "contain",
        }}
      />

        {/* Desktop nav */}
        <nav style={{
          display: "flex", gap: "clamp(16px, 3vw, 32px)", alignItems: "center",
        }}
          className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href="#"
              onClick={(e) => { e.preventDefault(); setSection(item.section); }}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "14px",
                color: "#7b5455", textDecoration: "none",
                fontWeight: section === item.section ? 600 : 500,
                borderBottom: section === item.section && item.section === "historias"
                  ? "2px solid #F4A0B0" : "2px solid transparent",
                paddingBottom: "2px", transition: "all 0.2s",
              }}>
              {item.label}
            </a>
          ))}
          <button style={{
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
            color: "#fff", background: "#7b5455", border: "none",
            borderRadius: "9999px", padding: "10px 22px", cursor: "pointer",
          }}>
            Send Love
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="mobile-menu-btn"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", display: "none",
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="#7b5455" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#7b5455" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="mobile-dropdown" style={{
          position: "relative", zIndex: 19,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(212,194,194,0.3)",
          padding: "12px 20px 20px",
          display: "none",
          flexDirection: "column",
          gap: "4px",
        }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href="#"
              onClick={(e) => { e.preventDefault(); setSection(item.section); setMenuOpen(false); }}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: "15px",
                color: "#7b5455", textDecoration: "none",
                fontWeight: section === item.section ? 600 : 500,
                padding: "10px 4px",
                borderBottom: "1px solid rgba(212,194,194,0.2)",
              }}>
              {item.label}
            </a>
          ))}
          <button style={{
            marginTop: "12px", fontFamily: "'Inter', sans-serif", fontSize: "14px",
            fontWeight: 600, color: "#fff", background: "#7b5455",
            border: "none", borderRadius: "9999px", padding: "12px",
            cursor: "pointer", width: "100%",
          }}>
            Send Love
          </button>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-dropdown { display: flex !important; }
        }
      `}</style>

      {/* Main */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {section === "jardin"    && <FlowerGenerator />}
        {section === "historias" && <LoveStory />}
      </main>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 10,
        display: "flex", flexWrap: "wrap", gap: "16px",
        justifyContent: "space-between", alignItems: "center",
        padding: "24px clamp(16px, 5vw, 40px)",
        borderTop: "1px solid rgba(212,194,194,0.3)",
      }}>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "16px", color: "#7b5455", margin: 0 }}>
            Aura Flowers
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#827473", margin: "4px 0 0" }}>
            © 2024 Aura Flowers. Crafted with love.
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {["Privacidad", "Términos", "Contacto"].map((l) => (
            <a key={l} href="#" style={{
              fontFamily: "'Inter', sans-serif", fontSize: "13px",
              color: "#827473", textDecoration: "none",
            }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}