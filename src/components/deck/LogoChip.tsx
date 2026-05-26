import { motion } from "framer-motion";
import type { Logo } from "@/lib/deck-data";

interface LogoChipProps {
  logo: Logo;
  /** Base font size in px (before weight multiplier) */
  baseSize?: number;
  /** When true, ignore per-logo weight so every chip renders the same size */
  uniform?: boolean;
}

/**
 * Brand-styled text "logo" chip — pill with the company name in its brand color.
 * Uses motion.div with layoutId so it can be smoothly tweened between slides.
 */
export function LogoChip({ logo, baseSize = 28, uniform = false }: LogoChipProps) {
  const fontSize = baseSize * (uniform ? 1 : logo.weight);
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
        {logo.detailNumber != null && (
          <span
            className="deck-body absolute flex items-center justify-center rounded-full"
            style={{
              top: -10,
              left: -10,
              width: fontSize * 1.25,
              height: fontSize * 1.25,
              fontSize: fontSize * 0.75,
              fontWeight: 700,
              backgroundColor: "#8A8F99",
              color: "#FBF6E9",
              lineHeight: 1,
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            {logo.detailNumber}
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
      {logo.detailNumber != null && (
        <span
          className="deck-body absolute flex items-center justify-center rounded-full"
          style={{
            top: -10,
            left: -10,
            width: fontSize * 1.25,
            height: fontSize * 1.25,
            fontSize: fontSize * 0.75,
            fontWeight: 700,
            backgroundColor: "#8A8F99",
            color: "#FBF6E9",
            lineHeight: 1,
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          {logo.detailNumber}
        </span>
      )}
    </motion.div>
  );
}
