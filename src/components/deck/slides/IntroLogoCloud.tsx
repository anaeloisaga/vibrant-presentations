import { motion } from "framer-motion";
import { LOGOS } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

/** Pseudo-random scattered positions, deterministic per logo name. */
function scatterPos(name: string, index: number) {
  // Simple hash so positions are stable across renders
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  // Spread across 1920x1080 with margins
  const x = 80 + rand(h + index) * (1920 - 360);
  const y = 80 + rand(h * 7 + index * 13) * (1080 - 220);
  const drift = (rand(h * 3) - 0.5) * 30;
  const driftDur = 6 + rand(h * 5) * 6;
  const rot = (rand(h * 11) - 0.5) * 6;
  return { x, y, drift, driftDur, rot };
}

export function IntroLogoCloud() {
  return (
    <div className="relative w-full h-full">
      {/* Floating logos */}
      {LOGOS.map((logo, i) => {
        const p = scatterPos(logo.name, i);
        return (
          <motion.div
            key={logo.name}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, p.drift, 0],
              rotate: [p.rot, -p.rot, p.rot],
            }}
            transition={{
              opacity: { delay: 0.2 + i * 0.04, duration: 0.6 },
              scale: { delay: 0.2 + i * 0.04, type: "spring", damping: 14 },
              y: {
                duration: p.driftDur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              },
              rotate: {
                duration: p.driftDur * 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <LogoChip logo={logo} baseSize={26} />
          </motion.div>
        );
      })}

      {/* Centered overlay headline with backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-16 py-12 rounded-3xl"
          style={{
            backgroundColor: "rgba(10, 14, 26, 0.78)",
            backdropFilter: "blur(8px)",
            maxWidth: 1400,
          }}
        >
          <div
            className="deck-body uppercase tracking-[0.4em] mb-6"
            style={{ color: "var(--deck-accent)", fontSize: 22, fontWeight: 600 }}
          >
            Competitor Analysis
          </div>
          <KineticHeadline
            text="The energy space, mapped."
            delay={0.9}
            style={{
              fontSize: 140,
              lineHeight: 1.0,
              color: "var(--deck-text)",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="deck-body mt-8"
            style={{ color: "var(--deck-muted)", fontSize: 28 }}
          >
            We looked at 35 companies. Here's what we learned.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
