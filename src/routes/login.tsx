import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const ALLOWED_DOMAIN = "flexa.energy";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Flexa" },
      { name: "description", content: "Sign in with your Flexa Google account to view the presentation." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user.email ?? "";
      if (active && email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
        navigate({ to: "/" });
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const email = session?.user.email ?? "";
      if (email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
        navigate({ to: "/" });
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: { hd: ALLOWED_DOMAIN, prompt: "select_account" },
    });
    if (result.error) {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
      return;
    }
    if (result.redirected) return;
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email ?? "";
    if (!email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
      await supabase.auth.signOut();
      setError(`Access is restricted to @${ALLOWED_DOMAIN} accounts.`);
      setLoading(false);
      return;
    }
    navigate({ to: "/" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0a0e1a" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "rgba(251, 246, 233, 0.04)",
          border: "1px solid rgba(251, 246, 233, 0.12)",
          color: "#FBF6E9",
        }}
      >
        <h1 className="text-2xl font-semibold mb-2">Flexa presentation</h1>
        <p className="text-sm mb-8" style={{ color: "#94a0b8" }}>
          Sign in with your <strong>@{ALLOWED_DOMAIN}</strong> Google account to continue.
        </p>
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors disabled:opacity-50"
          style={{ backgroundColor: "#FBF6E9", color: "#0a0e1a" }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.1 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2c-.4.4 6.6-4.8 6.6-14.8 0-1.3-.1-2.3-.4-3.5z"/>
          </svg>
          {loading ? "Signing in…" : "Sign in with Google"}
        </button>
        {error && (
          <p className="mt-4 text-sm" style={{ color: "#E64545" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}