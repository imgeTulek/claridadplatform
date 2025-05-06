
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Lightbulb, ChevronsDown, ChevronsUp, BookOpen, Save, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { PromptToSqlAgent } from '@/components/PromptToSqlAgent';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { generateSqlFromNaturalLanguage } from '@/utils/nlToSql';

const sampleData = [
  { name: 'Oca', value: 400 },
  { name: 'Şub', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Nis', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Haz', value: 900 },
  { name: 'Tem', value: 1000 },
];

// Sample data for different visualizations
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

export default function QueriesPage() {
  const [query, setQuery] = useState("-- SQL sorgunuzu buraya yazın\nSELECT * FROM users WHERE created_at > '2023-01-01' LIMIT 10;");
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [activeChart, setActiveChart] = useState("area");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSqlExplanation, setGeneratedSqlExplanation] = useState("");
  const [activeDataset, setActiveDataset] = useState("default");
  const [activeTab, setActiveTab] = useState("sql");
  
  const { toast } = useToast();
  
  const handleRunQuery = () => {
    toast({
      title: "Sorgu çalıştırıldı",
      description: "Sorgunuz başarıyla çalıştırıldı.",
    });
  };
  
  const handleGenerateSQL = async () => {
    if (naturalLanguage.trim() === "") {
      toast({
        title: "Boş sorgu",
        description: "Lütfen doğal dilde bir sorgu girin.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the utility function to generate SQL
      const result = await generateSqlFromNaturalLanguage(naturalLanguage);
      
      setQuery(result.sql);
      setGeneratedSqlExplanation(result.explanation || "");
      
      // Set active dataset based on the query content
      if (result.sql.toLowerCase().includes('sales') || result.sql.toLowerCase().includes('satış')) {
        setActiveDataset("sales");
      } else if (result.sql.toLowerCase().includes('revenue') || result.sql.toLowerCase().includes('product') || 
                result.sql.toLowerCase().includes('gelir') || result.sql.toLowerCase().includes('ürün')) {
        setActiveDataset("revenue");
      } else {
        setActiveDataset("default");
      }
      
      toast({
        title: "SQL oluşturuldu",
        description: "Açıklamanızdan SQL sorgusu oluşturuldu.",
      });
    } catch (error) {
      toast({
        title: "Oluşturma başarısız",
        description: "SQL oluşturulamadı. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sorgu Oluşturucu</h1>
          <p className="text-gray-500 dark:text-gray-400">SQL yazın veya doğal dil ile sorgular oluşturmak için AI kullanın</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <Tabs 
                  defaultValue="sql" 
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="sql">SQL Editör</TabsTrigger>
                    <TabsTrigger value="natural">Doğal Dil</TabsTrigger>
                    <TabsTrigger value="agent">SQL Aracı</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sql" className="space-y-4 pt-4">
                    <div>
                      <Textarea 
                        className="font-mono text-sm h-64 bg-gray-50 dark:bg-gray-800"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SQL sorgunuzu buraya yazın..."
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="default" 
                        className="gap-2"
                        onClick={handleRunQuery}
                      >
                        <Play className="h-4 w-4" /> Sorguyu Çalıştır
                      </Button>
                      <div className="space-x-2">
                        <Button variant="outline" className="gap-2">
                          <Save className="h-4 w-4" /> Kaydet
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <BookOpen className="h-4 w-4" /> Örnekler
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="natural" className="space-y-4 pt-4">
                    <div>
                      <Textarea 
                        className="h-24 bg-gray-50 dark:bg-gray-800"
                        value={naturalLanguage}
                        onChange={(e) => setNaturalLanguage(e.target.value)}
                        placeholder="İstediğiniz veriyi düz Türkçe ile açıklayın... (örn: 'En aktif kullanıcıları göster', 'Geçen aydaki satışları getir', 'Gelire göre en iyi ürünleri göster')"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="default" 
                        className="gap-2"
                        onClick={handleGenerateSQL}
                        disabled={isGenerating}
                      >
                        <Lightbulb className="h-4 w-4" /> {isGenerating ? 'Oluşturuluyor...' : 'SQL Oluştur'}
                      </Button>
                    </div>
                    
                    {query && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium">Oluşturulan SQL:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs whitespace-pre-wrap">{query}</pre>
                        </div>
                        
                        {generatedSqlExplanation && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <p className="text-xs text-blue-700 dark:text-blue-300">{generatedSqlExplanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="agent" className="space-y-4 pt-4">
                    <PromptToSqlAgent />
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
            
            {showResults && (
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">Sorgu Sonuçları</CardTitle>
                    <CardDescription>10 satır döndürüldü (0.23s)</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowResults(false)}
                  >
                    <ChevronsDown className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-2 text-left font-medium">kullanıcı_id</th>
                            <th className="px-4 py-2 text-left font-medium">isim</th>
                            <th className="px-4 py-2 text-left font-medium">e-posta</th>
                            <th className="px-4 py-2 text-left font-medium">kayıt_tarihi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2">{1000 + i}</td>
                              <td className="px-4 py-2">Kullanıcı {i + 1}</td>
                              <td className="px-4 py-2">kullanici{i + 1}@ornek.com</td>
                              <td className="px-4 py-2">2023-0{i + 1}-15</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Tüm satırları göster
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" /> Dışa Aktar
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Görselleştirme</CardTitle>
                  <Tabs 
                    defaultValue={activeChart} 
                    className="w-auto"
                    onValueChange={(value) => setActiveChart(value)}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="area" className="px-3">Alan</TabsTrigger>
                      <TabsTrigger value="bar" className="px-3">Çubuk</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>Sorgu sonuçlarının görsel temsili</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {activeChart === 'area' ? (
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
                  ) : (
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
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sorgu Geçmişi</CardTitle>
                <CardDescription>Son sorgularınız</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="text-sm border p-2 rounded hover:bg-muted cursor-pointer">
                      <p className="font-mono text-xs truncate">
                        {i === 0
                          ? "SELECT * FROM kullanıcılar LIMIT 10;"
                          : i === 1
                          ? "SELECT count(*) FROM siparişler GROUP BY durum;"
                          : "SELECT * FROM ürünler WHERE stok < 10;"
                        }
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{10 - i * 3} dakika önce çalıştırıldı</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  Tüm geçmişi görüntüle
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
