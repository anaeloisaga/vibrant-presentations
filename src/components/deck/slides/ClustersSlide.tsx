import { motion } from "framer-motion";
import { LOGOS, CLUSTERS, type Cluster } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

const CLUSTER_ORDER: Cluster[] = [
  "hw-sellers",
  "retailer",
  "optimizer",
  "full-stack",
];

// 2x2 grid box positions inside the 1920x1080 stage
const BOX = {
  width: 820,
  height: 340,
  gapX: 60,
  gapY: 60,
  topOffset: 250,
  leftOffset: 110,
};

function boxRect(idx: number) {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = BOX.leftOffset + col * (BOX.width + BOX.gapX);
  const y = BOX.topOffset + row * (BOX.height + BOX.gapY);
  return { x, y, w: BOX.width, h: BOX.height };
}

export function ClustersSlide() {
  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <div className="absolute top-16 left-0 right-0 text-center px-16">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-3"
          style={{ color: "var(--deck-accent)", fontSize: 18, fontWeight: 600 }}
        >
          Step 1 — Cluster
        </div>
        <KineticHeadline
          text="The 4 archetypes we discovered"
          style={{ fontSize: 72, lineHeight: 1, color: "var(--deck-text)" }}
        />
      </div>

      {/* Cluster boxes */}
      {CLUSTER_ORDER.map((cKey, i) => {
        const c = CLUSTERS[cKey];
        const r = boxRect(i);
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
            {/* Cluster label tab */}
            <div
              className="absolute -top-7 left-6 px-5 py-2 rounded-xl deck-display flex items-baseline gap-3"
              style={{ backgroundColor: c.accent, color: "#FBF6E9", fontSize: 22 }}
            >
              <span>{c.label}</span>
              <span
                className="deck-body"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: 0.9,
                }}
              >
                {c.description}
              </span>
            </div>

            {c.footnote && (
              <div
                className="deck-body absolute left-6 right-6"
                style={{
                  bottom: 10,
                  fontSize: 12,
                  color: "var(--deck-muted)",
                  fontStyle: "italic",
                  lineHeight: 1.3,
                }}
              >
                {c.footnote}
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Logos — placed inside their cluster box, wrapped */}
      {CLUSTER_ORDER.map((cKey, i) => {
        const r = boxRect(i);
        const items = LOGOS.filter((l) => l.cluster === cKey);
        const c = CLUSTERS[cKey];
        const reservedBottom = c.footnote ? 36 : 12;

        // Full-Stack: split into two sub-rows (HW-Led / Tariff-Led)
        if (cKey === "full-stack") {
          const hwLed = items.filter((l) => l.subCluster === "hw-led");
          const tariffLed = items.filter((l) => l.subCluster === "tariff-led");
          const innerTop = r.y + 40;
          const innerHeight = r.h - 40 - reservedBottom;
          const rowHeight = innerHeight / 2;
          const rows: { label: string; logos: typeof items; top: number }[] = [
            { label: "HW-Led — Sell HW, optimize flexibility", logos: hwLed, top: innerTop },
            { label: "Tariff-Led — Sell tariff, enroll devices, optimize flex", logos: tariffLed, top: innerTop + rowHeight },
          ];
          return (
            <div key={`logos-${cKey}`}>
              {rows.map((row, idx) => (
                <div
                  key={row.label}
                  className="absolute"
                  style={{
                    left: r.x + 24,
                    top: row.top,
                    width: r.w - 48,
                    height: rowHeight,
                    borderTop: idx === 1 ? "1px dashed rgba(251,246,233,0.18)" : undefined,
                  }}
                >
                  <div
                    className="deck-body uppercase tracking-[0.2em]"
                    style={{
                      fontSize: 11,
                      color: "var(--deck-muted)",
                      fontWeight: 600,
                      marginTop: idx === 1 ? 6 : 0,
                      marginBottom: 6,
                    }}
                  >
                    {row.label}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {row.logos.map((logo) => (
                      <LogoChip key={logo.name} logo={logo} baseSize={20} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div
            key={`logos-${cKey}`}
            className="absolute flex flex-wrap items-center justify-center gap-3"
            style={{
              left: r.x + 24,
              top: r.y + 60,
              width: r.w - 48,
              height: r.h - 60 - reservedBottom,
            }}
          >
            {items.map((logo) => (
              <LogoChip key={logo.name} logo={logo} baseSize={22} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
