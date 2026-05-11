## Wire up first batch of 10 logos

You uploaded: axle, Sunrun, Tesla, E.ON, ostrom, Fuse, uplight, tilt, BASE, Lunar Energy. I'll wire these in now and leave the remaining companies as styled text chips until you upload the rest.

### Steps

1. Copy uploads into `src/assets/logos/` with normalized names:
   - `axle.png`, `sunrun.png`, `tesla.png`, `eon.png`, `ostrom.png`, `fuse.png`, `uplight.png`, `tilt.png`, `base.png`, `lunar-energy.png`

2. In `src/lib/deck-data.ts`:
   - Import the 10 PNGs at the top.
   - Set `image:` on the matching `LOGOS` entries (axle, Sunrun, Tesla, E.ON, ostrom, Fuse, uplight, tilt, BASE, Lunar Energy).
   - No other fields change — clusters, weights, and fallback colors stay as-is.

3. No component or animation changes — `LogoChip` already renders `<img>` inside a white `--deck-surface` pill when `image` is set, and the existing `layoutId` keeps scatter→cluster flight animations intact for both image and text logos.

### Notes on appearance

- Logos sit on a white rounded pill against the dark navy stage, so dark/red/blue marks (Tesla, ostrom, BASE, Sunrun, Lunar) all read cleanly.
- Logo height = ~1.6× the base font size × `weight`, so the existing size hierarchy in the cloud is preserved.
- Companies still without an image (gridX, Beebop, Origin, OVO, EWE, EnBW, ekWateur, OHM, Enpal, 1KOMMA5°, sonnen, Octopus, good energy, nrg, enspired, Habitat, Sympower, Kraken, Nomos, amber, tado°, rabot.energy, tibber, Spot My Energy) keep the colored text chip — the slide stays visually complete while you upload the rest.

### Out of scope

No backend, no changes to slides/clusters/takeaways/closing, no animation timing changes.

Send the next batch whenever ready and I'll wire them in the same way.