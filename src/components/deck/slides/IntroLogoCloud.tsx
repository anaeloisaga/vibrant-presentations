import { motion } from "framer-motion";
import { LOGOS } from "@/lib/deck-data";
import { LogoChip } from "../LogoChip";
import { KineticHeadline } from "../kinetic/KineticHeadline";

/** Pseudo-random scattered positions, deterministic per logo name.
 * Avoids a centered "dead zone" so the headline stays readable. */
function scatterPos(name: string, index: number, total: number) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const rand = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Ring layout around headline — distribute logos evenly with jitter so they
  // wrap the full canvas instead of clustering on left/right.
  const cx = 960;
  const cy = 540;
  const angle = (index / total) * Math.PI * 2 + rand(h) * 0.6;
  // Elliptical radius — wider than tall to match 16:9 canvas
  const rx = 720 + rand(h * 3) * 160;
  const ry = 410 + rand(h * 5) * 90;
  let x = cx + Math.cos(angle) * rx - 110;
  let y = cy + Math.sin(angle) * ry - 30;

  // Clamp inside slide bounds
  x = Math.max(40, Math.min(1920 - 280, x));
  y = Math.max(40, Math.min(1080 - 120, y));

  const drift = (rand(h * 3) - 0.5) * 36;
  const driftDur = 6 + rand(h * 5) * 6;
  const rot = (rand(h * 11) - 0.5) * 6;
  return { x, y, drift, driftDur, rot };
}

export function IntroLogoCloud() {
  return (
    <div className="relative w-full h-full">
      {/* Floating logos */}
      {LOGOS.map((logo, i) => {
        const p = scatterPos(logo.name, i, LOGOS.length);
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
            <LogoChip logo={logo} baseSize={38} hideAnnotations />
          </motion.div>
        );
      })}

      {/* Centered headline — soft radial fade lets logos show through edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 34% at 50% 50%, rgba(10,14,26,0.55) 0%, rgba(10,14,26,0.35) 55%, rgba(10,14,26,0) 80%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-12"
          style={{ maxWidth: 1300 }}
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
              fontSize: 120,
              lineHeight: 1.0,
              color: "var(--deck-text)",
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="deck-body mt-7"
            style={{ color: "var(--deck-muted)", fontSize: 26 }}
          >
            We looked at 17 companies. Here's what we learned.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
