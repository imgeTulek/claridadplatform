import { MainLayout } from '@/components/layout/MainLayout';
import { ReportTable } from '@/components/reports/ReportTable';
import { CreateReportModal } from '@/components/reports/CreateReportModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export interface Report {
  id: string;
  name: string;
  creator: string;
  date: string;
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="h-full flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Raporlar</h1>
            <p className="text-muted-foreground">
              Oluşturulan raporları görüntüleyin, indirin ve paylaşın
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Rapor Oluştur
          </Button>
        </div>
        
        <div className="flex-1">
          <ReportTable reports={mockReports} />
        </div>

        <CreateReportModal 
          open={isCreateModalOpen} 
          onOpenChange={setIsCreateModalOpen} 
        />
      </div>
    </MainLayout>
  );
}