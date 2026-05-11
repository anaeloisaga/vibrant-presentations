import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";

const POINTS = [
  "We're already wiring partnerships into the core, not bolted on.",
  "Our stack is vertical by design — hardware, software, and trading in one loop.",
  "Flexibility isn't a feature. It's the product we're shipping.",
];

export function FlexaClosing() {
  return (
    <div className="relative w-full h-full px-32 py-24 flex flex-col justify-center">
      {/* Background gradient orb */}
      <div
        className="absolute -top-40 -right-40 rounded-full"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(255,122,26,0.35) 0%, rgba(255,122,26,0) 70%)",
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
          text="We're on the right path."
          style={{
            fontSize: 160,
            lineHeight: 0.95,
            color: "var(--deck-text)",
            marginBottom: 64,
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
