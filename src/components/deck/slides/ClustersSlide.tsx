import { motion } from "framer-motion";
import { LOGOS, CLUSTERS, type Cluster } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

const CLUSTER_ORDER: Cluster[] = [
  "aggregators",
  "integrated-optimizers",
  "asset-traders",
  "fully-integrated",
];

// 2x2 grid box positions inside the 1920x1080 stage
const BOX = {
  width: 820,
  height: 360,
  gapX: 60,
  gapY: 50,
  topOffset: 220,
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
          text="Four games being played."
          style={{ fontSize: 80, lineHeight: 1, color: "var(--deck-text)" }}
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
              className="absolute -top-7 left-6 px-5 py-2 rounded-xl deck-display flex items-center gap-3"
              style={{ backgroundColor: c.accent, color: "#FBF6E9", fontSize: 22 }}
            >
              <span>{c.label}</span>
              <span
                className="deck-body px-2 py-0.5 rounded-md"
                style={{
                  fontSize: 14,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontWeight: 600,
                }}
              >
                {c.tag}
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Logos — placed inside their cluster box, wrapped */}
      {CLUSTER_ORDER.map((cKey, i) => {
        const r = boxRect(i);
        const items = LOGOS.filter((l) => l.cluster === cKey);
        // Lay out logos in a wrapping flex inside the box (absolute container)
        return (
          <div
            key={`logos-${cKey}`}
            className="absolute flex flex-wrap items-center justify-center gap-3"
            style={{
              left: r.x + 24,
              top: r.y + 50,
              width: r.w - 48,
              height: r.h - 70,
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
