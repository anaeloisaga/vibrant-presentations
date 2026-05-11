import { motion } from "framer-motion";
import type { Takeaway } from "@/lib/deck-data";
import { KineticHeadline } from "../kinetic/KineticHeadline";

interface Props {
  takeaway: Takeaway;
  onBack: () => void;
}

export function TakeawayDetail({ takeaway: t, onBack }: Props) {
  return (
    <div
      className="relative w-full h-full flex"
      style={{ backgroundColor: "var(--deck-bg)" }}
    >
      {/* Left: takeaway content */}
      <div className="flex-1 px-24 py-20 flex flex-col justify-center">
        <motion.button
          onClick={onBack}
          whileHover={{ x: -4 }}
          className="deck-body self-start mb-10 px-5 py-2 rounded-full"
          style={{
            color: "var(--deck-muted)",
            fontSize: 18,
            border: "1px solid rgba(251, 246, 233, 0.2)",
          }}
        >
          ← Back to takeaways
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="deck-display mb-4"
          style={{ color: t.accent, fontSize: 28, letterSpacing: "0.2em" }}
        >
          TAKEAWAY {t.number}
        </motion.div>

        <KineticHeadline
          text={t.title}
          style={{
            fontSize: 96,
            lineHeight: 1.0,
            color: "var(--deck-text)",
            marginBottom: 32,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="deck-body"
          style={{ color: "var(--deck-muted)", fontSize: 28, lineHeight: 1.45, maxWidth: 720 }}
        >
          {t.blurb}
        </motion.p>
      </div>

      {/* Right: example card */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col justify-center px-20 py-20"
        style={{
          width: 880,
          backgroundColor: "var(--deck-surface)",
          color: "var(--deck-text-dark)",
        }}
      >
        {/* Accent corner */}
        <div
          className="absolute top-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderTop: `120px solid ${t.accent}`,
            borderLeft: "120px solid transparent",
          }}
        />

        <div
          className="deck-body uppercase tracking-[0.3em] mb-4"
          style={{ color: t.accent, fontSize: 16, fontWeight: 700 }}
        >
          Example
        </div>
        <div
          className="deck-display mb-8"
          style={{ fontSize: 72, lineHeight: 0.95 }}
        >
          {t.exampleCompany}
        </div>

        <div
          className="deck-display mb-6"
          style={{ fontSize: 36, lineHeight: 1.15, color: "#1a1f2e" }}
        >
          {t.exampleHeadline}
        </div>

        <p
          className="deck-body mb-10"
          style={{ fontSize: 22, lineHeight: 1.5, color: "#4a5060" }}
        >
          {t.exampleBody}
        </p>

        {t.exampleStat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring", damping: 12 }}
            className="flex items-baseline gap-5"
          >
            <span
              className="deck-display"
              style={{ fontSize: 120, color: t.accent, lineHeight: 1 }}
            >
              {t.exampleStat.value}
            </span>
            <span
              className="deck-body"
              style={{ fontSize: 22, color: "#4a5060", maxWidth: 260, lineHeight: 1.3 }}
            >
              {t.exampleStat.label}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
