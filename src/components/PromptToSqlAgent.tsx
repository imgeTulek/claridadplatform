
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Lightbulb } from 'lucide-react';

interface PromptToSqlAgentProps {
  webhookEndpoint?: string;
}

export function PromptToSqlAgent({ webhookEndpoint = '' }: PromptToSqlAgentProps) {
  const [prompt, setPrompt] = useState('');
  const [sqlResult, setSqlResult] = useState('');
  const [webhookUrl, setWebhookUrl] = useState(webhookEndpoint);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Boş sorgu",
        description: "Lütfen bir sorgu yazın.",
        variant: "destructive"
      });
      return;
    }
    
    if (!webhookUrl.trim()) {
      toast({
        title: "Webhook URL gerekli",
        description: "Lütfen n8n webhook URL'sini girin.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'csv',
          prompt: prompt,
          csv: "YmFyayxzb3JndSwgZ2VsacWfbGVyaQ0KQWxpLCBTYXRpxZ9sYXIsIHRhbGUgMQ0KQsO8cmUsIEJ1eWVyLCB0YWxlIDI="
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setSqlResult(data.sql || JSON.stringify(data, null, 2));
        toast({
          title: "SQL sorgusu oluşturuldu",
          description: "Webhook yanıtı başarıyla alındı.",
        });
      } else {
        throw new Error(`HTTP hata kodu: ${response.status}`);
      }
    } catch (error) {
      console.error('Webhook hatası:', error);
      toast({
        title: "Hata",
        description: "SQL sorgusu oluşturulamadı. Lütfen webhook URL'sini kontrol edin.",
        variant: "destructive"
      });
      setSqlResult('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>SQL Sorgu Aracı</CardTitle>
        <CardDescription>Doğal dilde sorgunuzu yazın, SQL'e dönüştürelim.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handlePromptSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="webhookUrl" className="text-sm font-medium">
              n8n Webhook URL'si
            </label>
            <input
              id="webhookUrl"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://n8n.lovable.tools/webhook/prompt-to-sql"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Sorgunuz
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Örneğin: 'Son aydaki satışları göster' veya 'En çok satılan ürünler nelerdir?'"
              className="min-h-24"
              required
            />
          </div>
          
          <Button type="submit" className="w-full gap-2" disabled={isLoading}>
            <Lightbulb className="h-4 w-4" />
            {isLoading ? 'Sorgu Oluşturuluyor...' : 'SQL Sorgusu Oluştur'}
          </Button>
        </form>
        
        {sqlResult && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Oluşturulan SQL Sorgusu</label>
            <div className="bg-gray-50 dark:bg-gray-800 border rounded-md p-3">
              <pre className="text-sm whitespace-pre-wrap">{sqlResult}</pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Bu araç, doğal dil kullanarak SQL sorguları oluşturmanıza yardımcı olur.
      </CardFooter>
    </Card>
  );
}
