import { TemplateItem } from '../types';

export const PRESET_TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl-sd-mat-1',
    judul: 'Pecahan Senilai dan Operasi Hitung Sederhana',
    jenjang: 'SD',
    kelas: 'Kelas 4',
    semester: 'Ganjil',
    mataPelajaran: 'Matematika',
    materiPelajaran: 'Konsep Pecahan Senilai dan Penerapannya dalam Kehidupan Sehari-hari',
    jumlahPertemuan: 4,
    durasiPertemuan: '2 × 35 menit',
    capaianPembelajaran: 'Peserta didik dapat memahami pecahan senilai melalui representasi visual konkret, membandingkan pecahan, serta menyelesaikan masalah kontekstual sederhana terkait pembagian benda nyata.',
    tujuanPembelajaran: '1. Mengidentifikasi pecahan senilai menggunakan alat peraga lipat kertas dan benda konkret.\n2. Menemukan pecahan senilai melalui operasi perkalian/pembagian pembilang dan penyebut.\n3. Membandingkan dua pecahan berpenyebut sama dan berbeda dengan tepat.\n4. Menyelesaikan persoalan sehari-hari terkait pembagian makanan secara adil.',
    dimensiProfil: ['Penalaran Kritis', 'Kolaborasi', 'Kreativitas', 'Kemandirian'],
    pedagogis: ['Discovery Learning', 'Guided Discovery Learning', 'Problem Solving', 'Game Based Learning']
  },
  {
    id: 'tpl-sd-ipa-1',
    judul: 'Siklus Hidup Makhluk Hidup dan Pelestariannya',
    jenjang: 'SD',
    kelas: 'Kelas 5',
    semester: 'Ganjil',
    mataPelajaran: 'IPA (IPAS)',
    materiPelajaran: 'Metamorfosis Hewan dan Upaya Pelestarian Keseimbangan Ekosistem',
    jumlahPertemuan: 3,
    durasiPertemuan: '3 × 35 menit',
    capaianPembelajaran: 'Peserta didik memahami siklus hidup berbagai makhluk hidup, membedakan metamorfosis sempurna dan tidak sempurna, serta mendemonstrasikan kepedulian terhadap kelestarian lingkungan sekitar.',
    tujuanPembelajaran: '1. Mengamati dan mencatat tahapan metamorfosis kupu-kupu dan katak melalui video dan spesimen.\n2. Membedakan metamorfosis sempurna dan tidak sempurna secara mandiri.\n3. Membuat bagan siklus hidup dan kampanye pelestarian serangga penyerbuk di lingkungan sekolah.',
    dimensiProfil: ['Penalaran Kritis', 'Kreativitas', 'Kewargaan', 'Kesehatan'],
    pedagogis: ['Inkuiri', 'Project Based Learning (PjBL)', 'Station Learning']
  },
  {
    id: 'tpl-smp-info-1',
    judul: 'Berpikir Komputasional dan Algoritma Pemrograman Visual',
    jenjang: 'SMP',
    kelas: 'Kelas 7',
    semester: 'Ganjil',
    mataPelajaran: 'Informatika',
    materiPelajaran: 'Dekomposisi Masalah dan Pembuatan Animasi Interaktif dengan Block Coding',
    jumlahPertemuan: 4,
    durasiPertemuan: '2 × 40 menit',
    capaianPembelajaran: 'Peserta didik mampu menerapkan berpikir komputasional untuk memecahkan masalah komputasi terstruktur serta merancang algoritma langkah demi langkah menggunakan platform pemrograman visual.',
    tujuanPembelajaran: '1. Menjelaskan 4 pilar berpikir komputasional (dekomposisi, pola, abstraksi, algoritma).\n2. Menguraikan masalah logika permainan sederhana menjadi sub-tugas terstruktur.\n3. Merancang blok kode animasi interaktif di Scratch/Blockly secara kolaboratif.\n4. Menguji dan mendebug alur kode secara mandiri dan kritis.',
    dimensiProfil: ['Penalaran Kritis', 'Kreativitas', 'Kolaborasi', 'Komunikasi'],
    pedagogis: ['Problem Based Learning (PBL)', 'Discovery Learning', 'Project Based Learning (PjBL)', 'Station Learning']
  },
  {
    id: 'tpl-smp-indo-1',
    judul: 'Teks Diskusi dan Berargumen Kritis Beradab',
    jenjang: 'SMP',
    kelas: 'Kelas 9',
    semester: 'Genap',
    mataPelajaran: 'Bahasa Indonesia',
    materiPelajaran: 'Struktur Teks Diskusi, Kaidah Kebahasaan, dan Debat Isu Remaja Terkini',
    jumlahPertemuan: 3,
    durasiPertemuan: '2 × 40 menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis gagasan, pikiran, dan pandangan dalam teks diskusi pro-kontra, serta menyajikan pendapat lisan maupun tertulis dengan argumen logis dan santun.',
    tujuanPembelajaran: '1. Mengidentifikasi struktur isu, argumen pro, kontra, dan simpulan dalam teks diskusi.\n2. Menganalisis modalitas dan kata hubung pertentangan dalam bacaan faktual.\n3. Melakukan simulasi diskusi panel terkait penggunaan gawai di sekolah secara beretika.',
    dimensiProfil: ['Penalaran Kritis', 'Komunikasi', 'Kewargaan', 'Kolaborasi'],
    pedagogis: ['Problem Based Learning (PBL)', 'Inkuiri', 'Game Based Learning']
  },
  {
    id: 'tpl-sma-bio-1',
    judul: 'Bioteknologi Modern dan Keamanan Pangan Berkelanjutan',
    jenjang: 'SMA',
    kelas: 'Kelas 12',
    semester: 'Genap',
    mataPelajaran: 'Biologi',
    materiPelajaran: 'Prinsip Rekayasa Genetika, Kultur Jaringan, dan Bioetika Pangan Transgenik',
    jumlahPertemuan: 5,
    durasiPertemuan: '2 × 45 menit',
    capaianPembelajaran: 'Peserta didik mampu menganalisis inovasi bioteknologi konvensional dan modern, mengevaluasi dampaknya terhadap keanekaragaman hayati dan masyarakat, serta merancang proyek produk fermentasi bernilai ekonomi.',
    tujuanPembelajaran: '1. Membandingkan prinsip bioteknologi konvensional dan modern (DNA rekombinan).\n2. Menganalisis isu bioetika produk rekayasa genetika (GMO) bagi kesehatan dan lingkungan.\n3. Merancang miniatur protokol kultur jaringan atau produk fermentasi lokal bergizi tinggi.\n4. Mengomunikasikan hasil analisis risiko bioteknologi melalui infografis ilmiah.',
    dimensiProfil: ['Penalaran Kritis', 'Kreativitas', 'Kolaborasi', 'Keimanan dan Ketakwaan'],
    pedagogis: ['Problem Based Learning (PBL)', 'Inkuiri', 'Project Based Learning (PjBL)', 'Guided Discovery Learning', 'Station Learning']
  },
  {
    id: 'tpl-sma-fis-1',
    judul: 'Energi Terbarukan dan Transisi Energi Bersih',
    jenjang: 'SMA',
    kelas: 'Kelas 10',
    semester: 'Genap',
    mataPelajaran: 'Fisika',
    materiPelajaran: 'Hukum Kekekalan Energi, Panel Surya, dan Efisiensi Pembangkit Listrik Miniatur',
    jumlahPertemuan: 4,
    durasiPertemuan: '3 × 45 menit',
    capaianPembelajaran: 'Peserta didik memiliki kemampuan menyelidiki perubahan energi, menganalisis efisiensi konversi energi terbarukan, serta mengajukan purwarupa solusi energi terbarukan untuk komunitas sekitar.',
    tujuanPembelajaran: '1. Menganalisis keterbatasan energi fosil dan potensi energi surya di daerah tropis.\n2. Melakukan eksperimen daya listrik panel fotovoltaik dengan berbagai sudut datang sinar.\n3. Menghitung efisiensi energi sistem pengisian baterai tenaga surya skala mini.\n4. Mempresentasikan rancangan miniatur solar charger hemat biaya.',
    dimensiProfil: ['Penalaran Kritis', 'Kreativitas', 'Kemandirian', 'Kewargaan'],
    pedagogis: ['Inkuiri', 'Project Based Learning (PjBL)', 'Problem Based Learning (PBL)', 'Problem Solving']
  }
];

export function convertTemplateToPPM(tpl: TemplateItem): import('../types').PPMDocument {
  const count = tpl.jumlahPertemuan;
  const sekolah = tpl.jenjang === 'SD' ? 'SD Negeri Percobaan' : tpl.jenjang === 'SMP' ? 'SMP Negeri 1 Sleman' : 'SMA Negeri 1 Teladan';
  const guru = 'Ahmad Yurid Ardiansah, S.Pd.';
  const nipGuru = '198905142015031002';
  const ks = 'Dr. H. Mulyono, M.Pd.';
  const nipKs = '197203101998021004';
  const kab = 'Kabupaten Sleman';
  const tgl = '2026-07-15';

  const pengalamanBelajar = Array.from({ length: count }, (_, i) => {
    const pNum = i + 1;
    const model = tpl.pedagogis[i % tpl.pedagogis.length];
    return {
      pertemuan: pNum,
      materiSubtopik: `Subtopik ${pNum}: Eksplorasi & Aplikasi ${tpl.materiPelajaran.split(',')[0]}`,
      praktikPedagogis: model,
      memahami: {
        karakter: pNum % 2 === 1 ? 'berkesadaran' : 'bermakna',
        aktivitas: [
          `Guru menyapa peserta didik, memeriksa kesiapan belajar, dan memimpin doa bersama.`,
          `Apersepsi: Mengaitkan materi pertemuan sebelumnya dengan tantangan nyata ${tpl.materiPelajaran.split(',')[0]}.`,
          `Guru mengajukan pertanyaan pemantik mengenai keterkaitan topik dengan kehidupan sehari-hari.`
        ]
      },
      mengaplikasi: {
        karakter: pNum % 2 === 0 ? 'bermakna' : 'menggembirakan',
        sintaksModel: model,
        tahapan: [
          { sintaks: '1. Orientasi & Eksplorasi', kegiatan: `Peserta didik mengamati fenomena kontekstual pada bahan ajar digital.` },
          { sintaks: '2. Investigasi Berkelompok', kegiatan: `Peserta didik berkolaborasi menyelesaikan lembar kerja penyelidikan terbimbing.` },
          { sintaks: '3. Verifikasi & Presentasi', kegiatan: `Peserta didik mempresentasikan temuan solusi dan menerima tanggapan konstruktif.` }
        ]
      },
      refleksi: {
        karakter: 'berkesadaran',
        aktivitas: [
          `Peserta didik bersama guru menyimpulkan inti konsep yang telah dipelajari.`,
          `Refleksi Metakognisi: Siswa menuliskan hal yang paling dipahami dan hal yang masih ingin dipelajari lebih lanjut.`,
          `Guru memberikan apresiasi atas kerjasama aktif seluruh kelompok dan menutup pembelajaran.`
        ]
      }
    };
  });

  return {
    id: tpl.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: `PPM ${tpl.mataPelajaran} - ${tpl.kelas} (${tpl.judul})`,
    status: 'Selesai',
    identitas: {
      namaSatuanPendidikan: sekolah,
      namaGuru: guru,
      nipGuru: nipGuru,
      namaKepalaSekolah: ks,
      nipKepalaSekolah: nipKs,
      jenjang: tpl.jenjang,
      kelas: tpl.kelas,
      semester: tpl.semester,
      mataPelajaran: tpl.mataPelajaran,
      materiPelajaran: tpl.materiPelajaran,
      durasiPertemuan: tpl.durasiPertemuan,
      tahunPelajaran: '2025/2026',
      namaKabupaten: kab,
      tanggalPembuatan: tgl
    },
    identifikasi: {
      pesertaDidik: {
        pengetahuanAwal: `Peserta didik telah mengenal konsep dasar prasyarat sebelum materi ${tpl.materiPelajaran.split(',')[0]}.`,
        kesiapanBelajar: `Kesiapan peserta didik beragam; sebagian besar siap mengeksplorasi secara aktif dengan bimbingan terarah.`,
        minat: `Siswa memiliki minat tinggi terhadap demonstrasi visual, media digital interaktif, dan diskusi kelompok.`,
        latarBelakang: `Latar belakang pengalaman belajar bervariasi, membutuhkan pendekatan berpusat pada siswa yang inklusif.`,
        kebutuhanBelajar: `Dibutuhkan LKPD terstruktur, media konkret/digital, dan scaffolding bertahap.`,
        kemungkinanPerbedaanKemampuan: `Diantisipasi dengan pembagian kelompok heterogen dan pemberian tantangan bertingkat.`
      },
      materiPelajaran: tpl.materiPelajaran,
      capaianDimensiProfil: tpl.dimensiProfil.map((d) => ({
        dimensi: d,
        relevansi: `Aktualisasi dimensi ${d} dikembangkan melalui kerja tim, penalaran data objektif, dan pemecahan persoalan nyata.`
      }))
    },
    desainPembelajaran: {
      capaianPembelajaran: tpl.capaianPembelajaran,
      lintasDisiplinIlmu: ['Bahasa Indonesia (Komunikasi Efektif)', 'Informatika (Digitalisasi Data)', 'PPKn (Kolaborasi)'],
      tujuanPembelajaran: tpl.tujuanPembelajaran,
      topikPembelajaran: tpl.judul,
      praktikPedagogisPerPertemuan: pengalamanBelajar.map((p) => ({
        pertemuan: p.pertemuan,
        model: p.praktikPedagogis,
        subtopik: p.materiSubtopik
      })),
      kemitraanPembelajaran: ['Pendidik (Fasilitator)', 'Rekan Sebaya (Mitra Diskusi)', 'Orang Tua / Wali'],
      lingkunganPembelajaran: ['Ruang Kelas Inovatif', 'Laboratorium / Ruang Multimedia', 'Platform LMS Sekolah'],
      pemanfaatanDigital: ['Canva Edukasi', 'Quizizz Interaktif', 'Google Classroom', 'Media Presentasi Digital']
    },
    pengalamanBelajar,
    asesmenPembelajaran: {
      asesmenAwal: {
        teknik: ['Pertanyaan Pemantik Lisan', 'Kuis Diagnostik Singkat'],
        instrumen: 'Lembar Ceklis Kesiapan Awal & Pemetaan Minat',
        penjelasan: 'Mengidentifikasi pengetahuan awal peserta didik untuk menentukan diferensiasi proses belajar.'
      },
      asesmenProses: {
        teknik: ['Observasi Kinerja Kelompok', 'Pemeriksaan LKPD'],
        instrumen: 'Rubrik Pengamatan Diskusi & Lembar Catatan Anekdotal',
        penjelasan: 'Menilai keaktifan, kolaborasi, dan ketepatan pemecahan masalah selama kegiatan berlangsung.'
      },
      asesmenAkhir: {
        bentuk: 'Tes Tertulis & Presentasi Unjuk Hasil Karya',
        kriteria: 'Ketepatan konsep, kelogisan argumen, dan kualitas produk akhir.',
        penjelasan: 'Mengukur ketercapaian Tujuan Pembelajaran pada akhir unit pembelajaran.'
      },
      rubrikAsesmen: [
        {
          indikator: `Penguasaan Konsep ${tpl.mataPelajaran}`,
          kriteria: 'Kemampuan menjelaskan prinsip dasar dan hubungan antar-unsur materi.',
          skor1: 'Belum mampu mendefinisikan konsep dasar.',
          skor2: 'Menjelaskan sebagian konsep dengan bantuan panduan guru.',
          skor3: 'Menjelaskan konsep secara tepat dan runtut.',
          skor4: 'Menguraikan konsep secara komprehensif dan mengaitkannya dengan kehidupan nyata secara kritis.'
        },
        {
          indikator: 'Keterampilan Pemecahan Masalah & Penyelidikan',
          kriteria: 'Ketepatan alur analisis data temuan dan perumusan solusi.',
          skor1: 'Langkah kerja belum sistematis dan data belum terolah.',
          skor2: 'Melakukan analisis data dengan bimbingan intensif.',
          skor3: 'Melaksanakan analisis data secara terstruktur dan tepat sasaran.',
          skor4: 'Melakukan penyelidikan mandiri, teliti, dan menghasilkan alternatif solusi kreatif.'
        },
        {
          indikator: 'Kolaborasi & Komunikasi Berkesadaran',
          kriteria: 'Keaktifan dalam kelompok dan kesantunan berpendapat.',
          skor1: 'Pasif dalam kegiatan kelompok.',
          skor2: 'Terlibat namun masih bergantung pada rekan tertentu.',
          skor3: 'Bekerja sama secara aktif dan menyajikan hasil secara jelas.',
          skor4: 'Memimpin kolaborasi dengan empatik, mengapresiasi rekan, dan presentasi meyakinkan.'
        },
        {
          indikator: 'Refleksi Diri & Metakognisi',
          kriteria: 'Kemampuan mengenali capaian belajar dan merumuskan tindak lanjut.',
          skor1: 'Belum mampu melakukan refleksi diri.',
          skor2: 'Melakukan refleksi singkat saat diminta guru.',
          skor3: 'Mengidentifikasi kelebihan dan hal yang perlu ditingkatkan secara jujur.',
          skor4: 'Menunjukkan kesadaran metakognitif tinggi dan merencanakan target perbaikan mandiri.'
        }
      ]
    },
    tandaTangan: {
      tempatTanggal: `${kab}, ${tgl}`,
      kepalaSekolah: {
        jabatan: 'Kepala Satuan Pendidikan',
        namaSekolah: sekolah,
        nama: ks,
        nip: nipKs
      },
      guruMapel: {
        jabatan: 'Guru Mata Pelajaran',
        mapel: tpl.mataPelajaran,
        nama: guru,
        nip: nipGuru
      }
    }
  };
}

