
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
      if (result.sql.toLowerCase().includes('sales') || result.sql.toLowerCase().includes('satış')) {
        setActiveDataset("sales");
      } else if (result.sql.toLowerCase().includes('revenue') || result.sql.toLowerCase().includes('product') || 
                result.sql.toLowerCase().includes('gelir') || result.sql.toLowerCase().includes('ürün')) {
        setActiveDataset("revenue");
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
          placeholder="İstediğiniz veriyi düz Türkçe ile açıklayın... (örn: 'En aktif kullanıcıları göster', 'Geçen aydaki satışları getir', 'Gelire göre en iyi ürünleri göster')"
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="default" 
          className="gap-2"
          onClick={handleGenerateSQL}
          disabled={isGenerating}
        >
          <Lightbulb className="h-4 w-4" /> {isGenerating ? 'Oluşturuluyor...' : 'SQL Oluştur'}
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
