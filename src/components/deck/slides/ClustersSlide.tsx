import { motion } from "framer-motion";
import { LOGOS, CLUSTERS, type Cluster } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

// Layout: 3 building-block boxes on top, Full-Stack as a wide box below
// that visually "contains" the three above it.
const TOP_CLUSTERS: Cluster[] = ["hw-sellers", "retailer", "optimizer"];
const FULL_STACK: Cluster = "full-stack";

const TOP = {
  y: 230,
  height: 360,
  gap: 40,
  leftPad: 90,
  rightPad: 90,
};
const BOTTOM = {
  y: 660,
  height: 360,
  leftPad: 60,
  rightPad: 60,
};

function topRect(idx: number) {
  const totalW = 1920 - TOP.leftPad - TOP.rightPad;
  const w = (totalW - TOP.gap * 2) / 3;
  const x = TOP.leftPad + idx * (w + TOP.gap);
  return { x, y: TOP.y, w, h: TOP.height };
}

function bottomRect() {
  const w = 1920 - BOTTOM.leftPad - BOTTOM.rightPad;
  return { x: BOTTOM.leftPad, y: BOTTOM.y, w, h: BOTTOM.height };
}

export function ClustersSlide() {
  const fs = CLUSTERS[FULL_STACK];
  const fsRect = bottomRect();
  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <div className="absolute top-10 left-0 right-0 text-center px-16">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-3"
          style={{ color: "var(--deck-accent)", fontSize: 18, fontWeight: 600 }}
        >
          Step 1 — Cluster
        </div>
        <KineticHeadline
          text="The 4 archetypes we discovered"
          style={{ fontSize: 64, lineHeight: 1, color: "var(--deck-text)" }}
        />
      </div>

      {/* Connector lines from top boxes down into Full-Stack */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 1920 1080"
        style={{ width: "100%", height: "100%" }}
      >
        {TOP_CLUSTERS.map((_, i) => {
          const r = topRect(i);
          const x = r.x + r.w / 2;
          return (
            <motion.line
              key={i}
              x1={x}
              y1={r.y + r.h}
              x2={x}
              y2={fsRect.y}
              stroke={fs.accent}
              strokeWidth={2}
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
            />
          );
        })}
      </svg>

      {/* Top row: HW Sellers / Retailer / Optimizer */}
      {TOP_CLUSTERS.map((cKey, i) => {
        const c = CLUSTERS[cKey];
        const r = topRect(i);
        return (
          <motion.div
            key={cKey}
            className="absolute rounded-3xl border-2"
            style={{
              left: r.x,
              top: r.y,
              width: r.w,
              height: r.h,
              borderColor: c.accent,
              backgroundColor: "rgba(251, 246, 233, 0.04)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
          >
            <div
              className="absolute -top-8 left-6 px-6 py-2.5 rounded-xl deck-display flex items-baseline gap-4"
              style={{ backgroundColor: c.accent, color: "#FBF6E9", fontSize: 26 }}
            >
              <span>{c.label}</span>
              <span
                className="deck-body"
                style={{ fontSize: 16, fontWeight: 500, opacity: 0.9 }}
              >
                {c.description}
              </span>
            </div>

            {c.footnote && (
              <div
                className="deck-body absolute left-6 right-6"
                style={{
                  bottom: 10,
                  fontSize: 14,
                  color: "var(--deck-muted)",
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                {c.footnote}
              </div>
            )}

            {/* Logos */}
            <div
              className="absolute flex flex-wrap items-center justify-center gap-3"
              style={{
                left: 20,
                top: 70,
                right: 20,
                bottom: c.footnote ? 60 : 20,
              }}
            >
              {LOGOS.filter((l) => l.cluster === cKey).map((logo) => (
                <LogoChip key={logo.name} logo={logo} baseSize={30} />
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Full-Stack — wide bottom box that visually contains the three above */}
      <motion.div
        className="absolute rounded-3xl border-2"
        style={{
          left: fsRect.x,
          top: fsRect.y,
          width: fsRect.w,
          height: fsRect.h,
          borderColor: fs.accent,
          backgroundColor: "rgba(255, 122, 26, 0.06)",
          boxShadow: `0 0 60px -10px ${fs.accent}55`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* Label */}
        <div
          className="absolute -top-8 left-8 px-7 py-2.5 rounded-xl deck-display flex items-baseline gap-4"
          style={{ backgroundColor: fs.accent, color: "#FBF6E9", fontSize: 30 }}
        >
          <span>{fs.label}</span>
          <span
            className="deck-body"
            style={{ fontSize: 18, fontWeight: 500, opacity: 0.95 }}
          >
            Combines all three above
          </span>
        </div>

        {/* Description as caption inside the box */}
        <div
          className="deck-body absolute left-8 right-8"
          style={{ top: 18, fontSize: 16, color: "var(--deck-muted)" }}
        >
          {fs.description}
        </div>

        {/* Two sub-columns: HW-Led | Tariff-Led */}
        {(() => {
          const items = LOGOS.filter((l) => l.cluster === FULL_STACK);
          const hwLed = items.filter((l) => l.subCluster === "hw-led");
          const tariffLed = items.filter((l) => l.subCluster === "tariff-led");
          const innerTop = 64;
          const innerBottom = fs.footnote ? 44 : 16;
          const innerHeight = fsRect.h - innerTop - innerBottom;
          const colWidth = (fsRect.w - 56 - 32) / 2;
          const cols = [
            { label: "HW-Led — Sell HW, optimize flex", logos: hwLed, left: 28 },
            {
              label: "Tariff-Led — Sell tariff, enroll devices, optimize flex",
              logos: tariffLed,
              left: 28 + colWidth + 32,
            },
          ];
          return (
            <>
              <div
                className="absolute"
                style={{
                  left: 28 + colWidth + 16,
                  top: innerTop,
                  width: 1,
                  height: innerHeight,
                  borderLeft: "1px dashed rgba(251,246,233,0.22)",
                }}
              />
              {cols.map((col) => (
                <div
                  key={col.label}
                  className="absolute"
                  style={{
                    left: col.left,
                    top: innerTop,
                    width: colWidth,
                    height: innerHeight,
                  }}
                >
                  <div
                    className="deck-body uppercase tracking-[0.2em]"
                    style={{
                      fontSize: 14,
                      color: "var(--deck-text)",
                      fontWeight: 700,
                      marginBottom: 14,
                      opacity: 0.85,
                    }}
                  >
                    {col.label}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {col.logos.map((logo) => (
                      <LogoChip key={logo.name} logo={logo} baseSize={34} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          );
        })()}

        {fs.footnote && (
          <div
            className="deck-body absolute left-8 right-8"
            style={{
              bottom: 12,
              fontSize: 14,
              color: "var(--deck-muted)",
              fontStyle: "italic",
              lineHeight: 1.3,
            }}
          >
            {fs.footnote}
          </div>
        )}
      </motion.div>
    </div>
  );
}
