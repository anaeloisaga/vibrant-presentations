import { motion } from "framer-motion";
import { TAKEAWAYS } from "@/lib/deck-data";
import { KineticHeadline } from "../kinetic/KineticHeadline";

interface Props {
  onSelect: (id: string) => void;
  visited: Set<string>;
}

export function TakeawaysHub({ onSelect, visited }: Props) {
  return (
    <div className="relative w-full h-full px-32 py-24 flex flex-col">
      <div className="mb-12">
        <div
          className="deck-body uppercase tracking-[0.4em] mb-4"
          style={{ color: "var(--deck-accent)", fontSize: 20, fontWeight: 600 }}
        >
          Step 2 — Takeaways
        </div>
        <KineticHeadline
          text="Four things we learned."
          style={{ fontSize: 96, lineHeight: 1, color: "var(--deck-text)" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="deck-body mt-6"
          style={{ color: "var(--deck-muted)", fontSize: 26 }}
        >
          Click a card to see the company that nailed it.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        {TAKEAWAYS.map((t, i) => {
          const seen = visited.has(t.id);
          return (
            <motion.button
              key={t.id}
              onClick={() => onSelect(t.id)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9 + i * 0.12,
                type: "spring",
                damping: 18,
                stiffness: 120,
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.99 }}
              className="relative text-left rounded-3xl p-10 overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "var(--deck-surface)",
                color: "var(--deck-text-dark)",
                borderLeft: `8px solid ${t.accent}`,
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="deck-display"
                  style={{ fontSize: 64, color: t.accent, lineHeight: 1 }}
                >
                  {t.number}
                </span>
                {seen && (
                  <span
                    className="deck-body px-3 py-1 rounded-full"
                    style={{
                      fontSize: 14,
                      backgroundColor: t.accent,
                      color: "#FBF6E9",
                      fontWeight: 600,
                    }}
                  >
                    seen
                  </span>
                )}
              </div>
              <h3
                className="deck-display"
                style={{ fontSize: 42, lineHeight: 1.05, marginBottom: 16 }}
              >
                {t.title}
              </h3>
              <p
                className="deck-body"
                style={{ fontSize: 22, color: "#3A3F4D", lineHeight: 1.4 }}
              >
                {t.blurb}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
