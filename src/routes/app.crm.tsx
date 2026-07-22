import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatCard } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, MessageCircle, Mail, Users2, TrendingUp, Clock } from "lucide-react";
import { vendors } from "@/lib/mock-data";

export const Route = createFileRoute("/app/crm")({
  component: CRMPage,
});

const STAGES = ["Lead", "Contacted", "KYC", "Onboarded", "Active"] as const;

function CRMPage() {
  return (
    <>
      <PageHeader
        title="CRM & Follow-ups"
        subtitle="Track vendor pipeline, follow-ups and outreach"
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Open leads" value="128" icon={Users2} tone="info" />
        <StatCard label="Follow-ups today" value="24" icon={Clock} tone="warning" />
        <StatCard label="Conversion" value="41%" icon={TrendingUp} tone="success" />
        <StatCard label="Contacted (wk)" value="312" icon={PhoneCall} />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
        {STAGES.map((stage, i) => (
          <Card key={stage}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                {stage}
                <Badge variant="secondary">{4 + i * 2}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {vendors.slice(i * 3, i * 3 + 3).map((v) => (
                <div key={v.id} className="rounded-lg border p-3 bg-card">
                  <div className="font-medium text-sm truncate">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.city} · {v.owner}</div>
                  <div className="flex gap-1 mt-2">
                    <Button size="icon" variant="ghost" className="h-7 w-7"><PhoneCall className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7"><MessageCircle className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7"><Mail className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
