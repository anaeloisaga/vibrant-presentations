## Slide 5 — Axle

In `src/routes/index.tsx` (INSIGHTS[1]):
- `heroStat` → value `"85+ MW"`, label `"managed across UK and European flexibility markets"` (drop the "1st VTP" framing).
- Point 1 ("Multi-market revenue stacking") body → mention UK **and France** explicitly (stacking across UK + French flexibility/wholesale markets, same asset).
- Point 2 ("Cloud-to-cloud connectivity") title → append "(C2C will be hard in new markets)" in brackets.
- Point 3 → rename from "First-mover advantage & speed-to-market" to something like **"Light, adaptable solution"** — reframe body around: software-only, no hardware in the home, fast to drop into a new market / new OEM / new partner stack. Remove the "first to qualify as VTP" language.

## Slide 6 — Replace Amber with Octopus Energy

Color: switch accent from Amber green to **Octopus purple `#7C3AED`** (also update `ACCENT.three` so Slide 3 pillar 3 changes too).

Insight 3 (`INSIGHTS[2]`) rebuilt around Octopus:
- company `"Octopus Energy"`, logo `octopus.png`.
- tagline: "UK-based energy group scaling globally via acquisitions, licensing Kraken, and utility partnerships."
- heroStat: `"100M+"` accounts on Kraken (or `"18"` countries served — pick the cleaner one; I'll go with `100M+` / "customer accounts contracted on the Kraken platform globally").
- 3 partnership insights:
  1. **Majority stake in Uplight (Mar 2026)** — instant access to US utility market (85+ utility relationships, 8 of top 10 NA utilities, 8.5 GW flexible load) by buying the customer relationship layer instead of building it.
  2. **Kraken licensing as a B2B wedge** — licensed to E.ON, Origin, EDF, Tokyo Gas etc.; Kraken is now spinning out at ~$8.65B valuation, showing platform leverage beyond Octopus's own retail base.
  3. **Vertical integration play** — pairing Kraken (OS) + Uplight (customer engagement/DERMS) + Schneider (grid hardware) builds an end-to-end demand-side stack; signals where the market is heading (watch closely as a threat + opportunity).
- `extraCallout`: keep "More partnership examples", recolor to purple, items → `["E.ON + gridX", "Lunar + Moixa", "E.ON + Amber"]` (remove "Octopus + Uplight" since Octopus IS the slide now).
- Background: reuse existing `amberBg` import as-is for now (no new asset) — or drop the `media` field if it feels off-brand. Plan: keep `media: { src: amberBg, mode: "bg" }` but at low opacity it reads as a neutral backdrop; flag to user if they want a dedicated Octopus image.

## Slide 3 — Pillar 3 recolor

`ACCENT.three` in both `SummarySlide.tsx` and `src/routes/index.tsx` → `#7C3AED` (Octopus purple). Pillar 3 copy stays the same (partnerships).

## Slide 7 — FlexaClosing (internal framing)

In `src/components/deck/slides/FlexaClosing.tsx`:
- **Delete** the entire "Open challenges" dashed box + `CHALLENGES` const.
- Rewrite `POINTS` as internal-facing action items:
  1. (action) **"Double down on optimization — it's where every serious player is heading."** (was a statement, now a call to act internally)
  2. **"Build toward multi-market revenue stacking — today we capture local value, the upside sits in stacking wholesale + flexibility markets on the same asset."**
  3. **"Use partnerships to integrate deeper into the value chain and open new segments — OEM cloud-to-cloud, utility alliances, B2B distribution."**

## Files touched

- `src/routes/index.tsx` — Axle insight edits, full Octopus rewrite of INSIGHTS[2], ACCENT.three → purple.
- `src/components/deck/slides/SummarySlide.tsx` — ACCENT.three → purple.
- `src/components/deck/slides/FlexaClosing.tsx` — remove challenges box, rewrite POINTS.

No new assets, no new components.
