
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
              <p className="text-xs">
                {i === 0
                  ? "Eylül ayından itibaren tüm hatların toplam üretim miktarlarını göster"
                  : i === 1
                  ? "HAT-1 için vardiya bazlı ortalama OEE değerlerini listele"
                  : "Hurda nedeni bazında kalite kontrol sonuçlarını grupla"
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
