## Energy Competitor Analysis — Animated Deck

A web-based animated slide deck for your team knowledge session. Designed to read from the back row of a 30+ person room, with kinetic motion that supports the story instead of decorating it.

### Narrative flow

1. **Intro / Logo cloud** — "We looked at the energy landscape." A swarm of ~30 competitor logos drifts and floats at varying sizes across the screen (bigger = more relevant). Subtle parallax, slow drift, gentle scale pulses. Title overlays: *"How we made sense of the energy space."*

2. **Clustering moment** — On click, the floating logos **animate into 4 clusters** (smooth flight to grouped positions, with cluster labels fading in around them):
   - Aggregators
   - Integrated optimizers
   - Asset traders
   - Fully integrated energy companies
   Lines/edges draw between cluster boxes (like your reference screenshots).

3. **Key Takeaways hub** — A 2×2 grid of 4 takeaway cards. Each is clickable.
   - Takeaway 1 (e.g. *Partnerships matter*)
   - Takeaway 2
   - Takeaway 3
   - Takeaway 4
   Cards animate in staggered. Click a card → drills into its example slide.

4. **Takeaway detail slides (×4)** — Each takeaway opens a dedicated slide:
   - Big takeaway headline (kinetic typography)
   - The exemplar company name + logo
   - A visual: screenshot / press announcement / diagram of how they did it
   - "Back to takeaways" + "Next takeaway" navigation
   After all 4 are seen (or skipped), you proceed to the final slide.

5. **What this means for Flexa** — Closing slide. Bold headline, 3 short bullets that animate in one by one tying the takeaways back to Flexa's path.

### Navigation model

- **Arrow keys / Space / click** advance through the main flow: Intro → Clusters → Takeaways → T1 → Takeaways → T2 → Takeaways → T3 → Takeaways → T4 → Flexa
- **Click any takeaway card** to jump to it directly (non-linear, in case you want to pick order live)
- **F** = fullscreen, **Esc** = exit fullscreen
- **Progress bar** along the top showing position in the deck
- URL hash sync (`/#3`) so you can deep-link / refresh without losing place

### Animation language

- **Logo cloud**: Framer Motion `layout` animation handles the scatter→cluster transition automatically (logos physically fly to new positions). Idle drift via subtle `animate` loops.
- **Kinetic typography**: per-character stagger reveals on big headlines (Space Grotesk, 120–200pt)
- **Cards**: spring entrance, scale-on-hover, click triggers a "lift + zoom" into the detail view
- **Cluster boxes & connecting lines**: SVG paths drawn with `strokeDashoffset` animation
- **Detail slide images**: blur-to-sharp reveal + soft parallax

### Visual style

- Dark, high-contrast theme (deep navy `#0A0E1A` background, warm cream cards `#FBF6E9`, single bold accent — orange `#FF7A1A`) — matches the palette in your reference screenshots and reads well on a projector
- Display font: **Space Grotesk** (huge, geometric); body: **Inter**
- Generous whitespace, never more than ~7 words per headline

### Content you'll provide later (placeholders for now)

- The 4 takeaway titles + 1-line descriptions
- For each takeaway: which company is the example + the screenshot/image to embed
- The 3 closing bullets for the Flexa slide

I'll wire in the logos from your two uploaded screenshots as the initial logo set (extracted as individual brand marks) and use placeholder text for the takeaways so you can swap them in chat.

### Technical structure

- `src/routes/index.tsx` — deck shell: keyboard nav, progress bar, fullscreen, hash sync
- `src/components/deck/SlideStage.tsx` — 1920×1080 stage that scales to viewport
- `src/components/deck/slides/`
  - `IntroLogoCloud.tsx` — floating logos with idle animation
  - `ClustersSlide.tsx` — same logos, `layout` animation flies them into 4 cluster boxes
  - `TakeawaysHub.tsx` — 2×2 clickable card grid
  - `TakeawayDetail.tsx` — reused for all 4 detail slides, props-driven
  - `FlexaClosing.tsx`
- `src/lib/deck-data.ts` — logo list, cluster assignments, takeaway content (single source of truth)
- `src/components/deck/kinetic/KineticHeadline.tsx`
- Logos saved to `src/assets/logos/` (extracted from your screenshots; vector-traced where possible, otherwise PNG with transparent bg)
- Add `framer-motion` dependency
- Pure frontend — no backend / Lovable Cloud needed

### After you approve

I'll build the full deck with placeholder takeaway content. Then send me the 4 takeaway titles + the example company/image for each, and I'll plug them in.
