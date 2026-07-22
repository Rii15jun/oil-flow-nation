import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  component: ReportsPage,
});

const REPORTS = [
  "Daily Collection", "Monthly Collection", "Executive Performance",
  "Driver Performance", "Vendor Performance", "State-wise Collection",
  "District-wise Collection", "Inventory", "Payments",
  "Pending Pickups", "Rejected KYC",
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Generate & download standard reports" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((r) => (
          <Card key={r}>
            <CardHeader>
              <CardTitle className="text-base">{r}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Auto-generated from live data. Filter by state, date and executive.
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm"><FileSpreadsheet className="h-4 w-4 mr-1" /> Excel</Button>
                <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> PDF</Button>
                <Button size="sm" className="ml-auto"><Download className="h-4 w-4 mr-1" /> Run</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
