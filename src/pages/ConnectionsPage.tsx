
import { useState } from 'react';
import { Database, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function ConnectionsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
  const handleDatabaseConnect = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Connection attempt",
      description: "Attempting to connect to the database...",
    });
    // In a real app, we would handle the connection here
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `Selected file: ${e.target.files[0].name}`,
      });
    }
  };
  
  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      toast({
        title: "File upload",
        description: `Uploading ${selectedFile.name}...`,
      });
      // In a real app, we would handle the file upload here
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Data Connections</h1>
          <p className="text-gray-500 mb-6">Connect to your data sources or import files to begin analysis</p>
        
          <Tabs defaultValue="database" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="database">Database Connection</TabsTrigger>
              <TabsTrigger value="file">File Upload</TabsTrigger>
            </TabsList>
            
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Connect to Database
                  </CardTitle>
                  <CardDescription>
                    Enter your database connection details to establish a secure connection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDatabaseConnect} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="db-type">Database Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select database type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="postgresql">PostgreSQL</SelectItem>
                            <SelectItem value="mysql">MySQL</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                            <SelectItem value="mssql">Microsoft SQL Server</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="host">Host</Label>
                        <Input id="host" placeholder="localhost or IP address" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input id="port" placeholder="e.g. 5432" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="database">Database Name</Label>
                        <Input id="database" placeholder="Database name" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Database username" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Database password" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ssl">SSL Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select SSL mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disable">Disable</SelectItem>
                          <SelectItem value="allow">Allow</SelectItem>
                          <SelectItem value="prefer">Prefer</SelectItem>
                          <SelectItem value="require">Require</SelectItem>
                          <SelectItem value="verify-ca">Verify CA</SelectItem>
                          <SelectItem value="verify-full">Verify Full</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="gap-2">
                    Connect <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="file">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Data File
                  </CardTitle>
                  <CardDescription>
                    Upload CSV, Excel, or other structured data files to import your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="file">File</Label>
                      <div className="flex items-center gap-4">
                        <Input 
                          id="file" 
                          type="file" 
                          accept=".csv,.xlsx,.xls,.json" 
                          className="w-full"
                          onChange={handleFileChange}
                        />
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file-options">Import Options</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select import options" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="headers">First row as headers</SelectItem>
                          <SelectItem value="no-headers">No headers</SelectItem>
                          <SelectItem value="custom">Custom delimiter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="gap-2"
                    onClick={handleFileUpload}
                    disabled={!selectedFile}
                  >
                    Upload and Import <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
}
