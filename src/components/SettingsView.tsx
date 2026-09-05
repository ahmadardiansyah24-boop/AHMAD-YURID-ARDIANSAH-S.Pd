import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Cpu,
  School,
  User,
  Shield,
  Palette,
  Sparkles
} from 'lucide-react';
import { AppUser } from '../types';

interface SettingsViewProps {
  user: AppUser;
  onUpdateUser: (updated: AppUser) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [nip, setNip] = useState(user.nip);
  const [school, setSchool] = useState(user.school);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      nip,
      school
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>Preferensi & Konfigurasi Pengguna</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          Pengaturan Aplikasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Konfigurasi data default guru, nama satuan pendidikan, dan preferensi generator AI
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pengaturan profil default berhasil diperbarui dan disimpan!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span>Data Default Pendidik & Sekolah</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar Guru</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">NIP Guru</label>
            <input
              type="text"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Satuan Pendidikan / Sekolah</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none font-medium text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Akun</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 outline-none font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>

      {/* AI Model Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span>Mesin AI & Pengaturan Server-Side</span>
        </h2>
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-1.5 leading-relaxed">
          <p>
            <strong>Model Default:</strong> Google Gemini 3.8 Flash
          </p>
          <p>
            <strong>Keamanan Kunci API:</strong> API Key dikelola secara aman pada sisi server (server-side proxy) tanpa pernah terekspos ke sisi peramban (browser) pengguna.
          </p>
          <p>
            <strong>Toleransi Cadangan:</strong> Jika jaringan server sedang mengalami gangguan, sistem secara otomatis mengaktifkan <em>Intelligent Pedagogical Fallback Engine</em> sehingga Anda selalu mendapatkan dokumen 5 tabel lengkap tanpa hambatan.
          </p>
        </div>
      </div>
    </div>
  );
};
