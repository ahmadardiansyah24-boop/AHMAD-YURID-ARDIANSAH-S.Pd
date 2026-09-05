import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  History,
  BookmarkCheck,
  BookOpen,
  Server,
  Settings,
  Info,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { AppUser } from '../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  user: AppUser;
  savedCount: number;
  isOpenMobile: boolean;
  onToggleMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  user,
  savedCount,
  isOpenMobile,
  onToggleMobile
}) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'generator',
      label: 'Generator PPM',
      icon: Sparkles,
      badge: 'AI Pro'
    },
    {
      id: 'riwayat',
      label: 'Riwayat PPM',
      icon: History,
      badge: savedCount > 0 ? `${savedCount}` : null
    },
    {
      id: 'template',
      label: 'Template PPM',
      icon: BookmarkCheck,
      badge: '6 Presets'
    },
    {
      id: 'panduan',
      label: 'Panduan PPM',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'cpanel',
      label: 'Paket cPanel / PHP',
      icon: Server,
      badge: 'Ready'
    },
    ...(user.role === 'ADMIN'
      ? [
          {
            id: 'admin',
            label: 'Admin Console',
            icon: ShieldAlert,
            badge: 'Admin'
          }
        ]
      : []),
    {
      id: 'pengaturan',
      label: 'Pengaturan',
      icon: Settings,
      badge: null
    },
    {
      id: 'tentang',
      label: 'Tentang Aplikasi',
      icon: Info,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="no-print lg:hidden fixed bottom-5 right-5 z-50">
        <button
          onClick={onToggleMobile}
          className="p-3.5 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95"
          aria-label="Buka Menu"
        >
          {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="no-print lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40"
          onClick={onToggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`no-print fixed lg:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
            Menu Utama
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (isOpenMobile) onToggleMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/70 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-600" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Info Card */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-bold text-slate-700">Mesin AI Aktif</span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Didukung model cerdas untuk kurikulum Indonesia dan pembelajaran mendalam.
            </p>
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600 font-medium">
              <span>Versi 2.6 Pro</span>
              <span className="text-blue-600 font-semibold">cPanel Ready</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
