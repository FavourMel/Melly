import { useState, useEffect } from "react";

const SERVICES = [
  {
    icon: "✦",
    title: "Ghostwriting",
    desc: "Thought leadership pieces, essays, and long-form content that sounds exactly like you — only sharper. Your voice, amplified.",
  },
  {
    icon: "◈",
    title: "Content Strategy",
    desc: "No random posting. A deliberate system built to grow authority, attract the right readers, and compound over time.",
  },
  {
    icon: "⬡",
    title: "Web3 Communication",
    desc: "Translating protocol complexity into human language. I make blockchain projects feel real to the people who matter.",
  },
  {
    icon: "◎",
    title: "Audience Growth",
    desc: "Building loyal audiences from scratch. Not follower counts — real attention from people who trust what you say.",
  },
];

function useTypewriter(words, speed = 50, pause = 2400) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) return;
    const word = words[wIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, cIdx + 1);
        setDisplay(next);
        if (cIdx + 1 === word.length) {
          setWaiting(true);
          setTimeout(() => { setDeleting(true); setWaiting(false); }, pause);
        } else {
          setCIdx((c) => c + 1);
        }
      } else {
        const next = word.slice(0, cIdx - 1);
        setDisplay(next);
        if (cIdx - 1 === 0) {
          setDeleting(false);
          setWIdx((w) => (w + 1) % words.length);
          setCIdx(0);
        } else {
          setCIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words, speed, pause, waiting]);

  return display;
}

function GlowOrb({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "blur(90px)",
        opacity: 0.16,
        ...style,
      }}
    />
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(1rem, 4vw, 3rem)",
        transition: "background 0.4s, border-color 0.4s",
        background: scrolled ? "rgba(15,15,15,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,255,255,0.08)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#00FFFF", letterSpacing: "0.05em" }}>
        melly.
      </span>
      <div style={{ display: "flex", gap: "clamp(1rem,3vw,2.5rem)" }}>
        {["About", "Services", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}
            style={{ color: "#B0B0B0", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.target.style.color = "#00FFFF")}
            onMouseLeave={(e) => (e.target.style.color = "#B0B0B0")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const typed = useTypewriter([
    "I turn ideas into narratives people actually pay attention to.",
    "Words that cut through noise, not add to it.",
    "Strategy first. Story always.",
  ], 45, 2400);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 clamp(1rem,4vw,3rem)" }}>
      <GlowOrb style={{ width: 500, height: 500, background: "#00FFFF", top: "-15%", left: "-12%" }} />
      <GlowOrb style={{ width: 400, height: 400, background: "#8A2BE2", bottom: "5%", right: "-8%" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,255,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "clamp(2rem,5vw,5rem)", flexWrap: "wrap", paddingTop: "5rem" }}>

        {/* Text block */}
        <div style={{ flex: "1 1 380px" }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(0,255,255,0.35)", borderRadius: "3px", padding: "4px 12px", marginBottom: "1.5rem", fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#00FFFF", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Writer & Content Strategist
          </div>

          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(3.5rem,9vw,7.5rem)", fontWeight: 800, color: "#EAEAEA", lineHeight: 1, margin: 0, letterSpacing: "-0.03em" }}>
            Melly

          </h1>

          <div style={{ marginTop: "2rem", minHeight: "3.2rem", fontFamily: "'DM Mono',monospace", fontSize: "clamp(0.85rem,1.8vw,1rem)", color: "#B0B0B0", lineHeight: 1.65, borderLeft: "2px solid #00FFFF", paddingLeft: "1rem" }}>
            {typed}
            <span style={{ display: "inline-block", width: "2px", height: "1em", background: "#00FFFF", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s steps(1) infinite" }} />
          </div>

          <a href="#contact"
            style={{ display: "inline-block", marginTop: "2.5rem", padding: "13px 36px", border: "1px solid #00FFFF", color: "#00FFFF", textDecoration: "none", fontFamily: "'DM Mono',monospace", fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "3px", background: "rgba(0,255,255,0.04)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 24px rgba(0,255,255,0.35)"; e.currentTarget.style.background = "rgba(0,255,255,0.09)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(0,255,255,0.04)"; }}
          >
            Contact Me
          </a>
        </div>

        {/* Profile image */}
        <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: "clamp(200px,26vw,300px)", height: "clamp(200px,26vw,300px)", position: "relative" }}>
            <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "conic-gradient(#00FFFF,#8A2BE2,#00FFFF)", animation: "spin 8s linear infinite" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#0F0F0F" }} />
            <div style={{
              position: "absolute",
              inset: "5px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden"
            }}>
              <img
                src="/melly.jpg"
                alt="Melly"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",   // ensures full image fits
                  borderRadius: "50%"
                }}
              />
            </div>

          </div>

          <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'DM Mono',monospace", fontSize: "0.72rem", color: "#B0B0B0" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00FFFF", boxShadow: "0 0 8px #00FFFF", animation: "pulse 2.2s ease-in-out infinite", display: "inline-block" }} />
            Available for work
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "float 3s ease-in-out infinite" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.62rem", color: "#B0B0B0", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(#00FFFF,transparent)" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "8rem clamp(1rem,4vw,3rem)", position: "relative", overflow: "hidden" }}>
      <GlowOrb style={{ width: 380, height: 380, background: "#8A2BE2", top: "8%", right: "-8%" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "3.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Vertical label */}
        <div style={{ flex: "0 0 auto" }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "#00FFFF", letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl", transform: "rotate(180deg)", display: "block" }}>About</span>
        </div>

        <div style={{ flex: "1 1 480px" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#EAEAEA", margin: "0 0 2rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            The Web3 space is loud.
            <br />
            <span style={{ color: "#00FFFF", textShadow: "0 0 25px rgba(0,255,255,0.25)" }}>I make you heard.</span>
          </h2>

          {[
            "Most Web3 content blends into the background — too technical when it should be human, too vague when it should be sharp, and forgettable when it should build trust.",
            "I'm Melly. I help founders, protocols, and builders shape narratives that stick. My work lives at the intersection of storytelling and strategy — where words aren't just content, they're architecture.",
            "Whether you need a ghostwritten thread that sparks conversation or a content system that compounds your authority over time, I build everything around one thing: genuine attention.",
          ].map((p, i) => (
            <p key={i} style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.02rem", color: i === 0 ? "#EAEAEA" : "#B0B0B0", lineHeight: 1.78, margin: "0 0 1.2rem" }}>{p}</p>
          ))}


        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        flex: "1 1 220px",
        background: h ? "linear-gradient(135deg,rgba(0,255,255,0.06),rgba(138,43,226,0.06))" : "rgba(255,255,255,0.02)",
        border: `1px solid ${h ? "rgba(0,255,255,0.4)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "8px", padding: "2rem", cursor: "default",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        boxShadow: h ? "0 0 28px rgba(0,255,255,0.1),0 20px 40px rgba(0,0,0,0.25)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: h ? "linear-gradient(90deg,#00FFFF,#8A2BE2)" : "transparent", transition: "all 0.35s" }} />
      <div style={{ fontSize: "1.4rem", color: h ? "#00FFFF" : "#B0B0B0", marginBottom: "1rem", transition: "color 0.3s", textShadow: h ? "0 0 12px rgba(0,255,255,0.5)" : "none" }}>{icon}</div>
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#EAEAEA", margin: "0 0 0.7rem", letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.88rem", color: "#B0B0B0", lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "8rem clamp(1rem,4vw,3rem)", position: "relative", overflow: "hidden", background: "rgba(0,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <GlowOrb style={{ width: 420, height: 420, background: "#00FFFF", bottom: "-12%", left: "-8%" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "#00FFFF", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>What I Do</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: "#EAEAEA", margin: 0, letterSpacing: "-0.02em" }}>
            Built for the attention economy.
          </h2>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [h, setH] = useState(false);
  return (
    <section id="contact" style={{ padding: "8rem clamp(1rem,4vw,3rem) 6rem", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <GlowOrb style={{ width: 500, height: 380, background: "#8A2BE2", top: "0", left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "#00FFFF", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Contact</div>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 700, color: "#EAEAEA", margin: "0 0 1.5rem", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          Let's build something<br />
          <span style={{ color: "#00FFFF", textShadow: "0 0 28px rgba(0,255,255,0.28)" }}>people actually notice.</span>
        </h2>
        <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", color: "#B0B0B0", maxWidth: "480px", margin: "0 auto 3rem", lineHeight: 1.75 }}>
          Whether you have a clear brief or just an idea — reach out. The best projects start with a conversation.
        </p>

        <a href="mailto:mellyfine400@gmail.com"
          onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
          style={{ display: "inline-block", padding: "17px 48px", background: h ? "rgba(0,255,255,0.11)" : "rgba(0,255,255,0.04)", border: "1px solid #00FFFF", borderRadius: "4px", color: "#00FFFF", textDecoration: "none", fontFamily: "'DM Mono',monospace", fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.3s", boxShadow: h ? "0 0 30px rgba(0,255,255,0.22)" : "none", transform: h ? "scale(1.02)" : "scale(1)" }}
        >
          mellyfine400@gmail.com
        </a>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
          {[{ label: "X", href: "#", icon: "𝕏", href: "https://x.com/Melly_fine_" }, { label: "Email", href: "mailto:mellyfine400@gmail.com", icon: "✉" }].map(({ label, href, icon }) => (
            <a key={label} href={href}
              style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B0B0B0", textDecoration: "none", fontFamily: "'DM Mono',monospace", fontSize: "0.78rem", letterSpacing: "0.1em", transition: "all 0.25s", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "3px" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#00FFFF"; e.currentTarget.style.borderColor = "rgba(0,255,255,0.3)"; e.currentTarget.style.background = "rgba(0,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#B0B0B0"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span>{icon}</span><span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#0F0F0F;color:#EAEAEA;overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#0F0F0F;}
        ::-webkit-scrollbar-thumb{background:rgba(0,255,255,0.3);border-radius:2px;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 8px #00FFFF}50%{opacity:0.4;box-shadow:0 0 3px #00FFFF}}
        @keyframes float{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}}
      `}</style>
      <div style={{ background: "#0F0F0F", minHeight: "100vh" }}>
        <NavBar />
        <Hero />
        <About />
        <Services />
        <Contact />
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2rem", textAlign: "center", fontFamily: "'DM Mono',monospace", fontSize: "0.68rem", color: "rgba(176,176,176,0.35)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} Melly · Writer & Content Strategist in Web3
        </footer>
      </div>
    </>
  );
}
