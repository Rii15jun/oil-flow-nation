import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard, StatusBadge } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Clock, CheckCircle2, Download } from "lucide-react";
import { vendors } from "@/lib/mock-data";

export const Route = createFileRoute("/app/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  const rows = vendors.slice(0, 10).map((v, i) => ({
    ...v,
    amount: 2400 + (i * 815) % 9000,
    rate: 42 + (i % 5),
    status: (["Paid", "Pending", "Paid", "Processing"] as const)[i % 4],
    method: (["UPI", "Bank Transfer", "UPI", "Bank Transfer"] as const)[i % 4],
    date: `2026-07-${((i % 22) + 1).toString().padStart(2, "0")}`,
  }));

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Vendor rates, payouts and invoices"
        actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Statement</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Paid (MTD)" value="₹ 42.8L" icon={CheckCircle2} tone="success" />
        <StatCard label="Pending" value="₹ 6.4L" icon={Clock} tone="warning" />
        <StatCard label="Avg rate" value="₹ 44 / kg" icon={TrendingUp} tone="info" />
        <StatCard label="Total payouts" value="1,284" icon={Wallet} />
      </div>
      <Card>
        <CardHeader><CardTitle>Recent payouts</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Vendor", "Rate", "Amount", "Method", "Date", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">₹ {r.rate}/kg</td>
                  <td className="px-4 py-3 font-semibold">₹ {r.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.method}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status === "Paid" ? "Completed" : r.status === "Pending" ? "Pending" : "In Transit"} /></td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}
