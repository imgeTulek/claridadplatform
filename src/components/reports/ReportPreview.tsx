import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Report } from '@/pages/ReportsPage';

interface ReportPreviewProps {
  report: Report | null;
}

const mockChartData = [
  { name: 'Ocak', value: 12500 },
  { name: 'Şubat', value: 8750 },
  { name: 'Mart', value: 15200 },
  { name: 'Nisan', value: 11800 },
];

export function ReportPreview({ report }: ReportPreviewProps) {
  if (!report) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">👁️ Rapor Ön İzleme</p>
            <p className="text-sm mt-2">Bir rapor seçin</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Tamamlandı</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Devam Ediyor</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🔵 Planlandı</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          👁️ Rapor Ön İzleme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Temel Bilgiler */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-muted-foreground">📄 Başlık:</span>
            <span className="text-sm font-semibold">{report.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">🧑 Kullanıcı:</span>
            <span className="text-sm">{report.creator}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">📅 Tarih:</span>
            <span className="text-sm">{report.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">🏷️ Kategori:</span>
            <span className="text-sm">{report.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Durum:</span>
            {getStatusBadge(report.status)}
          </div>
        </div>

        <Separator />

        {/* Özet Bilgiler */}
        {report.status === 'completed' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">📊 Özet:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">• Satışlar:</span>
                <span className="font-medium">{report.summary.sales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">• Artış:</span>
                <span className="font-medium text-green-600">{report.summary.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">• En çok satış yapan:</span>
                <span className="font-medium">{report.summary.topLocation}</span>
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Mini Grafik */}
        {report.status === 'completed' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">🔍 Mini Grafik</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <Separator />

        {/* Açıklama */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">📎 Açıklama / Notlar</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}