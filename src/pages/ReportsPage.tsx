import { MainLayout } from '@/components/layout/MainLayout';
import { ReportTable } from '@/components/reports/ReportTable';
import { CreateReportModal } from '@/components/reports/CreateReportModal';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

// ——— Arayüz Tipi: Mevcut ReportTable ile uyum için ana anahtarlar korunuyor
export interface Report {
  id: string;
  name: string; // Rapor Adı
  creator: string; // Oluşturan
  date: string; // ISO tarih
  category: string; // "Üretim", "Kalite", "Malzeme"
  summary: {
    sales: string; // Toplam üretim (adet)
    growth: string; // OEE veya kalite metriği
    topLocation: string; // En çok hurda nedeni / hat
  };
  description: string; // Açıklama
}

// ——— Dashboard ile bağlantı için URL parametrelerini oku (hat, vardiya, tarih)
function useDashboardFilters() {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const hat = params?.get('hat') || 'Tümü';
  const vardiya = params?.get('vardiya') || 'Tümü';
  const start = params?.get('start') || '';
  const end = params?.get('end') || '';
  return { hat, vardiya, start, end };
}

// ——— Mock üretim verisi tabanlı raporlar
const allReports: Report[] = [
  {
    id: 'R-001',
    name: 'Günlük Üretim Özeti - V1',
    creator: 'Operatör A',
    date: '2025-09-01',
    category: 'Üretim',
    summary: {
      sales: '1.125 adet', // toplam üretim
      growth: 'OEE %79.2',
      topLocation: 'En çok hurda: Boyutsal Hata'
    },
    description: 'HAT-1, V1 vardiyası için günlük üretim, duruş, kalite ve hurda özetleri.'
  },
  {
    id: 'R-002',
    name: 'Günlük Üretim Özeti - V2',
    creator: 'Operatör B',
    date: '2025-09-02',
    category: 'Üretim',
    summary: {
      sales: '1.040 adet',
      growth: 'OEE %81.0',
      topLocation: 'En çok hurda: Yüzey Kusuru'
    },
    description: 'HAT-2, V2 vardiyası için günlük özet; kalite oranı %96.'
  },
  {
    id: 'R-003',
    name: 'Haftalık Üretim Raporu',
    creator: 'Süpervizör',
    date: '2025-09-07',
    category: 'Üretim',
    summary: {
      sales: '7.595 adet',
      growth: 'Kalite %96.3',
      topLocation: 'HAT-1 / Montaj Hatası'
    },
    description: 'Hat bazı performans, vardiya OEE, hammadde tüketimi ve hurda nedenleri.'
  },
  {
    id: 'R-004',
    name: 'Hammadde Tüketim Analizi',
    creator: 'Planlama',
    date: '2025-09-05',
    category: 'Malzeme',
    summary: {
      sales: '1.605 kg',
      growth: 'Verimlilik +%1.7',
      topLocation: 'En çok tüketim: HAT-2'
    },
    description: 'Haftalık hammadde tüketimi ve üretimle korelasyon.'
  },
  {
    id: 'R-005',
    name: 'Hurda Nedenleri Dağılımı',
    creator: 'Kalite',
    date: '2025-09-03',
    category: 'Kalite',
    summary: {
      sales: 'Toplam 1.000 parça',
      growth: 'Hurda %2.9',
      topLocation: 'Boyutsal > Yüzey > Montaj > Hammadde'
    },
    description: 'Son 30 gün içinde tesis geneli hurda kırılımı.'
  }
];

export default function ReportsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { hat, vardiya, start, end } = useDashboardFilters();

  // Basit filtreleme: URL'den gelen hat/vardiya/tarih aralığına göre süz
  const reports = useMemo(() => {
    const withinDate = (d: string) => {
      if (!start && !end) return true;
      const t = new Date(d).getTime();
      const s = start ? new Date(start).getTime() : -Infinity;
      const e = end ? new Date(end).getTime() : Infinity;
      return t >= s && t <= e;
    };

    // Not: Bu mock seti hat/vardiya meta bilgisi içermiyor. Gerçek API'de
    // rapor objesine { line, shift } ekleyip burada kullanın.
    const byLine = (_: Report) => hat === 'Tümü';
    const byShift = (_: Report) => vardiya === 'Tümü';

    return allReports.filter(r => withinDate(r.date) && byLine(r) && byShift(r));
  }, [hat, vardiya, start, end]);

  // Bağlantı bilgisini kullanıcıya gösteren bant
  const hasActiveFilters = hat !== 'Tümü' || vardiya !== 'Tümü' || !!start || !!end;

  return (
    <MainLayout>
      <div className="h-full flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Üretim Raporları</h1>
            <p className="text-muted-foreground">Üretim odaklı raporları görüntüleyin, indirin ve paylaşın</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Üretim Raporu
          </Button>
        </div>

        {hasActiveFilters && (
          <div className="rounded-lg border bg-card text-card-foreground p-4 flex items-center gap-3">
            <Filter className="h-4 w-4" />
            <div className="text-sm">
              <span className="font-medium">Dashboard filtreleri uygulanıyor:</span>{' '}
              <span>Hat: <b>{hat}</b></span>{' • '}
              <span>Vardiya: <b>{vardiya}</b></span>
              {(start || end) && (
                <>
                  {' • '}<span>Tarih: <b>{start || 'BAŞLANGIÇ'} → {end || 'BİTİŞ'}</b></span>
                </>
              )}
            </div>
          </div>
        )}

        <div className="flex-1">
          {/* Mevcut ReportTable yapısı korunuyor */}
          <ReportTable reports={reports} />
        </div>

        <CreateReportModal 
          open={isCreateModalOpen} 
          onOpenChange={setIsCreateModalOpen} 
        />
      </div>
    </MainLayout>
  );
}