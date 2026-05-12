import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";
import { Layers, TrendingUp, Globe2, Sparkles } from "lucide-react";

const ACCENT = {
  one: "#FF7A1A",
  two: "#D946EF",
  three: "#5B8DEF",
  four: "#1FB8A6",
};

export function SummarySlide() {
  const cards = [
    {
      n: "01",
      accent: ACCENT.one,
      icon: <Layers size={36} />,
      title: "Most players move into optimization",
      highlight: "optimization",
      body: "Two plays are emerging next to hardware & retail: partnerships (Optimizer × HW/retail) and full-stack (HW + retail + optimization in one).",
    },
    {
      n: "02",
      accent: ACCENT.two,
      icon: <TrendingUp size={36} />,
      title: "Value lives in multi-market optimization",
      highlight: "multi-market",
      body: "Hardware-based asset steering captures the upside. Local-only optimization mostly accrues to the customer as savings — hard to redistribute.",
    },
    {
      n: "03",
      accent: ACCENT.three,
      icon: <Globe2 size={36} />,
      title: "Growth = B2B, international, partnerships",
      highlight: "B2B",
      body: "The next leg up comes from B2B expansion, geographic reach, and scaling sales partnerships.",
    },
    {
      n: "04",
      accent: ACCENT.four,
      icon: <Sparkles size={36} />,
      title: "Tech-first is now table stakes",
      highlight: "table stakes",
      body: "Top-tier in-app UX and AI-powered ops (e.g. AI call centers) are the norm — not a differentiator.",
    },
  ];

  return (
    <div className="relative w-full h-full px-20 pt-16 pb-14 flex flex-col">
      {/* Header */}
      <div className="mb-12">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-4"
          style={{ color: "var(--deck-accent)", fontSize: 20, fontWeight: 600 }}
        >
          Step 2 — Summary
        </div>
        <KineticHeadline
          text="Key insights from competitors"
          style={{ fontSize: 76, lineHeight: 1, color: "var(--deck-text)" }}
        />
      </div>

      {/* 2x2 grid of equal-sized insight cards */}
      <div className="grid grid-cols-2 grid-rows-2 gap-7 flex-1">
        {cards.map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
            className="rounded-3xl p-10 flex flex-col"
            style={{
              backgroundColor: "var(--deck-surface)",
              color: "var(--deck-text-dark)",
              borderLeft: `10px solid ${c.accent}`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className="deck-display"
                style={{ fontSize: 64, color: c.accent, lineHeight: 1 }}
              >
                {c.n}
              </span>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: c.accent, color: "#FBF6E9" }}
              >
                {c.icon}
              </div>
            </div>
            <h3
              className="deck-display"
              style={{ fontSize: 36, lineHeight: 1.15, marginBottom: 18 }}
            >
              {c.title}
            </h3>
            <p
              className="deck-body"
              style={{ fontSize: 22, color: "#3A3F4D", lineHeight: 1.45 }}
            >
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
