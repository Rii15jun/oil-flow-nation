import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, StatusBadge } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, PackageOpen, PackageX, PackageMinus } from "lucide-react";
import { drums } from "@/lib/mock-data";

export const Route = createFileRoute("/app/inventory")({
  component: InventoryPage,
});

function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Drum Inventory"
        subtitle="Every drum, every state — with QR tracking"
        actions={<Button><QrCode className="h-4 w-4 mr-2" /> Scan drum</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Filled" value="1,284" icon={PackageOpen} tone="success" />
        <StatCard label="Empty" value="842" icon={PackageMinus} />
        <StatCard label="In transit" value="146" icon={PackageOpen} tone="info" />
        <StatCard label="Damaged / lost" value="18" icon={PackageX} tone="warning" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Drum ID", "QR", "Status", "Current location", "Last updated"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drums.map((d) => (
                <tr key={d.id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{d.id}</td>
                  <td className="px-4 py-3">
                    <div className="h-8 w-8 rounded bg-muted grid place-items-center">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{d.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CardContent />
    </>
  );
}
