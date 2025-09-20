
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Production-focused sample data
const defaultProductionData = [
  { name: '01 Eyl', value: 920 },
  { name: '02 Eyl', value: 1040 },
  { name: '03 Eyl', value: 980 },
  { name: '04 Eyl', value: 1125 },
  { name: '05 Eyl', value: 1200 },
  { name: '06 Eyl', value: 1080 },
  { name: '07 Eyl', value: 1250 },
];

const dailyProductionData = [
  { day: '01/09', production: 920 },
  { day: '02/09', production: 1040 },
  { day: '03/09', production: 980 },
  { day: '04/09', production: 1125 },
  { day: '05/09', production: 1200 },
  { day: '06/09', production: 1080 },
  { day: '07/09', production: 1250 },
];

const oeeByShiftData = [
  { name: 'V1', value: 76 },
  { name: 'V2', value: 81 },
  { name: 'V3', value: 73 },
];

const scrapReasonsData = [
  { name: 'Boyutsal Hata', value: 420 },
  { name: 'Yüzey Kusuru', value: 260 },
  { name: 'Montaj Hatası', value: 180 },
  { name: 'Hammadde', value: 140 },
];

const chartConfig = {
  production: {
    label: 'Üretim',
    theme: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
  },
  oee: {
    label: 'OEE',
    theme: {
      light: '#10b981',
      dark: '#34d399',
    },
  },
  quality: {
    label: 'Kalite',
    theme: {
      light: '#f59e0b',
      dark: '#fbbf24',
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
      case "production":
        return dailyProductionData;
      case "oee":
        return oeeByShiftData;
      case "quality":
        return scrapReasonsData;
      default:
        return defaultProductionData;
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
                    dataKey={activeDataset === "production" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey={activeDataset === "production" ? "production" : "value"} 
                    name={activeDataset === "production" ? "üretim" : activeDataset === "oee" ? "oee" : activeDataset === "quality" ? "hurda" : "değer"}
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
                    dataKey={activeDataset === "production" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey={activeDataset === "production" ? "production" : "value"} 
                    name={activeDataset === "production" ? "üretim" : activeDataset === "oee" ? "oee" : activeDataset === "quality" ? "hurda" : "değer"}
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
                    dataKey={activeDataset === "production" ? "day" : "name"} 
                    tick={{ fill: 'var(--color-foreground)' }} 
                  />
                  <YAxis tick={{ fill: 'var(--color-foreground)' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey={activeDataset === "production" ? "production" : "value"} 
                    name={activeDataset === "production" ? "üretim" : activeDataset === "oee" ? "oee" : activeDataset === "quality" ? "hurda" : "değer"}
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
                    dataKey={activeDataset === "production" ? "production" : "value"}
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
