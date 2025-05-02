
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Upload, 
  Settings, 
  PlusCircle,
  ChartBar,
  FileText,
  Bell,
  Users,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, to, active }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button 
        variant="ghost" 
        className={cn(
          "w-full justify-start gap-2 mb-1",
          active && "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function AppSidebar() {
  // We'll determine active state with more logic later
  const path = window.location.pathname;

  return (
    <div className="bg-sidebar h-screen w-64 p-4 text-sidebar-foreground flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-1">ReportFlow</h2>
        <p className="text-sm text-gray-400">AI-Powered Analytics</p>
      </div>
      
      <div className="mb-6">
        <Button variant="default" className="w-full gap-2 bg-brand-600 hover:bg-brand-700">
          <PlusCircle size={18} />
          <span>New Report</span>
        </Button>
      </div>
      
      <div className="space-y-6 flex-grow">
        <div>
          <h3 className="text-xs uppercase text-gray-500 mb-2 px-3">Data</h3>
          <SidebarItem icon={Database} label="Connections" to="/connections" active={path === '/connections'} />
          <SidebarItem icon={Upload} label="Import Data" to="/import" active={path === '/import'} />
          <SidebarItem icon={FileText} label="Queries" to="/queries" active={path === '/queries'} />
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-gray-500 mb-2 px-3">Analytics</h3>
          <SidebarItem icon={ChartBar} label="Dashboard" to="/" active={path === '/'} />
          <SidebarItem icon={FileText} label="Reports" to="/reports" active={path === '/reports'} />
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-gray-500 mb-2 px-3">System</h3>
          <SidebarItem icon={Bell} label="Notifications" to="/notifications" active={path === '/notifications'} />
          <SidebarItem icon={Users} label="User Management" to="/users" active={path === '/users'} />
          <SidebarItem icon={ShieldCheck} label="Security" to="/security" active={path === '/security'} />
          <SidebarItem icon={Settings} label="Settings" to="/settings" active={path === '/settings'} />
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
