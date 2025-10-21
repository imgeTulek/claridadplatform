import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface QueryAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  queryText: string;
}

// Mock data for detailed analysis
const productionTrendData = [
  { day: '1 Eyl', hedef: 1200, gercek: 920, fark: -280 },
  { day: '2 Eyl', hedef: 1200, gercek: 1040, fark: -160 },
  { day: '3 Eyl', hedef: 1200, gercek: 980, fark: -220 },
  { day: '4 Eyl', hedef: 1200, gercek: 1125, fark: -75 },
  { day: '5 Eyl', hedef: 1200, gercek: 1200, fark: 0 },
  { day: '6 Eyl', hedef: 1200, gercek: 1080, fark: -120 },
  { day: '7 Eyl', hedef: 1200, gercek: 1250, fark: 50 },
];

const shiftPerformanceData = [
  { name: 'Vardiya 1', uretim: 3420, oee: 78, kalite: 96 },
  { name: 'Vardiya 2', uretim: 3680, oee: 83, kalite: 98 },
  { name: 'Vardiya 3', uretim: 3095, oee: 71, kalite: 94 },
];

const downtimeReasonData = [
  { name: 'Planlı Bakım', value: 45, color: '#3b82f6' },
  { name: 'Arıza', value: 32, color: '#ef4444' },
  { name: 'Malzeme Beklemesi', value: 18, color: '#f59e0b' },
  { name: 'Kalite Kontrol', value: 12, color: '#10b981' },
  { name: 'Diğer', value: 8, color: '#8b5cf6' },
];

const qualityMetrics = [
  { metric: 'İlk Geçiş Kalite Oranı', value: '96.3%', trend: 'up', change: '+2.1%' },
  { metric: 'Hurda Oranı', value: '3.7%', trend: 'down', change: '-0.8%' },
  { metric: 'Yeniden İşleme', value: '1.2%', trend: 'down', change: '-0.3%' },
];

export const QueryAnalysisModal = ({ open, onOpenChange, queryText }: QueryAnalysisModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detaylı Üretim Analizi Raporu</DialogTitle>
          <DialogDescription>
            Sorgunuz için kapsamlı analiz ve öneriler
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Query Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analiz Edilen Sorgu</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm bg-muted p-3 rounded block overflow-x-auto">
                {queryText || "SELECT hat_id, vardiya, SUM(uretim_adedi) as toplam_uretim, AVG(oee) as ortalama_oee FROM uretim WHERE tarih >= '2025-09-01' GROUP BY hat_id, vardiya"}
              </code>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Anahtar Bulgular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Vardiya 2 En Yüksek Performansı Gösteriyor</p>
                  <p className="text-sm text-muted-foreground">%83 OEE değeri ile diğer vardiyaların %7 üzerinde performans sergiledi</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Vardiya 3'te Verimlilik Düşüklüğü</p>
                  <p className="text-sm text-muted-foreground">%71 OEE ile hedefin altında. Duruş analizi gerekiyor</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Haftalık Trend Pozitif</p>
                  <p className="text-sm text-muted-foreground">Son 3 günde hedeflere yakınsama gözlemlendi, 7 Eylül hedefe %4.2 üzerinde</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Üretim Trendi: Hedef vs Gerçekleşen</CardTitle>
              <CardDescription>Son 7 günlük performans karşılaştırması</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productionTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hedef" stroke="#94a3b8" strokeWidth={2} name="Hedef" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="gercek" stroke="#3b82f6" strokeWidth={2} name="Gerçekleşen" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Shift Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vardiya Bazlı Performans Analizi</CardTitle>
              <CardDescription>Üretim, OEE ve kalite metriklerinin karşılaştırılması</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shiftPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="uretim" fill="#3b82f6" name="Üretim (adet)" />
                    <Bar yAxisId="right" dataKey="oee" fill="#10b981" name="OEE (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Grid Layout for Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Downtime Reasons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Duruş Nedenleri Dağılımı</CardTitle>
                <CardDescription>Toplam 115 dakika duruş analizi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={downtimeReasonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {downtimeReasonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kalite Metrikleri</CardTitle>
                <CardDescription>Haftalık kalite performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityMetrics.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{item.metric}</p>
                        <p className="text-2xl font-bold mt-1">{item.value}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        )}
                        <Badge variant={item.trend === 'up' ? 'default' : 'secondary'}>
                          {item.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aksiyon Önerileri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 border-l-4 border-amber-500 bg-muted/50">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Vardiya 3 Optimizasyonu</p>
                    <p className="text-sm text-muted-foreground">Duruş nedenlerini analiz edin. Özellikle arıza ve malzeme beklemesi sürelerini azaltmaya odaklanın.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 border-l-4 border-blue-500 bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Vardiya 2 Best Practices</p>
                    <p className="text-sm text-muted-foreground">V2'nin başarılı uygulamalarını diğer vardiyalara aktarın. Ekip çalışması ve bakım rutinlerini inceleyin.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 border-l-4 border-green-500 bg-muted/50">
                  <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Planlı Bakım Optimizasyonu</p>
                    <p className="text-sm text-muted-foreground">Planlı bakımlar toplam duruşun %39'unu oluşturuyor. Predictive maintenance geçişi değerlendirin.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
