import React, { useState, useRef } from 'react';
import {
  FileDown,
  Printer,
  Edit3,
  Check,
  RotateCw,
  Copy,
  ArrowLeft,
  Sparkles,
  Share2,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  FileText,
  Maximize2
} from 'lucide-react';
import { PPMDocument } from '../types';
import { exportPPMToWord } from '../utils/exportWord';

export type PaperSizeOption = 'FULL' | 'A4' | 'F4';

interface PPMPreviewProps {
  document: PPMDocument;
  onUpdateDocument: (updated: PPMDocument) => void;
  onBack: () => void;
}

export const PPMPreview: React.FC<PPMPreviewProps> = ({
  document: initialDoc,
  onUpdateDocument,
  onBack
}) => {
  const [doc, setDoc] = useState<PPMDocument>(initialDoc);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [paperSize, setPaperSize] = useState<PaperSizeOption>('FULL');
  const [isWordExporting, setIsWordExporting] = useState<boolean>(false);

  // Partial Regeneration State
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>('pengalaman');
  const [regenPrompt, setRegenPrompt] = useState<string>('');
  const [showRegenModal, setShowRegenModal] = useState<boolean>(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // Inject dynamic print page size based on chosen paperSize
    const existing = document.getElementById('dynamic-print-paper-size');
    if (existing) existing.remove();

    const style = document.createElement('style');
    style.id = 'dynamic-print-paper-size';
    const sizeCss = paperSize === 'F4' ? '215mm 330mm' : 'A4';
    style.innerHTML = `@media print { @page { size: ${sizeCss} portrait !important; margin: 12mm 12mm 12mm 12mm !important; } }`;
    document.head.appendChild(style);

    window.print();
    setTimeout(() => {
      document.getElementById('dynamic-print-paper-size')?.remove();
    }, 1000);
  };

  const handleDownloadWord = async (chosenSize?: 'A4' | 'F4') => {
    const targetSize = chosenSize || (paperSize === 'F4' ? 'F4' : 'A4');
    setIsWordExporting(true);
    try {
      await exportPPMToWord(doc, targetSize);
    } catch (err: any) {
      alert('Gagal mengekspor dokumen Word: ' + err.message);
    } finally {
      setIsWordExporting(false);
    }
  };

  const handleCopyText = () => {
    const text = `
PERENCANAAN PEMBELAJARAN MENDALAM (PPM)
${doc.identitas.mataPelajaran} - ${doc.identitas.kelas} - ${doc.identitas.namaSatuanPendidikan}
Tahun Pelajaran: ${doc.identitas.tahunPelajaran}

TABEL 1 - IDENTITAS
Satuan Pendidikan: ${doc.identitas.namaSatuanPendidikan}
Mata Pelajaran: ${doc.identitas.mataPelajaran}
Kelas/Semester: ${doc.identitas.kelas} / ${doc.identitas.semester}
Materi: ${doc.identitas.materiPelajaran}
Durasi: ${doc.pengalamanBelajar.length} Pertemuan (${doc.identitas.durasiPertemuan})

TABEL 2 - IDENTIFIKASI
Peserta Didik:
- Pengetahuan Awal: ${doc.identifikasi.pesertaDidik.pengetahuanAwal}
- Kesiapan Belajar: ${doc.identifikasi.pesertaDidik.kesiapanBelajar}
- Minat Belajar: ${doc.identifikasi.pesertaDidik.minat}
- Kebutuhan Belajar: ${doc.identifikasi.pesertaDidik.kebutuhanBelajar}
Materi Pelajaran: ${doc.identifikasi.materiPelajaran}

TABEL 3 - DESAIN PEMBELAJARAN
CP: ${doc.desainPembelajaran.capaianPembelajaran}
Lintas Disiplin Ilmu: ${doc.desainPembelajaran.lintasDisiplinIlmu.join('; ')}
TP: ${doc.desainPembelajaran.tujuanPembelajaran}
Topik: ${doc.desainPembelajaran.topikPembelajaran}
Kemitraan: ${doc.desainPembelajaran.kemitraanPembelajaran.join(', ')}
Pemanfaatan Digital: ${doc.desainPembelajaran.pemanfaatanDigital.join(', ')}

TABEL 4 - PENGALAMAN BELAJAR
${doc.pengalamanBelajar.map((pb) => `
PERTEMUAN ${pb.pertemuan} (${pb.materiSubtopik} - Model: ${pb.praktikPedagogis})
Memahami: ${pb.memahami.aktivitas.join(' | ')}
Mengaplikasi:
${pb.mengaplikasi.tahapan.map(t => `- ${t.sintaks}: ${t.kegiatan}`).join('\n')}
Refleksi: ${pb.refleksi.aktivitas.join(' | ')}
`).join('\n')}

TABEL 5 - ASESMEN PEMBELAJARAN
Asesmen Awal: ${doc.asesmenPembelajaran.asesmenAwal.instrumen}
Asesmen Proses: ${doc.asesmenPembelajaran.asesmenProses.instrumen}
Asesmen Akhir: ${doc.asesmenPembelajaran.asesmenAkhir.bentuk}
`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleSave = () => {
    onUpdateDocument(doc);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRegenerateSection = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: selectedSection,
          fullPPM: doc,
          customPrompt: regenPrompt
        })
      });
      const data = await res.json();
      if (!res.ok || !data.data) {
        throw new Error(data.error || 'Gagal meregenerasi bagian ini.');
      }

      // Merge back into doc
      setDoc((prev) => {
        const next = { ...prev };
        if (selectedSection === 'identifikasi') next.identifikasi = data.data;
        else if (selectedSection === 'desain') next.desainPembelajaran = data.data;
        else if (selectedSection === 'pengalaman') next.pengalamanBelajar = data.data;
        else if (selectedSection === 'asesmen') next.asesmenPembelajaran = data.data;
        else if (selectedSection === 'rubrik') next.asesmenPembelajaran.rubrikAsesmen = data.data;
        return next;
      });

      setShowRegenModal(false);
      setRegenPrompt('');
      handleSave();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar (Not visible when printed) */}
      <div className="no-print bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 sticky top-18 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all text-xs font-bold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Preview Dokumen PPM Pro
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 uppercase">
                {paperSize === 'FULL' ? 'Lebar Penuh' : `Kertas ${paperSize}`}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Format 5 Tabel Resmi • {doc.identitas.mataPelajaran} ({doc.identitas.kelas})
            </p>
          </div>
        </div>

        {/* Paper Size / Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Kertas:
          </span>
          <button
            onClick={() => setPaperSize('FULL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              paperSize === 'FULL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
            title="Tampilan Lebar Penuh (100% Layar) - Tabel memenuhi lebar layar secara proporsional"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Lebar Penuh (100%)</span>
          </button>
          <button
            onClick={() => setPaperSize('A4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              paperSize === 'A4'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
            title="Format Kertas Standar A4 (210 x 297 mm)"
          >
            <span>A4</span>
          </button>
          <button
            onClick={() => setPaperSize('F4')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              paperSize === 'F4'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
            title="Format Kertas Folio / F4 (215 x 330 mm)"
          >
            <span>F4 / Folio</span>
          </button>
        </div>

        {/* Action Buttons Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Regenerate Part Dropdown */}
          <button
            onClick={() => setShowRegenModal(true)}
            className="px-3 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Regenerasi sebagian tabel menggunakan AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Regenerasi Bagian</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isEditMode
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Selesai Edit' : 'Edit Inline'}</span>
          </button>

          {/* Copy Text */}
          <button
            onClick={handleCopyText}
            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Salin semua teks PPM ke clipboard"
          >
            {copySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          {/* Print PDF */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
            title={`Cetak langsung dokumen format ${paperSize === 'F4' ? 'F4 / Folio' : 'A4'}`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak {paperSize === 'F4' ? 'F4' : 'A4'}</span>
          </button>

          {/* Download Word .docx with Quick Options */}
          <div className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 text-white text-xs font-extrabold p-0.5">
            <button
              onClick={() => handleDownloadWord()}
              disabled={isWordExporting}
              className="px-3.5 py-2 hover:opacity-90 flex items-center gap-1.5 transition-all disabled:opacity-50"
              title={`Unduh format Microsoft Word (.docx) ukuran ${paperSize === 'F4' ? 'F4' : 'A4'}`}
            >
              <FileDown className="w-4 h-4" />
              <span>{isWordExporting ? 'Mengekspor...' : `Download Word (${paperSize === 'F4' ? 'F4' : 'A4'})`}</span>
            </button>
            <div className="h-4 w-px bg-blue-400/50" />
            <button
              onClick={() => handleDownloadWord(paperSize === 'F4' ? 'A4' : 'F4')}
              disabled={isWordExporting}
              className="px-2.5 py-2 hover:bg-white/10 rounded-r-lg text-[11px] font-semibold text-blue-100 transition-all"
              title={`Unduh versi alternatif (${paperSize === 'F4' ? 'A4' : 'F4'})`}
            >
              {paperSize === 'F4' ? 'A4' : 'F4'}
            </button>
          </div>

          {/* Save indicator */}
          <button
            onClick={handleSave}
            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all"
            title="Simpan Dokumen ke Riwayat"
          >
            {saveSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Save className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isEditMode && (
        <div className="no-print p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Mode Edit Aktif:</strong> Anda dapat mengklik dan mengubah teks pada tabel langsung di layar ini. Klik <strong>Selesai Edit</strong> atau <strong>Simpan</strong> setelah melakukan penyesuaian.
          </span>
        </div>
      )}

      {/* =========================================================================
          DOCUMENT PAPER CONTAINER (A4 / F4 / FULL-WIDTH SIMULATION WITH ARIAL 11)
         ========================================================================= */}
      <div
        ref={printRef}
        id="a4-document-container"
        className={`bg-white text-slate-900 shadow-xl border border-slate-300 font-sans transition-all ${
          paperSize === 'FULL'
            ? 'w-full max-w-full rounded-2xl p-6 sm:p-10 lg:p-12'
            : paperSize === 'F4'
            ? 'mx-auto w-full max-w-[960px] rounded-xl p-8 sm:p-12'
            : 'mx-auto w-full max-w-[880px] rounded-xl p-8 sm:p-12'
        }`}
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11pt',
          lineHeight: '1.6'
        }}
      >
        {/* DOCUMENT HEADER / KOP JUDUL */}
        <div className="text-center pb-4 border-b-2 border-slate-800 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-900 uppercase">
            PERENCANAAN PEMBELAJARAN MENDALAM (PPM)
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-slate-800 uppercase mt-1">
            MATA PELAJARAN {doc.identitas.mataPelajaran} — {doc.identitas.kelas} — SEMESTER {doc.identitas.semester}
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            {doc.identitas.namaSatuanPendidikan} • Tahun Pelajaran {doc.identitas.tahunPelajaran}
          </p>
        </div>

        {/* ==================== TABEL 1: IDENTITAS ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              TABEL 1 — IDENTITAS
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Tabel 1 Resmi</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm table-fixed">
            <tbody>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Nama Satuan Pendidikan
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const text = e.currentTarget.textContent || '';
                    setDoc({ ...doc, identitas: { ...doc.identitas, namaSatuanPendidikan: text } });
                  }}
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 ${isEditMode ? 'bg-amber-50/50 outline-blue-500' : ''}`}
                >
                  {doc.identitas.namaSatuanPendidikan}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Mata Pelajaran
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const text = e.currentTarget.textContent || '';
                    setDoc({ ...doc, identitas: { ...doc.identitas, mataPelajaran: text } });
                  }}
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 ${isEditMode ? 'bg-amber-50/50 outline-blue-500' : ''}`}
                >
                  {doc.identitas.mataPelajaran}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Kelas / Semester
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.identitas.kelas} / {doc.identitas.semester}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Materi Pelajaran
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const text = e.currentTarget.textContent || '';
                    setDoc({ ...doc, identitas: { ...doc.identitas, materiPelajaran: text } });
                  }}
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 font-semibold ${isEditMode ? 'bg-amber-50/50 outline-blue-500' : ''}`}
                >
                  {doc.identitas.materiPelajaran || doc.title}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Durasi Pertemuan
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.pengalamanBelajar.length} Pertemuan ({doc.identitas.durasiPertemuan || '2 × 40 menit'})
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  Tahun Pelajaran
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.identitas.tahunPelajaran}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ==================== TABEL 2: IDENTIFIKASI ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              TABEL 2 — IDENTIFIKASI
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Tabel 2 Resmi</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm table-fixed">
            <thead>
              <tr className="bg-blue-900 text-white font-bold text-center">
                <th className="p-2.5 border border-slate-400 w-1/3 sm:w-[28%]">Komponen Identifikasi</th>
                <th className="p-2.5 border border-slate-400 w-2/3 sm:w-[72%]">Uraian Hasil Identifikasi Pembelajaran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 align-top text-slate-800">
                  A. Peserta Didik
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  className={`w-2/3 sm:w-[72%] p-3 border border-slate-400 space-y-2 text-justify ${isEditMode ? 'bg-amber-50/50' : ''}`}
                >
                  <p><strong>• Pengetahuan Awal: </strong>{doc.identifikasi.pesertaDidik.pengetahuanAwal}</p>
                  <p><strong>• Kesiapan Belajar: </strong>{doc.identifikasi.pesertaDidik.kesiapanBelajar}</p>
                  <p><strong>• Minat Belajar: </strong>{doc.identifikasi.pesertaDidik.minat}</p>
                  <p><strong>• Latar Belakang: </strong>{doc.identifikasi.pesertaDidik.latarBelakang}</p>
                  <p><strong>• Kebutuhan Belajar: </strong>{doc.identifikasi.pesertaDidik.kebutuhanBelajar}</p>
                  <p><strong>• Perbedaan Kemampuan: </strong>{doc.identifikasi.pesertaDidik.kemungkinanPerbedaanKemampuan}</p>
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 align-top text-slate-800">
                  B. Materi Pelajaran
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 text-justify ${isEditMode ? 'bg-amber-50/50' : ''}`}
                >
                  {doc.identifikasi.materiPelajaran}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 align-top text-slate-800">
                  C. Capaian Dimensi Profil Lulusan
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400 space-y-1.5">
                  {doc.identifikasi.capaianDimensiProfil.map((dim, idx) => (
                    <div key={idx} className="text-justify">
                      <strong className="text-blue-900">• {dim.dimensi}: </strong>
                      <span>{dim.relevansi}</span>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ==================== TABEL 3: DESAIN PEMBELAJARAN ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              TABEL 3 — DESAIN PEMBELAJARAN
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Tabel 3 Resmi</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm table-fixed">
            <tbody>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  A. Capaian Pembelajaran (CP)
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 text-justify ${isEditMode ? 'bg-amber-50/50' : ''}`}
                >
                  {doc.desainPembelajaran.capaianPembelajaran}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  B. Lintas Disiplin Ilmu
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.desainPembelajaran.lintasDisiplinIlmu.join('; ')}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  C. Tujuan Pembelajaran (TP)
                </td>
                <td
                  contentEditable={isEditMode}
                  suppressContentEditableWarning
                  className={`w-2/3 sm:w-[72%] p-2.5 border border-slate-400 whitespace-pre-line text-justify ${isEditMode ? 'bg-amber-50/50' : ''}`}
                >
                  {doc.desainPembelajaran.tujuanPembelajaran}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  D. Topik Pembelajaran
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400 font-semibold">
                  {doc.desainPembelajaran.topikPembelajaran}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 align-top text-slate-800">
                  E. Praktik Pedagogis per Pertemuan
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400 space-y-1">
                  {doc.desainPembelajaran.praktikPedagogisPerPertemuan.map((p, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-bold text-blue-900 shrink-0">Pertemuan {p.pertemuan}:</span>
                      <span>
                        <strong>{p.model}</strong> — {p.subtopik}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  F. Kemitraan Pembelajaran
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.desainPembelajaran.kemitraanPembelajaran.join(', ')}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  G. Lingkungan Pembelajaran
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400">
                  {doc.desainPembelajaran.lingkunganPembelajaran.join(', ')}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 sm:w-[28%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  H. Pemanfaatan Digital
                </td>
                <td className="w-2/3 sm:w-[72%] p-2.5 border border-slate-400 text-blue-900 font-medium">
                  {doc.desainPembelajaran.pemanfaatanDigital.join('; ')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ==================== TABEL 4: PENGALAMAN BELAJAR ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              TABEL 4 — PENGALAMAN BELAJAR PER PERTEMUAN
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Tabel 4 Resmi</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm table-fixed">
            <thead>
              <tr className="bg-blue-900 text-white font-bold text-center">
                <th className="p-2.5 border border-slate-400 w-1/4 sm:w-[26%]">Pertemuan & Rincian Model</th>
                <th className="p-2.5 border border-slate-400 w-3/4 sm:w-[74%]">Tahapan Pengalaman Belajar Berkesadaran, Bermakna & Menggembirakan</th>
              </tr>
            </thead>
            <tbody>
              {doc.pengalamanBelajar.map((pb) => (
                <tr key={pb.pertemuan}>
                  <td className="w-1/4 sm:w-[26%] p-3 border border-slate-400 bg-slate-50 align-top space-y-2">
                    <div className="font-extrabold text-blue-900 text-sm">
                      PERTEMUAN {pb.pertemuan}
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[11px]">Subtopik:</span>
                      <span className="text-xs text-slate-900 font-medium">{pb.materiSubtopik}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[11px]">Praktik Pedagogis:</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                        {pb.praktikPedagogis}
                      </span>
                    </div>
                  </td>

                  <td className="w-3/4 sm:w-[74%] p-3 border border-slate-400 space-y-3.5 text-justify">
                    {/* A. MEMAHAMI */}
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[11px] pb-1 border-b border-slate-200 flex items-center justify-between">
                        <span>A. MEMAHAMI</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-100 text-cyan-800 font-semibold lowercase">
                          karakter {pb.memahami.karakter}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-800">
                        {pb.memahami.aktivitas.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>

                    {/* B. MENGAPLIKASI */}
                    <div>
                      <div className="font-bold text-blue-950 uppercase text-[11px] pb-1 border-b border-slate-200 flex items-center justify-between">
                        <span>B. MENGAPLIKASI (Sintaks {pb.praktikPedagogis})</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-semibold lowercase">
                          karakter {pb.mengaplikasi.karakter}
                        </span>
                      </div>
                      <div className="space-y-1.5 mt-1.5 pl-1">
                        {pb.mengaplikasi.tahapan.map((th, i) => (
                          <div key={i} className="text-slate-800">
                            <strong className="text-blue-900">{th.sintaks}: </strong>
                            <span>{th.kegiatan}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* C. REFLEKSI */}
                    <div>
                      <div className="font-bold text-slate-900 uppercase text-[11px] pb-1 border-b border-slate-200 flex items-center justify-between">
                        <span>C. REFLEKSI</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold lowercase">
                          karakter {pb.refleksi.karakter}
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-800">
                        {pb.refleksi.aktivitas.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==================== TABEL 5: ASESMEN PEMBELAJARAN ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              TABEL 5 — ASESMEN PEMBELAJARAN
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Tabel 5 Resmi</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm table-fixed">
            <thead>
              <tr className="bg-blue-900 text-white font-bold text-center">
                <th className="p-2.5 border border-slate-400 w-1/4 sm:w-[24%]">Bentuk Asesmen</th>
                <th className="p-2.5 border border-slate-400 w-5/12 sm:w-[38%]">Teknik & Instrumen Penilaian</th>
                <th className="p-2.5 border border-slate-400 w-1/3 sm:w-[38%]">Penjelasan & Relevansi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/4 sm:w-[24%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  A. Asesmen Awal (Diagnostik)
                </td>
                <td className="w-5/12 sm:w-[38%] p-2.5 border border-slate-400 space-y-1 align-top">
                  <div><strong>Teknik: </strong>{doc.asesmenPembelajaran.asesmenAwal.teknik.join(', ')}</div>
                  <div><strong>Instrumen: </strong>{doc.asesmenPembelajaran.asesmenAwal.instrumen}</div>
                </td>
                <td className="w-1/3 sm:w-[38%] p-2.5 border border-slate-400 text-justify align-top">
                  {doc.asesmenPembelajaran.asesmenAwal.penjelasan}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 sm:w-[24%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  B. Asesmen Proses (Formatif)
                </td>
                <td className="w-5/12 sm:w-[38%] p-2.5 border border-slate-400 space-y-1 align-top">
                  <div><strong>Teknik: </strong>{doc.asesmenPembelajaran.asesmenProses.teknik.join(', ')}</div>
                  <div><strong>Instrumen: </strong>{doc.asesmenPembelajaran.asesmenProses.instrumen}</div>
                </td>
                <td className="w-1/3 sm:w-[38%] p-2.5 border border-slate-400 text-justify align-top">
                  {doc.asesmenPembelajaran.asesmenProses.penjelasan}
                </td>
              </tr>
              <tr>
                <td className="w-1/4 sm:w-[24%] p-2.5 font-bold border border-slate-400 bg-slate-50 text-slate-800 align-top">
                  C. Asesmen Akhir (Sumatif)
                </td>
                <td className="w-5/12 sm:w-[38%] p-2.5 border border-slate-400 space-y-1 align-top">
                  <div><strong>Bentuk: </strong>{doc.asesmenPembelajaran.asesmenAkhir.bentuk}</div>
                  <div><strong>Kriteria: </strong>{doc.asesmenPembelajaran.asesmenAkhir.kriteria}</div>
                </td>
                <td className="w-1/3 sm:w-[38%] p-2.5 border border-slate-400 text-justify align-top">
                  {doc.asesmenPembelajaran.asesmenAkhir.penjelasan}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ==================== RUBRIK ASESMEN 4 LEVEL ==================== */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide uppercase">
              RUBRIK ASESMEN PEMBELAJARAN (4 TINGKAT PENCAPAIAN)
            </h3>
            <span className="text-[10px] text-slate-400 no-print">Rubrik Standar</span>
          </div>
          <table className="w-full border-collapse border border-slate-400 text-xs table-fixed">
            <thead>
              <tr className="bg-slate-800 text-white font-bold text-center">
                <th className="p-2 border border-slate-400 w-[24%]">Indikator & Kriteria</th>
                <th className="p-2 border border-slate-400 w-[19%]">Skor 1<br /><span className="text-[10px] font-normal">(Perlu Bimbingan)</span></th>
                <th className="p-2 border border-slate-400 w-[19%]">Skor 2<br /><span className="text-[10px] font-normal">(Cukup)</span></th>
                <th className="p-2 border border-slate-400 w-[19%]">Skor 3<br /><span className="text-[10px] font-normal">(Baik)</span></th>
                <th className="p-2 border border-slate-400 w-[19%]">Skor 4<br /><span className="text-[10px] font-normal">(Sangat Baik)</span></th>
              </tr>
            </thead>
            <tbody>
              {doc.asesmenPembelajaran.rubrikAsesmen.map((rb, idx) => (
                <tr key={idx}>
                  <td className="w-[24%] p-2 border border-slate-400 bg-slate-50 align-top">
                    <strong className="block text-slate-900">{rb.indikator}</strong>
                    <span className="text-[11px] text-slate-500">{rb.kriteria}</span>
                  </td>
                  <td className="w-[19%] p-2 border border-slate-400 align-top text-justify">{rb.skor1}</td>
                  <td className="w-[19%] p-2 border border-slate-400 align-top text-justify">{rb.skor2}</td>
                  <td className="w-[19%] p-2 border border-slate-400 align-top text-justify">{rb.skor3}</td>
                  <td className="w-[19%] p-2 border border-slate-400 align-top text-justify bg-blue-50/40">{rb.skor4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==================== BLOK TANDA TANGAN RESMI ==================== */}
        <div className="pt-4 page-break-inside-avoid">
          <div className="text-right text-xs mb-6 text-slate-800 font-medium">
            {doc.tandaTangan.tempatTanggal}
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs text-slate-900">
            {/* Kiri: Kepala Satuan Pendidikan */}
            <div>
              <p>Mengetahui,</p>
              <p className="font-bold">{doc.tandaTangan.kepalaSekolah.jabatan}</p>
              <p className="font-semibold">{doc.tandaTangan.kepalaSekolah.namaSekolah}</p>

              <div className="h-20 sm:h-24 flex items-end">
                <p className="font-bold underline text-sm text-slate-950">
                  {doc.tandaTangan.kepalaSekolah.nama}
                </p>
              </div>
              <p className="text-slate-600">
                NIP. {doc.tandaTangan.kepalaSekolah.nip}
              </p>
            </div>

            {/* Kanan: Guru Mata Pelajaran */}
            <div>
              <p>Guru Pengampu,</p>
              <p className="font-bold">{doc.tandaTangan.guruMapel.jabatan}</p>
              <p className="font-semibold">{doc.tandaTangan.guruMapel.mapel}</p>

              <div className="h-20 sm:h-24 flex items-end">
                <p className="font-bold underline text-sm text-slate-950">
                  {doc.tandaTangan.guruMapel.nama}
                </p>
              </div>
              <p className="text-slate-600">
                NIP. {doc.tandaTangan.guruMapel.nip}
              </p>
            </div>
          </div>

          {/* Footer Dokumen Watermark */}
          <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Dokumen disusun menggunakan GENERATOR PPM PRO PREMIUM • Perencanaan Pembelajaran Mendalam Berbasis AI
            <div className="font-semibold text-slate-500 mt-0.5">
              By Ahmad Yurid Ardiansah, S.Pd.
            </div>
          </div>
        </div>
      </div>

      {/* ======================= MODAL REGENERASI BAGIAN ======================= */}
      {showRegenModal && (
        <div className="no-print fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Regenerasi Sebagian Dokumen PPM
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbarui tabel tertentu tanpa mengubah bagian lainnya
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRegenModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pilih Bagian / Tabel yang Ingin Diregenerasi:
                </label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="pengalaman">Tabel 4 — Pengalaman Belajar (Aktivitas Pertemuan)</option>
                  <option value="identifikasi">Tabel 2 — Identifikasi (Peserta Didik & Dimensi Profil)</option>
                  <option value="desain">Tabel 3 — Desain Pembelajaran (CP, TP & Digital)</option>
                  <option value="asesmen">Tabel 5 — Asesmen Pembelajaran (Awal, Proses, Akhir)</option>
                  <option value="rubrik">Rubrik Asesmen 4 Level</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Instruksi Tambahan untuk AI (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={regenPrompt}
                  onChange={(e) => setRegenPrompt(e.target.value)}
                  placeholder="Contoh: Buat aktivitas di pertemuan 2 lebih seru menggunakan simulasi kelompok dan kuis interaktif..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRegenModal(false)}
                disabled={isRegenerating}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={handleRegenerateSection}
                disabled={isRegenerating}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {isRegenerating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Sedang Menyusun...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Mulai Regenerasi Bagian</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
