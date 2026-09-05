import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  School,
  User,
  GraduationCap,
  Calendar,
  BookOpen,
  Target,
  Layers,
  CheckSquare,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  FileCheck,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';
import {
  GeneratorFormData,
  Jenjang,
  Semester,
  PertemuanConfig,
  PPMDocument
} from '../types';

interface GeneratorViewProps {
  onPPMGenerated: (doc: PPMDocument) => void;
  initialData?: Partial<GeneratorFormData>;
  onCancel?: () => void;
}

const DIMENSI_LIST = [
  'Keimanan dan Ketakwaan',
  'Kewargaan',
  'Penalaran Kritis',
  'Kreativitas',
  'Kolaborasi',
  'Kemandirian',
  'Kesehatan',
  'Komunikasi'
];

const PEDAGOGIS_OPTIONS = [
  'Inkuiri',
  'Discovery Learning',
  'Guided Discovery Learning',
  'Project Based Learning (PjBL)',
  'Problem Based Learning (PBL)',
  'Problem Solving',
  'Game Based Learning',
  'Station Learning'
];

const DURASI_PRESETS = [
  '2 × 35 menit (SD)',
  '3 × 35 menit (SD)',
  '2 × 40 menit (SMP)',
  '3 × 40 menit (SMP)',
  '2 × 45 menit (SMA)',
  '3 × 45 menit (SMA)',
  'Kustom'
];

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  onPPMGenerated,
  initialData,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isWizardMode, setIsWizardMode] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [namaSatuanPendidikan, setNamaSatuanPendidikan] = useState(initialData?.namaSatuanPendidikan || 'SMP Negeri 1 Indonesia');
  const [namaGuru, setNamaGuru] = useState(initialData?.namaGuru || 'Ahmad Yurid Ardiansah, S.Pd.');
  const [nipGuru, setNipGuru] = useState(initialData?.nipGuru || '198905142015031002');
  const [namaKepalaSekolah, setNamaKepalaSekolah] = useState(initialData?.namaKepalaSekolah || 'Drs. H. Mulyono, M.Pd.');
  const [nipKepalaSekolah, setNipKepalaSekolah] = useState(initialData?.nipKepalaSekolah || '197203101998021004');
  const [jenjang, setJenjang] = useState<Jenjang>(initialData?.jenjang || 'SMP');
  const [kelas, setKelas] = useState(initialData?.kelas || 'Kelas 7');
  const [semester, setSemester] = useState<Semester>(initialData?.semester || 'Ganjil');
  const [mataPelajaran, setMataPelajaran] = useState(initialData?.mataPelajaran || 'Matematika');
  const [tahunPelajaran, setTahunPelajaran] = useState(initialData?.tahunPelajaran || '2025/2026');
  const [namaKabupaten, setNamaKabupaten] = useState(initialData?.namaKabupaten || 'Kabupaten Sleman');
  const [tanggalPembuatan, setTanggalPembuatan] = useState(initialData?.tanggalPembuatan || new Date().toISOString().split('T')[0]);

  // Data Pembelajaran
  const [capaianPembelajaran, setCapaianPembelajaran] = useState(
    initialData?.capaianPembelajaran ||
      'Peserta didik dapat memahami bilangan rasional dan desimal, menerapkan operasi hitung dalam pemecahan masalah kontekstual, serta bernalar kritis dalam mengevaluasi solusi.'
  );
  const [tujuanPembelajaran, setTujuanPembelajaran] = useState(
    initialData?.tujuanPembelajaran ||
      '1. Mengidentifikasi dan membandingkan bilangan rasional melalui media interaktif.\n2. Menyelesaikan operasi hitung pecahan dan desimal dalam situasi jual beli nyata.\n3. Merumuskan kesimpulan matematis secara kritis dan berkolaborasi dalam kelompok.'
  );
  const [materiPelajaran, setMateriPelajaran] = useState(
    initialData?.materiPelajaran || 'Bilangan Rasional dan Penerapannya dalam Kehidupan Nyata'
  );
  const [jumlahPertemuan, setJumlahPertemuan] = useState<number>(initialData?.jumlahPertemuan || 3);
  const [durasiPertemuan, setDurasiPertemuan] = useState(initialData?.durasiPertemuan || '2 × 40 menit (SMP)');
  const [customDurasi, setCustomDurasi] = useState(initialData?.customDurasi || '');

  // Dimensi Profil Lulusan
  const [dimensiProfilLulusan, setDimensiProfilLulusan] = useState<string[]>(
    initialData?.dimensiProfilLulusan || ['Penalaran Kritis', 'Kolaborasi', 'Kreativitas', 'Kemandirian']
  );

  // Pertemuan Configs (Dynamic per meeting)
  const [pertemuanConfigs, setPertemuanConfigs] = useState<PertemuanConfig[]>(() => {
    if (initialData?.pertemuanConfigs && initialData.pertemuanConfigs.length > 0) {
      return initialData.pertemuanConfigs;
    }
    return [
      { pertemuan: 1, model: 'Discovery Learning' },
      { pertemuan: 2, model: 'Inkuiri' },
      { pertemuan: 3, model: 'Problem Based Learning (PBL)' }
    ];
  });

  // Dynamic class list according to Jenjang
  const kelasOptions = jenjang === 'SD'
    ? ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
    : jenjang === 'SMP'
    ? ['Kelas 7', 'Kelas 8', 'Kelas 9']
    : ['Kelas 10', 'Kelas 11', 'Kelas 12'];

  // Keep class valid when jenjang switches
  useEffect(() => {
    if (!kelasOptions.includes(kelas)) {
      setKelas(kelasOptions[0]);
    }
  }, [jenjang]);

  // Adjust pertemuanConfigs whenever jumlahPertemuan changes
  useEffect(() => {
    const n = Math.max(1, Math.min(12, jumlahPertemuan));
    setPertemuanConfigs((prev) => {
      const updated: PertemuanConfig[] = [];
      for (let i = 1; i <= n; i++) {
        const existing = prev.find((p) => p.pertemuan === i);
        if (existing) {
          updated.push(existing);
        } else {
          const defaultModel =
            i === 1
              ? 'Discovery Learning'
              : i === 2
              ? 'Inkuiri'
              : i === 3
              ? 'Problem Based Learning (PBL)'
              : i === 4
              ? 'Project Based Learning (PjBL)'
              : i === 5
              ? 'Game Based Learning'
              : 'Station Learning';
          updated.push({ pertemuan: i, model: defaultModel });
        }
      }
      return updated;
    });
  }, [jumlahPertemuan]);

  // Handle Model Change for specific meeting
  const handleModelChange = (meetingNum: number, newModel: string) => {
    setPertemuanConfigs((prev) =>
      prev.map((p) => (p.pertemuan === meetingNum ? { ...p, model: newModel } : p))
    );
  };

  // Toggle Dimensi
  const toggleDimensi = (dimensi: string) => {
    setDimensiProfilLulusan((prev) =>
      prev.includes(dimensi) ? prev.filter((d) => d !== dimensi) : [...prev, dimensi]
    );
  };

  // AI Generation Loading state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [activeSubStepIndex, setActiveSubStepIndex] = useState<number>(0);

  const subSteps = [
    'Menganalisis Capaian Pembelajaran (CP)',
    'Menganalisis Tujuan Pembelajaran (TP)',
    'Membagi materi menjadi subtopik logis per pertemuan',
    'Menyusun sintaks aktivitas berkesadaran & bermakna',
    'Menyusun instrumen asesmen & rubrik 4 level',
    'Menyelesaikan struktur 5 Tabel PPM Standar Resmi'
  ];

  // Validation function
  const validateForm = (): boolean => {
    if (!namaSatuanPendidikan.trim()) {
      setErrorMessage('Nama Satuan Pendidikan wajib diisi.');
      return false;
    }
    if (!namaGuru.trim()) {
      setErrorMessage('Nama Guru wajib diisi.');
      return false;
    }
    if (!namaKepalaSekolah.trim()) {
      setErrorMessage('Nama Kepala Sekolah wajib diisi.');
      return false;
    }
    if (!mataPelajaran.trim()) {
      setErrorMessage('Mata Pelajaran wajib diisi.');
      return false;
    }
    if (!namaKabupaten.trim()) {
      setErrorMessage('Nama Kabupaten wajib diisi.');
      return false;
    }
    if (!materiPelajaran.trim()) {
      setErrorMessage('Materi Pelajaran wajib diisi.');
      return false;
    }
    if (!capaianPembelajaran.trim()) {
      setErrorMessage('Capaian Pembelajaran (CP) wajib diisi.');
      return false;
    }
    if (!tujuanPembelajaran.trim()) {
      setErrorMessage('Tujuan Pembelajaran (TP) wajib diisi.');
      return false;
    }
    if (dimensiProfilLulusan.length === 0) {
      setErrorMessage('Pilih minimal satu Dimensi Profil Lulusan.');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  // Execute Generation
  const handleGenerate = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setProgressPercent(10);
    setActiveSubStepIndex(0);

    const actualDurasi = durasiPertemuan === 'Kustom' ? customDurasi || '2 × 40 menit' : durasiPertemuan;

    const payload: GeneratorFormData = {
      namaSatuanPendidikan,
      namaGuru,
      nipGuru: nipGuru || '-',
      namaKepalaSekolah,
      nipKepalaSekolah: nipKepalaSekolah || '-',
      jenjang,
      kelas,
      semester,
      mataPelajaran,
      tahunPelajaran,
      namaKabupaten,
      tanggalPembuatan,
      capaianPembelajaran,
      tujuanPembelajaran,
      materiPelajaran,
      jumlahPertemuan,
      durasiPertemuan: actualDurasi,
      pertemuanConfigs,
      dimensiProfilLulusan
    };

    // Step progression timer for UX feedback
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 90) return prev;
        const next = prev + 15;
        const stepIdx = Math.min(subSteps.length - 1, Math.floor((next / 90) * subSteps.length));
        setActiveSubStepIndex(stepIdx);
        return next;
      });
    }, 900);

    try {
      const res = await fetch('/api/generate-ppm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      clearInterval(interval);

      if (!res.ok || !json.data) {
        throw new Error(json.error || 'Terjadi kesalahan saat memproses generator AI.');
      }

      setProgressPercent(100);
      setActiveSubStepIndex(subSteps.length - 1);

      setTimeout(() => {
        setIsGenerating(false);
        onPPMGenerated(json.data);
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setErrorMessage(err.message || 'Generator AI sedang mengalami gangguan. Silakan coba kembali.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Formulir Generator Cerdas
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Penyusunan Perencanaan Pembelajaran Mendalam
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Lengkapi data identitas, pembelajaran, dan model pertemuan untuk menghasilkan 5 tabel resmi.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setIsWizardMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isWizardMode
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mode Wizard (Langkah)
          </button>
          <button
            type="button"
            onClick={() => setIsWizardMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isWizardMode
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Bagian
          </button>
        </div>
      </div>

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs sm:text-sm animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong>Perhatian: </strong>
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-900 text-xs font-bold"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Wizard Step Progress Header */}
      {isWizardMode && (
        <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs overflow-x-auto">
          <div className="flex items-center justify-between min-w-[500px]">
            {[
              { num: 1, title: 'Identitas Sekolah & Guru' },
              { num: 2, title: 'Data Pembelajaran (CP & TP)' },
              { num: 3, title: 'Pengaturan Pertemuan & Model' },
              { num: 4, title: 'Dimensi Profil & Review' }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                      : isDone
                      ? 'text-emerald-700 hover:bg-emerald-50'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================= SECTION A — IDENTITAS ======================= */}
      {(!isWizardMode || currentStep === 1) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  SECTION A — IDENTITAS DOKUMEN & SATUAN PENDIDIKAN
                </h3>
                <p className="text-xs text-slate-500">
                  Digunakan untuk Tabel 1 Identitas dan Blok Tanda Tangan Resmi
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-rose-500">* Wajib diisi</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Nama Satuan Pendidikan */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Nama Satuan Pendidikan <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={namaSatuanPendidikan}
                  onChange={(e) => setNamaSatuanPendidikan(e.target.value)}
                  placeholder="Contoh: SMP Negeri 1 Merdeka"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Jenjang */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                6. Jenjang Pendidikan <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {(['SD', 'SMP', 'SMA'] as Jenjang[]).map((j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setJenjang(j)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      jenjang === j
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Nama Guru */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. Nama Guru Pengampu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={namaGuru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  placeholder="Nama Lengkap dengan Gelar"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            {/* 3. NIP Guru */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. NIP Guru
              </label>
              <input
                type="text"
                value={nipGuru}
                onChange={(e) => setNipGuru(e.target.value)}
                placeholder="NIP atau tanda -"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>

            {/* 7. Kelas (Dynamic) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                7. Kelas <span className="text-rose-500">*</span>
              </label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              >
                {kelasOptions.map((k) => (
                  <option key={k} value={k}>
                    {k} ({jenjang})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Nama Kepala Sekolah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. Nama Kepala Sekolah <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={namaKepalaSekolah}
                onChange={(e) => setNamaKepalaSekolah(e.target.value)}
                placeholder="Nama Kepala Sekolah beserta Gelar"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>

            {/* 5. NIP Kepala Sekolah */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                5. NIP Kepala Sekolah
              </label>
              <input
                type="text"
                value={nipKepalaSekolah}
                onChange={(e) => setNipKepalaSekolah(e.target.value)}
                placeholder="NIP Kepala Sekolah"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>

            {/* 8. Semester */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                8. Semester <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Ganjil', 'Genap'] as Semester[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSemester(s)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      semester === s
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Semester {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 9. Mata Pelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                9. Mata Pelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={mataPelajaran}
                onChange={(e) => setMataPelajaran(e.target.value)}
                placeholder="Contoh: Matematika, IPA, Bahasa Indonesia"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>

            {/* 10. Tahun Pelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                10. Tahun Pelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={tahunPelajaran}
                onChange={(e) => setTahunPelajaran(e.target.value)}
                placeholder="2025/2026"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>

            {/* 11. Nama Kabupaten */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                11. Nama Kabupaten / Kota <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={namaKabupaten}
                  onChange={(e) => setNamaKabupaten(e.target.value)}
                  placeholder="Contoh: Kabupaten Sleman"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            {/* 12. Tanggal Pembuatan PPM */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                12. Tanggal Pembuatan PPM <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={tanggalPembuatan}
                onChange={(e) => setTanggalPembuatan(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800"
              />
            </div>
          </div>

          {isWizardMode && (
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>Lanjut: Data Pembelajaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================= SECTION B — DATA PEMBELAJARAN ======================= */}
      {(!isWizardMode || currentStep === 2) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                B
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  SECTION B — DATA PEMBELAJARAN & MATERI
                </h3>
                <p className="text-xs text-slate-500">
                  Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), dan Jumlah Pertemuan
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* 15. Materi Pelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                15. Materi Pokok Pembelajaran <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={materiPelajaran}
                onChange={(e) => setMateriPelajaran(e.target.value)}
                placeholder="Contoh: Pecahan Senilai dan Operasi Hitung Campuran"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-semibold text-slate-800"
              />
            </div>

            {/* 13. Capaian Pembelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                13. Capaian Pembelajaran (CP) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={capaianPembelajaran}
                onChange={(e) => setCapaianPembelajaran(e.target.value)}
                placeholder="Tuliskan Capaian Pembelajaran dari Kurikulum Merdeka atau dokumen resmi..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800 leading-relaxed"
              />
            </div>

            {/* 14. Tujuan Pembelajaran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                14. Tujuan Pembelajaran (TP) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={tujuanPembelajaran}
                onChange={(e) => setTujuanPembelajaran(e.target.value)}
                placeholder="1. Peserta didik dapat mengidentifikasi...\n2. Peserta didik dapat menganalisis..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-medium text-slate-800 leading-relaxed font-mono text-[13px]"
              />
            </div>

            {/* Jumlah Pertemuan & Durasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>16. Jumlah Pertemuan Dinamis</span>
                  </label>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    {jumlahPertemuan} Pertemuan
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  Aplikasi otomatis membuat pembagian materi dan model untuk setiap pertemuan.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={jumlahPertemuan}
                    onChange={(e) => setJumlahPertemuan(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={jumlahPertemuan}
                    onChange={(e) => setJumlahPertemuan(Math.max(1, Math.min(12, Number(e.target.value))))}
                    className="w-16 px-2 py-1 text-center font-bold text-xs bg-white border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>17. Durasi Setiap Pertemuan</span>
                </label>
                <select
                  value={durasiPertemuan}
                  onChange={(e) => setDurasiPertemuan(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:border-blue-500 outline-none font-medium text-slate-800 mb-2"
                >
                  {DURASI_PRESETS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                {durasiPertemuan === 'Kustom' && (
                  <input
                    type="text"
                    value={customDurasi}
                    onChange={(e) => setCustomDurasi(e.target.value)}
                    placeholder="Contoh: 4 × 45 menit atau 2 × 50 menit"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {isWizardMode && (
            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>Lanjut: Praktik Pedagogis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================= SECTION C — PRAKTIK PEDAGOGIS PER PERTEMUAN ======================= */}
      {(!isWizardMode || currentStep === 3) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                C
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  SECTION C — PRAKTIK PEDAGOGIS DINAMIS PER PERTEMUAN
                </h3>
                <p className="text-xs text-slate-500">
                  Setiap pertemuan dapat menggunakan model pembelajaran berbeda. AI akan menyesuaikan sintaks nyata.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
              {pertemuanConfigs.length} Rangkaian Pertemuan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pertemuanConfigs.map((cfg) => (
              <div
                key={cfg.pertemuan}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-300 hover:bg-white transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-blue-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {cfg.pertemuan}
                    </span>
                    PERTEMUAN {cfg.pertemuan}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Sintaks Otomatis AI
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Praktik Pedagogis / Model:
                  </label>
                  <select
                    value={cfg.model}
                    onChange={(e) => handleModelChange(cfg.pertemuan, e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg focus:border-blue-500 outline-none text-slate-800"
                  >
                    {PEDAGOGIS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-[11px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-200/60">
                  💡 AI akan menguraikan subtopik logis dan sintaks langkah nyata untuk {cfg.model}.
                </div>
              </div>
            ))}
          </div>

          {isWizardMode && (
            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>Lanjut: Profil Lulusan & Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================= SECTION D — DIMENSI PROFIL LULUSAN & FINAL REVIEW ======================= */}
      {(!isWizardMode || currentStep === 4) && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                D
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  SECTION D — DIMENSI PROFIL LULUSAN & FINALISASI
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih satu atau lebih dimensi yang akan diintegrasikan secara mendalam.
                </p>
              </div>
            </div>
          </div>

          {/* Multi-select Pills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Pilihan Dimensi Profil Lulusan (Boleh Pilih Lebih Dari Satu):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DIMENSI_LIST.map((dim) => {
                const isSelected = dimensiProfilLulusan.includes(dim);
                return (
                  <button
                    key={dim}
                    type="button"
                    onClick={() => toggleDimensi(dim)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-bold leading-tight">{dim}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Summary Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Ringkasan Konfigurasi PPM</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 pt-1">
              <div>
                <span className="text-slate-400 block">Jenjang & Kelas:</span>
                <strong className="text-slate-800">{jenjang} - {kelas}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Mata Pelajaran:</span>
                <strong className="text-slate-800">{mataPelajaran}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Pertemuan:</span>
                <strong className="text-slate-800">{jumlahPertemuan} Pertemuan</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Profil Lulusan:</span>
                <strong className="text-slate-800">{dimensiProfilLulusan.length} Dimensi</strong>
              </div>
            </div>
          </div>

          {/* MAIN GENERATE BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
              <span>✨ GENERATE PPM DENGAN AI</span>
              <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              AI akan memvalidasi input, menganalisis CP/TP, membagi materi per pertemuan, dan menyusun 5 tabel resmi.
            </p>
          </div>

          {isWizardMode && (
            <div className="flex justify-start pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================= AI LOADING MODAL / OVERLAY ======================= */}
      {isGenerating && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in duration-200">
            {/* Animated Glow Logo */}
            <div className="relative mx-auto w-16 h-16">
              <div className="absolute inset-0 rounded-2xl bg-blue-500 blur-xl opacity-50 animate-pulse" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-8 h-8 animate-spin text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                AI sedang menyusun Perencanaan Pembelajaran Mendalam…
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Harap tunggu, model pendidikan sedang merancang pembelajaran kontekstual & 5 tabel lengkap.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Progres Generasi</span>
                <span className="text-blue-600">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Substatus List */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-left space-y-2 text-xs">
              {subSteps.map((step, idx) => {
                const isFinished = idx <= activeSubStepIndex;
                const isCurrent = idx === activeSubStepIndex;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 transition-all ${
                      isCurrent
                        ? 'text-blue-700 font-bold'
                        : isFinished
                        ? 'text-emerald-700 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span className="truncate">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
