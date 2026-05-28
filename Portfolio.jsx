import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "React", icon: "⚛️", color: "#61DAFB" },
  { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
  { name: "UI Design", icon: "✦", color: "#FF6BFF" },
  { name: "Video Editing", icon: "▶", color: "#FF4E4E" },
  { name: "App Dev", icon: "📱", color: "#4EFFA9" },
  { name: "Creative Coding", icon: "⚡", color: "#A78BFA" },
];

const projects = [
  { title: "NebulaUI", desc: "Component library with cosmic aesthetics", tag: "React", color: "#61DAFB" },
  { title: "CineEdit Pro", desc: "AI-powered video editing workflow tool", tag: "App Dev", color: "#FF4E4E" },
  { title: "PixelForge", desc: "Generative art engine built in JS", tag: "Creative", color: "#A78BFA" },
];

function GlitchText({ text }) {
  return (
    <span className="glitch" data-text={text} style={{ position: "relative" }}>
      {text}
    </span>
  );
}

function NeonCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = e.clientX + "px";
          trailRef.current.style.top = e.clientY + "px";
        }
      }, 80);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", width: 10, height: 10, borderRadius: "50%",
        background: "#0FF", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 10px #0FF, 0 0 20px #0FF",
        transition: "width 0.1s, height 0.1s",
      }} />
      <div ref={trailRef} style={{
        position: "fixed", width: 28, height: 28, borderRadius: "50%",
        border: "1px solid rgba(0,255,255,0.4)", pointerEvents: "none", zIndex: 9998,
        transform: "translate(-50%, -50%)",
        transition: "left 0.08s ease, top 0.08s ease",
      }} />
    </>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: ["#0FF", "#A78BFA", "#FF6BFF"][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.6 + 0.2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7,
    }} />
  );
}

export default function Portfolio() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [scanline, setScanline] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => setScanline(s => (s + 1) % 100), 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030209",
      color: "#E2E8F0",
      fontFamily: "'Courier New', monospace",
      overflowX: "hidden",
      cursor: "none",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cyan: #0FF;
          --magenta: #FF6BFF;
          --purple: #A78BFA;
          --green: #4EFFA9;
          --red: #FF4E4E;
        }

        body { cursor: none !important; }

        .hero-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #0FF 0%, #A78BFA 40%, #FF6BFF 80%, #FF4E4E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(0,255,255,0.3));
        }

        .mono { font-family: 'Share Tech Mono', monospace; }

        .neon-border {
          border: 1px solid rgba(0,255,255,0.15);
          box-shadow: inset 0 0 30px rgba(0,255,255,0.03), 0 0 0 1px rgba(0,255,255,0.05);
          transition: all 0.3s ease;
        }
        .neon-border:hover {
          border-color: rgba(0,255,255,0.5);
          box-shadow: inset 0 0 30px rgba(0,255,255,0.06), 0 0 20px rgba(0,255,255,0.15), 0 0 0 1px rgba(0,255,255,0.2);
        }

        .glitch {
          font-family: 'Orbitron', monospace;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          background: linear-gradient(135deg, #0FF 0%, #A78BFA 40%, #FF6BFF 80%, #FF4E4E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glitch::before {
          animation: glitch1 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }
        .glitch::after {
          animation: glitch2 3s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, 0); }
        }
        @keyframes glitch2 {
          0%, 90%, 100% { transform: translate(0); }
          93% { transform: translate(2px, 1px); }
          95% { transform: translate(-2px, -1px); }
          97% { transform: translate(1px, 0); }
        }

        .scanline-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 10;
          background: repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,0) 1px,
            rgba(0,255,255,0.015) 1px,
            rgba(0,255,255,0.015) 2px
          );
        }

        .btn-primary {
          background: linear-gradient(135deg, #0FF, #A78BFA);
          color: #000;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 12px 28px;
          border: none;
          border-radius: 4px;
          cursor: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s ease;
          box-shadow: 0 0 20px rgba(0,255,255,0.4);
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          box-shadow: 0 0 40px rgba(0,255,255,0.7);
          transform: translateY(-1px);
        }

        .btn-outline {
          background: transparent;
          color: #A78BFA;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 11px 27px;
          border: 1px solid #A78BFA;
          border-radius: 4px;
          cursor: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          background: rgba(167,139,250,0.1);
          box-shadow: 0 0 20px rgba(167,139,250,0.3);
        }

        .skill-chip {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem;
          padding: 8px 18px;
          border-radius: 2px;
          background: rgba(255,255,255,0.03);
          transition: all 0.2s ease;
          cursor: none;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .skill-chip:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        .card {
          background: rgba(255,255,255,0.02);
          border-radius: 2px;
          padding: 28px;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }

        .tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          padding: 3px 8px;
          border-radius: 2px;
          background: rgba(167,139,250,0.15);
          color: #A78BFA;
          text-transform: uppercase;
        }

        .section-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          color: #0FF;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .section-label::before { content: "// "; opacity: 0.5; }

        .h-rule {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.3), transparent);
          margin: 60px 0;
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4EFFA9;
          box-shadow: 0 0 8px #4EFFA9;
          animation: pulse 2s infinite;
          display: inline-block;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .corner-tl { position: absolute; top: 8px; left: 8px; width: 12px; height: 12px; border-top: 1px solid #0FF; border-left: 1px solid #0FF; }
        .corner-tr { position: absolute; top: 8px; right: 8px; width: 12px; height: 12px; border-top: 1px solid #0FF; border-right: 1px solid #0FF; }
        .corner-bl { position: absolute; bottom: 8px; left: 8px; width: 12px; height: 12px; border-bottom: 1px solid #0FF; border-left: 1px solid #0FF; }
        .corner-br { position: absolute; bottom: 8px; right: 8px; width: 12px; height: 12px; border-bottom: 1px solid #0FF; border-right: 1px solid #0FF; }

        .number-accent {
          font-family: 'Orbitron', monospace;
          font-size: 0.65rem;
          color: rgba(0,255,255,0.3);
          letter-spacing: 0.2em;
        }
      `}</style>

      <NeonCursor />
      <ParticleField />
      <div className="scanline-overlay" />
      <div className="grid-bg" />

      {/* Ambient glow blobs */}
      <div style={{
        position: "fixed", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,255,0.04) 0%, transparent 70%)",
        top: "-100px", left: "-100px", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
        bottom: "0", right: "-100px", pointerEvents: "none", zIndex: 0,
      }} />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── HERO ── */}
        <section style={{ padding: "100px 0 80px", textAlign: "center" }} className={loaded ? "fade-in" : ""}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span className="status-dot" />
            <span className="mono" style={{ fontSize: "0.7rem", color: "#4EFFA9", letterSpacing: "0.25em" }}>
              AVAILABLE FOR PROJECTS
            </span>
          </div>

          <h1 className="hero-title" style={{ marginBottom: 8 }}>
            <GlitchText text="ABHISHEK" />
          </h1>
          <h1 className="hero-title" style={{ marginBottom: 20 }}>
            <GlitchText text="MISHRA" />
          </h1>

          <p className="mono" style={{ color: "rgba(0,255,255,0.6)", fontSize: "0.9rem", letterSpacing: "0.25em", marginBottom: 16 }}>
            APP_DEVELOPER / CODE_CREATOR / VISUAL_ENGINEER
          </p>

          <p style={{ maxWidth: 540, margin: "0 auto 40px", color: "rgba(226,232,240,0.5)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Turning ideas into digital reality through precision code, immersive interfaces, and cinematic visual experiences.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            <a href="https://github.com/AbhishekBuildss" target="_blank" className="btn-primary">
              // GITHUB
            </a>
            <button className="btn-outline">
              // PROJECTS
            </button>
          </div>
        </section>

        <div className="h-rule" />

        {/* ── EXPERTISE ── */}
        <section style={{ paddingBottom: 80 }}>
          <div className="section-label">EXPERTISE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>

            {[
              { icon: "◈", color: "#0FF", title: "DEVELOPMENT", desc: "Building modern apps and turning creative ideas into functional digital experiences with clean, scalable code." },
              { icon: "◉", color: "#FF6BFF", title: "EDITING", desc: "Creating aesthetic visuals, cinematic edits, and smooth content with a premium, high-fidelity vibe." },
              { icon: "◆", color: "#A78BFA", title: "CREATIVITY", desc: "Mixing technology and artistry to build unique projects that push the boundaries of digital experience." },
            ].map((item, i) => (
              <div key={i} className="card neon-border" style={{
                borderColor: `${item.color}22`,
                position: "relative",
                animationDelay: `${i * 0.15}s`,
              }}>
                <div className="corner-tl" style={{ borderColor: item.color + "66" }} />
                <div className="corner-tr" style={{ borderColor: item.color + "66" }} />
                <div className="corner-bl" style={{ borderColor: item.color + "66" }} />
                <div className="corner-br" style={{ borderColor: item.color + "66" }} />
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: "1.5rem",
                  color: item.color, marginBottom: 12,
                  filter: `drop-shadow(0 0 8px ${item.color}88)`,
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Orbitron', monospace", fontSize: "0.75rem",
                  letterSpacing: "0.2em", color: item.color, marginBottom: 10,
                }}>
                  {item.title}
                </h3>
                <p style={{ color: "rgba(226,232,240,0.45)", lineHeight: 1.7, fontSize: "0.85rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-rule" />

        {/* ── SKILLS ── */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="section-label">SKILL_STACK</div>
              <h2 style={{
                fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 900, color: "#E2E8F0",
              }}>
                ARSENAL
              </h2>
            </div>
            <span className="number-accent">06_ITEMS</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {skills.map((s, i) => (
              <div
                key={i}
                className="skill-chip"
                onMouseEnter={() => setActiveSkill(i)}
                onMouseLeave={() => setActiveSkill(null)}
                style={{
                  border: `1px solid ${activeSkill === i ? s.color : "rgba(255,255,255,0.08)"}`,
                  color: activeSkill === i ? s.color : "rgba(226,232,240,0.6)",
                  boxShadow: activeSkill === i ? `0 0 16px ${s.color}44` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ marginRight: 6, fontSize: "0.75rem" }}>{s.icon}</span>
                {s.name}
              </div>
            ))}
          </div>
        </section>

        <div className="h-rule" />

        {/* ── PROJECTS ── */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
            <div>
              <div className="section-label">SELECTED_WORK</div>
              <h2 style={{
                fontFamily: "'Orbitron', monospace", fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 900, color: "#E2E8F0",
              }}>
                PROJECTS
              </h2>
            </div>
            <span className="number-accent">03_ITEMS</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {projects.map((p, i) => (
              <div key={i} className="card neon-border" style={{ borderColor: `${p.color}22`, position: "relative" }}>
                <div className="corner-tl" style={{ borderColor: p.color + "55" }} />
                <div className="corner-br" style={{ borderColor: p.color + "55" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span className="number-accent" style={{ fontSize: "0.6rem" }}>0{i + 1}_PROJECT</span>
                  <span className="tag" style={{ background: p.color + "18", color: p.color }}>{p.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Orbitron', monospace", fontSize: "1rem",
                  fontWeight: 700, color: p.color, marginBottom: 8,
                  filter: `drop-shadow(0 0 6px ${p.color}66)`,
                }}>
                  {p.title}
                </h3>
                <p style={{ color: "rgba(226,232,240,0.45)", fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
                <div style={{
                  marginTop: 20, paddingTop: 16,
                  borderTop: `1px solid rgba(255,255,255,0.05)`,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span className="mono" style={{ fontSize: "0.7rem", color: `${p.color}88`, cursor: "none" }}>
                    VIEW_PROJECT →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-rule" />

        {/* ── FOOTER / CTA ── */}
        <section style={{ padding: "60px 0 80px", textAlign: "center" }}>
          <div className="section-label" style={{ textAlign: "center" }}>INITIATE_CONTACT</div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 900, color: "#E2E8F0",
            marginBottom: 16,
          }}>
            BUILD_SOMETHING<br />
            <span style={{
              background: "linear-gradient(90deg, #0FF, #FF6BFF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>EXTRAORDINARY</span>
          </h2>
          <p className="mono" style={{ color: "rgba(226,232,240,0.35)", marginBottom: 36, fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            READY_TO_COLLABORATE / OPEN_TO_OPPORTUNITIES
          </p>
          <a
            href="https://github.com/AbhishekBuildss"
            target="_blank"
            className="btn-primary"
            style={{ fontSize: "0.8rem", padding: "14px 36px" }}
          >
            // ACCESS_GITHUB
          </a>

          <div style={{
            marginTop: 60,
            display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
            color: "rgba(226,232,240,0.2)", fontSize: "0.65rem",
          }} className="mono">
            <span className="status-dot" style={{ width: 4, height: 4 }} />
            ABHISHEK_MISHRA.PORT © 2026 — ALL_SYSTEMS_NOMINAL
          </div>
        </section>

      </main>
    </div>
  );
}
