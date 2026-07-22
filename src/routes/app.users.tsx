import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { ROLES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/users")({
  component: UsersPage,
});

const USERS = [
  { name: "Anita Verma", email: "anita@kissan.in", role: "super_admin", state: "All India" },
  { name: "Rajesh Nair", email: "rajesh@kissan.in", role: "state_manager", state: "Maharashtra" },
  { name: "Priya Iyer", email: "priya@kissan.in", role: "state_manager", state: "Karnataka" },
  { name: "Suresh K.", email: "suresh@kissan.in", role: "executive", state: "Mumbai" },
  { name: "Manoj Kumar", email: "manoj@kissan.in", role: "driver", state: "Pune" },
  { name: "Deepak Rao", email: "deepak@kissan.in", role: "executive", state: "Bengaluru" },
];

function UsersPage() {
  return (
    <>
      <PageHeader
        title="Users & Roles"
        subtitle="Manage internal team access"
        actions={<Button><Plus className="h-4 w-4 mr-2" /> Invite user</Button>}
      />
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                {["User", "Email", "Role", "Region", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email} className="border-t hover:bg-muted/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{ROLES.find((r) => r.value === u.role)?.label}</Badge>
                  </td>
                  <td className="px-4 py-3">{u.state}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-success/15 text-success border-success/30" variant="outline">Active</Badge>
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
