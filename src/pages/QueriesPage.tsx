
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Lightbulb, ChevronsDown, ChevronsUp, BookOpen, Save, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const sampleData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

export default function QueriesPage() {
  const [query, setQuery] = useState("-- Write your SQL query here\nSELECT * FROM users WHERE created_at > '2023-01-01' LIMIT 10;");
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [activeChart, setActiveChart] = useState("area");
  
  const { toast } = useToast();
  
  const handleRunQuery = () => {
    toast({
      title: "Query executed",
      description: "Your query has been executed successfully.",
    });
  };
  
  const handleGenerateSQL = () => {
    if (naturalLanguage.trim() === "") {
      toast({
        title: "Empty input",
        description: "Please enter a natural language query.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an AI service to generate SQL
    setQuery(`-- Generated from: ${naturalLanguage}\nSELECT user_id, name, email, signup_date\nFROM users\nWHERE signup_date > '2023-01-01'\nORDER BY signup_date DESC\nLIMIT 10;`);
    
    toast({
      title: "SQL generated",
      description: "SQL query generated from your description.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Query Builder</h1>
          <p className="text-gray-500">Write SQL or use AI to generate queries from natural language</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <Tabs defaultValue="sql" className="w-full">
                  <TabsList>
                    <TabsTrigger value="sql">SQL Editor</TabsTrigger>
                    <TabsTrigger value="natural">Natural Language</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sql" className="space-y-4 pt-4">
                    <div>
                      <textarea 
                        className="query-editor"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={8}
                        placeholder="Write your SQL query here..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="default" 
                        className="gap-2"
                        onClick={handleRunQuery}
                      >
                        <Play className="h-4 w-4" /> Run Query
                      </Button>
                      <div className="space-x-2">
                        <Button variant="outline" className="gap-2">
                          <Save className="h-4 w-4" /> Save
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <BookOpen className="h-4 w-4" /> Examples
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="natural" className="space-y-4 pt-4">
                    <div>
                      <textarea 
                        className="query-editor"
                        value={naturalLanguage}
                        onChange={(e) => setNaturalLanguage(e.target.value)}
                        rows={3}
                        placeholder="Describe what data you want in plain English..."
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="default" 
                        className="gap-2"
                        onClick={handleGenerateSQL}
                      >
                        <Lightbulb className="h-4 w-4" /> Generate SQL
                      </Button>
                    </div>
                    
                    {query && (
                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium">Generated SQL:</p>
                        <div className="bg-muted p-3 rounded-md">
                          <pre className="text-xs whitespace-pre-wrap">{query}</pre>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
            
            {showResults && (
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-lg">Query Results</CardTitle>
                    <CardDescription>10 rows returned in 0.23s</CardDescription>
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
                            <th className="px-4 py-2 text-left font-medium">user_id</th>
                            <th className="px-4 py-2 text-left font-medium">name</th>
                            <th className="px-4 py-2 text-left font-medium">email</th>
                            <th className="px-4 py-2 text-left font-medium">signup_date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-t">
                              <td className="px-4 py-2">{1000 + i}</td>
                              <td className="px-4 py-2">User {i + 1}</td>
                              <td className="px-4 py-2">user{i + 1}@example.com</td>
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
                    Show all rows
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3.5 w-3.5" /> Export
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Visualization</CardTitle>
                  <Tabs 
                    defaultValue={activeChart} 
                    className="w-auto"
                    onValueChange={(value) => setActiveChart(value)}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="area" className="px-3">Area</TabsTrigger>
                      <TabsTrigger value="bar" className="px-3">Bar</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <CardDescription>Visual representation of query results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {activeChart === 'area' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sampleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Query History</CardTitle>
                <CardDescription>Your recent queries</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="text-sm border p-2 rounded hover:bg-muted cursor-pointer">
                      <p className="font-mono text-xs truncate">
                        {i === 0
                          ? "SELECT * FROM users LIMIT 10;"
                          : i === 1
                          ? "SELECT count(*) FROM orders GROUP BY status;"
                          : "SELECT * FROM products WHERE inventory < 10;"
                        }
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Executed {10 - i * 3} minutes ago</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View all history
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
