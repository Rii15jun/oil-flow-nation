import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, QrCode, Coins } from "lucide-react";
import { vendors } from "@/lib/mock-data";

export const Route = createFileRoute("/app/qrcodes")({
  component: QRCodesPage,
});

function QRCodesPage() {
  return (
    <>
      <PageHeader
        title="QR Codes"
        subtitle="Vendor QR codes for on-site scan & pickup"
        actions={<Button variant="outline"><Printer className="h-4 w-4 mr-1" /> Print batch</Button>}
      />

      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-6 brand-gradient">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-2xl bg-background/90 grid place-items-center shadow-lg">
              <Coins className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl font-semibold">UCOIN App QR Landing</div>
              <div className="text-sm text-muted-foreground">
                Every vendor QR opens a public landing page: <span className="font-mono">ucoin.app/v/&lt;VENDOR-ID&gt;</span> — showing vendor details, request pickup, and view balance.
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Powered by Kissan Energy India Pvt. Ltd.</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {vendors.slice(0, 12).map((v) => (
          <Card key={v.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm truncate">{v.name}</CardTitle>
              <div className="text-xs text-muted-foreground">{v.city}</div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <div className="h-32 w-32 rounded-xl bg-muted grid place-items-center">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <div className="font-mono text-xs text-muted-foreground">{v.id}</div>
              <Badge variant="secondary" className="text-[10px]">ucoin.app/v/{v.id}</Badge>
              <Button size="sm" variant="outline" className="w-full"><Download className="h-4 w-4 mr-1" /> Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
