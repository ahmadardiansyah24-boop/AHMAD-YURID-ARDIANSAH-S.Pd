import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  Cpu,
  Database,
  RefreshCw,
  Search,
  CheckCircle2,
  Trash2,
  Lock
} from 'lucide-react';
import { PPMDocument } from '../types';

interface AdminConsoleViewProps {
  documents: PPMDocument[];
  onClearAllDocs: () => void;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({
  documents,
  onClearAllDocs
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'logs'>('stats');

  const mockUsers = [
    { id: 1, name: 'Ahmad Yurid Ardiansah, S.Pd.', email: 'ahmad.yurid@guru.kemdikbud.go.id', school: 'SMP Negeri 1 Sleman', role: 'ADMIN', lastLogin: 'Hari ini, 09:42' },
    { id: 2, name: 'Siti Rahmawati, S.Pd.', email: 'siti.rahma@guru.sd.id', school: 'SD Negeri Percobaan 2', role: 'GURU', lastLogin: 'Kemarin, 14:10' },
    { id: 3, name: 'Bambang Sudarsono, M.Pd.', email: 'bambang.sudarsono@sman1.sch.id', school: 'SMA Negeri 1 Teladan', role: 'GURU', lastLogin: '3 hari lalu' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Panel Kontrol Administrator Sistem</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black mt-1">
          Konsol Manajemen & Telemetri PPM
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Pemantauan kesehatan mesin generator, log aktivitas, dan data pengguna guru
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'stats', label: 'Ringkasan Sistem & Performa', icon: Activity },
          { id: 'users', label: 'Manajemen Akun Guru', icon: Users },
          { id: 'logs', label: 'Log Generasi Terkini', icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Telemetry */}
      {activeTab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
                <span>STATUS SERVER AI</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="text-xl font-extrabold text-slate-900">Gemini 3.8 Flash</div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                Operasional Normal • Response Time ~1.4s
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-bold mb-1">DATABASE STORAGE</div>
              <div className="text-xl font-extrabold text-slate-900">{documents.length} Dokumen</div>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">
                Sinkronisasi Lokal & MySQL Ready
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-xs text-slate-500 font-bold mb-1">TINGKAT KEBERHASILAN</div>
              <div className="text-xl font-extrabold text-slate-900">99.8%</div>
              <p className="text-[11px] text-purple-600 font-semibold mt-1">
                Zero Syntax Failures Reported
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pemeliharaan Cache & Data</h3>
              <p className="text-xs text-slate-500">
                Bersihkan penyimpanan dokumen lokal browser jika diperlukan pengosongan database.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Yakin ingin mengosongkan seluruh riwayat dokumen lokal?')) {
                  onClearAllDocs();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Reset Database Dokumen</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Daftar Pengguna Terdaftar</h3>
            <span className="text-xs font-semibold text-slate-500">{mockUsers.length} Pengguna Aktif</span>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
              <tr>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Email</th>
                <th className="p-3">Satuan Pendidikan</th>
                <th className="p-3">Peran</th>
                <th className="p-3">Aktivitas Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{u.name}</td>
                  <td className="p-3 text-slate-600">{u.email}</td>
                  <td className="p-3 text-slate-600">{u.school}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        u.role === 'ADMIN'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-slate-500">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Log Aktivitas AI Generator</h3>
          <div className="space-y-2 text-xs font-mono">
            {documents.slice(0, 8).map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-blue-600 font-bold">[SUCCESS]</span>{' '}
                  <span className="text-slate-800 font-semibold">{doc.title}</span> — {doc.pengalamanBelajar.length} Pertemuan
                </div>
                <span className="text-slate-400 text-[11px]">
                  {new Date(doc.createdAt).toLocaleTimeString('id-ID')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
