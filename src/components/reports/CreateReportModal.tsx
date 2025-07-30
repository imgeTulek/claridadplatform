import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, ChevronRight, ChevronLeft, BarChart3, LineChart, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3;

export function CreateReportModal({ open, onOpenChange }: CreateReportModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [reportData, setReportData] = useState({
    name: '',
    category: '',
    description: '',
    csvFile: null as File | null,
    query: '',
    visualization: ''
  });

  const suggestedQueries = [
    'En çok satılan 5 ürün',
    'Aylık gelir grafiği', 
    'Kategori bazında satışlar',
    'En düşük performans gösteren ürünler'
  ];

  const visualizationTypes = [
    { type: 'bar', label: 'Bar', icon: BarChart3 },
    { type: 'line', label: 'Çizgi', icon: LineChart },
    { type: 'pie', label: 'Pasta', icon: PieChart }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportData(prev => ({ ...prev, csvFile: file }));
    }
  };

  const handleUseExampleData = () => {
    setReportData(prev => ({ ...prev, csvFile: null }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="report-name">Rapor Adı</Label>
          <Input
            id="report-name"
            value={reportData.name}
            onChange={(e) => setReportData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Rapor adını girin"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="report-category">Rapor Kategorisi</Label>
          <Select value={reportData.category} onValueChange={(value) => setReportData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">Finansal Analiz</SelectItem>
              <SelectItem value="sales">Satış Raporu</SelectItem>
              <SelectItem value="marketing">Pazarlama Analizi</SelectItem>
              <SelectItem value="operations">Operasyon Raporu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            value={reportData.description}
            onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Rapor açıklamasını girin"
            rows={3}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>CSV Dosyası Yükle</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-4">
          <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">CSV dosyasını sürükleyin veya seçin</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <Label htmlFor="csv-upload" className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>veya tıklayın</span>
              </Button>
            </Label>
          </div>
          {reportData.csvFile && (
            <p className="text-sm text-foreground font-medium flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              {reportData.csvFile.name}
            </p>
          )}
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={handleUseExampleData}>
            Örnek veri seti kullan
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="query">Doğal Dil Sorgusu</Label>
          <Textarea
            id="query"
            value={reportData.query}
            onChange={(e) => setReportData(prev => ({ ...prev, query: e.target.value }))}
            placeholder='Örnek: "Son 6 ayda en çok satış yapılan 5 ürünü göster" veya "Aylık gelir dağılımını göster"'
            rows={4}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          CSV verileriniz üzerinde analiz yapmak için doğal dilde bir soru sorun.
        </p>
      </div>

      <div className="space-y-3">
        <Label>Önerilen Sorgular:</Label>
        <div className="grid grid-cols-1 gap-2">
          {suggestedQueries.map((query, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left h-auto p-3"
              onClick={() => setReportData(prev => ({ ...prev, query }))}
            >
              {query}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Sorgu Sonuçları</Label>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              Sorgu işlendikten sonra sonuçlar burada görünecek...
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Label>Görselleştirme</Label>
        <div className="grid grid-cols-3 gap-4">
          {visualizationTypes.map(({ type, label, icon: Icon }) => (
            <Card
              key={type}
              className={cn(
                "cursor-pointer transition-colors hover:border-primary",
                reportData.visualization === type && "border-primary bg-primary/5"
              )}
              onClick={() => setReportData(prev => ({ ...prev, visualization: type }))}
            >
              <CardContent className="p-4 text-center space-y-2">
                <Icon className="h-8 w-8 mx-auto" />
                <p className="text-sm font-medium">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Rapor Bilgileri';
      case 2: return 'Sorgu Oluştur';
      case 3: return 'Görselleştir ve Kaydet';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return reportData.name && reportData.category;
      case 2: return reportData.query;
      case 3: return reportData.visualization;
      default: return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Yeni Rapor Oluştur</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={cn(
                      "w-16 h-0.5 mx-2",
                      step < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{getStepTitle()}</h3>
          </div>

          {/* Step content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Devam Et
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  // Handle report creation
                  console.log('Creating report:', reportData);
                  onOpenChange(false);
                }}
                disabled={!canProceed()}
              >
                Raporu Kaydet
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}