import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, StatusBadge } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Download, Filter, Search } from "lucide-react";
import { vendors, STATES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/vendors")({
  component: VendorsPage,
});

function VendorsPage() {
  const [q, setQ] = useState("");
  const [state, setState] = useState<string>("all");
  const rows = vendors.filter(
    (v) =>
      (state === "all" || v.state === state) &&
      (q === "" || v.name.toLowerCase().includes(q.toLowerCase()) || v.phone.includes(q) || v.id.includes(q))
  );

  return (
    <>
      <PageHeader
        title="Vendors"
        subtitle={`${vendors.length.toLocaleString()} restaurants & hotels in the network`}
        actions={
          <>
            <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
            <Button><Plus className="h-4 w-4 mr-2" /> Add vendor</Button>
          </>
        }
      />
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center border-b">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by name, phone, vendor ID" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="w-full md:w-56"><SelectValue placeholder="All states" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All states</SelectItem>
              {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
        </CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Vendor ID", "Name", "Owner", "Phone", "City", "State", "Monthly UCO", "Category", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((v) => (
                <tr key={v.id} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3 font-mono text-xs">{v.id}</td>
                  <td className="px-4 py-3 font-medium">{v.name}</td>
                  <td className="px-4 py-3">{v.owner}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.phone}</td>
                  <td className="px-4 py-3">{v.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.state}</td>
                  <td className="px-4 py-3">{v.monthlyUCO} kg</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.category}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">No vendors match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
