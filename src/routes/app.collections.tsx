import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Download, Droplets, PackageOpen, FileText, MapPin } from "lucide-react";
import { pickups } from "@/lib/mock-data";

export const Route = createFileRoute("/app/collections")({
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <>
      <PageHeader
        title="Collections"
        subtitle="Record actual quantities, quality, and generate receipts"
        actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Today" value="4,218 kg" icon={Droplets} tone="success" />
        <StatCard label="Drums filled" value="86" icon={PackageOpen} />
        <StatCard label="Avg FFA %" value="3.2%" icon={Droplets} tone="info" />
        <StatCard label="Receipts issued" value="42" icon={FileText} tone="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Record new collection</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Vendor" placeholder="Spice Garden 1" />
            <Field label="Pickup ID" placeholder="PKP-2026-000125" />
            <Field label="Actual quantity (kg)" type="number" placeholder="82" />
            <Field label="Filled drums" type="number" placeholder="3" />
            <Field label="Empty drums returned" type="number" placeholder="3" />
            <Field label="FFA %" type="number" placeholder="3.2" />
            <Field label="Moisture %" type="number" placeholder="0.8" />
            <Field label="Impurity %" type="number" placeholder="1.1" />
            <Field label="Vehicle" placeholder="MH12-AB-1002" />
            <Field label="Driver" placeholder="Suresh" />
            <div className="md:col-span-2">
              <Label>Remarks</Label>
              <Textarea placeholder="Notes about the collection…" className="mt-2" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-2">
              <Button variant="outline"><Camera className="h-4 w-4 mr-2" /> Capture photo</Button>
              <Button variant="outline"><MapPin className="h-4 w-4 mr-2" /> Tag GPS</Button>
              <Button className="ml-auto">Save & generate receipt</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent receipts</CardTitle></CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {pickups.slice(0, 6).map((p) => (
                <li key={p.id} className="p-4 flex items-center gap-3 hover:bg-muted/40">
                  <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary grid place-items-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{p.vendor}</div>
                    <div className="text-xs text-muted-foreground font-mono">{p.id} · {p.qty} kg</div>
                  </div>
                  <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <Input className="mt-2" {...props} />
    </div>
  );
}
