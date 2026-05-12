import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ExtractionSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/visual-intelligence");
    }, 3000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A2744]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-md p-8 bg-white shadow-2xl border-none animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in bounce-in duration-700">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-primary mb-6">Extraction Complete!</h2>
        
        <div className="w-full bg-green-50 rounded-lg p-6 mb-8 space-y-3 border border-green-100">
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-medium">Products Extracted</span>
            <span className="font-bold text-green-900">50</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-medium">Processing Time</span>
            <span className="font-bold text-green-900">8m 12s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-medium">Manual Work Saved</span>
            <span className="font-bold text-green-900">~3.5 days</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-6">
          Now running Visual Intelligence validation...
        </p>

        <Button 
          className="w-full bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 h-12 text-lg"
          onClick={() => setLocation("/visual-intelligence")}
        >
          View Results
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Card>
    </div>
  );
}
