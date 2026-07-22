import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, AlertCircle, FileText, Truck } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

const NOTIFS = [
  { icon: FileText, tone: "info", title: "Invoice INV-2026-4218 sent", body: "Sent to Spice Garden 5 via email & WhatsApp", time: "5 min ago" },
  { icon: CheckCircle2, tone: "success", title: "Payment received", body: "₹ 18,420 from Royal Tandoor 3 · UTR 4820AB", time: "1 hr ago" },
  { icon: AlertCircle, tone: "warning", title: "Overdue invoice", body: "INV-2026-4205 is 3 days overdue", time: "3 hr ago" },
  { icon: Truck, tone: "info", title: "Pickup completed", body: "PKP-2026-000138 · 82 kg collected", time: "Yesterday" },
  { icon: Bell, tone: "default", title: "KYC submitted", body: "Coastal Curry 12 submitted GST + FSSAI", time: "Yesterday" },
];

function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="System alerts, invoice updates and pickup events"
        actions={<Button variant="outline">Mark all read</Button>}
      />
      <Card>
        <CardHeader><CardTitle className="text-base">Recent</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {NOTIFS.map((n, i) => {
              const Icon = n.icon;
              const bg = n.tone === "success" ? "bg-success/15 text-success"
                : n.tone === "warning" ? "bg-warning/20 text-warning-foreground"
                : n.tone === "info" ? "bg-info/15 text-info"
                : "bg-muted text-muted-foreground";
              return (
                <li key={i} className="flex items-start gap-4 p-4 hover:bg-muted/30">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-medium truncate">{n.title}</div>
                      {i < 2 && <Badge variant="secondary" className="text-[10px]">New</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">{n.body}</div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
