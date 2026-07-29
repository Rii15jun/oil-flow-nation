import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, StatCard, StatusBadge } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Download, FileText, Mail, MessageCircle, Plus, Search, Send, Upload,
  FileSpreadsheet, Receipt, Wallet, AlertCircle,
} from "lucide-react";
import { invoices as INV, type InvoiceStatus } from "@/lib/mock-data";
import { useAuthSession } from "@/lib/session";

export const Route = createFileRoute("/app/invoices")({
  component: InvoicesPage,
});

const STATUSES: (InvoiceStatus | "All")[] = ["All", "Draft", "Sent", "Paid", "Overdue", "Cancelled"];

function InvoicesPage() {
  const { user } = useAuthSession();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<InvoiceStatus | "All">("All");

  const isVendor = user?.role === "vendor";
  const isAccounts = session?.role === "accounts";

  const rows = useMemo(() => {
    return INV.filter((i) => {
      if (status !== "All" && i.status !== status) return false;
      if (q && !`${i.id} ${i.vendor} ${i.gst}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, status]);

  const totals = useMemo(() => {
    const paid = INV.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
    const pending = INV.filter((i) => i.status === "Sent" || i.status === "Draft").reduce((s, i) => s + i.amount, 0);
    const overdue = INV.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
    return { paid, pending, overdue };
  }, []);

  return (
    <>
      <PageHeader
        title={isVendor ? "My Invoices" : "Invoices"}
        subtitle={
          isVendor
            ? "View and download invoices, track payments"
            : "Generate, send and track vendor invoices"
        }
        actions={
          <div className="flex flex-wrap gap-2">
            {!isVendor && (
              <>
                <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Upload</Button>
                <Button variant="outline" size="sm"><FileSpreadsheet className="h-4 w-4 mr-1" /> Excel</Button>
                <Button size="sm"><Plus className="h-4 w-4 mr-1" /> New invoice</Button>
              </>
            )}
            {isVendor && (
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Account statement</Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total invoices" value={INV.length.toString()} icon={FileText} />
        <StatCard label="Paid" value={`₹ ${(totals.paid / 100000).toFixed(1)}L`} icon={Receipt} tone="success" />
        <StatCard label="Outstanding" value={`₹ ${(totals.pending / 100000).toFixed(1)}L`} icon={Wallet} tone="warning" />
        <StatCard label="Overdue" value={`₹ ${(totals.overdue / 100000).toFixed(1)}L`} icon={AlertCircle} tone="warning" />
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3">
          <CardTitle className="text-base">All invoices</CardTitle>
          <div className="sm:ml-auto flex flex-wrap gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={isAccounts ? "Search by vendor, GST, invoice…" : "Search invoices…"}
                className="pl-9 h-9 w-64"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v as InvoiceStatus | "All")}>
              <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Invoice", "Vendor", "GST", "Date", "Due", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((inv) => (
                <tr key={inv.id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                  <td className="px-4 py-3 font-medium">{inv.vendor}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{inv.gst}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.dueDate}</td>
                  <td className="px-4 py-3 font-medium">₹ {inv.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" title="Download PDF"><Download className="h-4 w-4" /></Button>
                      {!isVendor && (
                        <>
                          <Button variant="ghost" size="icon" title="Email"><Mail className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" title="WhatsApp"><MessageCircle className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" title="Send"><Send className="h-4 w-4" /></Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-muted-foreground">No invoices match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {isAccounts && (
        <Card className="mt-6">
          <CardHeader><CardTitle className="text-base">Finance remarks</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Add remarks against invoices for internal audit and reconciliation.</p>
            <div className="flex gap-2">
              <Badge variant="outline">Payment reminder sent — Jul 18</Badge>
              <Badge variant="outline">TDS deducted — Jun batch</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
