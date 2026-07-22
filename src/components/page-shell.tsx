import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label, value, delta, icon: Icon, tone = "default",
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  tone?: "default" | "success" | "warning" | "info";
}) {
  const toneClass = {
    default: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    info: "bg-info/15 text-info",
  }[tone];
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-2xl font-semibold mt-1">{value}</div>
            {delta && <div className="text-xs text-success mt-1">{delta}</div>}
          </div>
          {Icon && (
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${toneClass}`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-success/15 text-success border-success/30",
    Completed: "bg-success/15 text-success border-success/30",
    "KYC Approved": "bg-success/15 text-success border-success/30",
    Pending: "bg-warning/20 text-warning-foreground border-warning/40",
    "KYC Pending": "bg-warning/20 text-warning-foreground border-warning/40",
    Assigned: "bg-info/15 text-info border-info/30",
    "In Transit": "bg-info/15 text-info border-info/30",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
    Inactive: "bg-muted text-muted-foreground border-border",
    Lead: "bg-muted text-muted-foreground border-border",
    Filled: "bg-success/15 text-success border-success/30",
    Empty: "bg-muted text-muted-foreground border-border",
    Damaged: "bg-destructive/10 text-destructive border-destructive/30",
    "On Trip": "bg-info/15 text-info border-info/30",
    Available: "bg-success/15 text-success border-success/30",
    "Off Duty": "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      {status}
    </span>
  );
}
