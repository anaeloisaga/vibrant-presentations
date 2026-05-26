import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const ALLOWED_DOMAIN = "flexa.energy";

type GateState = "checking" | "ok" | "denied";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const [state, setState] = useState<GateState>("checking");

  useEffect(() => {
    let active = true;

    const evaluate = (email: string | undefined) => {
      if (!active) return;
      if (!email) {
        navigate({ to: "/login" });
        return;
      }
      if (email.toLowerCase().endsWith(`@${ALLOWED_DOMAIN}`)) {
        setState("ok");
      } else {
        setState("denied");
        supabase.auth.signOut();
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      evaluate(data.session?.user.email ?? undefined);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      evaluate(session?.user.email ?? undefined);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (state === "checking") {
    return <div className="min-h-screen" style={{ backgroundColor: "#0a0e1a" }} />;
  }

  if (state === "denied") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#0a0e1a", color: "#FBF6E9" }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center"
          style={{
            backgroundColor: "rgba(251, 246, 233, 0.04)",
            border: "1px solid rgba(251, 246, 233, 0.12)",
          }}
        >
          <h1 className="text-xl font-semibold mb-2">Access restricted</h1>
          <p className="text-sm mb-6" style={{ color: "#94a0b8" }}>
            This presentation is only available to <strong>@{ALLOWED_DOMAIN}</strong> team members.
          </p>
          <button
            onClick={() => navigate({ to: "/login" })}
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium"
            style={{ backgroundColor: "#FBF6E9", color: "#0a0e1a" }}
          >
            Try a different account
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}