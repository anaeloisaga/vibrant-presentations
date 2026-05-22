import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";
import flexaBg from "@/assets/insights/flexa-bg.jpg";

const POINTS = [
  "Double down on flexibility and optimization — the market is betting big here and we need to stay ahead of the curve.",
  "Keep pushing multi-market revenue stacking — layering wholesale and flexibility markets on the same asset is where the real upside sits.",
  "Deepen partnerships to integrate further into the value chain and unlock new segments — from OEM cloud-to-cloud to utility alliances and B2B distribution.",
  "Own the customer acquisition channel — HW- or tariff-led — and combine the offering with optimization to target every household (full-stack play, à la Base / Octopus / 1Komma5).",
];

export function FlexaClosing() {
  return (
    <div className="relative w-full h-full px-32 py-20 flex flex-col justify-center">
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${flexaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.78) 55%, rgba(10,14,26,0.55) 100%)",
        }}
      />

      <div className="relative z-10">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-6"
          style={{ color: "var(--deck-accent)", fontSize: 22, fontWeight: 600 }}
        >
          What this means for Flexa
        </div>

        <KineticHeadline
          text="Flexa is on the right path"
          style={{
            fontSize: 110,
            lineHeight: 0.95,
            color: "var(--deck-text)",
            marginBottom: 40,
          }}
        />

        <div className="space-y-5 max-w-[1400px]">
          {POINTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.0 + i * 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-6"
            >
              <div
                className="deck-display flex-shrink-0"
                style={{
                  fontSize: 32,
                  color: "var(--deck-accent)",
                  lineHeight: 1.2,
                  width: 60,
                }}
              >
                0{i + 1}
              </div>
              <p
                className="deck-body"
                style={{
                  fontSize: 30,
                  lineHeight: 1.35,
                  color: "var(--deck-text)",
                  fontWeight: 500,
                }}
              >
                {p}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
