import { useState, useCallback } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  FileText, 
  Eye,
  Download,
  X,
  FileSpreadsheet,
  Link,
  Clock,
  Table2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  sheets?: string[];
  data?: any[][];
  preview?: any[][];
}

interface FileRelation {
  id: string;
  file1: string;
  file2: string;
  column1: string;
  column2: string;
  type: 'inner' | 'left' | 'right' | 'outer';
}

export default function ImportPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [relations, setRelations] = useState<FileRelation[]>([]);
  const [recentFiles, setRecentFiles] = useState<UploadedFile[]>([]);
  const [selectedFileForPreview, setSelectedFileForPreview] = useState<UploadedFile | null>(null);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((files: FileList) => {
    const maxFiles = 10;
    const currentCount = uploadedFiles.length;
    
    if (currentCount + files.length > maxFiles) {
      toast({
        title: "Hata",
        description: `Maksimum ${maxFiles} dosya yükleyebilirsiniz. Şu anda ${currentCount} dosya yüklü.`,
        variant: "destructive",
      });
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.name.match(/\.(csv|xlsx|xls)$/i)) {
        toast({
          title: "Desteklenmeyen dosya türü",
          description: "Sadece CSV ve Excel dosyaları desteklenir.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          sheets: file.name.match(/\.(xlsx|xls)$/i) ? 
            ['Sayfa1', 'Sayfa2', 'Sayfa3'].slice(0, Math.floor(Math.random() * 3) + 1) : undefined,
          data: generateSampleData(),
          preview: generateSampleData().slice(0, 5)
        };

        setUploadedFiles(prev => [...prev, newFile]);
        
        // Add to recent files
        setRecentFiles(prev => {
          const filtered = prev.filter(f => f.name !== newFile.name);
          return [newFile, ...filtered].slice(0, 10);
        });

        toast({
          title: "Dosya yüklendi",
          description: `${file.name} başarıyla yüklendi.`,
        });
      };
      reader.readAsArrayBuffer(file);
    });
  }, [uploadedFiles.length, toast]);

  const generateSampleData = () => {
    const headers = ['ID', 'Ad', 'Email', 'Tarih', 'Miktar'];
    const data = [headers];
    for (let i = 1; i <= 20; i++) {
      data.push([
        i.toString(),
        `Kullanıcı ${i}`,
        `kullanici${i}@example.com`,
        `2024-01-${(i % 28) + 1}`,
        `${(Math.random() * 1000).toFixed(2)} TL`
      ]);
    }
    return data;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setRelations(prev => prev.filter(r => r.file1 !== fileId && r.file2 !== fileId));
  };

  const addRelation = () => {
    const newRelation: FileRelation = {
      id: Math.random().toString(36).substr(2, 9),
      file1: '',
      file2: '',
      column1: '',
      column2: '',
      type: 'inner'
    };
    setRelations(prev => [...prev, newRelation]);
  };

  const exportCombinedTable = () => {
    toast({
      title: "Excel dışa aktarılıyor",
      description: "Birleşik tablo Excel dosyası olarak indiriliyor...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Veri Yükleme</h1>
          <p className="text-muted-foreground">CSV ve Excel dosyalarınızı yükleyerek analiz için hazırlayın</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Dosya Yükleme
            </TabsTrigger>
            <TabsTrigger value="relations" className="gap-2">
              <Link className="h-4 w-4" />
              İlişkiler
            </TabsTrigger>
            <TabsTrigger value="combined" className="gap-2">
              <Table2 className="h-4 w-4" />
              Birleşik Tablo
            </TabsTrigger>
            <TabsTrigger value="recent" className="gap-2">
              <Clock className="h-4 w-4" />
              Son Dosyalar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dosya Yükleme Alanı</CardTitle>
                <CardDescription>
                  CSV, Excel (.xlsx, .xls) dosyaları desteklenir. Maksimum 10 dosya yükleyebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                    isDragOver 
                      ? 'border-primary bg-primary/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="mx-auto flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Dosya Seç veya Sürükle</h3>
                    <p className="text-muted-foreground mb-4">
                      CSV, Excel (.xlsx, .xls) dosyaları desteklenir
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {uploadedFiles.length}/10 dosya seçildi
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      className="max-w-xs"
                    />
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Yüklenen Dosyalar</h4>
                      <Button 
                        onClick={() => {
                          toast({
                            title: "Dosyalar yükleniyor",
                            description: "Tüm dosyalar sisteme yükleniyor..."
                          });
                        }}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Tümünü Yükle
                      </Button>
                    </div>
                    {uploadedFiles.map((file) => (
                      <Card key={file.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-6 w-6 text-primary" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                {file.sheets && ` • ${file.sheets.length} sayfa`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFileForPreview(file);
                                    setShowFullPreview(false);
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Önizleme
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                                <DialogHeader>
                                  <DialogTitle>{selectedFileForPreview?.name} - Veri Önizlemesi</DialogTitle>
                                </DialogHeader>
                                {selectedFileForPreview && (
                                  <div className="space-y-4">
                                    {selectedFileForPreview.sheets && (
                                      <div className="flex gap-2 flex-wrap">
                                        {selectedFileForPreview.sheets.map((sheet) => (
                                          <Badge key={sheet} variant="secondary">{sheet}</Badge>
                                        ))}
                                      </div>
                                    )}
                                    <div className="border rounded-md overflow-auto">
                                      <table className="min-w-full divide-y">
                                        <thead className="bg-muted">
                                          <tr>
                                            {selectedFileForPreview.preview?.[0]?.map((header, idx) => (
                                              <th key={idx} className="px-4 py-2 text-left text-xs font-medium uppercase">
                                                {header}
                                              </th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                          {(showFullPreview ? selectedFileForPreview.data : selectedFileForPreview.preview)
                                            ?.slice(1)
                                            .map((row, idx) => (
                                            <tr key={idx} className="hover:bg-muted/50">
                                              {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="px-4 py-2 whitespace-nowrap text-sm">
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <Button
                                        variant="outline"
                                        onClick={() => setShowFullPreview(!showFullPreview)}
                                      >
                                        {showFullPreview ? 'İlk 5 Satırı Göster' : 'Tümünü Göster'}
                                      </Button>
                                      <p className="text-sm text-muted-foreground">
                                        {showFullPreview 
                                          ? `${selectedFileForPreview.data?.length - 1} satır gösteriliyor`
                                          : 'İlk 5 satır gösteriliyor'
                                        }
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {file.sheets && (
                          <div className="flex gap-1 flex-wrap">
                            {file.sheets.map((sheet) => (
                              <Badge key={sheet} variant="outline" className="text-xs">
                                {sheet}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dosya İlişkileri</CardTitle>
                <CardDescription>
                  Yüklenen dosyalar arasında ilişki kurun
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relations.map((relation, idx) => (
                  <Card key={relation.id} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                      <div>
                        <Label>İlk Dosya</Label>
                        <Select value={relation.file1} onValueChange={(value) => {
                          setRelations(prev => prev.map(r => 
                            r.id === relation.id ? { ...r, file1: value } : r
                          ));
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Dosya seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {uploadedFiles.map(file => (
                              <SelectItem key={file.id} value={file.id}>{file.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>İkinci Dosya</Label>
                        <Select value={relation.file2} onValueChange={(value) => {
                          setRelations(prev => prev.map(r => 
                            r.id === relation.id ? { ...r, file2: value } : r
                          ));
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Dosya seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {uploadedFiles.map(file => (
                              <SelectItem key={file.id} value={file.id}>{file.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Birleştirme Türü</Label>
                        <Select value={relation.type} onValueChange={(value: any) => {
                          setRelations(prev => prev.map(r => 
                            r.id === relation.id ? { ...r, type: value } : r
                          ));
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inner">Inner Join</SelectItem>
                            <SelectItem value="left">Left Join</SelectItem>
                            <SelectItem value="right">Right Join</SelectItem>
                            <SelectItem value="outer">Outer Join</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Ortak Sütun</Label>
                        <Input 
                          placeholder="Sütun adı"
                          value={relation.column1}
                          onChange={(e) => {
                            setRelations(prev => prev.map(r => 
                              r.id === relation.id ? { ...r, column1: e.target.value } : r
                            ));
                          }}
                        />
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={() => setRelations(prev => prev.filter(r => r.id !== relation.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
                
                <Button onClick={addRelation} className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  Yeni İlişki Ekle
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="combined" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Birleşik Tablo</CardTitle>
                    <CardDescription>
                      İlişkilendirilmiş dosyalardan oluşturulan birleşik tablo
                    </CardDescription>
                  </div>
                  <Button onClick={exportCombinedTable} className="gap-2">
                    <Download className="h-4 w-4" />
                    Excel'e Aktar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {relations.length > 0 ? (
                  <div className="border rounded-md overflow-auto">
                    <table className="min-w-full divide-y">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase">ID</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase">Ad</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase">Email</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase">Tarih</th>
                          <th className="px-4 py-2 text-left text-xs font-medium uppercase">Miktar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <tr key={idx} className="hover:bg-muted/50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{idx + 1}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">Birleşik Kullanıcı {idx + 1}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">birlesik{idx + 1}@example.com</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">2024-01-{idx + 1}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm">{(Math.random() * 1000).toFixed(2)} TL</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Table2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Birleşik tablo oluşturmak için önce dosyalar arasında ilişki kurun.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Son Yüklenen Dosyalar</CardTitle>
                <CardDescription>
                  Daha önce yüklediğiniz dosyalar - tekrar kullanmak için tıklayın
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentFiles.length > 0 ? (
                  <div className="grid gap-4">
                    {recentFiles.map((file) => (
                      <Card 
                        key={file.id} 
                        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          if (!uploadedFiles.find(f => f.name === file.name)) {
                            setUploadedFiles(prev => [...prev, file]);
                            toast({
                              title: "Dosya eklendi",
                              description: `${file.name} aktif dosyalara eklendi.`,
                            });
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileSpreadsheet className="h-6 w-6 text-primary" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                {file.sheets && ` • ${file.sheets.length} sayfa`}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {uploadedFiles.find(f => f.name === file.name) ? 'Aktif' : 'Kullanılabilir'}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Henüz yüklenmiş dosya bulunmuyor.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}