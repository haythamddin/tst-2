import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, Clock, FileText, ChevronRight, ArrowRight } from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";

export default function Processing() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [extractedFields, setExtractedFields] = useState<any[]>([]);

  const steps = [
    { name: "Document classification", status: "complete", detail: "Tech Pack detected" },
    { name: "Structure analysis", status: "active", detail: "Parsing tables & grids" },
    { name: "Field extraction", status: "pending", detail: "Identifying attributes" },
    { name: "Visual validation", status: "pending", detail: "Cross-referencing images" },
    { name: "Data enrichment", status: "pending", detail: "Generating SEO copy" },
  ];

  // Simulation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Auto-advance disabled
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total

    return () => clearInterval(timer);
  }, [setLocation]);

  // Step progression effect
  useEffect(() => {
    if (progress > 20) setActiveStep(1);
    if (progress > 40) setActiveStep(2);
    if (progress > 60) setActiveStep(3);
    if (progress > 80) setActiveStep(4);

    // Add extracted fields progressively
    if (progress === 25) setExtractedFields(prev => [...prev, { label: "SKU", value: "CD0881-001", status: "success", confidence: 98 }]);
    if (progress === 35) setExtractedFields(prev => [...prev, { label: "Product Name", value: "Denim Jacket, Women's", status: "success", confidence: 94 }]);
    if (progress === 50) setExtractedFields(prev => [...prev, { label: "Color", value: "Medium Wash", status: "processing", confidence: 88 }]);
    if (progress === 65) setExtractedFields(prev => [...prev, { label: "Size Range", value: "XS-XL", status: "processing", confidence: 91 }]);
    if (progress === 80) setExtractedFields(prev => [...prev, { label: "Fabric", value: "80% Cotton, 20% Elastane", status: "pending", confidence: 72 }]);
    if (progress === 90) setExtractedFields(prev => [...prev, { label: "Price (AED)", value: "299", status: "success", confidence: 96 }]);
    if (progress === 95) setExtractedFields(prev => [...prev, { label: "Country", value: "Turkey", status: "success", confidence: 95 }]);

  }, [progress]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
              Processing: Zara_TechPack_SS25_Denim.pdf
            </h1>
            <p className="text-muted-foreground mt-1 ml-6">Started just now • Estimated time remaining: 2s</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold text-primary">{progress}%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Completion</div>
          </div>
        </div>

        {/* Manual Navigation */}
        {progress === 100 && (
          <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 px-8 py-6 text-lg font-bold"
              onClick={() => setLocation("/extraction-success")}
            >
              View Results
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Document Preview */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="relative overflow-hidden aspect-[3/4] border-border shadow-lg group">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/SMYnSQMpSVCxcjrP.png" 
                alt="Document Preview" 
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Scanning Overlay Effect */}
              <div 
                className="absolute inset-x-0 h-1 bg-accent/50 shadow-[0_0_15px_rgba(232,93,76,0.5)] z-10"
                style={{ top: `${progress}%`, transition: 'top 0.1s linear' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" 
                   style={{ height: `${progress}%`, transition: 'height 0.1s linear' }} 
              />

              {/* Highlight Boxes (Simulated) */}
              {progress > 30 && (
                <div className="absolute top-[15%] left-[10%] w-[40%] h-[8%] border-2 border-accent bg-accent/10 animate-pulse rounded" />
              )}
              {progress > 50 && (
                <div className="absolute top-[40%] right-[10%] w-[30%] h-[20%] border-2 border-accent bg-accent/10 animate-pulse rounded" />
              )}
              
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm">
                Page 3/24
              </div>
            </Card>
          </div>

          {/* Right: Processing Steps & Extraction */}
          <div className="lg:col-span-7 space-y-8">
            {/* Steps */}
            <Card className="p-6 border-border/60 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
                <h3 className="text-lg font-bold">Processing Pipeline</h3>
                <InfoTooltip content="Real-time status of the AI extraction stages. Each stage must complete before moving to the next." />
              </div>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={cn(
                      "mt-1 h-6 w-6 rounded-full flex items-center justify-center text-xs border transition-all duration-500",
                      i < activeStep ? "bg-green-100 border-green-200 text-green-600" :
                      i === activeStep ? "bg-accent/10 border-accent/20 text-accent animate-pulse" :
                      "bg-muted border-border text-muted-foreground"
                    )}>
                      {i < activeStep ? <CheckCircle2 className="h-4 w-4" /> : 
                       i === activeStep ? <Zap className="h-4 w-4" /> : 
                       <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn(
                          "font-medium transition-colors",
                          i === activeStep ? "text-primary" : "text-muted-foreground"
                        )}>{step.name}</span>
                        {i === activeStep && (
                          <span className="text-xs font-mono text-accent animate-pulse">Processing...</span>
                        )}
                      </div>
                      {i <= activeStep && (
                        <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-left-2">
                          {step.detail}
                        </p>
                      )}
                      {i === activeStep && (
                        <Progress value={(progress % 20) * 5} className="h-1.5 mt-3 bg-muted [&>div]:bg-accent [&>div]:shadow-[0_0_10px_rgba(232,93,76,0.5)]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Live Extraction Feed */}
            <Card className="p-6 bg-slate-900 text-slate-50 border-slate-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Live Extraction Stream
                </h3>
                <InfoTooltip content="Raw data fields being identified and extracted from the document in real-time." className="text-slate-500 hover:text-slate-300" />
              </div>
              <div className="space-y-3 font-mono text-sm min-h-[200px]">
                {extractedFields.map((field, i) => (
                  <div key={i} className="flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 border-b border-slate-800/50 pb-2 last:border-0">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">{field.label}</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        {field.value}
                        {field.label === "Color" && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse"></span>
                            → Flagged for Visual Validation
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "font-mono font-bold",
                        field.confidence > 85 ? "text-green-400" : 
                        field.confidence > 70 ? "text-amber-400" : "text-slate-500"
                      )}>
                        {field.confidence}%
                      </div>
                      {field.status === 'success' && <CheckCircle2 className="h-5 w-5 text-green-400" />}
                      {field.status === 'processing' && <Zap className="h-5 w-5 text-amber-400 animate-pulse" />}
                      {field.status === 'pending' && <Clock className="h-5 w-5 text-slate-600" />}
                    </div>
                  </div>
                ))}
                {extractedFields.length === 0 && (
                  <div className="text-slate-600 italic">Waiting for data stream...</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
