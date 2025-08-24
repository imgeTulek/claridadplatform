
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Sample data for different visualizations
const sampleData = [
  { name: 'Oca', value: 400 },
  { name: 'Şub', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Nis', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Haz', value: 900 },
  { name: 'Tem', value: 1000 },
];

const dailySalesData = [
  { day: '01/01', sales: 120 },
  { day: '01/02', sales: 180 },
  { day: '01/03', sales: 250 },
  { day: '01/04', sales: 300 },
  { day: '01/05', sales: 280 },
  { day: '01/06', sales: 220 },
  { day: '01/07', sales: 170 },
];

const productRevenueData = [
  { name: 'Ürün A', value: 12000 },
  { name: 'Ürün B', value: 8000 },
  { name: 'Ürün C', value: 15000 },
  { name: 'Ürün D', value: 6000 },
  { name: 'Ürün E', value: 9000 },
];

const chartConfig = {
  sales: {
    label: 'Satışlar',
    theme: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
  },
  revenue: {
    label: 'Gelir',
    theme: {
      light: '#10b981',
      dark: '#34d399',
    },
  },
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

interface QueryVisualizationProps {
  activeDataset: string;
}

export const QueryVisualization = ({ activeDataset }: QueryVisualizationProps) => {
  const [activeChart, setActiveChart] = useState("area");

  // Get the appropriate data for visualization based on the active dataset
  const getVisualizationData = () => {
    switch (activeDataset) {
      case "sales":
        return dailySalesData;
      case "revenue":
        return productRevenueData;
      default:
        return sampleData;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Görselleştirme</CardTitle>
          <Tabs 
            defaultValue={activeChart} 
            className="w-auto"
            onValueChange={(value) => setActiveChart(value)}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="area" className="px-2 text-xs">Alan</TabsTrigger>
              <TabsTrigger value="bar" className="px-2 text-xs">Çubuk</TabsTrigger>
              <TabsTrigger value="line" className="px-2 text-xs">Çizgi</TabsTrigger>
              <TabsTrigger value="pie" className="px-2 text-xs">Pasta</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CardDescription>Sorgu sonuçlarının görsel temsili</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {activeChart === 'area' && (
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getVisualizationData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-sales, #3b82f6)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-sales, #3b82f6)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={activeDataset === "sales" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey={activeDataset === "sales" ? "sales" : "value"} 
                    name={activeDataset === "revenue" ? "gelir" : activeDataset === "sales" ? "satışlar" : "değer"}
                    stroke="var(--color-sales, #3b82f6)" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
          
          {activeChart === 'bar' && (
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getVisualizationData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={activeDataset === "sales" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey={activeDataset === "sales" ? "sales" : "value"} 
                    name={activeDataset === "revenue" ? "gelir" : activeDataset === "sales" ? "satışlar" : "değer"}
                    fill="var(--color-sales, #3b82f6)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
          
          {activeChart === 'line' && (
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getVisualizationData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={activeDataset === "sales" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey={activeDataset === "sales" ? "sales" : "value"} 
                    name={activeDataset === "revenue" ? "gelir" : activeDataset === "sales" ? "satışlar" : "değer"}
                    stroke="var(--color-sales, #3b82f6)" 
                    strokeWidth={2}
                    dot={{ fill: "var(--color-sales, #3b82f6)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
          
          {activeChart === 'pie' && (
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getVisualizationData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={activeDataset === "sales" ? "sales" : "value"}
                  >
                    {getVisualizationData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
