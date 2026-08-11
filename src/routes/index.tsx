import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { ArrowRight, Coins, Loader2 } from "lucide-react";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "";
  if (!value.startsWith("/") || value.startsWith("//")) return "";
  return value;
}

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s.next) }),
  head: () => ({
    meta: [
      { title: "Sign in — UCOIN App" },
      { name: "description", content: "Sign in to the UCOIN App by Kissan Energy India — manage UCO collections, vendors, pickups, invoices and payments across India." },
      { property: "og:title", content: "Sign in — UCOIN App" },
      { property: "og:description", content: "Sign in to the UCOIN App by Kissan Energy India — manage UCO collections, vendors, pickups, invoices and payments across India." },
    ],
  }),
  component: Landing,
});


function Landing() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const go = () => {
      if (next) window.location.href = next;
      else navigate({ to: "/app/dashboard" });
    };
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) go();
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) go();
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, next]);

  const submit = async () => {
    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${next || "/app/dashboard"}`,
            data: { full_name: name || email },
          },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Auth failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: next ? `${window.location.origin}${next}` : window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setBusy(false);
    }
  };


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10">
          <Brand />
          <p className="mt-10 text-3xl font-semibold leading-tight max-w-md">
            India's operating system for Used Cooking Oil collection.
          </p>
          <p className="mt-4 text-sidebar-foreground/70 max-w-md">
            Onboard vendors, run KYC, dispatch drivers and track every drum — from the neighborhood
            dhaba to a national fleet.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-2 gap-4 max-w-md">
          <Stat kpi="1,24,830" label="Vendors onboarded" />
          <Stat kpi="8.4 M kg" label="UCO collected" />
          <Stat kpi="28" label="States live" />
          <Stat kpi="22,140 T" label="CO₂ saved" />
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Brand dark /></div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {mode === "signin"
              ? "Access the UCOIN operations platform."
              : "New vendors and staff can register here."}
          </p>

          <div className="mt-8 space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>

            <Button className="w-full h-11" onClick={submit} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11" onClick={google} disabled={busy}>
              Continue with Google
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              {mode === "signin" ? "New to UCOIN?" : "Already have an account?"}{" "}
              <button className="text-primary font-medium hover:underline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>

          <div className="mt-10 pt-6 border-t text-xs text-muted-foreground flex items-center justify-between">
            <span>© Kissan Energy India Pvt. Ltd.</span>
            <Link to="/" className="hover:text-foreground">Help</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
        <Coins className="h-6 w-6" />
      </div>
      <div>
        <div className={`text-lg font-semibold leading-tight ${dark ? "text-foreground" : ""}`}>
          UCOIN App
        </div>
        <div className={`text-xs ${dark ? "text-muted-foreground" : "text-sidebar-foreground/60"}`}>
          Powered by Kissan Energy India Pvt. Ltd.
        </div>
      </div>
    </div>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <Card className="bg-sidebar-accent/60 border-sidebar-border">
      <CardContent className="p-4">
        <div className="text-xl font-semibold text-sidebar-foreground">{kpi}</div>
        <div className="text-xs text-sidebar-foreground/60 mt-1">{label}</div>
      </CardContent>
    </Card>
  );
}
