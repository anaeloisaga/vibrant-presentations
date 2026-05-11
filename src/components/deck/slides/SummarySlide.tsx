import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";
import { Handshake, Layers, TrendingUp, Globe2, Sparkles } from "lucide-react";

const ACCENT = {
  one: "#FF7A1A",
  two: "#D946EF",
  three: "#5B8DEF",
  four: "#1FB8A6",
};

export function SummarySlide() {
  return (
    <div className="relative w-full h-full px-24 py-20 flex flex-col">
      {/* Header */}
      <div className="mb-10">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-3"
          style={{ color: "var(--deck-accent)", fontSize: 18, fontWeight: 600 }}
        >
          Step 2 — Summary
        </div>
        <KineticHeadline
          text="Key insights from competitors"
          style={{ fontSize: 68, lineHeight: 1, color: "var(--deck-text)" }}
        />
      </div>

      {/* Insight #1 — wide card with two sub-plays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-3xl p-8 mb-6"
        style={{
          backgroundColor: "var(--deck-surface)",
          color: "var(--deck-text-dark)",
          borderLeft: `8px solid ${ACCENT.one}`,
        }}
      >
        <div className="flex items-start gap-6">
          <span
            className="deck-display shrink-0"
            style={{ fontSize: 56, color: ACCENT.one, lineHeight: 1 }}
          >
            01
          </span>
          <div className="flex-1">
            <h3
              className="deck-display"
              style={{ fontSize: 30, lineHeight: 1.15, marginBottom: 4 }}
            >
              Most players move into{" "}
              <span style={{ color: ACCENT.one }}>optimization</span> next to
              hardware & retail
            </h3>
            <p
              className="deck-body"
              style={{ fontSize: 17, color: "#5A6072", marginBottom: 18 }}
            >
              Two distinct plays are emerging:
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div
                className="rounded-2xl p-5 flex gap-4"
                style={{ backgroundColor: "rgba(255,122,26,0.08)" }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: ACCENT.one, color: "#FBF6E9" }}
                >
                  <Handshake size={24} />
                </div>
                <div>
                  <div
                    className="deck-display"
                    style={{ fontSize: 20, marginBottom: 4 }}
                  >
                    Partnership
                  </div>
                  <div
                    className="deck-body"
                    style={{ fontSize: 15, color: "#3A3F4D", lineHeight: 1.4 }}
                  >
                    Optimizer × HW/retail — bigger batteries for VPP value, open
                    APIs for steering.
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-5 flex gap-4"
                style={{ backgroundColor: "rgba(255,122,26,0.08)" }}
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: ACCENT.one, color: "#FBF6E9" }}
                >
                  <Layers size={24} />
                </div>
                <div>
                  <div
                    className="deck-display"
                    style={{ fontSize: 20, marginBottom: 4 }}
                  >
                    Full-Stack
                  </div>
                  <div
                    className="deck-body"
                    style={{ fontSize: 15, color: "#3A3F4D", lineHeight: 1.4 }}
                  >
                    HW + retail + optimization in one — household-wide reach,
                    risk hedged across revenue streams.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insights 2-4 — row of three */}
      <div className="grid grid-cols-3 gap-6 flex-1">
        {[
          {
            n: "02",
            accent: ACCENT.two,
            icon: <TrendingUp size={22} />,
            title: "Value lives in multi-market optimization",
            body: "Hardware-based asset steering captures the upside. Local-only optimization mostly accrues to the customer as savings — hard to redistribute.",
          },
          {
            n: "03",
            accent: ACCENT.three,
            icon: <Globe2 size={22} />,
            title: "Growth = B2B, international, partnerships",
            body: "The next leg up comes from B2B expansion, geographic reach, and scaling sales partnerships.",
          },
          {
            n: "04",
            accent: ACCENT.four,
            icon: <Sparkles size={22} />,
            title: "Tech-first is now table stakes",
            body: "Top-tier in-app UX and AI-powered ops (e.g. AI call centers) are the norm — not a differentiator.",
          },
        ].map((c, i) => (
          <motion.div
            key={c.n}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
            className="rounded-3xl p-7 flex flex-col"
            style={{
              backgroundColor: "var(--deck-surface)",
              color: "var(--deck-text-dark)",
              borderLeft: `8px solid ${c.accent}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="deck-display"
                style={{ fontSize: 44, color: c.accent, lineHeight: 1 }}
              >
                {c.n}
              </span>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: c.accent, color: "#FBF6E9" }}
              >
                {c.icon}
              </div>
            </div>
            <h3
              className="deck-display"
              style={{ fontSize: 22, lineHeight: 1.15, marginBottom: 10 }}
            >
              {c.title}
            </h3>
            <p
              className="deck-body"
              style={{ fontSize: 15, color: "#3A3F4D", lineHeight: 1.45 }}
            >
              {c.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
