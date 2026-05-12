import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";
import flexaBg from "@/assets/insights/flexa-bg.jpg";

const POINTS = [
  "Players are betting big on flexibility and optimization — the market is moving where we're already pointed.",
  "We're participating in multi-market revenue stacking, layering value across flexibility and wholesale markets on the same asset.",
  "We're leveraging partnerships to integrate deeper into the energy value chain and expand into new segments.",
];

export function FlexaClosing() {
  return (
    <div className="relative w-full h-full px-32 py-24 flex flex-col justify-center">
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
            fontSize: 140,
            lineHeight: 0.95,
            color: "var(--deck-text)",
            marginBottom: 56,
          }}
        />

        <div className="space-y-6 max-w-[1400px]">
          {POINTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.2 + i * 0.25,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-6"
            >
              <div
                className="deck-display flex-shrink-0"
                style={{
                  fontSize: 36,
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
                  fontSize: 36,
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="deck-display mt-20"
          style={{ fontSize: 28, color: "var(--deck-muted)" }}
        >
          Thanks. Questions?
        </motion.div>
      </div>
    </div>
  );
}
