import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronDown,
  Sparkles,
  Maximize2,
  FileText,
  Image as ImageIcon,
  Edit2
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DocumentPreviewModal from "@/components/DocumentPreviewModal";

export default function Validation() {
  const [, setLocation] = useLocation();
  const [fabricValue, setFabricValue] = useState("80% Cotton, 20% Elastane");
  const [isCorrected, setIsCorrected] = useState(false);
  const [applyToAll, setApplyToAll] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const suggestions = [
    { value: "80% Cotton, 20% Polyester", source: "Image AI", confidence: 78, icon: ImageIcon },
    { value: "80% Cotton, 20% Elastane", source: "Document OCR", confidence: 72, icon: FileText },
  ];

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto h-[calc(100vh-140px)] flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Review & Validate</h1>
            <p className="text-muted-foreground">Human-in-the-loop review for low confidence fields</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-muted-foreground">Progress: 1/5 items</div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent w-1/5" />
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          {/* Left: Original Document */}
          <Card className="flex flex-col overflow-hidden border-border shadow-sm h-full">
            <div className="p-4 border-b border-border bg-muted/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Original Document</h3>
                <InfoTooltip content="The source document page. Click 'Maximize' to view full screen." />
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsPreviewOpen(true)}>
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 relative bg-slate-100 overflow-auto p-8 flex justify-center">
              <div className="relative shadow-xl max-w-full">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/PGihkEeYaijVnBJZ.jpeg" 
                  alt="Document Page" 
                  className="max-w-full h-auto"
                />
                {/* Highlight Overlay */}
                <div 
                  className="absolute top-[65%] left-[15%] w-[30%] h-[5%] bg-yellow-300/40 border-2 border-yellow-500 animate-pulse rounded cursor-pointer" 
                  onClick={() => setIsPreviewOpen(true)}
                />
                
                {/* Context Tooltip */}
                <div className="absolute top-[60%] left-[15%] bg-slate-900 text-white text-xs px-2 py-1 rounded shadow-lg mb-1">
                  Source for "Fabric"
                </div>
              </div>
            </div>
          </Card>

          {/* Right: Extracted Data Form */}
          <Card className="flex flex-col overflow-hidden border-border shadow-sm h-full">
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Extracted Data</h3>
                <InfoTooltip content="Review and correct extracted fields. Low confidence items are highlighted." />
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-8">
              <div className="space-y-8 max-w-xl mx-auto">
                {/* Product Header */}
                <div className="flex gap-6 items-start pb-6 border-b border-border">
                  <div className="h-24 w-24 rounded-lg border border-border overflow-hidden bg-white shrink-0">
                    <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026743934/gKMUOcIMbzXedCwa.png" alt="Product" className="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">Classic Denim Jacket</h2>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="font-mono bg-muted px-2 py-0.5 rounded">CD0881-001</span>
                      <span>Medium Wash</span>
                      <span>XS-XL</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Price (AED)</Label>
                      <Input defaultValue="299" className="font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label>Country of Origin</Label>
                      <Input defaultValue="Turkey" />
                    </div>
                  </div>

                  {/* Problematic Field */}
                  <div className="space-y-4 p-6 bg-amber-50 rounded-lg border border-amber-200 relative">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-amber-900 font-bold flex items-center gap-2 text-lg">
                        <AlertTriangle className="h-5 w-5" />
                        Fabric Composition
                      </Label>
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                        Low Confidence (72%)
                      </span>
                    </div>

                    <div className="bg-white rounded border border-amber-200 p-3 mb-4">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Value</div>
                      <div className="font-mono text-lg">{fabricValue}</div>
                    </div>
                    
                    <p className="text-sm text-amber-800/90 mb-4 font-medium">
                      AI detected synthetic fibers in image analysis, contradicting "Elastane" in OCR.
                    </p>

                    <div className="space-y-3">
                      <Label className="text-amber-900">Select Suggestion:</Label>
                      <RadioGroup defaultValue={fabricValue} onValueChange={(v) => {
                        setFabricValue(v);
                        setIsCorrected(true);
                      }}>
                        {suggestions.map((s, i) => (
                          <div key={i} className="flex items-center space-x-2 bg-white p-3 rounded border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer">
                            <RadioGroupItem value={s.value} id={`option-${i}`} />
                            <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{s.value}</span>
                                <span className={cn(
                                  "text-xs px-2 py-1 rounded font-bold",
                                  s.confidence > 75 ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                )}>{s.confidence}%</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <s.icon className="h-3 w-3" />
                                {s.source}
                              </div>
                            </Label>
                          </div>
                        ))}
                        <div className="flex items-center space-x-2 bg-white p-3 rounded border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer">
                          <RadioGroupItem value="custom" id="option-custom" />
                          <Label htmlFor="option-custom" className="flex-1 cursor-pointer flex items-center gap-2">
                            <Edit2 className="h-3 w-3" />
                            Custom (edit manually)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                {/* Bulk Actions */}
                <div className="pt-6 border-t border-border">
                  <div className={cn(
                    "flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-300",
                    applyToAll ? "bg-accent/5 border-accent" : "bg-muted/30 border-transparent"
                  )}>
                    <Checkbox 
                      id="bulk" 
                      checked={applyToAll}
                      onCheckedChange={(c) => setApplyToAll(c as boolean)}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent h-5 w-5 mt-0.5"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="bulk"
                        className="text-base font-bold leading-none cursor-pointer text-foreground"
                      >
                        Apply this correction to all similar products (47 items)
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Will update all items with matching SKU prefix <span className="font-mono bg-muted px-1 rounded">CD0881</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-white flex justify-between items-center">
              <Button variant="ghost">Skip for now</Button>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20 px-8"
                onClick={() => setLocation("/enrichment")}
              >
                Approve & Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <DocumentPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        fileName="Zara_TechPack_SS25.pdf" 
      />
    </Layout>
  );
}
