import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Search, Filter, Grid, List, Upload, CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { assets, Asset } from '../data/assetManagerData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import GoldenRecordTab from '../components/GoldenRecordTab';

export default function AssetManager() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAssets = filterStatus === 'all' 
    ? assets 
    : assets.filter(a => a.status.toLowerCase().replace(' ', '-') === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validated': return 'bg-green-100 text-green-800 border-green-200';
      case 'Needs Review': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'Unmatched': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Asset Manager</h1>
          <p className="text-slate-500 mt-2">Manage digital assets and build your Golden Records.</p>
        </div>
        <div className="flex gap-3">
           <Button className="bg-coral-500 hover:bg-coral-600 text-white">
            <Upload className="mr-2 h-4 w-4" /> Upload Images
          </Button>
        </div>
      </div>

      <Tabs defaultValue="digital-assets" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="digital-assets">Digital Assets</TabsTrigger>
          <TabsTrigger value="golden-record">Golden Record</TabsTrigger>
        </TabsList>

        <TabsContent value="digital-assets" className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex gap-4 flex-1 w-full md:w-auto">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Search by product, color, brand..." className="pl-9" />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="validated">Validated</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="unmatched">Unmatched</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex bg-slate-100 rounded-md p-1">
                <Button variant="ghost" size="sm" className={cn("h-8 px-2", viewMode === 'grid' && "bg-white shadow-sm")} onClick={() => setViewMode('grid')}>
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className={cn("h-8 px-2", viewMode === 'list' && "bg-white shadow-sm")} onClick={() => setViewMode('list')}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-slate-500 font-medium px-2">
                {filteredAssets.length} Assets
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              <Card 
                key={asset.id} 
                className="group cursor-pointer hover:shadow-md transition-all duration-300 border-slate-200 overflow-hidden"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                  <img 
                    src={asset.imageUrl} 
                    alt={asset.productName} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={cn("shadow-sm border", getStatusColor(asset.status))}>
                      {asset.status === 'Validated' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {asset.status === 'Needs Review' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {asset.status === 'Flagged' && <XCircle className="w-3 h-3 mr-1" />}
                      {asset.confidence}%
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-navy-900 truncate" title={asset.productName}>{asset.productName}</h3>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{asset.color}</span>
                    <span>{asset.view}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {asset.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="golden-record">
           <GoldenRecordTab />
        </TabsContent>
      </Tabs>

      {/* Image Detail Sheet */}
      <Sheet open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <SheetContent className="w-[90%] sm:max-w-[600px] overflow-y-auto">
          {selectedAsset && (
            <div className="space-y-6 py-6">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-navy-900">{selectedAsset.productName}</SheetTitle>
                <SheetDescription>
                  Asset ID: {selectedAsset.id} • {selectedAsset.brand}
                </SheetDescription>
              </SheetHeader>

              <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                <img src={selectedAsset.imageUrl} alt={selectedAsset.productName} className="w-full h-full object-contain" />
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Search className="w-4 h-4 mr-2" /> AI Visual Analysis
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-slate-500">Primary Color:</span>
                    <span className="font-medium text-slate-900">{selectedAsset.aiAnalysis.primaryColor}</span>
                    <span className="text-slate-500">Garment Type:</span>
                    <span className="font-medium text-slate-900">{selectedAsset.aiAnalysis.garmentType}</span>
                    <span className="text-slate-500">Pattern:</span>
                    <span className="font-medium text-slate-900">{selectedAsset.aiAnalysis.pattern}</span>
                    <span className="text-slate-500">Confidence:</span>
                    <span className="font-medium text-slate-900">{selectedAsset.confidence}%</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-navy-900 mb-3">Cross-Validation Results</h4>
                  <div className="space-y-3">
                    {selectedAsset.crossValidation.length > 0 ? (
                      selectedAsset.crossValidation.map((cv, idx) => (
                        <div key={idx} className="flex items-start justify-between text-sm border-b border-slate-100 last:border-0 pb-2 last:pb-0">
                          <div>
                            <span className="font-medium text-slate-700 block">{cv.field}</span>
                            <span className="text-xs text-slate-500">Doc: "{cv.docValue}" → Img: "{cv.imageValue}"</span>
                          </div>
                          {cv.match ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Match</Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">Mismatch</Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 italic">No cross-validation rules triggered.</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Approve Asset</Button>
                  <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
