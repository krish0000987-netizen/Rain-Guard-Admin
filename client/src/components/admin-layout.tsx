import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplets, LayoutDashboard, Users, Wrench, Star, ImageIcon, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const sidebarItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoading, isAuthenticated } = useAdminAuth();

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    queryClient.clear();
    navigate("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mx-auto mb-3 animate-pulse">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <p className="text-gray-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" data-testid="admin-layout">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`} data-testid="admin-sidebar">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-blue-900 text-sm block">RAIN GUARD</span>
              <span className="text-[10px] text-gray-500">Admin Panel</span>
            </div>
          </div>
          <Button size="icon" variant="outline" className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} data-testid={`link-admin-${item.label.toLowerCase()}`}>
              <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                location === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600"
              }`}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <Link href="/" data-testid="link-admin-view-site">
            <span className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 cursor-pointer mb-1">View Website</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 w-full cursor-pointer" data-testid="button-admin-logout">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:px-6" data-testid="admin-header">
          <Button size="icon" variant="outline" className="lg:hidden" onClick={() => setMobileOpen(true)} data-testid="button-admin-menu">
            <Menu className="w-4 h-4" />
          </Button>
          <h2 className="font-medium text-gray-700 text-sm">Admin Panel</h2>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
