import { Download, Share, MoreVertical, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Report } from '@/pages/ReportsPage';
import { ReportModalPreview } from './ReportModalPreview';

interface ReportTableProps {
  reports: Report[];
}

export function ReportTable({ reports }: ReportTableProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl font-semibold">📊 Rapor Listesi</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Toplam {reports.length} rapor
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="font-semibold">Rapor Adı</TableHead>
              <TableHead className="font-semibold">Oluşturan</TableHead>
              <TableHead className="font-semibold">Tarih</TableHead>
              <TableHead className="font-semibold">Kategori</TableHead>
              <TableHead className="text-right font-semibold">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow 
                key={report.id}
                className="hover:bg-muted/30 transition-colors border-b last:border-b-0"
              >
                <TableCell className="font-medium py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {report.name}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {report.creator.charAt(0)}
                      </span>
                    </div>
                    {report.creator}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-muted-foreground">{report.date}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {report.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('İndiriliyor:', report.name);
                      }}
                      className="h-8"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      İndir
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Paylaşılıyor:', report.name);
                      }}
                      className="h-8"
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Paylaş
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          className="h-8"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ön İzle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl h-[90vh] overflow-hidden p-0">
                        <ReportModalPreview report={report} />
                      </DialogContent>
                    </Dialog>
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