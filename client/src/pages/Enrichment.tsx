import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";

export default function Enrichment() {
  const [, setLocation] = useLocation();
  const [activeCard, setActiveCard] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const transformations = [
    {
      title: "Standardization",
      before: { label: "Raw Title", value: "Denim Jacket" },
      after: { label: "Standardized Title", value: "Women's Classic Denim Jacket - Medium Wash" },
      icon: Sparkles
    },
    {
      title: "Size Mapping",
      before: { label: "Vendor Size", value: "36/S/Small" },
      after: { label: "Global Size", value: "Size: S (EU 36, US 4)" },
      icon: ArrowRightLeft
    },
    {
      title: "Categorization",
      before: { label: "Raw Category", value: "Not provided by supplier" },
      after: { label: "GS1 Category", value: "Women > Outerwear > Jackets > Denim" },
      icon: CheckCircle2
    },
    {
      title: "Localization",
      before: { label: "Description", value: "N/A" },
      after: { label: "SEO Copy (EN+AR)", value: "Classic denim jacket... / جاكيت جينز كلاسيكي..." },
      icon: Globe
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard(prev => {
        if (prev >= transformations.length - 1) {
          setIsComplete(true);
          clearInterval(timer);
          // Auto-advance disabled
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [setLocation]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Sparkles className="h-4 w-4 text-accent" />
                AI Processing: Enriching 50 products...
              </div>
              <span className="font-mono font-bold text-accent">{Math.min(100, (activeCard + 1) * 25)}%</span>
            </div>
            <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-500 ease-out" 
                style={{ width: `${Math.min(100, (activeCard + 1) * 25)}%` }}
              />
            </div>
            <div className="text-sm text-amber-800/80 font-medium mt-2">
              47 auto-completed · 3 routed to review
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <h1 className="text-4xl font-bold text-primary">Data Enrichment & Normalization</h1>
            <InfoTooltip content="Automated enhancement of product data using external sources and AI generation." className="h-6 w-6" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforming raw extracted data into retail-ready catalog assets.
          </p>
        </div>

        {/* Transformation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {transformations.map((t, i) => (
            <Card 
              key={i}
              className={cn(
                "p-6 border transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) relative overflow-hidden transform perspective-1000",
                i <= activeCard 
                  ? "opacity-100 translate-y-0 border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-100" 
                  : "opacity-40 translate-y-8 border-border shadow-none scale-95 blur-[1px]"
              )}
            >
              {/* Progress Line */}
              {i === activeCard && !isComplete && (
                <div className="absolute top-0 left-0 h-1 bg-accent w-full animate-[progress_1.5s_ease-in-out] shadow-[0_0_10px_rgba(232,93,76,0.5)]" />
              )}
              
              <div className="flex items-center gap-3 mb-6">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                  i <= activeCard ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg">{t.title}</h3>
                {i <= activeCard && (
                  <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700 hover:bg-green-100 border-none">
                    Complete
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-muted-foreground uppercase">{t.before.label}</div>
                  <div className={cn(
                    "font-medium text-muted-foreground line-through decoration-red-400/50",
                    t.before.value === "Not provided by supplier" && "italic text-slate-400"
                  )}>
                    {t.before.value}
                  </div>
                </div>
                
                <ArrowRight className={cn(
                  "h-5 w-5 transition-colors",
                  i <= activeCard ? "text-accent" : "text-muted-foreground/30"
                )} />
                
                <div className="space-y-1">
                  <div className="text-xs font-mono text-primary uppercase">{t.after.label}</div>
                  <div className={cn(
                    "font-bold transition-all",
                    i <= activeCard ? "text-primary" : "text-muted-foreground blur-sm"
                  )}>
                    {t.after.value}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Compliance & Summary Section */}
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-300",
          isComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Card className="p-6 bg-white border border-border shadow-lg md:col-span-2">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Compliance Validation Results
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">UAE E-commerce Law Compliant</span>
                </div>
                <span className="text-sm font-bold text-green-700">All products</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Country of Origin Specified</span>
                </div>
                <span className="text-sm font-bold text-green-700">50/50 products</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Size Charts Converted (EU/US/UK)</span>
                </div>
                <span className="text-sm font-bold text-green-700">50/50 products</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded border border-amber-100">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-amber-900">3 Products Missing Fiber Labels</span>
                </div>
                <span className="text-sm font-bold text-amber-700">Fix recommended</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1">View Detailed Report</Button>
              <Button variant="outline" className="flex-1 border-amber-200 text-amber-900 hover:bg-amber-50">Fix Issues Now</Button>
            </div>
          </Card>

          <Card className="p-6 flex flex-col justify-center items-center text-center border-accent/20 bg-accent/5">
            <div className="text-4xl font-bold text-primary mb-2">50</div>
            <div className="text-sm font-medium text-muted-foreground mb-6">SKUs Ready for Export</div>
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
              onClick={() => setLocation("/export")}
            >
              Continue to Export
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
