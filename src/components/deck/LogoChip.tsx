import { motion } from "framer-motion";
import type { Logo } from "@/lib/deck-data";

interface LogoChipProps {
  logo: Logo;
  /** Base font size in px (before weight multiplier) */
  baseSize?: number;
  /** When true, ignore per-logo weight so every chip renders the same size */
  uniform?: boolean;
  /** When true, hide marker (*) and detailNumber callouts */
  hideAnnotations?: boolean;
}

/**
 * Brand-styled text "logo" chip — pill with the company name in its brand color.
 * Uses motion.div with layoutId so it can be smoothly tweened between slides.
 */
export function LogoChip({ logo, baseSize = 28, uniform = false, hideAnnotations = false }: LogoChipProps) {
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
        {logo.marker && !hideAnnotations && (
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
        {logo.detailNumber != null && !hideAnnotations && (
          <span
            className="deck-body absolute flex items-center justify-center rounded-full"
            style={{
              top: -6,
              left: -6,
              width: fontSize * 0.85,
              height: fontSize * 0.85,
              fontSize: fontSize * 0.5,
              fontWeight: 700,
              backgroundColor: "#8A8F99",
              color: "#FBF6E9",
              lineHeight: 1,
              boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
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
      {logo.marker && !hideAnnotations && (
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
      {logo.detailNumber != null && !hideAnnotations && (
        <span
          className="deck-body absolute flex items-center justify-center rounded-full"
          style={{
            top: -6,
            left: -6,
            width: fontSize * 0.85,
            height: fontSize * 0.85,
            fontSize: fontSize * 0.5,
            fontWeight: 700,
            backgroundColor: "#8A8F99",
            color: "#FBF6E9",
            lineHeight: 1,
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          }}
        >
          {logo.detailNumber}
        </span>
      )}
    </motion.div>
  );
}
