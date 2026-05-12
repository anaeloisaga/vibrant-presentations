import { motion } from "framer-motion";
import { LOGOS, CLUSTERS, type Cluster } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

// 2x2 grid of equal-sized archetype boxes
const GRID: Cluster[] = ["hw-sellers", "retailer", "optimizer", "full-stack"];
const FULL_STACK: Cluster = "full-stack";

const LAYOUT = {
  top: 230,
  sidePad: 80,
  gap: 36,
  rows: 2,
  cols: 2,
  bottom: 40,
};

function cellRect(idx: number) {
  const col = idx % LAYOUT.cols;
  const row = Math.floor(idx / LAYOUT.cols);
  const totalW = 1920 - LAYOUT.sidePad * 2;
  const totalH = 1080 - LAYOUT.top - LAYOUT.bottom;
  const w = (totalW - LAYOUT.gap * (LAYOUT.cols - 1)) / LAYOUT.cols;
  const h = (totalH - LAYOUT.gap * (LAYOUT.rows - 1)) / LAYOUT.rows;
  return {
    x: LAYOUT.sidePad + col * (w + LAYOUT.gap),
    y: LAYOUT.top + row * (h + LAYOUT.gap),
    w,
    h,
  };
}

export function ClustersSlide() {
  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <div className="absolute top-10 left-0 right-0 text-center px-16">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-3"
          style={{ color: "var(--deck-accent)", fontSize: 18, fontWeight: 600 }}
        >
          1 — Cluster
        </div>
        <KineticHeadline
          text="4 archetypes, clustered by core activities in the residential space"
          style={{ fontSize: 56, lineHeight: 1.05, color: "var(--deck-text)" }}
        />
      </div>

      {/* 2x2 grid of equal-sized cluster boxes */}
      {GRID.map((cKey, i) => {
        const c = CLUSTERS[cKey];
        const r = cellRect(i);
        const isFS = cKey === FULL_STACK;
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
              backgroundColor: isFS
                ? "rgba(255, 122, 26, 0.06)"
                : "rgba(251, 246, 233, 0.04)",
              boxShadow: isFS ? `0 0 60px -10px ${c.accent}55` : undefined,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
          >
            <div
              className="absolute -top-9 left-6 px-7 py-3 rounded-xl deck-display flex items-baseline gap-4"
              style={{ backgroundColor: c.accent, color: "#FBF6E9", fontSize: 30 }}
            >
              <span>{c.label}</span>
              <span
                className="deck-body"
                style={{ fontSize: 18, fontWeight: 500, opacity: 0.95 }}
              >
                {c.description}
              </span>
            </div>

            {c.footnote && (
              <div
                className="deck-body absolute left-6 right-6"
                style={{
                  bottom: 14,
                  fontSize: 15,
                  color: "var(--deck-muted)",
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                {c.footnote}
              </div>
            )}

            {/* Logo area */}
            {isFS ? (
              (() => {
                const items = LOGOS.filter((l) => l.cluster === FULL_STACK);
                const hwLed = items.filter((l) => l.subCluster === "hw-led");
                const tariffLed = items.filter((l) => l.subCluster === "tariff-led");
                const innerTop = 70;
                const innerBottom = c.footnote ? 60 : 24;
                const innerHeight = r.h - innerTop - innerBottom;
                const colWidth = (r.w - 40 - 24) / 2;
                const cols = [
                  { label: "HW-Led", logos: hwLed, left: 20 },
                  { label: "Tariff-Led", logos: tariffLed, left: 20 + colWidth + 24 },
                ];
                return (
                  <>
                    <div
                      className="absolute"
                      style={{
                        left: 20 + colWidth + 12,
                        top: innerTop,
                        width: 1,
                        height: innerHeight,
                        borderLeft: "1px dashed rgba(251,246,233,0.28)",
                      }}
                    />
                    {cols.map((col) => (
                      <div
                        key={col.label}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: col.left,
                          top: innerTop,
                          width: colWidth,
                          height: innerHeight,
                        }}
                      >
                        <div
                          className="deck-body uppercase tracking-[0.25em] mb-4"
                          style={{
                            fontSize: 14,
                            color: "var(--deck-text)",
                            fontWeight: 700,
                            opacity: 0.85,
                          }}
                        >
                          {col.label}
                        </div>
                        <div className="flex-1 flex flex-wrap items-center justify-center content-center gap-4">
                          {col.logos.map((logo) => (
                            <LogoChip key={logo.name} logo={logo} baseSize={56} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                );
              })()
            ) : (
              <div
                className="absolute flex flex-wrap items-center justify-center content-center gap-5"
                style={{
                  left: 24,
                  top: 70,
                  right: 24,
                  bottom: c.footnote ? 60 : 24,
                }}
              >
                {LOGOS.filter((l) => l.cluster === cKey).map((logo) => (
                  <LogoChip key={logo.name} logo={logo} baseSize={56} />
                ))}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
