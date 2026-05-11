## Swap text chips for real logo images (hybrid)

Goal: let you upload ~15 real logos (transparent PNG/SVG) and have them render in the deck instead of the styled text chip, while the remaining companies keep the current text chip as a graceful fallback. All animations (scatter cloud, drift, fly-into-clusters, hover) stay exactly as they are.

### How you'll add logos

1. Drag-and-drop the files into chat. Multiple messages are fine.
2. Name each file after the company so I can map it without guessing. Names should match the entries in `src/lib/deck-data.ts` (case-insensitive, spaces/dots OK):
   - `octopus.svg`, `tibber.png`, `tesla.svg`, `e-on.png`, `enbw.svg`, `sonnen.png`, `enpal.svg`, `1komma5.svg`, `tado.png`, `kraken.svg`, `1komma5.png`, etc.
3. Transparent background, ideally SVG. PNG at ~512px tall is also fine.

If a filename doesn't match a company, I'll ask before wiring it in.

### What changes in the code

- New folder `src/assets/logos/` holding the uploaded files.
- `src/lib/deck-data.ts`: add an optional `image?: string` field to the `Logo` type, and fill it in for each company you upload. Companies without an image keep using the text chip — no visual gap.
- `src/components/deck/LogoChip.tsx`: if `logo.image` is set, render an `<img>` inside the same pill (white rounded background so transparent dark logos stay visible on the dark stage). Otherwise render the existing colored text exactly as today. Size still scales by `logo.weight` so the cloud hierarchy is preserved.
- `layoutId` stays `logo-${name}`, so the scatter→cluster flight animation works identically for image and text logos.
- No changes to slides, navigation, or animation timing.

### What I'll do per upload batch

For each batch you send: copy files into `src/assets/logos/`, import them in `deck-data.ts`, attach to the right `Logo` entry, and confirm in chat which ones got wired. You can keep adding more later — same flow.

### Out of scope

- No backend / storage bucket. Logos are static assets bundled with the app.
- No changes to cluster assignments, takeaways, or the closing slide.

Ready when you are — paste the first batch of logos in your next message.