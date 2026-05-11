import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SlideStage } from "@/components/deck/SlideStage";
import { IntroLogoCloud } from "@/components/deck/slides/IntroLogoCloud";
import { ClustersSlide } from "@/components/deck/slides/ClustersSlide";
import { TakeawaysHub } from "@/components/deck/slides/TakeawaysHub";
import { TakeawayDetail } from "@/components/deck/slides/TakeawayDetail";
import { FlexaClosing } from "@/components/deck/slides/FlexaClosing";
import { TAKEAWAYS } from "@/lib/deck-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Energy competitor analysis — Flexa" },
      {
        name: "description",
        content:
          "An animated walkthrough of the energy competitor landscape: clusters, takeaways, and what they mean for Flexa.",
      },
    ],
  }),
  component: Deck,
});

/**
 * Slide order:
 *  0  intro logo cloud
 *  1  clustering moment
 *  2  takeaways hub
 *  3  takeaway detail 1
 *  4  takeaways hub
 *  5  takeaway detail 2
 *  6  takeaways hub
 *  7  takeaway detail 3
 *  8  takeaways hub
 *  9  takeaway detail 4
 *  10 Flexa closing
 */
const TOTAL_SLIDES = 11;

function Deck() {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  // Sync index <-> URL hash
  useEffect(() => {
    const fromHash = () => {
      const n = parseInt(window.location.hash.replace("#", ""), 10);
      if (!Number.isNaN(n) && n >= 0 && n < TOTAL_SLIDES) {
        setIndex(n);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = String(index);
    }
  }, [index]);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, TOTAL_SLIDES - 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        setIndex(0);
      } else if (e.key === "End") {
        setIndex(TOTAL_SLIDES - 1);
      } else if (e.key === "f" || e.key === "F") {
        const el = document.documentElement;
        if (!document.fullscreenElement) {
          el.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const goToTakeaway = useCallback((id: string) => {
    const tIdx = TAKEAWAYS.findIndex((t) => t.id === id);
    if (tIdx < 0) return;
    setVisited((s) => new Set(s).add(id));
    // Detail slides are at 3, 5, 7, 9
    setIndex(3 + tIdx * 2);
  }, []);

  const backToHub = useCallback(() => {
    // From a detail slide, jump forward to the next hub (or closing)
    setIndex((i) => {
      // Detail slides: 3,5,7,9 -> next hub: 4,6,8 then closing: 10
      if (i === 9) return 10;
      if (i === 3 || i === 5 || i === 7) return i + 1;
      return i;
    });
  }, []);

  const slide = useMemo(() => {
    switch (index) {
      case 0:
        return <IntroLogoCloud />;
      case 1:
        return <ClustersSlide />;
      case 2:
      case 4:
      case 6:
      case 8:
        return <TakeawaysHub onSelect={goToTakeaway} visited={visited} />;
      case 3:
        return <TakeawayDetail takeaway={TAKEAWAYS[0]} onBack={backToHub} />;
      case 5:
        return <TakeawayDetail takeaway={TAKEAWAYS[1]} onBack={backToHub} />;
      case 7:
        return <TakeawayDetail takeaway={TAKEAWAYS[2]} onBack={backToHub} />;
      case 9:
        return <TakeawayDetail takeaway={TAKEAWAYS[3]} onBack={backToHub} />;
      case 10:
        return <FlexaClosing />;
      default:
        return null;
    }
  }, [index, goToTakeaway, backToHub, visited]);

  const progress = ((index + 1) / TOTAL_SLIDES) * 100;

  return (
    <div className="relative" style={{ backgroundColor: "var(--deck-bg)" }}>
      <SlideStage>
        <LayoutGroup>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full"
            >
              {slide}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
      </SlideStage>

      {/* Progress bar (top) */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: 4, backgroundColor: "rgba(251, 246, 233, 0.08)" }}
      >
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", backgroundColor: "var(--deck-accent)" }}
        />
      </div>

      {/* Bottom controls */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex items-center justify-center gap-4 pointer-events-none">
        <div
          className="deck-body pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur"
          style={{
            backgroundColor: "rgba(10, 14, 26, 0.6)",
            border: "1px solid rgba(251, 246, 233, 0.12)",
            color: "var(--deck-text)",
            fontSize: 14,
          }}
        >
          <button
            onClick={prev}
            disabled={index === 0}
            className="px-2 py-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="Previous slide"
          >
            ←
          </button>
          <span style={{ color: "var(--deck-muted)", minWidth: 60, textAlign: "center" }}>
            {index + 1} / {TOTAL_SLIDES}
          </span>
          <button
            onClick={next}
            disabled={index === TOTAL_SLIDES - 1}
            className="px-2 py-1 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="Next slide"
          >
            →
          </button>
          <span style={{ color: "var(--deck-muted)", marginLeft: 8 }}>
            press{" "}
            <kbd
              className="px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "rgba(251,246,233,0.1)", fontSize: 12 }}
            >
              F
            </kbd>{" "}
            for fullscreen
          </span>
        </div>
      </div>
    </div>
  );
}
