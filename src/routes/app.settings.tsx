import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Organization, branding and notification preferences" />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Organization</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Legal name</Label>
              <Input defaultValue="Kissan Energy India Pvt. Ltd." />
            </div>
            <div className="space-y-2">
              <Label>Product name</Label>
              <Input defaultValue="UCOIN App" />
            </div>
            <div className="space-y-2">
              <Label>Support email</Label>
              <Input defaultValue="support@ucoin.app" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Notification preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Email notifications", "Invoice, payment and pickup updates via email"],
              ["WhatsApp notifications", "Send invoices and receipts on WhatsApp"],
              ["SMS OTP", "Login OTPs via SMS"],
              ["Weekly summary", "Digest of collections and finance"],
            ].map(([t, d], i) => (
              <div key={t} className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-sm">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
                <Switch defaultChecked={i !== 3} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Branding</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Primary (Green)</span>
              <span className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded" style={{ background: "#009B4D" }} /> #009B4D</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Alerts (Yellow)</span>
              <span className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded" style={{ background: "#FFC107" }} /> #FFC107</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Info (Blue)</span>
              <span className="inline-flex items-center gap-2"><span className="h-5 w-5 rounded" style={{ background: "#0D6EFD" }} /> #0D6EFD</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">About</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1 text-muted-foreground">
            <div className="text-foreground font-medium">UCOIN App v1.1</div>
            <div>Powered by Kissan Energy India Pvt. Ltd.</div>
            <div>© {new Date().getFullYear()} — All rights reserved.</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
