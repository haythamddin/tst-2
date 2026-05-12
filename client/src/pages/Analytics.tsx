import { useLocation } from "wouter";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Filter
} from "lucide-react";
import InfoTooltip from "@/components/InfoTooltip";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const [, setLocation] = useLocation();

  const volumeData = [
    { day: "1", docs: 12 }, { day: "5", docs: 18 }, { day: "10", docs: 15 },
    { day: "15", docs: 25 }, { day: "20", docs: 32 }, { day: "25", docs: 45 },
    { day: "30", docs: 58 }
  ];

  const supplierData = [
    { name: "Zara", value: 42 },
    { name: "H&M", value: 31 },
    { name: "Mango", value: 24 },
    { name: "Other", value: 30 },
  ];

  const languageData = [
    { name: "English", value: 60, color: "#1A2744" },
    { name: "Arabic", value: 40, color: "#E85D4C" },
  ];

  return (
    <Layout>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-primary">Processing Insights</h1>
            <InfoTooltip content="Key performance indicators and processing metrics for the selected period." />
          </div>
            <p className="text-muted-foreground">Performance metrics and ROI analysis</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Documents Processed</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-primary">127</div>
              <div className="flex items-center text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                23% MoM
              </div>
            </div>
          </Card>
          <Card className="p-6 border-border shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Avg. Time per Doc</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-primary">6m</div>
              <div className="text-sm text-muted-foreground mb-1">vs 45m manual</div>
            </div>
          </Card>
          <Card className="p-6 border-border shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Field Accuracy</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground mb-1">Field-level validation</div>
            </div>
          </Card>
          <Card className="p-6 border-border shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">Mismatches Detected</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-bold text-primary">23</div>
              <div className="text-sm font-medium text-green-600 mb-1">~$47K returns prevented</div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Volume Trend */}
          <Card className="p-6 border-border shadow-sm">
            <h3 className="font-bold mb-6">Processing Volume Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E1E5EB" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#5A6578'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#5A6578'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="docs" 
                    stroke="#E85D4C" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: "#E85D4C", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top Suppliers */}
          <Card className="p-6 border-border shadow-sm">
            <h3 className="font-bold mb-6">Top Suppliers by Volume</h3>
            <div className="space-y-6">
              {supplierData.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground">{item.value} docs</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(item.value / 42) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Language Distribution */}
          <Card className="p-6 border-border shadow-sm flex flex-col h-full">
            <h3 className="font-bold mb-6">Language Distribution</h3>
            <div className="flex-1 min-h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Total</div>
                  <div className="text-xs text-muted-foreground">Distribution</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {languageData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Document Types */}
          <Card className="p-6 border-border shadow-sm lg:col-span-2">
            <h3 className="font-bold mb-6">Document Types</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Tech Packs", value: "45%", color: "bg-blue-100 text-blue-700" },
                { label: "Line Sheets", value: "38%", color: "bg-purple-100 text-purple-700" },
                { label: "Invoices", value: "17%", color: "bg-orange-100 text-orange-700" },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg ${item.color} flex flex-col items-center justify-center text-center h-32`}>
                  <div className="text-3xl font-bold mb-1">{item.value}</div>
                  <div className="text-sm font-medium opacity-80">{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
