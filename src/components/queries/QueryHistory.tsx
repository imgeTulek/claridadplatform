
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QueryHistory = () => {
  return (
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
                  ? "SELECT hat_id, SUM(uretim_adedi) FROM uretim WHERE tarih >= '2025-09-01' GROUP BY hat_id;"
                  : i === 1
                  ? "SELECT vardiya, AVG(oee) FROM vardiya_metrikleri WHERE hat_id = 'HAT-1';"
                  : "SELECT hurda_nedeni, COUNT(*) FROM kalite_kontrol WHERE hurda = true GROUP BY hurda_nedeni;"
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
  );
};
