import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Check, X, Upload, Eye } from "lucide-react";
import { kycQueue, vendors } from "@/lib/mock-data";

export const Route = createFileRoute("/app/kyc")({
  component: KycPage,
});

const DOCS = [
  "GST Certificate", "PAN Card", "Aadhaar (Front)", "Aadhaar (Back)",
  "FSSAI License", "Business Photo", "Kitchen Photo", "Owner Photo", "Cancelled Cheque",
];

function KycPage() {
  const queue = kycQueue.length ? kycQueue : vendors.slice(0, 6);
  return (
    <>
      <PageHeader
        title="KYC Approvals"
        subtitle="Review vendor documents and approve or request resubmission"
        actions={<Button variant="outline"><Upload className="h-4 w-4 mr-2" /> Bulk upload</Button>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b font-medium">Pending queue · {queue.length}</div>
            <ul className="divide-y max-h-[560px] overflow-auto">
              {queue.map((v, i) => (
                <li key={v.id} className={`p-4 hover:bg-muted/40 cursor-pointer ${i === 0 ? "bg-muted/60" : ""}`}>
                  <div className="font-medium text-sm">{v.name}</div>
                  <div className="text-xs text-muted-foreground">{v.city} · {v.state}</div>
                  <Badge variant="secondary" className="mt-2 text-[10px]">5 documents</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b">
              <div>
                <div className="text-xs text-muted-foreground">Reviewing</div>
                <div className="text-xl font-semibold">{queue[0].name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {queue[0].owner} · {queue[0].phone} · {queue[0].city}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="text-destructive hover:text-destructive"><X className="h-4 w-4 mr-1" /> Reject</Button>
                <Button><Check className="h-4 w-4 mr-1" /> Approve</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
              {DOCS.map((d) => (
                <div key={d} className="rounded-lg border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-medium truncate">{d}</div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-[10px]">Uploaded</Badge>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
