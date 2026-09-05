import React, { useState } from 'react';
import {
  BookmarkCheck,
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
  Calendar
} from 'lucide-react';
import { PRESET_TEMPLATES, convertTemplateToPPM } from '../data/templates';
import { PPMDocument, GeneratorFormData, TemplateItem } from '../types';

interface TemplateViewProps {
  onUseTemplate: (formData: Partial<GeneratorFormData>) => void;
  onPreviewTemplateDoc: (doc: PPMDocument) => void;
}

export const TemplateView: React.FC<TemplateViewProps> = ({
  onUseTemplate,
  onPreviewTemplateDoc
}) => {
  const [filterJenjang, setFilterJenjang] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = PRESET_TEMPLATES.filter((tpl) => {
    const matchJenjang = filterJenjang === 'SEMUA' || tpl.jenjang === filterJenjang;
    const matchSearch =
      tpl.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.mataPelajaran.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.materiPelajaran.toLowerCase().includes(searchQuery.toLowerCase());
    return matchJenjang && matchSearch;
  });

  const handleApply = (tpl: TemplateItem) => {
    const formData: Partial<GeneratorFormData> = {
      jenjang: tpl.jenjang,
      kelas: tpl.kelas,
      semester: tpl.semester,
      mataPelajaran: tpl.mataPelajaran,
      materiPelajaran: tpl.materiPelajaran,
      capaianPembelajaran: tpl.capaianPembelajaran,
      tujuanPembelajaran: tpl.tujuanPembelajaran,
      jumlahPertemuan: tpl.jumlahPertemuan,
      durasiPertemuan: tpl.durasiPertemuan,
      pertemuanConfigs: tpl.pedagogis.map((model, idx) => ({
        pertemuan: idx + 1,
        model,
        subtopik: `Subtopik ${idx + 1}: ${tpl.materiPelajaran.split(',')[0]}`
      })),
      dimensiProfilLulusan: tpl.dimensiProfil
    };
    onUseTemplate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Perpustakaan Template PPM Standar Resmi
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Template siap pakai untuk SD, SMP, dan SMA yang telah divalidasi sesuai kaidah Pembelajaran Mendalam
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mapel atau materi..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Jenjang:
          </span>
          {['SEMUA', 'SD', 'SMP', 'SMA'].map((j) => (
            <button
              key={j}
              onClick={() => setFilterJenjang(j)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterJenjang === j
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {j}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between p-5 group"
          >
            <div>
              {/* Badge Jenjang & Pertemuan */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold text-[11px] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {tpl.jenjang} • {tpl.kelas}
                </span>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {tpl.jumlahPertemuan} Pertemuan
                </span>
              </div>

              {/* Title & Subject */}
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                {tpl.mataPelajaran}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                {tpl.judul}
              </h3>

              {/* Preview description */}
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {tpl.capaianPembelajaran}
              </p>

              {/* Models used */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-700 mb-1.5">
                  Model Pertemuan:
                </div>
                <div className="flex flex-wrap gap-1">
                  {tpl.pedagogis.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      P{idx + 1}: {p.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onPreviewTemplateDoc(convertTemplateToPPM(tpl))}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all text-center"
              >
                Lihat Contoh
              </button>
              <button
                onClick={() => handleApply(tpl)}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <span>Gunakan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
