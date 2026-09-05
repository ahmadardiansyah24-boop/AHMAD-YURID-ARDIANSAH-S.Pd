import React from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Heart,
  ShieldCheck,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export const TentangView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Author Card */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-1 shadow-lg shrink-0">
            <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-3xl font-extrabold text-cyan-300">
              AY
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold backdrop-blur-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Karya Pendidik Indonesia</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ahmad Yurid Ardiansah, S.Pd.
            </h1>
            <p className="text-sm sm:text-base text-blue-200 font-medium">
              Inisiator & Pengembang GENERATOR PPM PRO PREMIUM
            </p>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed pt-1">
              Didedikasikan untuk seluruh pendidik di seluruh penjuru Nusantara—mulai dari jenjang SD, SMP, hingga SMA—untuk mewujudkan perencanaan pembelajaran yang mendalam, bermakna, berkesadaran, dan menggembirakan.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy & Mission */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Visi & Filosofi Aplikasi</span>
        </h2>

        <p>
          <strong>GENERATOR PPM PRO PREMIUM</strong> lahir dari kebutuhan nyata di lapangan, di mana penyusunan Perencanaan Pembelajaran Mendalam (PPM) sering kali membutuhkan waktu yang lama dan tantangan dalam menyelaraskan Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), sintaks model pedagogis, dan asesmen multi-level.
        </p>

        <p>
          Melalui penerapan kecerdasan artifisial terpandu, platform ini membantu guru merancang skenario pembelajaran yang holistik:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200/60">
            <strong className="text-blue-900 block mb-1 text-xs">✨ Relevan & Kontekstual</strong>
            <p className="text-[11px] text-slate-600">
              Aktivitas dirancang sesuai kehidupan nyata siswa, bukan sekadar hafalan teoritis.
            </p>
          </div>
          <div className="p-3.5 bg-indigo-50 rounded-xl border border-indigo-200/60">
            <strong className="text-indigo-900 block mb-1 text-xs">🎯 Diferensiasi Fleksibel</strong>
            <p className="text-[11px] text-slate-600">
              Mendukung multi-pertemuan dinamis dengan 8 praktik pedagogis bebas pilih.
            </p>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/60">
            <strong className="text-emerald-900 block mb-1 text-xs">📄 Siap Cetak & Resmi</strong>
            <p className="text-[11px] text-slate-600">
              Output langsung mematuhi standar 5 tabel resmi dengan ekspor Word (.docx) dan PDF.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Versi Rilis: 2.6.0 (Pro Premium Edition)</span>
          <span className="font-bold text-blue-700">
            © 2026 Generator PPM Pro Premium By Ahmad Yurid Ardiansah, S.Pd.
          </span>
        </div>
      </div>
    </div>
  );
};
