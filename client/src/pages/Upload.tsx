import { useState } from "react";
import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadCloud, FileText, Image as ImageIcon, X } from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { cn } from "@/lib/utils";

export default function Upload() {
  const [, setLocation] = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock file drop - in real app would process e.dataTransfer.files
    setFiles([
      ...files,
      { name: "Zara_TechPack_SS25.pdf", type: "pdf", size: "2.4 MB" },
      { name: "Product_Images_Batch_01.zip", type: "zip", size: "45 MB" }
    ]);
  };

  const recentUploads = [
    { name: "Zara Tech Pack", sub: "SS25", size: "2.4 MB", type: "pdf", time: "2 mins ago" },
    { name: "Mango Line Sheet", sub: "AW24", size: "1.8 MB", type: "pdf", time: "5 mins ago" },
    { name: "Product Images", sub: "(127 files)", size: "45 MB", type: "img", time: "10 mins ago" },
  ];

  return (
    <Layout showNav={true}>
      <div className="max-w-4xl mx-auto pt-4">
        {/* Header */}
        <div className="text-center mb-6 space-y-3">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary text-white mb-2 shadow-lg shadow-primary/20">
            <span className="font-heading font-bold text-xl">ID</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Insight DXP
          </h1>
          <h2 className="text-lg font-heading font-semibold text-muted-foreground">
            Supply chain Intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turn supplier PDFs into live product listings in under 6 hours. Visual Intelligence catches errors that pure OCR misses.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-3 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium shadow-sm">
            <span className="mr-2">Processing for:</span>
            <span className="font-bold">Sun & Sand Sports — Nike SS26 Collection</span>
          </div>
        </div>
        <Card 
          className={cn(
            "border-2 border-dashed p-6 text-center transition-all duration-500 ease-out mb-6 relative overflow-hidden group max-h-[220px]",
            isDragging 
              ? "border-accent bg-accent/5 scale-[1.02] shadow-xl shadow-accent/10" 
              : "border-border hover:border-primary/50 hover:bg-white/80 hover:shadow-lg hover:shadow-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex flex-col items-center gap-3">
            <div className={cn(
              "h-14 w-14 rounded-full flex items-center justify-center transition-colors",
              isDragging ? "bg-accent/10 text-accent" : "bg-primary/5 text-primary"
            )}>
              <UploadCloud className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-foreground">
                Drag & drop files here
              </h3>
              <p className="text-sm text-muted-foreground">
                or click to browse from your computer
              </p>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground font-mono bg-muted px-3 py-1 rounded-full">
              <span>PDF</span>
              <span>•</span>
              <span>EXCEL</span>
              <span>•</span>
              <span>IMAGES (JPG, PNG)</span>
            </div>
          </div>
        </Card>

        {/* Recent Uploads / Active Files */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">Recent Uploads</h3>
            <InfoTooltip content="Files uploaded in the last 24 hours. Click to view processing status." />
          </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentUploads.map((file, i) => (
              <Card key={i} className="p-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 cursor-pointer group border-border/60 hover:-translate-y-1 bg-white/60 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    file.type === 'pdf' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                  )}>
                    {file.type === 'pdf' ? <FileText className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{file.time}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{file.name}</h4>
                  <p className="text-sm text-muted-foreground">{file.sub}</p>
                  <p className="text-xs font-mono text-muted-foreground pt-2">{file.size}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <span className="h-px w-12 bg-border"></span>
              OR
              <span className="h-px w-12 bg-border"></span>
            </div>
            
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all hover:-translate-y-1 w-56"
              onClick={() => setLocation("/processing")}
            >
              <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.5 6L0.5 11.1962L0.5 0.803847L9.5 6Z" fill="currentColor"/>
                </svg>
              </div>
              Watch Sample Demo
            </Button>

            <div className="mt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white px-10 py-5 text-lg font-bold shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:-translate-y-1 scale-105"
                onClick={() => setLocation("/processing")}
              >
                Process Documents
                <span className="ml-2">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
