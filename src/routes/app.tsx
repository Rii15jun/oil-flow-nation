import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard, Users, ClipboardCheck, Truck, PackageOpen, Route as RouteIcon,
  FileBarChart, Wallet, QrCode, Bell, Search, LogOut, Menu, Leaf, Building2, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { clearSession, getSession, setSession, type Session } from "@/lib/session";
import { ROLES, type Role } from "@/lib/mock-data";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  super_admin: [
    { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/app/vendors", label: "Vendors", icon: Building2 },
    { to: "/app/kyc", label: "KYC Approvals", icon: ShieldCheck },
    { to: "/app/pickups", label: "Pickups", icon: ClipboardCheck },
    { to: "/app/collections", label: "Collections", icon: PackageOpen },
    { to: "/app/inventory", label: "Inventory", icon: QrCode },
    { to: "/app/vehicles", label: "Vehicles & Drivers", icon: Truck },
    { to: "/app/routes", label: "Route Planner", icon: RouteIcon },
    { to: "/app/payments", label: "Payments", icon: Wallet },
    { to: "/app/reports", label: "Reports", icon: FileBarChart },
    { to: "/app/users", label: "Users & Roles", icon: Users },
  ],
  state_manager: [
    { to: "/app/dashboard", label: "State Dashboard", icon: LayoutDashboard },
    { to: "/app/vendors", label: "Vendors", icon: Building2 },
    { to: "/app/kyc", label: "KYC Approvals", icon: ShieldCheck },
    { to: "/app/pickups", label: "Pickups", icon: ClipboardCheck },
    { to: "/app/vehicles", label: "Teams & Vehicles", icon: Truck },
    { to: "/app/reports", label: "Reports", icon: FileBarChart },
  ],
  executive: [
    { to: "/app/dashboard", label: "My Day", icon: LayoutDashboard },
    { to: "/app/vendors", label: "Vendors", icon: Building2 },
    { to: "/app/pickups", label: "Pickup Requests", icon: ClipboardCheck },
    { to: "/app/collections", label: "New Collection", icon: PackageOpen },
    { to: "/app/kyc", label: "KYC Upload", icon: ShieldCheck },
  ],
  driver: [
    { to: "/app/dashboard", label: "Today's Trips", icon: LayoutDashboard },
    { to: "/app/pickups", label: "My Pickups", icon: ClipboardCheck },
    { to: "/app/routes", label: "Navigation", icon: RouteIcon },
  ],
  vendor: [
    { to: "/app/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/app/pickups", label: "Request Pickup", icon: ClipboardCheck },
    { to: "/app/collections", label: "Collection History", icon: PackageOpen },
    { to: "/app/kyc", label: "My Documents", icon: ShieldCheck },
    { to: "/app/payments", label: "Payments", icon: Wallet },
  ],
};

function AppShell() {
  const navigate = useNavigate();
  const [session, setLocal] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setLocal(s);
  }, [navigate]);

  if (!session) return null;
  const nav = NAV_BY_ROLE[session.role];

  const switchRole = (role: Role) => {
    const updated = { ...session, role, name: ROLES.find((r) => r.value === role)!.label };
    setSession(updated);
    setLocal(updated);
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground shrink-0">
        <SidebarContent nav={nav} role={session.role} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-background border-b flex items-center px-4 lg:px-6 gap-3 sticky top-0 z-30">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-sidebar text-sidebar-foreground border-sidebar-border">
              <SidebarContent nav={nav} role={session.role} onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="relative flex-1 max-w-xl">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors, pickups, drivers, PKP IDs…"
              className="pl-9 h-10 bg-muted/50 border-transparent focus-visible:bg-background"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 pl-2 pr-3 h-10 rounded-md hover:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {session.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium leading-tight">{session.name}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{session.phone}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Switch role (demo)</DropdownMenuLabel>
              {ROLES.map((r) => (
                <DropdownMenuItem key={r.value} onClick={() => switchRole(r.value)}>
                  {r.label}
                  {r.value === session.role && (
                    <Badge variant="secondary" className="ml-auto text-[10px]">current</Badge>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearSession();
                  navigate({ to: "/" });
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-4 lg:p-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  nav, role, onNavigate,
}: { nav: NavItem[]; role: Role; onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const roleLabel = ROLES.find((r) => r.value === role)?.label;

  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center gap-3 px-5 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
          <Leaf className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Kissan UCO</div>
          <div className="text-[11px] text-sidebar-foreground/60">{roleLabel}</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-[11px] text-sidebar-foreground/50">
        v1.0 · Demo build
      </div>
    </div>
  );
}
