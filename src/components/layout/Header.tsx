
import { Bell, Moon, Search, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/hooks/use-theme';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background py-2 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Ara..." 
              className="pl-8 w-full bg-muted/50"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="border-l pl-4 flex items-center gap-2">
            <span className="text-sm">Tema</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
