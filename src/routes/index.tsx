import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SlideStage } from "@/components/deck/SlideStage";
import { IntroLogoCloud } from "@/components/deck/slides/IntroLogoCloud";
import { ClustersSlide } from "@/components/deck/slides/ClustersSlide";
import { SummarySlide } from "@/components/deck/slides/SummarySlide";
import { InsightDeepDive, type DeepDiveInsight } from "@/components/deck/slides/InsightDeepDive";
import { FlexaClosing } from "@/components/deck/slides/FlexaClosing";
import { Layers, Handshake, Cpu, TrendingUp, Cloud, Zap, Globe2, Network, Battery, ShieldCheck, DollarSign, Wrench } from "lucide-react";
import lunarLogo from "@/assets/logos/lunar-energy.png";
import axleLogo from "@/assets/logos/axle.png";
import amberLogo from "@/assets/logos/amber.png";
import basePowerLogo from "@/assets/logos/base-power.png";
import lunarApp from "@/assets/insights/lunar-app.png";
import axleHero from "@/assets/insights/axle-hero.png";
import amberEon from "@/assets/insights/amber-eon.png";
import baseFarmers from "@/assets/insights/base-farmers.png";

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
 *  2  summary of 4 insights
 *  3  deep dive 1 — Lunar
 *  4  deep dive 2 — Axle
 *  5  deep dive 3 — Amber
 *  6  deep dive 4 — Base Power
 *  7  Flexa closing
 */
const TOTAL_SLIDES = 8;

const ACCENT = {
  one: "#FF7A1A",
  two: "#D946EF",
  three: "#5B8DEF",
  four: "#1FB8A6",
};

const INSIGHTS: DeepDiveInsight[] = [
  {
    number: "01",
    insight: "Most players move into optimization",
    accent: ACCENT.one,
    company: "Lunar Energy",
    companyLogo: lunarLogo,
    tagline: "Hardware + software shipped as one product, scaled through partners.",
    heroStat: { value: "130k+", label: "assets under Lunar Gridshare across US, UK & Japan" },
    media: { src: lunarApp, mode: "card", caption: "Lunar app — one tap, full home" },
    points: [
      {
        icon: Layers,
        title: "One integrated product",
        body: "Own batteries, inverters and the Gridshare VPP — sold as a single stack, not parts.",
      },
      {
        icon: Handshake,
        title: "Sunrun as primary channel",
        body: "Investor + #1 US residential solar installer = direct access to 700k+ existing homes.",
      },
      {
        icon: Cpu,
        title: "Software-led scale",
        body: "Acquired Moixa to control 3rd-party batteries, EVs and thermostats via cloud APIs.",
      },
    ],
  },
  {
    number: "02",
    insight: "Value lives in multi-market optimization",
    accent: ACCENT.two,
    company: "Axle",
    companyLogo: axleLogo,
    tagline: "Stacking flexibility revenue across markets — without owning the customer.",
    media: { src: axleHero, mode: "bg" },
    points: [
      {
        icon: TrendingUp,
        title: "Revenue stacking",
        body: "Same asset, layered earnings across UK flex and wholesale markets — auto-registered as new ones open.",
      },
      {
        icon: Cloud,
        title: "Cloud-to-cloud, no hardware",
        body: "Direct OEM API integrations — no gateway in the home, dispatch handled server-side.",
      },
      {
        icon: Zap,
        title: "First-mover in wholesale",
        body: "First Virtual Trading Party in GB, holds licenses across multiple EU countries — partners go live instantly.",
      },
    ],
  },
  {
    number: "03",
    insight: "Growth = B2B, international, partnerships",
    accent: ACCENT.three,
    company: "Amber",
    companyLogo: amberLogo,
    tagline: "Australian dynamic-tariff player exporting its tech via OEM and utility deals.",
    heroStat: { value: "~70%", label: "of 3rd-party hardware market integrated with Amber's Smart Shift" },
    media: { src: amberEon, mode: "card", caption: "E.ON Next × Amber — UK launch partner" },
    points: [
      {
        icon: Globe2,
        title: "Europe via partnerships",
        body: "Licensing battery optimization software to E.ON (UK trial + investor) and Ecotricity.",
      },
      {
        icon: Network,
        title: "OEM-wide compatibility",
        body: "Smart Shift, co-developed with CSIRO, plugs into ~70% of third-party hardware in market.",
      },
      {
        icon: Battery,
        title: "Asset expansion via M&A",
        body: "Acquired ChargeHQ to add EV charging + V2G readiness on top of home batteries.",
      },
    ],
  },
  {
    number: "04",
    insight: "Tech-first is now table stakes",
    accent: ACCENT.four,
    company: "Base Power",
    companyLogo: basePowerLogo,
    tagline: "Vertical integration + battery-as-a-service, subsidized by grid revenue.",
    media: { src: baseFarmers, mode: "card", caption: "Base × Farmers Electric Cooperative" },
    points: [
      {
        icon: Wrench,
        title: "End-to-end vertical stack",
        body: "Hardware, install, software and market participation in one — unbeatable unit economics.",
      },
      {
        icon: DollarSign,
        title: "Battery-as-a-service",
        body: "Base owns the battery; customer pays an install fee + monthly subscription. Mass-adoption pricing.",
      },
      {
        icon: ShieldCheck,
        title: "Backup as a wedge",
        body: "On the unstable Texas grid, guaranteed outage protection sells reliability — VPP revenue funds the discount.",
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
        return <InsightDeepDive insight={INSIGHTS[3]} />;
      case 7:
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
