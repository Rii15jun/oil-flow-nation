import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ROLES, type Role } from "@/lib/mock-data";
import { setSession } from "@/lib/session";
import { Droplets, Truck, Shield, MapPin, ArrowRight, Coins } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UCOIN App — Powered by Riya" },
      {
        name: "description",
        content:
          "UCOIN App — enterprise platform to onboard restaurants, run KYC, dispatch pickups and track UCO collections across India.",
      },
      { property: "og:title", content: "UCOIN App — Powered by Riya" },
      { property: "og:description", content: "UCOIN App — enterprise platform to onboard restaurants, run KYC, dispatch pickups and track UCO collections across India." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [step, setStep] = useState<"phone" | "otp" | "role">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<Role>("super_admin");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (phone.replace(/\D/g, "").length < 10) return;
    setStep("otp");
  };
  const verifyOtp = () => {
    if (otp.length !== 6) return;
    setStep("role");
  };
  const enter = () => {
    setSession({
      phone,
      role,
      name: ROLES.find((r) => r.value === role)?.label ?? "User",
    });
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
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

      {/* Right auth panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Brand dark /></div>

          {step === "phone" && (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                We'll send a 6-digit OTP to your registered mobile.
              </p>
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 rounded-md border bg-muted text-sm">+91</div>
                    <Input
                      id="phone"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={12}
                    />
                  </div>
                </div>
                <Button className="w-full h-11" onClick={sendOtp}>
                  Send OTP <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Demo mode — any 10-digit number and any 6-digit OTP will work.
                </p>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">Enter OTP</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Sent to +91 {phone}.{" "}
                <button className="text-primary underline" onClick={() => setStep("phone")}>
                  Change
                </button>
              </p>
              <div className="mt-8 space-y-6">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button className="w-full h-11" onClick={verifyOtp}>
                  Verify & continue
                </Button>
              </div>
            </>
          )}

          {step === "role" && (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">Choose your role</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Preview the platform from any role.
              </p>
              <div className="mt-6 space-y-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setRole(r.value)}
                    className={`w-full text-left rounded-lg border p-4 transition-colors ${
                      role === r.value
                        ? "border-primary bg-primary-soft"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="font-medium">{r.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.description}</div>
                  </button>
                ))}
                <Button className="w-full h-11 mt-4" onClick={enter}>
                  Enter platform <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

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

// unused imports guard
void Droplets; void Truck; void Shield; void MapPin;
