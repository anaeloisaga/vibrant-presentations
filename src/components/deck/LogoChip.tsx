import { motion } from "framer-motion";
import type { Logo } from "@/lib/deck-data";

interface LogoChipProps {
  logo: Logo;
  /** Base font size in px (before weight multiplier) */
  baseSize?: number;
}

/**
 * Brand-styled text "logo" chip — pill with the company name in its brand color.
 * Uses motion.div with layoutId so it can be smoothly tweened between slides.
 */
export function LogoChip({ logo, baseSize = 28 }: LogoChipProps) {
  const fontSize = baseSize * logo.weight;
  return (
    <motion.div
      layoutId={`logo-${logo.name}`}
      transition={{ type: "spring", damping: 22, stiffness: 140 }}
      className="deck-display inline-flex items-center justify-center rounded-2xl px-5 py-2 shadow-lg"
      style={{
        backgroundColor: "var(--deck-surface)",
        color: logo.color ?? "#0A0E1A",
        fontSize,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {logo.name}
    </motion.div>
  );
}
