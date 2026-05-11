import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** stagger between characters in seconds */
  stagger?: number;
}

/**
 * Per-word kinetic reveal — each word fades + slides up with stagger.
 */
export function KineticHeadline({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.06,
}: Props) {
  const words = text.split(" ");
  return (
    <h1
      className={`deck-display ${className ?? ""}`}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
