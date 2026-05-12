import { useEffect } from "react";
import { useLocation } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ExportSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/analytics");
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A2744]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-full max-w-sm p-8 bg-white shadow-2xl border-none animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in bounce-in duration-500">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-primary mb-2">Success!</h2>
        <p className="text-lg text-muted-foreground">
          50 products synced to Akeneo
        </p>
      </Card>
    </div>
  );
}
