import { createFileRoute } from "@tanstack/react-router";
import { useAuthSession } from "@/lib/session";
import { PageHeader, StatCard, StatusBadge } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Droplets, Truck, Wallet, Leaf, ClipboardCheck, MapPin,
  TrendingUp, Camera, Navigation, CheckCircle2, ShieldCheck, QrCode,
  FileText, AlertCircle, CircleDollarSign, Receipt,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { monthlyCollection, stateCollection, dailyCollection, pickups, vendors, invoices, paymentTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuthSession();
  if (!user) return null;

  switch (user.role) {
    case "super_admin": return <AdminDash />;
    case "manager": return <ManagerDash />;
    case "accounts": return <AccountsDash />;
    case "executive": return <ExecDash />;
    case "driver": return <DriverDash />;
    case "vendor": return <VendorDash />;
  }
}


function AdminDash() {
  return (
    <>
      <PageHeader
        title="Nationwide Overview"
        subtitle="Live snapshot of collections, vendors and operations across India"
        actions={<Button>Export Report</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Collection" value="4,218 kg" delta="+12% vs yesterday" icon={Droplets} />
        <StatCard label="Active Vendors" value="1,24,830" delta="+184 this week" icon={Building2} tone="success" />
        <StatCard label="Pending Pickups" value="342" icon={ClipboardCheck} tone="warning" />
        <StatCard label="Revenue (MTD)" value="₹ 68.4L" delta="+9.2%" icon={Wallet} tone="info" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Collection (kg)</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyCollection}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area dataKey="kg" stroke="var(--color-primary)" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Impact</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Impact icon={Leaf} label="CO₂ saved" value="22,140 T" />
            <Impact icon={Droplets} label="Biodiesel produced" value="7.6 M L" />
            <Impact icon={TrendingUp} label="Avg growth (QoQ)" value="+18.4%" />
            <Impact icon={ShieldCheck} label="KYC compliance" value="94.2%" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader><CardTitle>Top States (kg this month)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <BarChart data={stateCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="state" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="kg" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pickup Status Split</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: "Completed", v: 68 },
                    { name: "In Transit", v: 12 },
                    { name: "Assigned", v: 14 },
                    { name: "Pending", v: 6 },
                  ]}
                  dataKey="v"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                >
                  {["var(--color-chart-1)", "var(--color-chart-3)", "var(--color-chart-2)", "var(--color-chart-4)"].map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Pickups</CardTitle>
          <Button variant="ghost" size="sm">View all</Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Pickup ID", "Vendor", "City", "Drums", "Qty (kg)", "Driver", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pickups.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                  <td className="px-4 py-3 font-medium">{p.vendor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.city}</td>
                  <td className="px-4 py-3">{p.drums}</td>
                  <td className="px-4 py-3">{p.qty}</td>
                  <td className="px-4 py-3">{p.driver}</td>
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

function Impact({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function ManagerDash() {
  return (
    <>
      <PageHeader title="Regional Dashboard" subtitle="Your assigned regions — Maharashtra & Gujarat" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Region collection (MTD)" value="1,84,220 kg" icon={Droplets} />
        <StatCard label="Vendors" value="18,412" icon={Building2} tone="success" />
        <StatCard label="Field teams" value="42" icon={Truck} tone="info" />
        <StatCard label="Pending KYC" value="27" icon={ShieldCheck} tone="warning" />
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Daily collection — last 14 days</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <BarChart data={dailyCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="kg" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}

function AccountsDash() {
  const paid = invoices.filter((i) => i.status === "Paid");
  const pending = invoices.filter((i) => i.status === "Sent" || i.status === "Draft");
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const totalPaid = paid.reduce((s, i) => s + i.amount, 0);
  const totalPending = pending.reduce((s, i) => s + i.amount, 0);
  const totalOverdue = overdue.reduce((s, i) => s + i.amount, 0);
  const dist = [
    { name: "Paid", v: paid.length },
    { name: "Sent", v: invoices.filter((i) => i.status === "Sent").length },
    { name: "Draft", v: invoices.filter((i) => i.status === "Draft").length },
    { name: "Overdue", v: overdue.length },
    { name: "Cancelled", v: invoices.filter((i) => i.status === "Cancelled").length },
  ];
  const colors = ["var(--color-primary)", "var(--color-info)", "var(--color-muted-foreground)", "var(--color-warning)", "var(--color-destructive)"];

  return (
    <>
      <PageHeader
        title="Accounts Dashboard"
        subtitle="Invoices, payments and vendor financials"
        actions={<Button><FileText className="h-4 w-4 mr-2" /> Generate invoice</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Invoices generated" value={invoices.length.toString()} icon={FileText} />
        <StatCard label="Pending invoices" value={pending.length.toString()} icon={Receipt} tone="warning" />
        <StatCard label="Paid invoices" value={paid.length.toString()} icon={CheckCircle2} tone="success" />
        <StatCard label="Overdue" value={overdue.length.toString()} icon={AlertCircle} tone="warning" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatCard label="Vendor payments (MTD)" value={`₹ ${(totalPaid / 100000).toFixed(1)}L`} icon={CircleDollarSign} tone="success" />
        <StatCard label="Outstanding balance" value={`₹ ${(totalPending / 100000).toFixed(1)}L`} icon={Wallet} tone="warning" />
        <StatCard label="Overdue amount" value={`₹ ${(totalOverdue / 100000).toFixed(1)}L`} icon={AlertCircle} tone="warning" />
        <StatCard label="Avg invoice" value={`₹ ${Math.round(invoices.reduce((s, i) => s + i.amount, 0) / invoices.length).toLocaleString("en-IN")}`} icon={TrendingUp} tone="info" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Payment trends</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <LineChart data={paymentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
                <Line dataKey="paid" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="pending" stroke="var(--color-warning)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Invoice status</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={dist} dataKey="v" nameKey="name" innerRadius={45} outerRadius={80}>
                  {dist.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent transactions</CardTitle>
          <Button variant="ghost" size="sm">View all</Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["Invoice", "Vendor", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 8).map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                  <td className="px-4 py-3 font-medium">{inv.vendor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                  <td className="px-4 py-3">₹ {inv.amount.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}


function ExecDash() {
  const todays = pickups.slice(0, 5);
  return (
    <>
      <PageHeader
        title="Good morning, Executive"
        subtitle="Your route for today — 5 stops, 12.4 km"
        actions={<Button><Camera className="h-4 w-4 mr-2" /> Start collection</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Stops today" value="5" icon={MapPin} />
        <StatCard label="Vendors onboarded (mo)" value="18" icon={Building2} tone="success" />
        <StatCard label="Collected (today)" value="182 kg" icon={Droplets} tone="info" />
        <StatCard label="KYC pending" value="3" icon={ShieldCheck} tone="warning" />
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Today's route</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ol className="divide-y">
            {todays.map((p, i) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.vendor}</div>
                  <div className="text-xs text-muted-foreground">{p.city} · {p.drums} drums · exp. {p.qty} kg</div>
                </div>
                <StatusBadge status={p.status} />
                <Button size="sm" variant="outline"><Navigation className="h-4 w-4 mr-1" /> Navigate</Button>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </>
  );
}

function DriverDash() {
  return (
    <>
      <PageHeader
        title="Today's Trips"
        subtitle="Vehicle MH12-AB-1002 · capacity 800 kg"
        actions={<Button><Navigation className="h-4 w-4 mr-2" /> Start trip</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assigned pickups" value="6" icon={ClipboardCheck} />
        <StatCard label="Distance" value="42.8 km" icon={MapPin} tone="info" />
        <StatCard label="Load so far" value="240 / 800 kg" icon={Droplets} tone="success" />
        <StatCard label="Completed" value="2 / 6" icon={CheckCircle2} tone="warning" />
      </div>
      <Card className="mt-6">
        <CardHeader><CardTitle>Route</CardTitle></CardHeader>
        <CardContent>
          <div className="h-72 rounded-md border bg-muted flex items-center justify-center text-muted-foreground text-sm">
            Google Maps route preview
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader><CardTitle>Pickups</CardTitle></CardHeader>
        <CardContent className="p-0">
          <ol className="divide-y">
            {pickups.slice(0, 6).map((p, i) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <div className="h-9 w-9 rounded-full bg-primary-soft text-primary flex items-center justify-center font-semibold">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.vendor}</div>
                  <div className="text-xs text-muted-foreground">{p.city} · {p.drums} drums</div>
                </div>
                <StatusBadge status={p.status} />
                <Button size="sm">Complete</Button>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </>
  );
}

function VendorDash() {
  const v = vendors[0];
  return (
    <>
      <PageHeader
        title={`Welcome, ${v.name}`}
        subtitle="Manage your pickups and collection history"
        actions={<Button><ClipboardCheck className="h-4 w-4 mr-2" /> Request pickup</Button>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Collected this month" value="182 kg" icon={Droplets} tone="success" />
        <StatCard label="Pending payment" value="₹ 3,640" icon={Wallet} tone="warning" />
        <StatCard label="Next pickup" value="Wed, 24 Jul" icon={ClipboardCheck} tone="info" />
        <StatCard label="KYC status" value="Approved" icon={ShieldCheck} />
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Collection trend (kg)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyCollection.map((m) => ({ month: m.month, kg: Math.round(m.kg / 800) }))}>
                <defs>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Area dataKey="kg" stroke="var(--color-primary)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Your QR</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="h-40 w-40 rounded-lg bg-muted grid place-items-center">
              <QrCode className="h-20 w-20 text-muted-foreground" />
            </div>
            <div className="text-xs font-mono text-muted-foreground">{v.id}</div>
            <Badge variant="secondary">Show at pickup</Badge>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
