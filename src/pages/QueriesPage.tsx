
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader } from '@/components/ui/card';
import { NaturalLanguageInput } from '@/components/queries/NaturalLanguageInput';
import { QueryResults } from '@/components/queries/QueryResults';
import { QueryVisualization } from '@/components/queries/QueryVisualization';
import { QueryHistory } from '@/components/queries/QueryHistory';
import { GeneratedSqlExplanation } from '@/components/queries/GeneratedSqlExplanation';

export default function QueriesPage() {
  const [query, setQuery] = useState("");
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [generatedSqlExplanation, setGeneratedSqlExplanation] = useState("");
  const [activeDataset, setActiveDataset] = useState("default");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Üretim Sorgu Oluşturucu</h1>
          <p className="text-muted-foreground">Üretim verilerinizi analiz etmek için doğal dil kullanın</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="space-y-4 pt-4">
                  <NaturalLanguageInput 
                    naturalLanguage={naturalLanguage}
                    setNaturalLanguage={setNaturalLanguage}
                    query={query}
                    setQuery={setQuery}
                    setGeneratedSqlExplanation={setGeneratedSqlExplanation}
                    setActiveDataset={setActiveDataset}
                  />
                  <GeneratedSqlExplanation explanation={generatedSqlExplanation} />
                </div>
              </CardHeader>
            </Card>
            
            <QueryResults showResults={showResults} setShowResults={setShowResults} />
          </div>
          
          <div className="space-y-4">
            <QueryVisualization activeDataset={activeDataset} />
            <QueryHistory />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
