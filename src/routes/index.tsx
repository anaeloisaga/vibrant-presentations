import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SlideStage } from "@/components/deck/SlideStage";
import { IntroLogoCloud } from "@/components/deck/slides/IntroLogoCloud";
import { ClustersSlide } from "@/components/deck/slides/ClustersSlide";
import { SummarySlide } from "@/components/deck/slides/SummarySlide";
import { InsightDeepDive, type DeepDiveInsight } from "@/components/deck/slides/InsightDeepDive";
import { FlexaClosing } from "@/components/deck/slides/FlexaClosing";
import { TrendingUp, Cloud, Globe2, Network, Layers, ShieldCheck, DollarSign, Wrench, Feather } from "lucide-react";
import axleLogo from "@/assets/logos/axle.png";
import octopusLogo from "@/assets/logos/octopus.png";
import basePowerLogo from "@/assets/logos/base.png";
import uplightLogo from "@/assets/logos/uplight.png";
import krakenLogo from "@/assets/logos/kraken.png";
import bydLogo from "@/assets/logos/byd.png";
import teslaLogo from "@/assets/logos/tesla.png";
import axleHero from "@/assets/insights/axle-hero.png";
import octopusBg from "@/assets/insights/octopus-bg.png";
import baseBg from "@/assets/insights/base-bg.png";

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
 *  2  summary of 3 insights
 *  3  deep dive 1 — Base Power
 *  4  deep dive 2 — Axle
 *  5  deep dive 3 — Amber
 *  6  Flexa closing
 */
const TOTAL_SLIDES = 7;

const ACCENT = {
  one: "#1A2942",   // Base Power dark
  two: "#E64545",   // Axle red
  three: "#7C3AED", // Octopus purple
};

const INSIGHTS: DeepDiveInsight[] = [
  {
    number: "01",
    insight: "Most players move into optimization",
    accent: ACCENT.one,
    company: "Base Power",
    companyLogo: basePowerLogo,
    tagline: "Vertically integrated B2C gentailer offering VPP optimization.",
    heroStat: { value: "10,000+", label: "Texas households on Base's battery-as-a-service plan, with 250 MW under VPP management" },
    media: { src: baseBg, mode: "bg" },
    points: [
      {
        icon: Wrench,
        title: "Full-stack control, direct dispatch",
        body: "Owning hardware, install and ERCOT market access end-to-end lets Base optimize dispatch directly — no third parties between the battery and the wholesale market.",
      },
      {
        icon: DollarSign,
        title: "VPP earnings pay down the bill",
        body: "Wholesale and ancillary services revenue from optimized dispatch funds a per-kWh rate cheaper than the market — the VPP pays down the bill.",
      },
      {
        icon: ShieldCheck,
        title: "Backup sells the install",
        body: "Outage protection on Texas's unstable grid sells the install — once in the home, Base owns the asset and its full optimization upside.",
      },
    ],
  },
  {
    number: "02",
    insight: "Multi-market revenue stacking",
    accent: ACCENT.two,
    company: "Axle",
    companyLogo: axleLogo,
    tagline: "Stacking flexibility revenue across markets.",
    heroStat: { value: "85+ MW", label: "managed across UK and European flexibility markets" },
    media: { src: axleHero, mode: "bg" },
    points: [
      {
        icon: TrendingUp,
        title: "Multi-market revenue stacking",
        body: "Axle participates across UK and French flexibility and wholesale markets simultaneously, layering revenues on the same asset — with assets auto-registered as new markets open.",
      },
      {
        icon: Cloud,
        title: "Cloud-to-cloud connectivity (C2C will be hard in new markets)",
        body: "Connects directly to OEM cloud APIs — no gateway, no extra hardware in the home. Dispatch runs entirely server-side, making onboarding frictionless and globally scalable.",
      },
      {
        icon: Feather,
        title: "Light, adaptable solution",
        body: "Software-only, no hardware in the home, and pre-integrated with major OEM clouds — Axle's stack can be dropped into a new market, OEM, or partner setup quickly, without long hardware or install rollouts.",
      },
    ],
  },
  {
    number: "03",
    insight: "Partnerships unlock value chains and new markets",
    accent: ACCENT.three,
    company: "Octopus Energy",
    companyLogo: octopusLogo,
    tagline: "UK-based energy group scaling globally via acquisitions, Kraken licensing, and utility partnerships.",
    heroStat: { value: "10M+", label: "customers on Octopus globally — anchoring a full-stack demand-side platform built through acquisitions and partnerships" },
    media: { src: octopusBg, mode: "bg" },
    extraCallout: {
      title: "More partnership examples",
      items: ["E.ON + gridX", "Lunar + Moixa", "E.ON + Amber"],
    },
    points: [
      {
        icon: Globe2,
        title: "Majority stake — instant US footprint",
        body: "Buying into 85+ US utility relationships and ~8.5 GW of flexible load instead of building it.",
        logos: [{ src: uplightLogo, alt: "Uplight" }],
      },
      {
        icon: Network,
        title: "Players are betting big on flex",
        body: "$8.65B spin-out valuation — incumbents and challengers are putting serious capital behind flexibility.",
        logos: [{ src: krakenLogo, alt: "Kraken" }],
      },
      {
        icon: Layers,
        title: "Vertical integration",
        body: "Stitching OEM hardware, software, and customer layers into an end-to-end demand-side platform.",
        logos: [
          { src: bydLogo, alt: "BYD" },
          { src: teslaLogo, alt: "Tesla" },
        ],
      },
    ],
  },
];

function Deck() {
  const [index, setIndex] = useState(0);

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

  const slide = useMemo(() => {
    switch (index) {
      case 0:
        return <IntroLogoCloud />;
      case 1:
        return <ClustersSlide />;
      case 2:
        return <SummarySlide />;
      case 3:
        return <InsightDeepDive insight={INSIGHTS[0]} />;
      case 4:
        return <InsightDeepDive insight={INSIGHTS[1]} />;
      case 5:
        return <InsightDeepDive insight={INSIGHTS[2]} />;
      case 6:
        return <FlexaClosing />;
      default:
        return null;
    }
  }, [index]);

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
