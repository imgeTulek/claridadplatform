import { Download, Share, MoreVertical, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Report } from '@/pages/ReportsPage';

interface ReportTableProps {
  reports: Report[];
  onPreview: (report: Report) => void;
  selectedReportId?: string;
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

export function ReportTable({ reports, onPreview, selectedReportId }: ReportTableProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Rapor Listesi</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rapor Adı</TableHead>
              <TableHead>Oluşturan</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow 
                key={report.id}
                className={`cursor-pointer transition-colors ${
                  selectedReportId === report.id ? 'bg-accent' : 'hover:bg-muted/50'
                }`}
                onClick={() => onPreview(report)}
              >
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.creator}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{getStatusBadge(report.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('İndiriliyor:', report.name);
                      }}
                      title="İndir"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Paylaşılıyor:', report.name);
                      }}
                      title="Paylaş"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Diğer işlemler:', report.name);
                      }}
                      title="Diğer İşlemler"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(report);
                      }}
                      title="Ön İzle"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}