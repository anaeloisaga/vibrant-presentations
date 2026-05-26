Lovable Cloud + Google provider are already enabled. Remaining work:

## Files to create

1. **`src/routes/login.tsx`** — Centered login card on the deck's dark background with a single "Sign in with Google" button. Calls `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin, extraParams: { hd: "flexa.energy", prompt: "select_account" } })`. After sign-in, verifies `user.email` ends with `@flexa.energy`; if not, signs out and shows "Access is restricted to @flexa.energy accounts." If already signed in with a valid email, redirects to `/`.

2. **`src/routes/_authenticated.tsx`** — Pathless layout wrapping the deck. Subscribes to `supabase.auth.onAuthStateChange` and reads `getSession()`:
   - No session → `navigate({ to: "/login" })`.
   - Session with non-Flexa email → `supabase.auth.signOut()` + show "Access restricted" screen.
   - Valid Flexa email → render `<Outlet />`.
   - Briefly renders a black loading state during the initial check (no flash).

3. **`src/routes/_authenticated.index.tsx`** — Move the entire current `Deck` component here so the home URL `/` is gated. Also add a small "Sign out" button in the bottom-right corner of the deck (subtle, matches the existing bottom control pill style) that calls `supabase.auth.signOut()`.

## Files to modify

4. **`src/routes/index.tsx`** — Delete (its content moves to `_authenticated.index.tsx`).

5. **`src/routes/__root.tsx`** — Add a top-level `useEffect` in `RootComponent` that subscribes to `supabase.auth.onAuthStateChange` and calls `router.invalidate()` + `queryClient.invalidateQueries()` so route gates re-evaluate on sign-in/out.

## Notes

- Domain check is client-side only — the deck has no DB data, just bundled slide content, so this is sufficient.
- `hd: "flexa.energy"` tells Google to only show Flexa Workspace accounts in the chooser; the post-sign-in email check is the actual enforcement.
- No new dependencies, no migrations, no RLS — Lovable Cloud + `@lovable.dev/cloud-auth-js` are already installed.
- After build completes you'll need to click **Publish** so colleagues can reach the live URL.
