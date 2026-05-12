import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Table as TableIcon, 
  Grid, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Database,
  FileSpreadsheet,
  Code,
  Share2,
  Clock
} from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Export() {
  const [, setLocation] = useLocation();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const products = [
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/gKMUOcIMbzXedCwa.png", name: "Classic Denim Jacket", sku: "CD0881-001", price: "AED 299", status: "Ready" },
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/WrjmWrvnjqzIdOgA.jpeg", name: "Essential Cotton Tee", sku: "AB1234-WHT", price: "AED 89", status: "Ready" },
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/txFGxDGEOtuxuMre.jpg", name: "Wide Leg Linen Trousers", sku: "XY5678-BLK", price: "AED 199", status: "Ready" },
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/OmauTLGtUfcWTFew.jpg", name: "Floral Summer Dress", sku: "DR9921-FLO", price: "AED 349", status: "Ready" },
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/BIomgCTfZPkNxguZ.jpg", name: "Silk Blouse", sku: "TP4452-SLK", price: "AED 259", status: "Ready" },
    { img: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/MdNRZpQxzFjPQtuE.jpg", name: "Oversized Hoodie", sku: "HK7890-GRY", price: "AED 189", status: "On Hold" },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLocation("/export-success");
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto">
        {/* ROI Banner */}
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-900">50 SKUs Ready for Export</h2>
              <p className="text-green-700">All validations passed successfully</p>
            </div>
          </div>
          
          <div className="flex gap-8 text-center md:text-left">
            <div>
              <div className="text-sm text-green-700 font-medium mb-1 flex items-center gap-1">
                <Clock className="h-4 w-4" /> Total Time
              </div>
              <div className="text-xl font-bold text-green-900">8m 12s</div>
            </div>
            <div>
              <div className="text-sm text-green-700 font-medium mb-1 flex items-center gap-1">
                <Database className="h-4 w-4" /> Manual Saved
              </div>
              <div className="text-xl font-bold text-green-900">~4.5 days</div>
            </div>
            <div>
              <div className="text-sm text-green-700 font-medium mb-1 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Accuracy
              </div>
              <div className="text-xl font-bold text-green-900">94%</div>
            </div>
          </div>

          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 px-8 text-lg font-bold min-w-[200px]"
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Syncing...
              </>
            ) : (
              <>
                Push to Akeneo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Export & Integration</h1>
            <p className="text-muted-foreground">Review final catalog and push to downstream systems.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Download CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Catalog Preview (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-sm overflow-hidden rounded-xl">
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold flex items-center gap-2">
                    <TableIcon className="h-4 w-4 text-muted-foreground" />
                    Catalog Preview
                  </h3>
                  <InfoTooltip content="Preview of the final structured data ready for export." />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white shadow-sm">
                    <TableIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="px-6 py-3 w-20">Image</th>
                      <th className="px-6 py-3">Product Name</th>
                      <th className="px-6 py-3">SKU</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((p, i) => (
                      <tr key={i} className="hover:bg-muted/20 transition-colors group">
                        <td className="px-6 py-3">
                          <div className="h-12 w-12 rounded bg-white border border-border flex items-center justify-center overflow-hidden">
                            {p.img ? (
                              <img src={p.img} alt={p.name} className="h-full w-full object-contain" />
                            ) : (
                              <div className="h-8 w-8 bg-muted rounded-full" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3 font-medium text-foreground">{p.name}</td>
                        <td className="px-6 py-3 font-mono text-muted-foreground">{p.sku}</td>
                        <td className="px-6 py-3 font-mono">{p.price}</td>
                        <td className="px-6 py-3">
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "border-none",
                              p.status === "Ready" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            )}
                          >
                            {p.status === "On Hold" && <AlertTriangle className="h-3 w-3 mr-1 inline" />}
                            {p.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-4 text-center border-t border-border bg-muted/10 text-muted-foreground text-sm">
                  ...and 45 more items
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-all group">
                <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div className="font-bold mb-1">Shopify CSV</div>
                <div className="text-xs text-muted-foreground">Standard format</div>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-all group">
                <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Code className="h-5 w-5" />
                </div>
                <div className="font-bold mb-1">Magento XML</div>
                <div className="text-xs text-muted-foreground">2.4.x Compatible</div>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center hover:border-primary/50 cursor-pointer transition-all group">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5" />
                </div>
                <div className="font-bold mb-1">SAP IDoc</div>
                <div className="text-xs text-muted-foreground">Enterprise ERP</div>
              </Card>
            </div>
          </div>

          {/* Sidebar: Integration & Summary (1/3) */}
          <div className="space-y-6">
            <Card className="p-6 border-border shadow-sm bg-slate-900 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-accent" />
                  PIM Integration
                </h3>
                <InfoTooltip content="Direct integration status with Product Information Management systems." className="text-slate-400 hover:text-white" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10">
                  <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center font-bold text-xs">AK</div>
                  <div>
                    <div className="font-medium text-sm">Akeneo PIM</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Connected
                    </div>
                  </div>
                </div>

                <Button 
                  className={cn(
                    "w-full h-12 font-bold transition-all",
                    syncComplete 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-accent hover:bg-accent/90 text-white"
                  )}
                  onClick={handleSync}
                  disabled={isSyncing || syncComplete}
                >
                  {isSyncing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Syncing...
                    </span>
                  ) : syncComplete ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Synced Successfully
                    </span>
                  ) : (
                    "Push to Akeneo Now"
                  )}
                </Button>

                <div className="text-xs text-center text-slate-400">
                  Next scheduled sync: Manual
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-sm">
              <h3 className="font-bold mb-4">Session Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Processed</span>
                  <span className="font-mono font-bold">50 Items</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Time Elapsed</span>
                  <span className="font-mono font-bold">8m 12s</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="font-mono font-bold text-green-600">94%</span>
                </div>
                <div className="pt-2">
                  <div className="text-sm text-muted-foreground mb-1">Manual Time Saved</div>
                  <div className="text-2xl font-bold text-primary">~4.5 Days</div>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white shadow-sm"
              onClick={() => setLocation("/analytics")}
            >
              View Analytics Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
