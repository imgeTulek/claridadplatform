
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Grid2X2,
  Columns,
  Table
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function ImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadState('idle');
      toast({
        title: "File selected",
        description: `Selected file: ${e.target.files[0].name}`,
      });
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadState('uploading');
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('processing');
          
          // Simulate processing
          setTimeout(() => {
            setUploadState('complete');
            toast({
              title: "Upload complete",
              description: "Your file has been uploaded and processed successfully.",
            });
          }, 1500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Import Data</h1>
          <p className="text-gray-500">Upload and transform your data for analysis</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Data
                </CardTitle>
                <CardDescription>
                  Upload your data files to start the ETL process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
                    <div className="mx-auto flex flex-col items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-1">Drag and drop your file</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Support for CSV, Excel, JSON, and SQL files
                      </p>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        className="max-w-sm"
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls,.json,.sql"
                      />
                    </div>
                  </div>
                  
                  {selectedFile && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6" />
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        
                        {uploadState === 'complete' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : uploadState === 'error' ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                      </div>
                      
                      {uploadState === 'uploading' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Uploading...</span>
                            <span className="text-sm">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                      
                      {uploadState === 'processing' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Processing file...</span>
                          </div>
                          <Progress value={100} className="animate-pulse" />
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        {uploadState === 'idle' && (
                          <Button 
                            onClick={handleUpload}
                            className="gap-2"
                          >
                            Upload File <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {uploadState === 'complete' && (
                          <div className="flex gap-3">
                            <Button variant="outline">View Data</Button>
                            <Button>Transform Data</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {uploadState === 'complete' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Transform Data</CardTitle>
                  <CardDescription>Prepare and clean your data for analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview" className="gap-2">
                        <Table className="h-4 w-4" /> Data Preview
                      </TabsTrigger>
                      <TabsTrigger value="transform" className="gap-2">
                        <Columns className="h-4 w-4" /> Transform
                      </TabsTrigger>
                      <TabsTrigger value="schema" className="gap-2">
                        <Grid2X2 className="h-4 w-4" /> Schema
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview">
                      <div className="border rounded-md overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y">
                            <thead className="bg-muted">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  ID
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Name
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Email
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Date
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="hover:bg-muted/50">
                                  <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                                  <td className="px-4 py-2 whitespace-nowrap">John Doe</td>
                                  <td className="px-4 py-2 whitespace-nowrap">john{i}@example.com</td>
                                  <td className="px-4 py-2 whitespace-nowrap">2023-01-{10 + i}</td>
                                  <td className="px-4 py-2 whitespace-nowrap">${(100 + i * 10).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="transform">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Column Mapping</Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center gap-2">
                                <div className="w-1/2">
                                  <Select defaultValue="id">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select column" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="id">ID</SelectItem>
                                      <SelectItem value="name">Name</SelectItem>
                                      <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <span className="text-muted-foreground">→</span>
                                <div className="w-1/2">
                                  <Input placeholder="user_id" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1/2">
                                  <Select defaultValue="name">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select column" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="id">ID</SelectItem>
                                      <SelectItem value="name">Name</SelectItem>
                                      <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <span className="text-muted-foreground">→</span>
                                <div className="w-1/2">
                                  <Input placeholder="full_name" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label>Data Transformations</Label>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="normalize" />
                                <label
                                  htmlFor="normalize"
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  Normalize text values
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="dates" />
                                <label
                                  htmlFor="dates"
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  Convert date formats
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="nulls" />
                                <label
                                  htmlFor="nulls"
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  Handle null values
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="duplicates" />
                                <label
                                  htmlFor="duplicates"
                                  className="text-sm font-medium leading-none cursor-pointer"
                                >
                                  Remove duplicate rows
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="schema">
                      <div className="border rounded-md overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y">
                            <thead className="bg-muted">
                              <tr>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Column
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Type
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Nullable
                                </th>
                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                  Sample
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr className="hover:bg-muted/50">
                                <td className="px-4 py-2 whitespace-nowrap font-medium">id</td>
                                <td className="px-4 py-2 whitespace-nowrap">integer</td>
                                <td className="px-4 py-2 whitespace-nowrap">false</td>
                                <td className="px-4 py-2 whitespace-nowrap">1</td>
                              </tr>
                              <tr className="hover:bg-muted/50">
                                <td className="px-4 py-2 whitespace-nowrap font-medium">name</td>
                                <td className="px-4 py-2 whitespace-nowrap">string</td>
                                <td className="px-4 py-2 whitespace-nowrap">false</td>
                                <td className="px-4 py-2 whitespace-nowrap">John Doe</td>
                              </tr>
                              <tr className="hover:bg-muted/50">
                                <td className="px-4 py-2 whitespace-nowrap font-medium">email</td>
                                <td className="px-4 py-2 whitespace-nowrap">string</td>
                                <td className="px-4 py-2 whitespace-nowrap">false</td>
                                <td className="px-4 py-2 whitespace-nowrap">john@example.com</td>
                              </tr>
                              <tr className="hover:bg-muted/50">
                                <td className="px-4 py-2 whitespace-nowrap font-medium">date</td>
                                <td className="px-4 py-2 whitespace-nowrap">date</td>
                                <td className="px-4 py-2 whitespace-nowrap">true</td>
                                <td className="px-4 py-2 whitespace-nowrap">2023-01-10</td>
                              </tr>
                              <tr className="hover:bg-muted/50">
                                <td className="px-4 py-2 whitespace-nowrap font-medium">amount</td>
                                <td className="px-4 py-2 whitespace-nowrap">decimal</td>
                                <td className="px-4 py-2 whitespace-nowrap">false</td>
                                <td className="px-4 py-2 whitespace-nowrap">100.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button className="gap-2">
                    Apply Transformations <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Import Settings</CardTitle>
                <CardDescription>Configure import options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>File Type</Label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>CSV Delimiter</Label>
                  <Select defaultValue="comma">
                    <SelectTrigger>
                      <SelectValue placeholder="Select delimiter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comma">Comma (,)</SelectItem>
                      <SelectItem value="semicolon">Semicolon (;)</SelectItem>
                      <SelectItem value="tab">Tab (\t)</SelectItem>
                      <SelectItem value="pipe">Pipe (|)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Encoding</Label>
                  <Select defaultValue="utf8">
                    <SelectTrigger>
                      <SelectValue placeholder="Select encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utf8">UTF-8</SelectItem>
                      <SelectItem value="ascii">ASCII</SelectItem>
                      <SelectItem value="iso">ISO-8859-1</SelectItem>
                      <SelectItem value="win">Windows-1252</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 border-t pt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="headers" defaultChecked />
                    <label
                      htmlFor="headers"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      First row contains headers
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="types" defaultChecked />
                    <label
                      htmlFor="types"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Auto-detect column types
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trim" defaultChecked />
                    <label
                      htmlFor="trim"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Trim whitespace
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Imports</CardTitle>
                <CardDescription>Your recent data imports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{
                          i === 0 ? "sales_data_2023.csv" :
                          i === 1 ? "user_activity.xlsx" :
                          "product_inventory.json"
                        }</p>
                        <p className="text-xs text-muted-foreground">
                          Imported {i === 0 ? "today" : `${i + 1} days ago`} • {i === 0 ? "1,245" : i === 1 ? "524" : "3,120"} rows
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
