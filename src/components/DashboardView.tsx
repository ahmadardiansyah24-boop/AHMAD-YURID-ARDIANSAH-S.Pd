import React from 'react';
import {
  Sparkles,
  FileCheck2,
  Calendar,
  Layers,
  GraduationCap,
  Cpu,
  Server,
  ArrowRight,
  Clock,
  Eye,
  FileDown,
  BookOpen,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { PPMDocument, AppUser } from '../types';
import { exportPPMToWord } from '../utils/exportWord';

interface DashboardViewProps {
  documents: PPMDocument[];
  onNavigate: (tab: string) => void;
  onOpenPPM: (doc: PPMDocument) => void;
  user: AppUser;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  documents,
  onNavigate,
  onOpenPPM,
  user
}) => {
  const totalCount = documents.length;
  const currentMonthCount = documents.filter((doc) => {
    const d = new Date(doc.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const statCards = [
    {
      label: 'Total PPM Dibuat',
      value: totalCount.toString(),
      subtext: 'Dokumen terstruktur',
      icon: FileCheck2,
      color: 'from-blue-600 to-indigo-600',
      textColor: 'text-blue-600'
    },
    {
      label: 'PPM Bulan Ini',
      value: currentMonthCount.toString(),
      subtext: 'Perencanaan aktif',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600'
    },
    {
      label: 'Total Template',
      value: '6',
      subtext: 'SD, SMP, SMA siap pakai',
      icon: Layers,
      color: 'from-purple-500 to-violet-600',
      textColor: 'text-purple-600'
    },
    {
      label: 'Jumlah Jenjang',
      value: '3',
      subtext: 'SD, SMP, SMA/SMK',
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600'
    },
    {
      label: 'Generator AI',
      value: 'Online',
      subtext: 'Gemini 3.8 Flash',
      icon: Cpu,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600'
    },
    {
      label: 'Status Sistem',
      value: '100% Siap',
      subtext: 'cPanel & MySQL Ready',
      icon: Server,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white p-6 sm:p-8 shadow-lg shadow-blue-500/10">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Perencanaan Pembelajaran Mendalam Berbasis AI</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di Generator PPM Pro Premium
          </h1>

          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Platform cerdas untuk Bapak/Ibu Guru dalam menyusun Perencanaan Pembelajaran Mendalam (PPM) otomatis, kontekstual, dan selaras dengan 5 Tabel Standar Resmi Kurikulum Indonesia untuk semua jenjang dan mata pelajaran.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('generator')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Buat PPM Baru Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('template')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm transition-all backdrop-blur-xs"
            >
              <Layers className="w-4 h-4 text-cyan-200" />
              <span>Gunakan Template Siap Pakai</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  #{i + 1}
                </span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                {card.label}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 truncate">
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Recent Documents & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                <span>Dokumen PPM Terbaru</span>
              </h2>
              <p className="text-xs text-slate-500">
                PPM yang telah dibuat dan siap dicetak atau diunduh
              </p>
            </div>
            {documents.length > 0 && (
              <button
                onClick={() => onNavigate('riwayat')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                Belum Ada Dokumen PPM
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Mulai susun Perencanaan Pembelajaran Mendalam pertama Anda dengan memasukkan identitas dan materi pembelajaran.
              </p>
              <button
                onClick={() => onNavigate('generator')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all"
              >
                Buat PPM Pertama
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {doc.identitas.jenjang}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {doc.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-1">
                        <span>{doc.identitas.namaSatuanPendidikan}</span>
                        <span>•</span>
                        <span>{doc.identitas.kelas}</span>
                        <span>•</span>
                        <span>{doc.pengalamanBelajar.length} Pertemuan</span>
                        <span>•</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onOpenPPM(doc)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Buka Preview Dokumen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => exportPPMToWord(doc)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                      title="Download Dokumen Word (.docx)"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Word</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Information & Highlights */}
        <div className="space-y-4">
          {/* 5 Tables Feature Highlights */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Standar 5 Tabel PPM Resmi</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-slate-800">Tabel 1: Identitas</strong>
                  <p className="text-[11px] text-slate-500">Satuan pendidikan, mapel, kelas, durasi, tahun pelajaran.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-slate-800">Tabel 2: Identifikasi</strong>
                  <p className="text-[11px] text-slate-500">Peserta didik, materi, capaian dimensi profil lulusan.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-slate-800">Tabel 3: Desain Pembelajaran</strong>
                  <p className="text-[11px] text-slate-500">CP, lintas disiplin, TP, topik, kemitraan, pemanfaatan digital.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <strong className="text-slate-800">Tabel 4: Pengalaman Belajar</strong>
                  <p className="text-[11px] text-slate-500">Memahami, Mengaplikasi (sintaks model), Refleksi.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                  5
                </span>
                <div>
                  <strong className="text-slate-800">Tabel 5: Asesmen Pembelajaran</strong>
                  <p className="text-[11px] text-slate-500">Asesmen awal, proses, akhir, dan rubrik 4 level.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Pedagogy Practices Pill Box */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                8 Praktik Pedagogis Bebas Pilih
              </h3>
            </div>
            <p className="text-[11px] text-slate-300 mb-3 leading-relaxed">
              Setiap pertemuan dapat menggunakan model pembelajaran berbeda sesuai karakteristik subtopik:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Inkuiri',
                'Discovery Learning',
                'Guided Discovery',
                'PjBL',
                'PBL',
                'Problem Solving',
                'Game Based',
                'Station Learning'
              ].map((m, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-semibold text-slate-200 border border-white/10"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Attribution Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
        <div>
          <strong>GENERATOR PPM PRO PREMIUM</strong> • Perencanaan Pembelajaran Mendalam Berbasis AI
        </div>
        <div className="font-semibold text-blue-700">
          By Ahmad Yurid Ardiansah, S.Pd.
        </div>
      </div>
    </div>
  );
};
