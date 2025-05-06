
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Play, Save, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SqlEditorProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SqlEditor = ({ query, setQuery }: SqlEditorProps) => {
  const { toast } = useToast();
  
  const handleRunQuery = () => {
    toast({
      title: "Sorgu çalıştırıldı",
      description: "Sorgunuz başarıyla çalıştırıldı.",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Textarea 
          className="font-mono text-sm h-64 bg-gray-50 dark:bg-gray-800"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SQL sorgunuzu buraya yazın..."
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="default" 
          className="gap-2"
          onClick={handleRunQuery}
        >
          <Play className="h-4 w-4" /> Sorguyu Çalıştır
        </Button>
        <div className="space-x-2">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" /> Kaydet
          </Button>
          <Button variant="outline" className="gap-2">
            <BookOpen className="h-4 w-4" /> Örnekler
          </Button>
        </div>
      </div>
    </div>
  );
};
