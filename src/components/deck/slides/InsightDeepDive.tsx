import { motion } from "framer-motion";
import { KineticHeadline } from "../kinetic/KineticHeadline";
import type { LucideIcon } from "lucide-react";

export interface DeepDivePoint {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Optional brand logos shown next to the title (e.g. partner refs). */
  logos?: { src: string; alt: string }[];
  /** Optional callout footnote, rendered as an italic note below the body. */
  callout?: string;
}

export interface DeepDiveInsight {
  number: string;
  insight: string;
  accent: string;
  company: string;
  companyLogo: string;
  tagline: string;
  heroStat?: { value: string; label: string };
  points: DeepDivePoint[];
  /** Optional bottom-left callout box, e.g. "More partnership examples" */
  extraCallout?: { title: string; items: string[] };
  /** Optional supporting visual */
  media?: {
    src: string;
    /** "bg" = faded full-bleed backdrop on right side; "card" = framed polaroid bottom-left */
    mode: "bg" | "card";
    /** caption shown under card */
    caption?: string;
  };
}

interface Props {
  insight: DeepDiveInsight;
}

export function InsightDeepDive({ insight: i }: Props) {
  return (
    <div className="relative w-full h-full flex" style={{ backgroundColor: "var(--deck-bg)" }}>
      {/* Decorative orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${i.accent}33 0%, ${i.accent}00 70%)`,
        }}
      />

      {/* Optional full-bleed faded backdrop (right side) */}
      {i.media?.mode === "bg" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${i.media.src})`,
            backgroundSize: "cover",
            backgroundPosition: "right center",
            opacity: 0.18,
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 35%, black 75%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 35%, black 75%, black 100%)",
          }}
        />
      )}

      {/* Left column */}
      <div className="relative flex-1 px-24 py-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="deck-body uppercase tracking-[0.4em] mb-6"
          style={{ color: i.accent, fontSize: 22, fontWeight: 700 }}
        >
          Insight {i.number}
        </motion.div>

        <KineticHeadline
          text={i.insight}
          style={{
            fontSize: 76,
            lineHeight: 1.0,
            color: "var(--deck-text)",
            marginBottom: 56,
          }}
        />

        {/* Company plate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-6"
        >
          <div
            className="relative rounded-2xl flex items-center justify-center px-8 py-5 shadow-xl"
            style={{ backgroundColor: "var(--deck-surface)", height: 120 }}
          >
            <img
              src={i.companyLogo}
              alt={i.company}
              style={{ height: 60, width: "auto", objectFit: "contain" }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -10,
                left: -10,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#8A8F99",
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}
            >
              {parseInt(i.number, 10)}
            </div>
          </div>
          <div>
            <div
              className="deck-body uppercase tracking-[0.3em]"
              style={{ color: "var(--deck-muted)", fontSize: 14, fontWeight: 600 }}
            >
              How they do it
            </div>
            <div
              className="deck-display"
              style={{ fontSize: 32, color: "var(--deck-text)", lineHeight: 1.15, maxWidth: 560 }}
            >
              {i.tagline}
            </div>
          </div>
        </motion.div>

        {i.heroStat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, type: "spring", damping: 12 }}
            className="flex items-baseline gap-5 mt-12"
          >
            <span
              className="deck-display"
              style={{ fontSize: 140, color: i.accent, lineHeight: 1 }}
            >
              {i.heroStat.value}
            </span>
            <span
              className="deck-body"
              style={{ fontSize: 22, color: "var(--deck-muted)", maxWidth: 280, lineHeight: 1.3 }}
            >
              {i.heroStat.label}
            </span>
          </motion.div>
        )}

        {i.extraCallout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-10 rounded-2xl p-6"
            style={{
              border: `2px dashed ${i.accent}`,
              backgroundColor: `${i.accent}14`,
              maxWidth: 720,
            }}
          >
            <div
              className="deck-body uppercase tracking-[0.3em] mb-3"
              style={{ color: i.accent, fontSize: 14, fontWeight: 700 }}
            >
              {i.extraCallout.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {i.extraCallout.items.map((item) => (
                <span
                  key={item}
                  className="deck-body px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "var(--deck-surface)",
                    color: "var(--deck-text-dark)",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Right column: 3 visual points */}
      <div
        className="relative flex flex-col justify-center gap-6 px-16 py-20"
        style={{ width: 820 }}
      >
        {i.points.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="flex items-center gap-5">
              {/* Logos on the left, bigger */}
              {p.logos && p.logos.length > 0 && (
                <div className="flex flex-col gap-4 flex-shrink-0">
                  {p.logos.map((l) => (
                    <div
                      key={l.alt}
                      className="rounded-2xl flex items-center justify-center p-4"
                      style={{ backgroundColor: "#FBF6E9", width: 120, height: 120 }}
                    >
                      <img
                        src={l.src}
                        alt={l.alt}
                        style={{ height: 80, width: "auto", objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl p-8 flex items-start gap-6 flex-1"
                style={{
                  backgroundColor: "var(--deck-surface)",
                  color: "var(--deck-text-dark)",
                  borderLeft: `8px solid ${i.accent}`,
                }}
              >
                <div
                  className="flex-shrink-0 rounded-2xl flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    backgroundColor: i.accent,
                    color: "#FBF6E9",
                  }}
                >
                  <Icon size={38} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="deck-display"
                    style={{ fontSize: 28, lineHeight: 1.15, marginBottom: 8 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="deck-body"
                    style={{ fontSize: 19, lineHeight: 1.4, color: "#3A3F4D" }}
                  >
                    {p.body}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Optional polaroid card bottom-left */}
      {i.media?.mode === "card" && (
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -2.5 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
          style={{
            bottom: 48,
            left: 64,
            width: 360,
            padding: 18,
            paddingBottom: i.media.caption ? 50 : 18,
            backgroundColor: "#FBF6E9",
            boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.04)",
            borderRadius: 8,
          }}
        >
          <img
            src={i.media.src}
            alt={i.media.caption ?? ""}
            style={{
              width: "100%",
              height: 280,
              objectFit: "cover",
              display: "block",
              borderRadius: 3,
            }}
          />
          {i.media.caption && (
            <div
              className="deck-body"
              style={{
                marginTop: 14,
                fontSize: 16,
                color: "#3A3F4D",
                textAlign: "center",
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              {i.media.caption}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
