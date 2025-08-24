
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: "Veri",
    items: [
      { title: "Bağlantılar", url: "/connections", icon: Database },
      { title: "Veri Yükle", url: "/import", icon: Upload },
      { title: "Sorgular", url: "/queries", icon: FileText },
    ]
  },
  {
    title: "Analitik", 
    items: [
      { title: "Gösterge Paneli", url: "/", icon: ChartBar },
      { title: "Raporlar", url: "/reports", icon: FileText },
    ]
  },
  {
    title: "Sistem",
    items: [
      { title: "Bildirimler", url: "/notifications", icon: Bell },
      { title: "Kullanıcı Yönetimi", url: "/users", icon: Users },
      { title: "Güvenlik", url: "/security", icon: ShieldCheck },
      { title: "Ayarlar", url: "/settings", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        {/* Logo */}
        <div className={cn("p-4 flex justify-center", collapsed && "px-2")}>
          <img 
            src="/lovable-uploads/8640358c-121b-4061-aa82-889ed0f5c575.png" 
            alt="Claridad Logo" 
            className={cn("object-contain transition-all", collapsed ? "h-8 w-8" : "h-12")} 
          />
        </div>
        
        {/* New Report Button */}
        {!collapsed && (
          <div className="px-4 mb-6">
            <Button variant="default" className="w-full gap-2 bg-primary hover:bg-primary/90">
              <PlusCircle size={18} />
              <span>Yeni Rapor</span>
            </Button>
          </div>
        )}

        {/* Navigation Groups */}
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs uppercase text-muted-foreground px-3">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* User Profile */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                K
              </div>
              <div>
                <p className="text-sm font-medium">Kullanıcı Adı</p>
                <p className="text-xs text-muted-foreground">Yönetici</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
