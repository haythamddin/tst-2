import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Scan, 
  Clock,
  Edit2
} from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";

export default function VisualIntelligence() {
  const [, setLocation] = useLocation();
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const extractedData = [
    { label: "Style", value: "CD0881-001", status: "success", confidence: 98 },
    { label: "Color", value: "Medium Wash", status: "success", confidence: 94 },
    { label: "Category", value: "Outerwear", status: "success", confidence: 91 },
    { label: "Material", value: "Cotton", status: "warning", confidence: 72 },
  ];

  const aiAnalysis = [
    { label: "Color", value: "Medium Wash (94%)" },
    { label: "Texture", value: "Denim, woven" },
    { label: "Category", value: "Women's outerwear" },
  ];

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Visual Intelligence</h1>
          <p className="text-muted-foreground text-lg">Validating extracted data against product imagery</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
          
          {/* Column 1: Extracted Data (30%) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="h-full p-6 border-border shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="bg-primary/10 p-1.5 rounded text-primary">
                    <Scan className="h-4 w-4" />
                  </span>
                  Extracted Data
                </h3>
                <InfoTooltip content="Data extracted from the document text. Hover over items to see confidence scores." />
              </div>
              
              <div className="space-y-4 flex-1">
                {extractedData.map((item, i) => (
                  <div 
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-200 cursor-help relative group",
                      item.status === 'success' 
                        ? "bg-green-50/50 border-green-100 hover:border-green-200" 
                        : "bg-amber-50/50 border-amber-100 hover:border-amber-200"
                    )}
                    onMouseEnter={() => setShowTooltip(item.label)}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </span>
                      {item.status === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <div className="font-mono font-medium text-lg text-foreground">
                      {item.value}
                    </div>
                    
                    {/* Confidence Tooltip */}
                    <div className={cn(
                      "absolute -right-2 top-1/2 translate-x-full -translate-y-1/2 ml-2 z-20 bg-slate-800 text-white text-xs px-3 py-2 rounded shadow-xl w-32 transition-opacity duration-200 pointer-events-none",
                      showTooltip === item.label ? "opacity-100" : "opacity-0"
                    )}>
                      <div className="font-bold mb-1">Confidence: {item.confidence}%</div>
                      <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full", item.confidence > 85 ? "bg-green-400" : "bg-amber-400")} 
                          style={{ width: `${item.confidence}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Column 2: Product Image (35%) */}
          <div className="lg:col-span-4 relative group">
            <Card className="h-full overflow-hidden border-border shadow-lg bg-slate-100 flex items-center justify-center relative">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/gKMUOcIMbzXedCwa.png" 
                alt="Product Analysis" 
                className="max-w-full max-h-[80%] object-contain mix-blend-multiply"
              />
              
              {/* AI Analysis Overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark p-4 rounded-xl backdrop-blur-md border border-white/10 animate-in slide-in-from-bottom-4 duration-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                  <Scan className="h-3 w-3" /> AI Visual Analysis
                </h4>
                <div className="space-y-2">
                  {aiAnalysis.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-white/80">{item.label}:</span>
                      <span className="font-mono text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scanning Line Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="w-full h-1 bg-accent/60 shadow-[0_0_20px_rgba(232,93,76,0.6)] animate-[scan_4s_ease-in-out_infinite]" />
              </div>
              
              {/* Flagged for Review Label */}
              <div className="absolute top-0 left-0 right-0 bg-accent/90 text-white text-xs font-bold px-4 py-1 flex items-center justify-center gap-2 z-20">
                <AlertTriangle className="h-3 w-3" />
                Flagged for Review
              </div>
            </Card>
          </div>

          {/* Column 3: Validation Status (35%) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <Card className="p-6 border-border shadow-sm flex-1">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-lg font-bold">Validation Summary</h3>
                <InfoTooltip content="Overview of data quality and automated checks performed." />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-1">8</div>
                  <div className="text-sm text-green-800 font-medium">Fields Validated</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="text-3xl font-bold text-amber-600 mb-1">1</div>
                  <div className="text-sm text-amber-800 font-medium">Needs Review</div>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-bold text-primary">Time Saved</span>
                </div>
                <div className="text-2xl font-mono font-bold text-foreground">45 minutes</div>
                <p className="text-xs text-muted-foreground mt-1">Compared to manual entry</p>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between group">
                  View Detailed Report
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Attention Panel */}
        {/* Floating Attention Panel - Repositioned to avoid covering image */}
        <div className="fixed bottom-8 right-8 w-[450px] z-40 animate-in slide-in-from-right-10 duration-500 delay-500">
          <Card className="bg-amber-50 border-amber-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-0 flex flex-col overflow-hidden">
            <div className="flex items-start p-4 pb-0">
              <div className="bg-amber-100 h-10 w-10 rounded-full flex items-center justify-center border border-amber-200 shrink-0 mr-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 text-base leading-tight mb-1">Material Discrepancy</h4>
                <p className="text-xs text-amber-800/90 leading-relaxed">
                  Confidence low (72%). Image analysis detected "Polyester" instead of "Elastane".
                </p>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-amber-700 hover:bg-amber-100 -mr-2 -mt-2">
                <span className="sr-only">Dismiss</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
            
            <div className="p-4 pt-3">
              <div className="bg-white/60 rounded-md p-2.5 mb-3 text-xs space-y-1.5 border border-amber-200/50">
                <div className="flex justify-between items-center">
                  <span className="text-amber-900/70">Document (OCR):</span>
                  <span className="font-mono font-medium text-amber-900 bg-amber-100/50 px-1 rounded">...20% Elastane</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-900/70">Image Analysis:</span>
                  <span className="font-mono font-medium text-amber-900 bg-amber-100/50 px-1 rounded">...20% Polyester</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-amber-200 hover:bg-amber-100 text-amber-900 bg-white text-xs h-8"
                  onClick={() => setLocation("/validation")}
                >
                  Accept Image
                </Button>
                <Button 
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white shadow-sm text-xs h-8"
                  onClick={() => setLocation("/validation")}
                >
                  Resolve Manually
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
