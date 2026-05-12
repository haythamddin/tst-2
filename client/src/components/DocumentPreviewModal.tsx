import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, FileText } from "lucide-react";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

export default function DocumentPreviewModal({ isOpen, onClose, fileName }: DocumentPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {fileName}
          </DialogTitle>
          {/* Close button is handled by DialogPrimitive.Close usually, but we can add custom actions here if needed */}
        </DialogHeader>
        
        <div className="flex-1 bg-slate-100 p-8 overflow-auto flex items-center justify-center">
          <div className="bg-white shadow-lg w-full max-w-2xl aspect-[3/4] flex flex-col items-center justify-center border border-border">
            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Preview of Document Here</h3>
            <p className="text-sm text-slate-500 max-w-xs text-center">
              This is a simulated preview for {fileName}. In a real application, the PDF or image content would be rendered here.
            </p>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border bg-white">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Original
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
