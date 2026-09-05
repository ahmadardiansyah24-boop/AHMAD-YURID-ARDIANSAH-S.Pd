import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  Flame,
  GraduationCap,
  FileCheck2,
  Lightbulb,
  HeartHandshake
} from 'lucide-react';

export const PanduanView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Buku Saku Guru Kurikulum Indonesia</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
          Panduan Perencanaan Pembelajaran Mendalam (PPM)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Prinsip dasar, karakter esensial, sintaks praktik pedagogis, dan teknik penyusunan dokumen 5 tabel standar.
        </p>
      </div>

      {/* 3 Karakter Utama */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>3 Karakter Esensial Pembelajaran Mendalam</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-cyan-600 text-white font-bold text-[10px] uppercase">
              1. Berkesadaran (Mindful)
            </span>
            <h3 className="font-bold text-cyan-950 text-sm">Hadir Penuh dan Menyadari Tujuan</h3>
            <p className="text-slate-600 leading-relaxed">
              Peserta didik menyadari apa yang sedang dipelajari, mengapa hal tersebut penting, dan bagaimana proses berpikir mereka berlangsung (metakognisi). Guru memandu kesiapan emosional dan fokus belajar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-bold text-[10px] uppercase">
              2. Bermakna (Meaningful)
            </span>
            <h3 className="font-bold text-indigo-950 text-sm">Terkoneksi dengan Kehidupan Nyata</h3>
            <p className="text-slate-600 leading-relaxed">
              Pengetahuan tidak dihafal secara pasif melainkan dihubungkan dengan pengalaman hidup, fenomena di lingkungan sekitar, dan pemecahan persoalan autentik yang relevan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-2">
            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] uppercase">
              3. Menggembirakan (Joyful)
            </span>
            <h3 className="font-bold text-emerald-950 text-sm">Menumbuhkan Rasa Ingin Tahu</h3>
            <p className="text-slate-600 leading-relaxed">
              Suasana pembelajaran memicu antusiasme, rasa aman dalam mengeksplorasi ide, interaksi kolaboratif yang sehat, serta apresiasi terhadap setiap usaha peserta didik.
            </p>
          </div>
        </div>
      </div>

      {/* 8 Praktik Pedagogis */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Flame className="w-5 h-5 text-rose-500" />
          <span>8 Praktik Pedagogis & Karakteristik Sintaks</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            {
              name: 'Inkuiri (Inquiry-Based Learning)',
              desc: 'Peserta didik melakukan penyelidikan mandiri untuk membuktikan hipotesis melalui observasi, pengumpulan data, dan penarikan kesimpulan.'
            },
            {
              name: 'Discovery Learning',
              desc: 'Menemukan konsep melalui stimulasi, perumusan masalah, pengumpulan data, pengolahan, pembuktian (verifikasi), dan generalisasi simpulan.'
            },
            {
              name: 'Guided Discovery Learning',
              desc: 'Penemuan terbimbing dengan pertanyaan-pertanyaan pemantik bertahap dari guru untuk peserta didik yang memerlukan scaffolding terstruktur.'
            },
            {
              name: 'Project Based Learning (PjBL)',
              desc: 'Menghasilkan produk nyata melalui tahapan pertanyaan mendasar, perencanaan proyek, penyusunan jadwal, monitoring, pengujian hasil, dan evaluasi.'
            },
            {
              name: 'Problem Based Learning (PBL)',
              desc: 'Memecahkan masalah autentik dunia nyata melalui orientasi masalah, organisasi belajar, penyelidikan mandiri/kelompok, dan penyajian solusi.'
            },
            {
              name: 'Problem Solving',
              desc: 'Melatih kemampuan berpikir kritis logis dalam mengidentifikasi variabel masalah, memilih rumus/strategi, dan mengevaluasi kebenaran jawaban.'
            },
            {
              name: 'Game Based Learning',
              desc: 'Mengintegrasikan mekanika permainan edukasi untuk meningkatkan keterlibatan, pemahaman konsep, dan motivasi berkompetisi secara sehat.'
            },
            {
              name: 'Station Learning (Pusat Belajar)',
              desc: 'Pembagian ruangan kelas menjadi beberapa pos aktivitas dengan fokus materi berbeda di mana siswa berotasi secara terjadwal.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                {item.name}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed pl-5.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Standar 5 Tabel */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-600" />
          <span>Struktur Wajib 5 Tabel Standar Resmi PPM</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900">Tabel 1 — Identitas: </strong>
            Berisi nama satuan pendidikan, mata pelajaran, kelas/semester, materi pokok, durasi pertemuan, dan tahun pelajaran.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900">Tabel 2 — Identifikasi: </strong>
            Mencakup pemetaan mendalam peserta didik (pengetahuan awal, kesiapan, minat, latar belakang, kebutuhan, dan antisipasi perbedaan), materi pelajaran, serta capaian dimensi profil lulusan.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900">Tabel 3 — Desain Pembelajaran: </strong>
            Menghubungkan Capaian Pembelajaran (CP), Lintas Disiplin Ilmu, Tujuan Pembelajaran (TP), Topik, Praktik Pedagogis per Pertemuan, Kemitraan, Lingkungan Belajar, dan Pemanfaatan Digital.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900">Tabel 4 — Pengalaman Belajar: </strong>
            Diuraikan per pertemuan dengan alur Memahami, Mengaplikasi (sintaks model nyata), dan Refleksi berkarakter.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong className="text-slate-900">Tabel 5 — Asesmen Pembelajaran & Rubrik 4 Level: </strong>
            Memuat Asesmen Awal diagnostik, Asesmen Proses formatif, Asesmen Akhir sumatif, serta Rubrik Asesmen 4 Tingkat Pencapaian (Perlu Bimbingan, Cukup, Baik, Sangat Baik).
          </div>
        </div>
      </div>
    </div>
  );
};
