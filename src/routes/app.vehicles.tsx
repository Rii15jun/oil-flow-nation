import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Plus, Wrench } from "lucide-react";
import { drivers } from "@/lib/mock-data";

export const Route = createFileRoute("/app/vehicles")({
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <>
      <PageHeader
        title="Vehicles & Drivers"
        subtitle="Fleet health, driver assignments and maintenance"
        actions={<Button><Plus className="h-4 w-4 mr-2" /> Add vehicle</Button>}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((d) => (
          <Card key={d.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base">{d.name}</CardTitle>
                <div className="text-xs text-muted-foreground font-mono mt-1">{d.vehicle}</div>
              </div>
              <StatusBadge status={d.status} />
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Phone" value={d.phone} />
              <Row label="Base city" value={d.city} />
              <Row label="Capacity" value={`${d.capacity} kg`} />
              <Row label="Active trips" value={d.activeTrips.toString()} />
              <div className="flex gap-2 pt-3">
                <Button size="sm" variant="outline" className="flex-1"><Truck className="h-4 w-4 mr-1" /> Assign</Button>
                <Button size="sm" variant="ghost"><Wrench className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
