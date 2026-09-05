export type Jenjang = 'SD' | 'SMP' | 'SMA';
export type Semester = 'Ganjil' | 'Genap';

export interface IdentitasData {
  namaSatuanPendidikan: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  jenjang: Jenjang;
  kelas: string;
  semester: Semester;
  mataPelajaran: string;
  materiPelajaran?: string;
  durasiPertemuan?: string;
  tahunPelajaran: string;
  namaKabupaten: string;
  tanggalPembuatan: string;
}

export interface PertemuanConfig {
  pertemuan: number;
  model: string;
  subtopik?: string;
  durasi?: string;
}

export interface DataPembelajaranInput {
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  materiPelajaran: string;
  jumlahPertemuan: number;
  durasiPertemuan: string;
  customDurasi?: string;
  pertemuanConfigs: PertemuanConfig[];
  dimensiProfilLulusan: string[];
}

export type GeneratorFormData = Omit<IdentitasData, 'materiPelajaran' | 'durasiPertemuan'> & DataPembelajaranInput;

export interface DimensiCapaian {
  dimensi: string;
  relevansi: string;
}

export interface IdentifikasiSection {
  pesertaDidik: {
    pengetahuanAwal: string;
    kesiapanBelajar: string;
    minat: string;
    latarBelakang: string;
    kebutuhanBelajar: string;
    kemungkinanPerbedaanKemampuan: string;
  };
  materiPelajaran: string;
  capaianDimensiProfil: DimensiCapaian[];
}

export interface DesainPembelajaranSection {
  capaianPembelajaran: string;
  lintasDisiplinIlmu: string[];
  tujuanPembelajaran: string;
  topikPembelajaran: string;
  praktikPedagogisPerPertemuan: Array<{
    pertemuan: number;
    model: string;
    subtopik: string;
  }>;
  kemitraanPembelajaran: string[];
  lingkunganPembelajaran: string[];
  pemanfaatanDigital: string[];
}

export interface TahapanAktivitas {
  sintaks: string;
  kegiatan: string;
}

export interface PertemuanPengalamanBelajar {
  pertemuan: number;
  materiSubtopik: string;
  praktikPedagogis: string;
  memahami: {
    karakter: 'berkesadaran' | 'bermakna' | 'menggembirakan' | string;
    aktivitas: string[];
  };
  mengaplikasi: {
    karakter: 'berkesadaran' | 'bermakna' | 'menggembirakan' | string;
    sintaksModel: string;
    tahapan: TahapanAktivitas[];
  };
  refleksi: {
    karakter: 'berkesadaran' | 'bermakna' | 'menggembirakan' | string;
    aktivitas: string[];
  };
}

export interface RubrikItem {
  indikator: string;
  kriteria: string;
  skor1: string; // Perlu Bimbingan
  skor2: string; // Cukup
  skor3: string; // Baik
  skor4: string; // Sangat Baik
}

export interface AsesmenSection {
  asesmenAwal: {
    teknik: string[];
    instrumen: string;
    penjelasan: string;
  };
  asesmenProses: {
    teknik: string[];
    instrumen: string;
    penjelasan: string;
  };
  asesmenAkhir: {
    bentuk: string;
    kriteria: string;
    penjelasan: string;
  };
  rubrikAsesmen: RubrikItem[];
}

export interface TandaTanganSection {
  tempatTanggal: string;
  kepalaSekolah: {
    jabatan: string;
    namaSekolah: string;
    nama: string;
    nip: string;
  };
  guruMapel: {
    jabatan: string;
    mapel: string;
    nama: string;
    nip: string;
  };
}

export interface PPMDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  status: 'Selesai' | 'Draft';
  identitas: IdentitasData;
  identifikasi: IdentifikasiSection;
  desainPembelajaran: DesainPembelajaranSection;
  pengalamanBelajar: PertemuanPengalamanBelajar[];
  asesmenPembelajaran: AsesmenSection;
  tandaTangan: TandaTanganSection;
}

export interface AppUser {
  id: string | number;
  name: string;
  email: string;
  role: 'ADMIN' | 'GURU';
  nip: string;
  school: string;
}

export interface TemplateItem {
  id: string;
  judul: string;
  jenjang: Jenjang;
  kelas: string;
  semester: Semester;
  mataPelajaran: string;
  materiPelajaran: string;
  jumlahPertemuan: number;
  durasiPertemuan: string;
  capaianPembelajaran: string;
  tujuanPembelajaran: string;
  dimensiProfil: string[];
  pedagogis: string[];
}
