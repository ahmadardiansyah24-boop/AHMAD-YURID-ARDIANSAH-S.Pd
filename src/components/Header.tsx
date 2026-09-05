import React from 'react';
import { Sparkles, Shield, User, Sliders, FileText, CheckCircle2, Award } from 'lucide-react';
import { AppUser } from '../types';

interface HeaderProps {
  user: AppUser;
  onToggleRole: () => void;
  onNavigate: (tab: string) => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ user, onToggleRole, onNavigate, activeTab }) => {
  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  GENERATOR PPM PRO
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 text-white uppercase shadow-xs">
                  PREMIUM
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Perencanaan Pembelajaran Mendalam • <span className="text-blue-600 font-medium">By Ahmad Yurid Ardiansah, S.Pd.</span>
              </p>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => onNavigate('generator')}
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Buat PPM Baru</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={onToggleRole}
                title="Ganti Mode Akses (Guru / Admin)"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  user.role === 'GURU'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Guru</span>
              </button>
              <button
                onClick={onToggleRole}
                title="Ganti Mode Akses (Guru / Admin)"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  user.role === 'ADMIN'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Quick Profile & Settings */}
            <button
              onClick={() => onNavigate('pengaturan')}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Pengaturan Aplikasi"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* User Avatar Info */}
            <div className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-slate-200 text-right">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1 justify-end">
                  {user.name}
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {user.school}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
