
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PromptToSqlAgent } from '@/components/PromptToSqlAgent';
import { SqlEditor } from '@/components/queries/SqlEditor';
import { NaturalLanguageInput } from '@/components/queries/NaturalLanguageInput';
import { QueryResults } from '@/components/queries/QueryResults';
import { QueryVisualization } from '@/components/queries/QueryVisualization';
import { QueryHistory } from '@/components/queries/QueryHistory';
import { GeneratedSqlExplanation } from '@/components/queries/GeneratedSqlExplanation';

export default function QueriesPage() {
  const [query, setQuery] = useState("-- SQL sorgunuzu buraya yazın\nSELECT * FROM users WHERE created_at > '2023-01-01' LIMIT 10;");
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [generatedSqlExplanation, setGeneratedSqlExplanation] = useState("");
  const [activeDataset, setActiveDataset] = useState("default");
  const [activeTab, setActiveTab] = useState("sql");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Sorgu Oluşturucu</h1>
          <p className="text-gray-500 dark:text-gray-400">SQL yazın veya doğal dil ile sorgular oluşturmak için AI kullanın</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <Tabs 
                  defaultValue="sql" 
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList>
                    <TabsTrigger value="sql">SQL Editör</TabsTrigger>
                    <TabsTrigger value="natural">Doğal Dil</TabsTrigger>
                    <TabsTrigger value="agent">SQL Aracı</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sql" className="space-y-4 pt-4">
                    <SqlEditor query={query} setQuery={setQuery} />
                  </TabsContent>
                  
                  <TabsContent value="natural" className="space-y-4 pt-4">
                    <NaturalLanguageInput 
                      naturalLanguage={naturalLanguage}
                      setNaturalLanguage={setNaturalLanguage}
                      query={query}
                      setQuery={setQuery}
                      setGeneratedSqlExplanation={setGeneratedSqlExplanation}
                      setActiveDataset={setActiveDataset}
                    />
                    <GeneratedSqlExplanation explanation={generatedSqlExplanation} />
                  </TabsContent>
                  
                  <TabsContent value="agent" className="space-y-4 pt-4">
                    <PromptToSqlAgent />
                  </TabsContent>
                </Tabs>
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
