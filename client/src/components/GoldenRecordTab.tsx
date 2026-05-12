import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Box, Layers, Tag, Info, CheckCircle, AlertTriangle, FileText, Database, CheckCircle2, Camera } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock Data for Golden Record Tree
const productData = [
  {
    id: 'PROD-00451',
    name: 'Nike Dri-FIT Crew Neck T-Shirt',
    type: 'Product',
    attributes: {
      Brand: { value: 'Nike', source: 'Tech Pack (pg. 1)', confidence: 'High' },
      Category: { value: 'T-Shirts', source: 'AI Classification', confidence: 'High' },
      Material: { value: '100% Polyester', source: 'Tech Pack (pg. 3)', confidence: 'High' },
      Season: { value: 'SS26', source: 'Tech Pack (pg. 1)', confidence: 'High' },
    },
    variants: [
      {
        id: 'VAR-00451-NVY',
        name: 'Navy Blue',
        type: 'Variant',
        color: '#001F3F',
        status: 'Validated',
        skus: [
          { id: 'NK-DRI-NVY-S', size: 'S', price: 'AED 129.00', stock: 300 },
          { id: 'NK-DRI-NVY-M', size: 'M', price: 'AED 129.00', stock: 450 },
          { id: 'NK-DRI-NVY-L', size: 'L', price: 'AED 129.00', stock: 350 },
        ]
      },
      {
        id: 'VAR-00451-WHT',
        name: 'White',
        type: 'Variant',
        color: '#FFFFFF',
        status: 'Needs Review',
        warning: 'Missing: Size L inventory data',
        skus: [
          { id: 'NK-DRI-WHT-S', size: 'S', price: 'AED 129.00', stock: 120 },
          { id: 'NK-DRI-WHT-M', size: 'M', price: 'AED 129.00', stock: 200 },
        ]
      }
    ]
  },
  {
    id: 'CD0881-001',
    name: 'Classic Denim Jacket',
    type: 'Product',
    attributes: {
      Brand: { value: 'Levi\'s', source: 'Catalog 2026 (pg. 12)', confidence: 'High' },
      Category: { value: 'Jackets', source: 'AI Classification', confidence: 'High' },
      Material: { value: '100% Cotton', source: 'Catalog 2026 (pg. 12)', confidence: 'High' },
      Season: { value: 'FW26', source: 'Catalog 2026 (pg. 1)', confidence: 'High' },
    },
    variants: [
      {
        id: 'VAR-CD0881-MED',
        name: 'Medium Wash',
        type: 'Variant',
        color: '#5D8AA8',
        status: 'Validated',
        skus: [
          { id: 'ZR-DNM-MED-XS', size: 'XS', price: 'AED 299.00', stock: 75 },
          { id: 'ZR-DNM-MED-S', size: 'S', price: 'AED 299.00', stock: 120 },
          { id: 'ZR-DNM-MED-M', size: 'M', price: 'AED 299.00', stock: 85 },
          { id: 'ZR-DNM-MED-L', size: 'L', price: 'AED 299.00', stock: 60 },
        ]
      }
    ]
  },
  {
    id: 'XY5678-BLK',
    name: 'Wide Leg Linen Trousers',
    type: 'Product',
    attributes: {
      Brand: { value: 'Mango', source: 'Line Sheet (pg. 8)', confidence: 'Medium' },
      Category: { value: 'Trousers', source: 'AI Classification', confidence: 'High' },
      Material: { value: '100% Linen', source: 'Line Sheet (pg. 8)', confidence: 'High' },
      Season: { value: 'SS26', source: 'Line Sheet (pg. 1)', confidence: 'High' },
    },
    variants: [
      {
        id: 'VAR-XY5678-BLK',
        name: 'Black',
        type: 'Variant',
        color: '#000000',
        status: 'Validated',
        skus: [
          { id: 'MG-LIN-BLK-36', size: '36', price: 'AED 199.00', stock: 100 },
          { id: 'MG-LIN-BLK-38', size: '38', price: 'AED 199.00', stock: 150 },
        ]
      }
    ]
  }
];

export default function GoldenRecordTab() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['PROD-00451', 'VAR-00451-NVY', 'CD0881-001']));
  const [selectedNode, setSelectedNode] = useState<any>(productData[0]);

  const toggleNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      {/* Left Panel: Product Hierarchy Tree */}
      <Card className="lg:col-span-2 flex flex-col h-full">
        <CardHeader className="pb-2 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-navy-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-coral-500" />
              Product Hierarchy
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 cursor-help">
                    Completeness: 94%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p className="font-semibold mb-1">✓ 32 of 34 required fields populated</p>
                    <p className="text-slate-500 mb-1">Missing:</p>
                    <ul className="list-disc pl-3 space-y-0.5">
                      <li>Product description (EN)</li>
                      <li>Care instructions</li>
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-slate-500">Interactive view of the unified Golden Record.</p>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {productData.map((product) => (
            <div key={product.id} className="space-y-1">
              {/* Product Node */}
              <div 
                className={cn(
                  "border rounded-lg p-3 cursor-pointer transition-colors",
                  selectedNode.id === product.id ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-blue-200"
                )}
                onClick={() => setSelectedNode(product)}
              >
                <div className="flex items-center gap-2">
                  <button onClick={(e) => toggleNode(product.id, e)} className="p-1 hover:bg-slate-200 rounded">
                    {expandedNodes.has(product.id) ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                  </button>
                  <Box className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-navy-900">{product.name}</span>
                  <span className="text-xs font-mono text-slate-400 ml-auto">{product.id}</span>
                </div>
              </div>

              {/* Variants */}
              {expandedNodes.has(product.id) && (
                <div className="pl-6 space-y-1 border-l-2 border-slate-100 ml-3 py-1">
                  {product.variants.map(variant => (
                    <div key={variant.id}>
                      <div 
                        className={cn(
                          "border rounded-lg p-2 cursor-pointer transition-colors flex items-center gap-2",
                          selectedNode.id === variant.id ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-blue-200"
                        )}
                        onClick={() => setSelectedNode(variant)}
                      >
                        <button onClick={(e) => toggleNode(variant.id, e)} className="p-1 hover:bg-slate-200 rounded">
                          {expandedNodes.has(variant.id) ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                        </button>
                        <Layers className="w-4 h-4 text-purple-600" />
                        <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: variant.color }}></div>
                        <span className="text-sm font-medium text-slate-700">{variant.name}</span>
                        {variant.status === 'Validated' ? (
                          <CheckCircle className="w-3 h-3 text-green-500 ml-2" />
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="w-3 h-3 text-amber-500 ml-2" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{variant.warning || 'Review required'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        <span className="text-xs font-mono text-slate-400 ml-auto">{variant.id}</span>
                      </div>

                      {/* SKUs */}
                      {expandedNodes.has(variant.id) && (
                        <div className="pl-6 space-y-1 border-l-2 border-slate-100 ml-3 py-1">
                          {variant.skus.map(sku => (
                            <div 
                              key={sku.id}
                              className={cn(
                                "border rounded p-2 cursor-pointer transition-colors flex items-center gap-2 text-sm",
                                selectedNode.id === sku.id ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 hover:border-blue-200"
                              )}
                              onClick={() => setSelectedNode(sku)}
                            >
                              <Tag className="w-3 h-3 text-slate-400" />
                              <span className="font-medium text-slate-700">Size {sku.size}</span>
                              <span className="text-slate-500">• {sku.price}</span>
                              <span className="text-slate-500">• {sku.stock} units</span>
                              <span className="text-xs font-mono text-slate-400 ml-auto">{sku.id}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
        
        {/* Export Readiness Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-semibold text-navy-900">Export Readiness</h4>
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
              <CheckCircle2 className="w-3 h-3" />
              All conflicts resolved
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
            <Camera className="w-3 h-3" />
            3 product images included in export
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Export to Akeneo</Button>
            <Button size="sm" variant="outline" className="flex-1">Download JSON</Button>
          </div>
        </div>
      </Card>

      {/* Right Panel: Data Provenance */}
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold text-navy-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-slate-500" />
            Data Provenance
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          {selectedNode.type === 'Product' ? (
            <div className="space-y-4">
              <div className="text-sm text-slate-500 mb-4">
                Showing data sources for <span className="font-medium text-navy-900">{selectedNode.name}</span>
              </div>
              
              {Object.entries(selectedNode.attributes).map(([key, data]: [string, any]) => (
                <div key={key} className="border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{key}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-green-50 text-green-700 border-green-200 cursor-help">
                            {data.confidence} Confidence
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>High confidence: Multiple sources agree</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="font-medium text-navy-900 mb-1">{data.value}</div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <FileText className="w-3 h-3" />
                    Source: {data.source}
                  </div>
                </div>
              ))}

              {/* Data Conflict Resolved Section */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-navy-900">Data Conflict Resolved</span>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WHOLESALE PRICE</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 rounded text-sm text-slate-400 bg-slate-50">
                      <div className="flex flex-col">
                        <span className="font-medium">Invoice #INV-24001</span>
                        <span className="text-xs">Rejected Source</span>
                      </div>
                      <span className="line-through decoration-slate-400">AED 24.00</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 rounded text-sm bg-green-50 border border-green-100 text-green-900">
                      <div className="flex flex-col">
                        <span className="font-medium">Line Sheet (Newer)</span>
                        <span className="text-xs text-green-700">Selected Source</span>
                      </div>
                      <span className="font-bold">AED 22.00</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <p>System auto-selected the newer document source. Manually overridable by buyer.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-4">
              <Info className="w-12 h-12 mb-3 opacity-20" />
              <p>Select the top-level <strong>Product</strong> node to view detailed attribute provenance.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
