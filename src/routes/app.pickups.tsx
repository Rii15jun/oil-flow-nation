import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, AlertCircle } from "lucide-react";
import { pickups } from "@/lib/mock-data";

export const Route = createFileRoute("/app/pickups")({
  component: PickupsPage,
});

function PickupsPage() {
  return (
    <>
      <PageHeader
        title="Pickup Requests"
        subtitle="Assign, monitor and reconcile pickups"
        actions={
          <>
            <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
            <Button><Plus className="h-4 w-4 mr-2" /> New request</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {[
          { l: "Pending", v: 42, tone: "warning" },
          { l: "Assigned", v: 68, tone: "info" },
          { l: "In Transit", v: 24, tone: "info" },
          { l: "Completed", v: 218, tone: "success" },
          { l: "Cancelled", v: 6, tone: "destructive" },
        ].map((s) => (
          <Card key={s.l}>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground">{s.l}</div>
              <div className="text-2xl font-semibold mt-1">{s.v}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All pickups</CardTitle>
          <Badge variant="outline" className="gap-1"><AlertCircle className="h-3 w-3" /> 3 emergency</Badge>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Pickup ID", "Vendor", "City", "Date", "Drums", "Qty (kg)", "Driver", "Vehicle", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pickups.map((p) => (
                <tr key={p.id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">
                    {p.id}
                    {p.emergency && <Badge variant="destructive" className="ml-2 text-[10px]">SOS</Badge>}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.vendor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.city}</td>
                  <td className="px-4 py-3">{p.date}</td>
                  <td className="px-4 py-3">{p.drums}</td>
                  <td className="px-4 py-3">{p.qty}</td>
                  <td className="px-4 py-3">{p.driver}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.vehicle}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
