
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronsDown, Download } from 'lucide-react';

interface QueryResultsProps {
  showResults: boolean;
  setShowResults: (show: boolean) => void;
}

export const QueryResults = ({ showResults, setShowResults }: QueryResultsProps) => {
  if (!showResults) return null;

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Sorgu Sonuçları</CardTitle>
          <CardDescription>10 satır döndürüldü (0.23s)</CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowResults(false)}
        >
          <ChevronsDown className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-2 text-left font-medium">kullanıcı_id</th>
                  <th className="px-4 py-2 text-left font-medium">isim</th>
                  <th className="px-4 py-2 text-left font-medium">e-posta</th>
                  <th className="px-4 py-2 text-left font-medium">kayıt_tarihi</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{1000 + i}</td>
                    <td className="px-4 py-2">Kullanıcı {i + 1}</td>
                    <td className="px-4 py-2">kullanici{i + 1}@ornek.com</td>
                    <td className="px-4 py-2">2023-0{i + 1}-15</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Tüm satırları göster
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-3.5 w-3.5" /> Dışa Aktar
        </Button>
      </CardFooter>
    </Card>
  );
};
