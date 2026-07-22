import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Zap } from "lucide-react";
import { pickups } from "@/lib/mock-data";

export const Route = createFileRoute("/app/routes")({
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <>
      <PageHeader
        title="Route Planner"
        subtitle="Optimize pickups by distance, capacity, priority & traffic"
        actions={<Button><Zap className="h-4 w-4 mr-2" /> Optimize</Button>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Route map</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[520px] rounded-md border bg-muted grid place-items-center text-muted-foreground text-sm">
              Google Maps preview — optimized route across {pickups.length} stops
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Stops</CardTitle></CardHeader>
          <CardContent className="p-0">
            <ol className="divide-y">
              {pickups.slice(0, 8).map((p, i) => (
                <li key={p.id} className="p-4 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{p.vendor}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {p.city} · {p.qty} kg
                    </div>
                  </div>
                  <Button size="icon" variant="ghost"><Navigation className="h-4 w-4" /></Button>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
