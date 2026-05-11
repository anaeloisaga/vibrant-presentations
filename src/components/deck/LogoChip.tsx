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
  if (logo.image) {
    const height = fontSize * 1.6;
    return (
      <motion.div
        layoutId={`logo-${logo.name}`}
        transition={{ type: "spring", damping: 22, stiffness: 140 }}
        className="inline-flex items-center justify-center rounded-2xl px-5 py-3 shadow-lg relative"
        style={{
          backgroundColor: "var(--deck-surface)",
          height,
        }}
      >
        <img
          src={logo.image}
          alt={logo.name}
          style={{ height: height * 0.6, width: "auto", objectFit: "contain", display: "block" }}
          draggable={false}
        />
        {logo.marker && (
          <span
            className="deck-body absolute"
            style={{
              top: -6,
              right: -4,
              fontSize: fontSize * 0.7,
              fontWeight: 700,
              color: "var(--deck-accent)",
              lineHeight: 1,
            }}
          >
            {logo.marker}
          </span>
        )}
      </motion.div>
    );
  }
  return (
    <motion.div
      layoutId={`logo-${logo.name}`}
      transition={{ type: "spring", damping: 22, stiffness: 140 }}
      className="deck-display inline-flex items-center justify-center rounded-2xl px-5 py-2 shadow-lg relative"
      style={{
        backgroundColor: "var(--deck-surface)",
        color: logo.color ?? "#0A0E1A",
        fontSize,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {logo.name}
      {logo.marker && (
        <span
          style={{
            marginLeft: 4,
            fontSize: fontSize * 0.7,
            color: "var(--deck-accent)",
          }}
        >
          {logo.marker}
        </span>
      )}
    </motion.div>
  );
}
