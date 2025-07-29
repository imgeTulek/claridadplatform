import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ReportTable } from '@/components/reports/ReportTable';
import { ReportPreview } from '@/components/reports/ReportPreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export interface Report {
  id: string;
  name: string;
  creator: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  category: string;
  summary: {
    sales: string;
    growth: string;
    topLocation: string;
  };
  description: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Aylık Satış Raporu 1',
    creator: 'Kullanıcı 1',
    date: '2023-01-15',
    status: 'completed',
    category: 'Finansal Analiz',
    summary: {
      sales: '12,500₺',
      growth: '%14.3',
      topLocation: 'İstanbul'
    },
    description: 'Bu rapor son 30 günlük satış verilerini analiz eder.'
  },
  {
    id: '2',
    name: 'Aylık Satış Raporu 2',
    creator: 'Kullanıcı 2',
    date: '2023-02-15',
    status: 'in-progress',
    category: 'Finansal Analiz',
    summary: {
      sales: '8,750₺',
      growth: '%8.1',
      topLocation: 'Ankara'
    },
    description: 'Şubat ayı satış performans raporu.'
  },
  {
    id: '3',
    name: 'Aylık Satış Raporu 3',
    creator: 'Kullanıcı 3',
    date: '2023-03-15',
    status: 'scheduled',
    category: 'Finansal Analiz',
    summary: {
      sales: '0₺',
      growth: '%0',
      topLocation: '-'
    },
    description: 'Mart ayı için planlanmış satış raporu.'
  }
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Raporlar</h1>
          <p className="text-muted-foreground mt-2">
            Oluşturulan raporları görüntüleyin ve yönetin
          </p>
        </div>
        
        <div className="flex-1 min-h-0">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={60} minSize={40}>
              <ReportTable 
                reports={mockReports}
                onPreview={setSelectedReport}
                selectedReportId={selectedReport?.id}
              />
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={40} minSize={30}>
              <ReportPreview report={selectedReport} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </MainLayout>
  );
}