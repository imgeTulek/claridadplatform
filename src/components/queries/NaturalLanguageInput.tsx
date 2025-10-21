
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSqlFromNaturalLanguage } from '@/utils/nlToSql';

interface NaturalLanguageInputProps {
  naturalLanguage: string;
  setNaturalLanguage: (text: string) => void;
  query: string;
  setQuery: (query: string) => void;
  setGeneratedSqlExplanation: (explanation: string) => void;
  setActiveDataset: (dataset: string) => void;
}

export const NaturalLanguageInput = ({ 
  naturalLanguage, 
  setNaturalLanguage, 
  query, 
  setQuery, 
  setGeneratedSqlExplanation,
  setActiveDataset
}: NaturalLanguageInputProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateSQL = async () => {
    if (naturalLanguage.trim() === "") {
      toast({
        title: "Boş sorgu",
        description: "Lütfen doğal dilde bir sorgu girin.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the utility function to generate SQL
      const result = await generateSqlFromNaturalLanguage(naturalLanguage);
      
      setQuery(result.sql);
      setGeneratedSqlExplanation(result.explanation || "");
      
      // Set active dataset based on the query content
      if (result.sql.toLowerCase().includes('üretim') || result.sql.toLowerCase().includes('production') || result.sql.toLowerCase().includes('adet')) {
        setActiveDataset("production");
      } else if (result.sql.toLowerCase().includes('oee') || result.sql.toLowerCase().includes('verimlilik') || 
                result.sql.toLowerCase().includes('vardiya') || result.sql.toLowerCase().includes('shift')) {
        setActiveDataset("oee");
      } else if (result.sql.toLowerCase().includes('hurda') || result.sql.toLowerCase().includes('scrap') || 
                result.sql.toLowerCase().includes('kalite') || result.sql.toLowerCase().includes('quality')) {
        setActiveDataset("quality");
      } else {
        setActiveDataset("default");
      }
      
      toast({
        title: "SQL oluşturuldu",
        description: "Açıklamanızdan SQL sorgusu oluşturuldu.",
      });
    } catch (error) {
      toast({
        title: "Oluşturma başarısız",
        description: "SQL oluşturulamadı. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Textarea 
          className="h-24 bg-gray-50 dark:bg-gray-800"
          value={naturalLanguage}
          onChange={(e) => setNaturalLanguage(e.target.value)}
          placeholder="Üretim verilerinizi analiz etmek istediğiniz şekilde açıklayın... (örn: 'HAT-1 günlük üretim miktarlarını göster', 'V2 vardiyasının OEE verilerini getir', 'En çok hurda veren makineyi bul')"
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="default" 
          className="gap-2"
          onClick={handleGenerateSQL}
          disabled={isGenerating}
        >
          <Lightbulb className="h-4 w-4" /> {isGenerating ? 'Sorgulanıyor...' : 'Sorgula'}
        </Button>
      </div>
      
      {query && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Oluşturulan SQL:</p>
          <div className="bg-muted p-3 rounded-md">
            <pre className="text-xs whitespace-pre-wrap">{query}</pre>
          </div>
          
        </div>
      )}
    </div>
  );
};
