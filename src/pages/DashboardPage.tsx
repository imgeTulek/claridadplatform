
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Download, 
  Share2, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Factory,
  PackageOpen,
  Recycle,
  Gauge,
  Workflow,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- ÖRNEK VERİLER (Mock) ---
const gunlukUretim = [
  { gun: '01 Eyl', adet: 920 },
  { gun: '02 Eyl', adet: 1040 },
  { gun: '03 Eyl', adet: 980 },
  { gun: '04 Eyl', adet: 1125 },
  { gun: '05 Eyl', adet: 1200 },
  { gun: '06 Eyl', adet: 1080 },
  { gun: '07 Eyl', adet: 1250 },
];

const vardiyaOEE = [
  { vardiya: 'V1', oee: 76, kullanılabilirlik: 88, performans: 86, kalite: 98 },
  { vardiya: 'V2', oee: 81, kullanılabilirlik: 90, performans: 89, kalite: 95 },
  { vardiya: 'V3', oee: 73, kullanılabilirlik: 85, performans: 84, kalite: 96 },
];

const hurdaDagilim = [
  { neden: 'Boyutsal Hata', deger: 420 },
  { neden: 'Yüzey Kusuru', deger: 260 },
  { neden: 'Montaj Hatası', deger: 180 },
  { neden: 'Hammadde', deger: 140 },
];

const hammaddeTuketim = [
  { ad: 'Hafta 1', kg: 1420 },
  { ad: 'Hafta 2', kg: 1510 },
  { ad: 'Hafta 3', kg: 1380 },
  { ad: 'Hafta 4', kg: 1605 },
];

const HURDA_RENKLER = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];

export default function DashboardPage() {
  const [aktifHat, setAktifHat] = useState<'HAT-1' | 'HAT-2' | 'Tümü'>('Tümü');
  const [aktifVardiya, setAktifVardiya] = useState<'V1' | 'V2' | 'V3' | 'Tümü'>('Tümü');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Üst Başlık + Aksiyonlar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Üretim Panosu</h1>
            <p className="text-gray-500">Hat, vardiya ve kalite metriklerinin özeti</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Dışa Aktar
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Paylaş
            </Button>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" /> Yeni KPI
            </Button>
          </div>
        </div>

        {/* Filtre Çubuğu */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" variant="outline">Bugün</Button>
                <Button size="sm" variant="outline">7G</Button>
                <Button size="sm" variant="outline">30G</Button>
                <Button size="sm" variant="outline">YTD</Button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Tabs value={aktifHat} onValueChange={(v:any)=>setAktifHat(v)}>
                  <TabsList>
                    <TabsTrigger value="Tümü">Tüm Hatlar</TabsTrigger>
                    <TabsTrigger value="HAT-1">HAT-1</TabsTrigger>
                    <TabsTrigger value="HAT-2">HAT-2</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Tabs value={aktifVardiya} onValueChange={(v:any)=>setAktifVardiya(v)}>
                  <TabsList>
                    <TabsTrigger value="Tümü">Tüm Vardiyalar</TabsTrigger>
                    <TabsTrigger value="V1">V1</TabsTrigger>
                    <TabsTrigger value="V2">V2</TabsTrigger>
                    <TabsTrigger value="V3">V3</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Button variant="outline" className="gap-2"><Filter className="h-4 w-4"/> Gelişmiş Filtre</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Kartları */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Toplam Üretim</CardTitle>
                <CardDescription>Son 7 gün (adet)</CardDescription>
              </div>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.595</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +8.1%
                </span> önceki haftaya göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">OEE</CardTitle>
                <CardDescription>Genel Ekipman Etkinliği</CardDescription>
              </div>
              <Gauge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.6%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +1.9 puan
                </span> bir önceki döneme göre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Fire Oranı</CardTitle>
                <CardDescription>Son 7 gün</CardDescription>
              </div>
              <Recycle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.9%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 inline-flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3" /> +0.4 puan
                </span> iyileştirme gerekli
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Hammadde Tüketimi</CardTitle>
                <CardDescription>Kg (haftalık)</CardDescription>
              </div>
              <PackageOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.605 kg</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 inline-flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> -1.7%
                </span> verimlilik artışı
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Grafikler */}
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          {/* Günlük Üretim */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Günlük Üretim</CardTitle>
                  <CardDescription>Son 7 gün toplam üretim (adet)</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gunlukUretim} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="gun" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                      <linearGradient id="uAdet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="adet" stroke="#22c55e" fillOpacity={1} fill="url(#uAdet)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Vardiya Bazlı OEE */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vardiya Bazlı OEE</CardTitle>
                  <CardDescription>Kullanılabilirlik / Performans / Kalite</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vardiyaOEE}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vardiya" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="kullanılabilirlik"/>
                    <Bar dataKey="performans"/>
                    <Bar dataKey="kalite"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          {/* Hurda Nedenleri */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hurda Nedenleri</CardTitle>
                  <CardDescription>Son 30 gün (adet)</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={hurdaDagilim} cx="50%" cy="50%" outerRadius={100} dataKey="deger" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {hurdaDagilim.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={HURDA_RENKLER[index % HURDA_RENKLER.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hammadde Tüketimi */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hammadde Tüketimi</CardTitle>
                  <CardDescription>Haftalık toplam (kg)</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hammaddeTuketim}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ad" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kg" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Son Üretim Raporları */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Son Üretim Raporları</CardTitle>
                <CardDescription>Son 30 günde oluşturulan raporlar</CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <Workflow className="h-4 w-4" /> Tüm Raporları Gör
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Rapor Adı</th>
                    <th className="px-4 py-3 text-left font-medium">Hat / Operatör</th>
                    <th className="px-4 py-3 text-left font-medium">Tarih</th>
                    <th className="px-4 py-3 text-left font-medium">Durum</th>
                    <th className="px-4 py-3 text-left font-medium">Aksiyonlar</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-3">
                        <div className="font-medium">Günlük Üretim Özeti #{i + 1}</div>
                        <div className="text-xs text-muted-foreground">
                          {i % 2 === 0 ? 'Vardiya Karşılaştırma' : 'Kalite & Hurda Analizi'}
                        </div>
                      </td>
                      <td className="px-4 py-3">{i % 2 === 0 ? 'HAT-1 / Operatör A' : 'HAT-2 / Operatör B'}</td>
                      <td className="px-4 py-3">2025-09-0{i + 1}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          i % 3 === 0 
                            ? 'bg-green-100 text-green-800' 
                            : i % 3 === 1 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {i % 3 === 0 ? 'Tamamlandı' : i % 3 === 1 ? 'Devam Ediyor' : 'Planlandı'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
