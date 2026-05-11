export type Cluster =
  | "aggregators"
  | "integrated-optimizers"
  | "asset-traders"
  | "fully-integrated";

import axleLogo from "@/assets/logos/axle.png";
import sunrunLogo from "@/assets/logos/sunrun.png";
import teslaLogo from "@/assets/logos/tesla.png";
import eonLogo from "@/assets/logos/eon.png";
import ostromLogo from "@/assets/logos/ostrom.png";
import fuseLogo from "@/assets/logos/fuse.png";
import uplightLogo from "@/assets/logos/uplight.png";
import tiltLogo from "@/assets/logos/tilt.png";
import baseLogo from "@/assets/logos/base.png";
import lunarEnergyLogo from "@/assets/logos/lunar-energy.png";
import komma5Logo from "@/assets/logos/1komma5.png";
import sonnenLogo from "@/assets/logos/sonnen.png";
import octopusLogo from "@/assets/logos/octopus.png";
import amberLogo from "@/assets/logos/amber.png";

export interface Logo {
  name: string;
  cluster: Cluster;
  /** relative size weight 0.7 - 1.6 */
  weight: number;
  /** brand-ish color for the chip */
  color?: string;
  /** optional imported image URL — when set, renders the real logo instead of the text chip */
  image?: string;
}

export const CLUSTERS: Record<
  Cluster,
  { label: string; tag: string; accent: string }
> = {
  aggregators: {
    label: "Aggregators",
    tag: "B2B2C",
    accent: "#0A0E1A",
  },
  "integrated-optimizers": {
    label: "Integrated optimizers",
    tag: "B2B2C",
    accent: "#8A8E99",
  },
  "asset-traders": {
    label: "Asset Traders",
    tag: "B2B",
    accent: "#5B8DEF",
  },
  "fully-integrated": {
    label: "Fully integrated energy companies",
    tag: "B2C",
    accent: "#FF7A1A",
  },
};

export const LOGOS: Logo[] = [
  // Aggregators
  { name: "Sunrun", cluster: "aggregators", weight: 1.2, color: "#F4B400", image: sunrunLogo },
  { name: "E.ON", cluster: "aggregators", weight: 1.1, color: "#E2231A", image: eonLogo },

  // Integrated optimizers
  { name: "axle", cluster: "integrated-optimizers", weight: 1.15, color: "#E64545", image: axleLogo },
  { name: "tilt", cluster: "integrated-optimizers", weight: 1.0, color: "#2E7AE8", image: tiltLogo },
  { name: "uplight", cluster: "integrated-optimizers", weight: 1.1, color: "#1BB37A", image: uplightLogo },
  { name: "1KOMMA5°", cluster: "integrated-optimizers", weight: 1.25, color: "#7B2D8E", image: komma5Logo },
  { name: "sonnen", cluster: "integrated-optimizers", weight: 1.0, color: "#0A0E1A", image: sonnenLogo },
  { name: "Octopus", cluster: "integrated-optimizers", weight: 1.3, color: "#D946EF", image: octopusLogo },

  // Fully integrated
  { name: "amber", cluster: "fully-integrated", weight: 1.15, color: "#0A0E1A", image: amberLogo },
  { name: "BASE", cluster: "fully-integrated", weight: 1.05, color: "#0A0E1A", image: baseLogo },
  { name: "Lunar Energy", cluster: "fully-integrated", weight: 1.2, color: "#2E7AE8", image: lunarEnergyLogo },
  { name: "Tesla", cluster: "fully-integrated", weight: 1.4, color: "#E2231A", image: teslaLogo },
  { name: "ostrom", cluster: "fully-integrated", weight: 1.0, color: "#0A0E1A", image: ostromLogo },
  { name: "Fuse", cluster: "fully-integrated", weight: 0.9, color: "#FF7A1A", image: fuseLogo },
];

export interface Takeaway {
  id: string;
  number: string;
  title: string;
  blurb: string;
  exampleCompany: string;
  exampleHeadline: string;
  exampleBody: string;
  exampleStat?: { value: string; label: string };
  accent: string;
}

export const TAKEAWAYS: Takeaway[] = [
  {
    id: "partnerships",
    number: "01",
    title: "Partnerships are the moat",
    blurb: "Winners didn't build alone — they wired into installers, OEMs, and utilities.",
    exampleCompany: "1KOMMA5°",
    exampleHeadline: "Acquired 30+ regional installers in 24 months",
    exampleBody:
      "Built distribution by rolling up the long tail of installers across DACH — locking in supply, customer relationships, and after-sales in one move.",
    exampleStat: { value: "30+", label: "installers acquired" },
    accent: "#FF7A1A",
  },
  {
    id: "vertical",
    number: "02",
    title: "Vertical integration wins margin",
    blurb: "Owning hardware + software + retail compounds into structural cost advantage.",
    exampleCompany: "Octopus Energy",
    exampleHeadline: "Kraken platform turned a retailer into a tech company",
    exampleBody:
      "By licensing its own operating system to other utilities, Octopus turned an internal cost center into a global revenue engine — funding cheaper energy for end customers.",
    exampleStat: { value: "60M+", label: "accounts on Kraken" },
    accent: "#D946EF",
  },
  {
    id: "flexibility",
    number: "03",
    title: "Flexibility is the new product",
    blurb: "The frontier isn't selling kWh — it's monetising when and how they're used.",
    exampleCompany: "Tesla / Autobidder",
    exampleHeadline: "Battery fleets bidding into wholesale markets, automatically",
    exampleBody:
      "Tesla turned distributed Powerwalls and Megapacks into a virtual power plant — capturing trading revenue customers couldn't access alone.",
    exampleStat: { value: "10 GWh", label: "managed by Autobidder" },
    accent: "#5B8DEF",
  },
  {
    id: "experience",
    number: "04",
    title: "Customer experience is underweighted",
    blurb: "Most incumbents still treat energy like a utility bill — challengers treat it like a product.",
    exampleCompany: "Tibber",
    exampleHeadline: "An app-first energy company customers actually open",
    exampleBody:
      "Real-time pricing, push notifications, smart device control — Tibber proved energy could be a daily-use consumer app, not a quarterly invoice.",
    exampleStat: { value: "4.6★", label: "App Store rating" },
    accent: "#1FB8A6",
  },
];
