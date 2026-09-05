import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Eye,
  FileDown,
  Copy,
  Trash2,
  Calendar,
  School,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PPMDocument, Jenjang } from '../types';
import { exportPPMToWord } from '../utils/exportWord';

interface RiwayatViewProps {
  documents: PPMDocument[];
  onOpenPPM: (doc: PPMDocument) => void;
  onDuplicatePPM: (doc: PPMDocument) => void;
  onDeletePPM: (id: string) => void;
  onCreateNew: () => void;
}

export const RiwayatView: React.FC<RiwayatViewProps> = ({
  documents,
  onOpenPPM,
  onDuplicatePPM,
  onDeletePPM,
  onCreateNew
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterJenjang, setFilterJenjang] = useState<string>('SEMUA');

  const filteredDocs = documents.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.identitas.namaSatuanPendidikan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.identitas.mataPelajaran.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.identitas.namaGuru.toLowerCase().includes(searchQuery.toLowerCase());

    const matchJenjang = filterJenjang === 'SEMUA' || doc.identitas.jenjang === filterJenjang;

    return matchSearch && matchJenjang;
  });

  return (
    <div className="space-y-5">
      {/* Header & Stats */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <History className="w-4 h-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Riwayat Perencanaan Pembelajaran Mendalam
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Daftar seluruh dokumen PPM yang tersimpan secara lokal dan siap dikelola
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Buat PPM Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mapel, materi, sekolah, guru..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none text-slate-800 font-medium"
          />
        </div>

        {/* Filter Jenjang Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-center overflow-x-auto w-full sm:w-auto">
          <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Jenjang:
          </span>
          {['SEMUA', 'SD', 'SMP', 'SMA'].map((j) => (
            <button
              key={j}
              onClick={() => setFilterJenjang(j)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterJenjang === j
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {j}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Documents */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              Tidak Ada Dokumen yang Ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              {searchQuery || filterJenjang !== 'SEMUA'
                ? 'Coba ganti kata kunci pencarian atau ubah filter jenjang.'
                : 'Belum ada dokumen PPM yang dibuat. Silakan klik tombol di bawah untuk membuat.'}
            </p>
            <button
              onClick={onCreateNew}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs"
            >
              Buat PPM Sekarang
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
                  <th className="p-3.5 text-center w-12">No</th>
                  <th className="p-3.5">Judul & Materi PPM</th>
                  <th className="p-3.5">Jenjang / Kelas</th>
                  <th className="p-3.5">Mata Pelajaran</th>
                  <th className="p-3.5">Pertemuan</th>
                  <th className="p-3.5">Satuan Pendidikan</th>
                  <th className="p-3.5">Tanggal</th>
                  <th className="p-3.5 text-center w-44">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocs.map((doc, idx) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="p-3.5 text-center font-bold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="line-clamp-1">{doc.title}</div>
                      <div className="text-[11px] font-normal text-slate-500 line-clamp-1">
                        Guru: {doc.identitas.namaGuru}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[11px]">
                        {doc.identitas.jenjang} • {doc.identitas.kelas}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-800">
                      {doc.identitas.mataPelajaran}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {doc.pengalamanBelajar.length} Pertemuan
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <div className="line-clamp-1">{doc.identitas.namaSatuanPendidikan}</div>
                    </td>
                    <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenPPM(doc)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Lihat Preview Dokumen"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => exportPPMToWord(doc)}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
                          title="Download Word (.docx)"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDuplicatePPM(doc)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 transition-colors"
                          title="Duplikasi Dokumen Ini"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus dokumen "${doc.title}"?`)) {
                              onDeletePPM(doc.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition-colors"
                          title="Hapus Dokumen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
