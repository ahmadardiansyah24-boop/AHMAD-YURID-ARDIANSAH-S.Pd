import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Helper to get GoogleGenAI client
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System instruction matching user requirement
const SYSTEM_INSTRUCTION = `Kamu adalah AI ahli dalam perencanaan pembelajaran untuk pendidikan Indonesia dan kurikulum merdeka terkini.
Tugasmu menyusun Perencanaan Pembelajaran Mendalam (PPM) yang sangat relevan, kontekstual, sistematis, realistis diterapkan guru, sesuai jenjang, kelas, mata pelajaran, capaian pembelajaran, tujuan pembelajaran, materi, durasi, dan praktik pedagogis yang dipilih.

PANDUAN KETAT:
1. Jangan menghasilkan aktivitas generik atau klise.
2. Pastikan setiap aktivitas berhubungan langsung dengan tujuan pembelajaran dan materi pelajaran.
3. Sesuaikan sintaks dengan model/praktik pedagogis yang dipilih per pertemuan (Inkuiri, Discovery Learning, Guided Discovery, PjBL, PBL, Problem Solving, Game Based Learning, Station Learning).
4. Buat pengalaman belajar yang berkesadaran, bermakna, dan menggembirakan sesuai konteks jenjang (SD/SMP/SMA).
5. Buat asesmen yang selaras dengan tujuan pembelajaran (Asesmen Awal diagnostik, Asesmen Proses formatif, Asesmen Akhir sumatif, dan Rubrik 4 level).
6. Jika jumlah pertemuan lebih dari satu, pecah materi menjadi subtopik logis dan berikan pengalaman belajar yang berbeda dan bertahap untuk setiap pertemuan.
7. Tentukan Lintas Disiplin Ilmu yang benar-benar relevan (jangan dipaksakan jika tidak cocok).
8. Rekomendasikan alat digital yang relevan (Canva, Quizizz, PhET, GeoGebra, Padlet, YouTube, Wordwall, Google Forms, dsb).
9. Output WAJIB berupa objek JSON terstruktur valid tanpa markdown codeblock formatting atau teks pembuka/penutup.`;

// Fallback generator for high-reliability when API key is missing or on temporary rate-limits
function generateFallbackPPM(input: any) {
  const {
    namaSatuanPendidikan = 'SD/SMP/SMA Teladan',
    namaGuru = 'Guru Penggerak, S.Pd.',
    nipGuru = '198501012010011001',
    namaKepalaSekolah = 'Dr. H. Kepala Sekolah, M.Pd.',
    nipKepalaSekolah = '197502022000031002',
    jenjang = 'SMP',
    kelas = 'Kelas 7',
    semester = 'Ganjil',
    mataPelajaran = 'Matematika',
    tahunPelajaran = '2025/2026',
    namaKabupaten = 'Jakarta',
    tanggalPembuatan = new Date().toISOString().split('T')[0],
    capaianPembelajaran = 'Peserta didik mampu memahami konsep dasar dan penerapannya dalam kehidupan nyata.',
    tujuanPembelajaran = '1. Mengidentifikasi konsep materi.\n2. Menerapkan pemahaman dalam menyelesaikan persoalan nyata.',
    materiPelajaran = 'Konsep Utama Pembelajaran',
    jumlahPertemuan = 3,
    durasiPertemuan = '2 × 40 menit',
    pertemuanConfigs = [],
    dimensiProfilLulusan = ['Penalaran Kritis', 'Kreativitas', 'Kolaborasi']
  } = input;

  const count = Math.max(1, Number(jumlahPertemuan) || 3);
  
  // Model subtopics logic
  const subtopikNames = [
    `Eksplorasi Konseptual Dasar ${materiPelajaran}`,
    `Investigasi dan Penyelidikan Terbimbing ${materiPelajaran}`,
    `Aplikasi Kontekstual dan Pemecahan Masalah ${materiPelajaran}`,
    `Pengembangan Proyek Kolaboratif ${materiPelajaran}`,
    `Simulasi Interaktif dan Refleksi Komparatif ${materiPelajaran}`,
    `Unjuk Karya dan Evaluasi Komprehensif ${materiPelajaran}`,
    `Pendalaman Mandiri dan Pengayaan Terstruktur ${materiPelajaran}`,
    `Integrasi Portofolio dan Uji Performa ${materiPelajaran}`
  ];

  // Cross-disciplinary detection
  const crossDisciplines: Record<string, string[]> = {
    Matematika: ['Informatika (Algoritma dan Pola Data)', 'IPA (Pengukuran dan Statistik Eksperimen)', 'Seni Rupa (Proporsi Geometri)'],
    IPA: ['Matematika (Analisis Grafik dan Data)', 'Bahasa Indonesia (Penyusunan Laporan Ilmiah)', 'Informatika (Pemodelan Digital)'],
    Informatika: ['Matematika (Logika Boolean)', 'Bahasa Inggris (Sintaks Kode)', 'Seni Desain (UI/UX)'],
    'Bahasa Indonesia': ['IPS (Isu Sosial Budaya)', 'PPKn (Etika Beropini dan Literasi Hukum)', 'Seni Teater (Artikulasi)'],
    'Bahasa Inggris': ['IPS (Intercultural Communication)', 'Teknologi Informasi (Global Digital Literacy)', 'Seni Musik (Pronunciation & Rhythm)'],
    Fisika: ['Matematika (Kalkulus & Vektor)', 'Teknik Rekayasa (Instrumentasi)', 'Kimia (Termodinamika Material)'],
    Biologi: ['Kimia (Biokimia Organik)', 'Kesehatan Lingkungan (Sanitasi)', 'Geografi (Biogeografi)']
  };

  const lintas = crossDisciplines[mataPelajaran] || ['Bahasa Indonesia (Komunikasi Efektif)', 'Informatika (Pemanfaatan Media Digital)', 'PPKn (Kolaborasi Kebangsaan)'];

  // Digital tools suggestion based on subject
  const digitalToolsMap: Record<string, string[]> = {
    Matematika: ['GeoGebra Interaktif', 'Quizizz Gamifikasi', 'Canva Edukasi untuk Lembar Kerja'],
    IPA: ['PhET Interactive Simulations', 'Google Forms Diagnostic', 'Padlet Diskusi Kelompok'],
    Informatika: ['Scratch Block Coding', 'Google Classroom', 'Visual Studio Code / Replit'],
    'Bahasa Indonesia': ['Mentimeter Brainstorming', 'Canva Infografis Teks', 'Padlet Papan Curah Pendapat'],
    'Bahasa Inggris': ['Duolingo for Schools', 'YouTube Edukasi Native Audio', 'Wordwall Vocabulary Quiz']
  };

  const tools = digitalToolsMap[mataPelajaran] || ['Google Classroom', 'Canva Edukasi', 'Quizizz Interaktif', 'YouTube Edukasi'];

  const pengalamanBelajar = Array.from({ length: count }, (_, i) => {
    const idx = i + 1;
    const cfg = pertemuanConfigs[i] || {};
    const model = cfg.model || (idx === 1 ? 'Discovery Learning' : idx === 2 ? 'Problem Based Learning (PBL)' : 'Project Based Learning (PjBL)');
    const subtopik = cfg.subtopik || subtopikNames[i % subtopikNames.length];

    let tahapanSintaks: Array<{ sintaks: string; kegiatan: string }> = [];

    if (model.includes('Discovery')) {
      tahapanSintaks = [
        { sintaks: '1. Stimulation (Pemberian Rangsangan)', kegiatan: `Guru menyajikan fenomena/kasus nyata terkait ${subtopik} melalui video pendek interaktif dan gambar pemantik.` },
        { sintaks: '2. Problem Statement (Identifikasi Masalah)', kegiatan: `Peserta didik secara berkelompok merumuskan pertanyaan inti dan hipotesis awal mengenai masalah yang disajikan.` },
        { sintaks: '3. Data Collection (Pengumpulan Data)', kegiatan: `Peserta didik mengumpulkan informasi faktual melalui literasi bahan ajar digital, eksplorasi alat peraga, dan diskusi kelompok.` },
        { sintaks: '4. Data Processing (Pengolahan Data)', kegiatan: `Peserta didik mencatat dan mengolah data temuan ke dalam Lembar Kerja Peserta Didik (LKPD) terstruktur.` },
        { sintaks: '5. Verification (Pembuktian)', kegiatan: `Peserta didik memverifikasi hasil olah data dengan mencocokkan prinsip teori serta menguji hipotesis kelompok.` },
        { sintaks: '6. Generalization (Menarik Kesimpulan)', kegiatan: `Perwakilan kelompok mempresentasikan simpulan konsep ${subtopik} dan menerima tanggapan konstruktif dari rekan.` }
      ];
    } else if (model.includes('PBL') || model.includes('Problem Based')) {
      tahapanSintaks = [
        { sintaks: '1. Orientasi Masalah', kegiatan: `Peserta didik menyimak video studi kasus autentik terkait tantangan nyata pada materi ${subtopik}.` },
        { sintaks: '2. Organisasi Belajar', kegiatan: `Peserta didik membentuk tim kolaboratif beranggotakan 4-5 orang dan membagi peran investigasi secara berkesadaran.` },
        { sintaks: '3. Penyelidikan Mandiri/Kelompok', kegiatan: `Peserta didik melakukan eksperimen/analisis mendalam untuk menemukan akar persoalan dan data pendukung.` },
        { sintaks: '4. Pengembangan Solusi', kegiatan: `Kelompok mendiskusikan alternatif solusi terbaik dan menuangkannya ke dalam media presentasi digital kreatif.` },
        { sintaks: '5. Analisis & Evaluasi Solusi', kegiatan: `Peserta didik mempresentasikan karya solusi, melakukan sesi tanya jawab santun, dan menyimpulkan bersama guru.` }
      ];
    } else if (model.includes('PjBL') || model.includes('Project')) {
      tahapanSintaks = [
        { sintaks: '1. Penentuan Pertanyaan Mendasar', kegiatan: `Guru memancing peserta didik dengan tantangan nyata: "Bagaimana kita dapat mengaplikasikan ${subtopik} untuk memecahkan persoalan di lingkungan sekolah?"` },
        { sintaks: '2. Mendesain Perencanaan Proyek', kegiatan: `Kelompok menyusun rencana kerja, memilih alat bahan, dan menentukan format produk akhir (infografis/purwarupa/karya nyata).` },
        { sintaks: '3. Menyusun Jadwal Pelaksanaan', kegiatan: `Peserta didik membagi milestone kegiatan dari persiapan, riset data, perakitan produk, hingga tahap penyelesaian.` },
        { sintaks: '4. Memonitor Keaktifan Proyek', kegiatan: `Guru memantau kemajuan kerja kelompok, memfasilitasi konsultasi teknis, dan mencatat rubrik pengamatan proses.` },
        { sintaks: '5. Menguji Hasil & Presentasi', kegiatan: `Setiap kelompok memamerkan hasil produk proyek dan mendemonstrasikan fungsi serta nilai gunanya.` },
        { sintaks: '6. Evaluasi Pengalaman Belajar', kegiatan: `Peserta didik bersama guru merefleksikan kendala, solusi, dan wawasan baru yang didapat selama proyek.` }
      ];
    } else {
      tahapanSintaks = [
        { sintaks: '1. Tahap Orientasi & Eksplorasi', kegiatan: `Peserta didik mengamati materi ${subtopik} dengan pendekatan interaktif terarah dan mencatat poin-poin krusial.` },
        { sintaks: '2. Tahap Investigasi Terbimbing', kegiatan: `Peserta didik melakukan simulasi dan aktivitas praktik sesuai instruksi sintaks ${model}.` },
        { sintaks: '3. Tahap Kolaborasi & Sintesis', kegiatan: `Kelompok saling bertukar informasi dan mengonsolidasikan pemahaman bersama.` },
        { sintaks: '4. Tahap Unjuk Pemahaman & Aplikasi', kegiatan: `Peserta didik mempraktikkan pemecahan soal/situasi masalah nyata dan mendokumentasikan hasilnya.` }
      ];
    }

    return {
      pertemuan: idx,
      materiSubtopik: subtopik,
      praktikPedagogis: model,
      memahami: {
        karakter: idx % 3 === 1 ? 'berkesadaran' : idx % 3 === 2 ? 'bermakna' : 'menggembirakan',
        aktivitas: [
          `Guru menyapa peserta didik dengan hangat, memandu doa bersama, dan mengecek kesiapan fisik serta emosional belajar (pembelajaran sosial-emosional).`,
          `Apersepsi: Guru mengaitkan materi pertemuan sebelumnya dengan topik ${subtopik} melalui analogi kehidupan sehari-hari yang dekat dengan peserta didik.`,
          `Guru mengajukan pertanyaan pemantik: "Pernahkah kalian menjumpai situasi nyata terkait ${materiPelajaran} di sekitar rumah kalian? Mengapa hal tersebut penting dipelajari?"`,
          `Guru menyampaikan tujuan pembelajaran, alur aktivitas yang akan ditempuh, dan bentuk asesmen yang akan dilakukan selama pertemuan.`
        ]
      },
      mengaplikasi: {
        karakter: idx % 2 === 0 ? 'bermakna' : 'menggembirakan',
        sintaksModel: model,
        tahapan: tahapanSintaks
      },
      refleksi: {
        karakter: 'berkesadaran',
        aktivitas: [
          `Peserta didik bersama guru merangkum dan menyimpulkan poin-poin inti konsep ${subtopik} yang telah dipelajari.`,
          `Refleksi Metakognisi: Peserta didik menjawab 3 pertanyaan reflektif: (1) Apa hal paling berharga yang saya pahami hari ini? (2) Bagian mana yang masih membutuhkan latihan? (3) Bagaimana saya akan menerapkan pemahaman ini?`,
          `Guru memberikan umpan balik konstruktif dan apresiasi terhadap partisipasi aktif serta sikap gotong-royong seluruh kelompok.`,
          `Tindak lanjut: Guru memberikan penugasan mandiri ringan terarah dan menyampaikan topik untuk pertemuan berikutnya, ditutup dengan doa bersama.`
        ]
      }
    };
  });

  return {
    id: 'ppm-' + Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: `PPM ${mataPelajaran} - ${kelas} (${materiPelajaran})`,
    status: 'Selesai',
    identitas: {
      namaSatuanPendidikan,
      namaGuru,
      nipGuru,
      namaKepalaSekolah,
      nipKepalaSekolah,
      jenjang,
      kelas,
      semester,
      mataPelajaran,
      tahunPelajaran,
      namaKabupaten,
      tanggalPembuatan
    },
    identifikasi: {
      pesertaDidik: {
        pengetahuanAwal: `Peserta didik telah memiliki pengetahuan prasyarat terkait konsep dasar sebelum materi ${materiPelajaran}, namun masih memerlukan penguatan pemahaman konseptual dan pemaknaan aplikatif dalam situasi nyata.`,
        kesiapanBelajar: `Kesiapan belajar peserta didik bervariasi; sekitar 30% telah menguasai konsep dasar dengan cepat, 50% berada pada level berkembang sesuai bimbingan terstruktur, dan 20% memerlukan scaffolding interaktif bertahap.`,
        minat: `Peserta didik memiliki minat tinggi terhadap pembelajaran interaktif berbasis visual, media digital, studi kasus nyata, dan kegiatan kolaboratif yang menggembirakan.`,
        latarBelakang: `Berasal dari latar belakang sosial dan pengalaman belajar yang beragam; memerlukan pendekatan diferensiasi konten dan proses yang adil serta ramah bagi setiap siswa.`,
        kebutuhanBelajar: `Dibutuhkan bahan ajar multimodal (buku teks, infografis, video, alat peraga konkret/simulasi digital) serta ruang diskusi terbimbing untuk mengoptimalkan potensi.`,
        kemungkinanPerbedaanKemampuan: `Terdapat potensi perbedaan kecepatan dalam menyelesaikan tugas analisis; diantisipasi dengan penugasan bertingkat (tiered tasks) dan tutor sebaya (peer tutoring).`
      },
      materiPelajaran: `${materiPelajaran} — mencakup pemahaman konsep fundamental, investigasi hubungan antar-variabel, dan penyelesaian masalah kontekstual berjenjang.`,
      capaianDimensiProfil: dimensiProfilLulusan.map((dim: string) => ({
        dimensi: dim,
        relevansi: `Peserta didik mengaktualisasikan dimensi ${dim} melalui aktivitas diskusi terarah, penyelidikan kritis terhadap materi ${materiPelajaran}, serta kerja sama produktif dan bertanggung jawab.`
      }))
    },
    desainPembelajaran: {
      capaianPembelajaran,
      lintasDisiplinIlmu: lintas,
      tujuanPembelajaran,
      topikPembelajaran: `${materiPelajaran} (Terbagi dalam ${count} pertemuan berkesinambungan)`,
      praktikPedagogisPerPertemuan: pengalamanBelajar.map((pb) => ({
        pertemuan: pb.pertemuan,
        model: pb.praktikPedagogis,
        subtopik: pb.materiSubtopik
      })),
      kemitraanPembelajaran: [
        'Pendidik (Fasilitator dan Pemantik Pembelajaran)',
        'Rekan Sebaya / Kelompok Belajar (Mitra Kolaborasi dan Tutor Sebaya)',
        'Orang Tua / Wali (Pendamping Refleksi dan Penerapan di Rumah)',
        'Lingkungan Sekolah & Masyarakat Sekitar (Sumber Belajar Nyata)'
      ],
      lingkunganPembelajaran: [
        'Ruang Kelas Inovatif (Pengaturan Meja Formasi Kelompok Dinamis)',
        'Laboratorium / Ruang Digital (Eksplorasi Perangkat Lunak dan Media Interaktif)',
        'Lingkungan Sekolah (Area Observasi Nyata dan Praktik Lapangan)',
        'Platform Daring / LMS (Akses LKPD Digital dan Pengumpulan Tugas)'
      ],
      pemanfaatanDigital: tools
    },
    pengalamanBelajar,
    asesmenPembelajaran: {
      asesmenAwal: {
        teknik: ['Pertanyaan Pemantik Lisan', 'Kuis Diagnostik Singkat (Google Forms/Mentimeter)', 'Tanya Jawab Pemetaan Prasyarat'],
        instrumen: 'Rubrik Cheklist Kesiapan Awal & Lembar Pertanyaan Diagnostik Kognitif/Non-Kognitif',
        penjelasan: 'Dilaksanakan pada awal unit untuk memetakan pemahaman prasyarat dan minat peserta didik sehingga guru dapat merancang diferensiasi secara presisi.'
      },
      asesmenProses: {
        teknik: ['Observasi Partisipasi Diskusi', 'Penilaian Kinerja Pemecahan Masalah', 'Pemeriksaan LKPD Kelompok', 'Asesmen Antarteman'],
        instrumen: 'Lembar Pengamatan Kinerja Diskusi & Rubrik Penyelidikan Ilmiah Terbimbing',
        penjelasan: 'Dilakukan secara berkelanjutan selama proses pembelajaran untuk memberikan umpan balik formatif langsung agar peserta didik dapat memperbaiki cara belajarnya.'
      },
      asesmenAkhir: {
        bentuk: 'Tes Tertulis Pemahaman Konseptual & Presentasi Unjuk Karya/Proyek Terbimbing',
        kriteria: 'Ketepatan konsep, kelengkapan analisis data, kemampuan argumentasi logis, dan kreativitas solusi.',
        penjelasan: 'Dilaksanakan pada akhir siklus pertemuan untuk mengukur ketercapaian Tujuan Pembelajaran secara komprehensif.'
      },
      rubrikAsesmen: [
        {
          indikator: `Pemahaman Konseptual ${materiPelajaran}`,
          kriteria: 'Kemampuan menjelaskan prinsip dasar, istilah kunci, dan hubungan antar-unsur materi.',
          skor1: 'Belum mampu mendefinisikan konsep dasar; memerlukan bimbingan intensif penuh dari guru.',
          skor2: 'Mampu menyebutkan sebagian konsep dasar namun masih terdapat kekeliruan pemahaman substansi.',
          skor3: 'Menjelaskan konsep dasar dengan tepat, runtut, dan menggunakan bahasa baku yang baik.',
          skor4: 'Menguraikan konsep secara komprehensif, mengaitkan dengan contoh kehidupan nyata secara orisinal dan kritis.'
        },
        {
          indikator: 'Keterampilan Penyelidikan & Pemecahan Masalah',
          kriteria: 'Sistematika langkah kerja, ketepatan analisis data temuan, dan perumusan solusi tepat.',
          skor1: 'Langkah investigasi tidak terstruktur; belum mampu menganalisis data temuan dengan benar.',
          skor2: 'Melakukan penyelidikan dengan panduan ketat; analisis data masih bersifat dangkal.',
          skor3: 'Melaksanakan penyelidikan sesuai sintaks dengan tertib; analisis data logis dan tepat sasaran.',
          skor4: 'Melakukan investigasi secara mandiri, kritis, memverifikasi data secara teliti, serta menghasilkan alternatif solusi inovatif.'
        },
        {
          indikator: 'Kolaborasi & Komunikasi Berkesadaran',
          kriteria: 'Keaktifan dalam kelompok, saling menghargai pendapat, dan kejelasan presentasi hasil kerja.',
          skor1: 'Pasif dalam kelompok; belum menunjukkan partisipasi aktif dalam penyelesaian tugas bersama.',
          skor2: 'Terlibat dalam tugas namun sesekali kurang fokus dan masih bergantung pada rekan kelompok tertentu.',
          skor3: 'Bekerja sama secara aktif, mendengarkan pendapat rekan, dan menyajikan hasil kerja secara jelas.',
          skor4: 'Memimpin kolaborasi dengan sangat empatik, mengapresiasi kontribusi seluruh anggota, serta mempresentasikan karya secara meyakinkan dan santun.'
        },
        {
          indikator: 'Refleksi Diri & Sikap Kemandirian',
          kriteria: 'Kemampuan mengenali kemajuan belajar pribadi dan merumuskan tindak lanjut perbaikan.',
          skor1: 'Belum mampu melakukan refleksi diri; pasif dalam menerima umpan balik.',
          skor2: 'Melakukan refleksi jika diminta dengan jawaban yang masih sangat singkat dan umum.',
          skor3: 'Mampu mengidentifikasi kelebihan dan tantangan belajar pribadi secara jujur dan terbuka.',
          skor4: 'Menunjukkan kesadaran metakognitif tinggi, mampu menetapkan target perbaikan diri secara terukur dan mandiri.'
        }
      ]
    },
    tandaTangan: {
      tempatTanggal: `${namaKabupaten}, ${tanggalPembuatan}`,
      kepalaSekolah: {
        jabatan: 'Kepala Satuan Pendidikan',
        namaSekolah: namaSatuanPendidikan,
        nama: namaKepalaSekolah,
        nip: nipKepalaSekolah
      },
      guruMapel: {
        jabatan: 'Guru Mata Pelajaran',
        mapel: mataPelajaran,
        nama: namaGuru,
        nip: nipGuru
      }
    }
  };
}

// API Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'GENERATOR PPM PRO PREMIUM',
    creator: 'Ahmad Yurid Ardiansah, S.Pd.',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// API Generate PPM
app.post('/api/generate-ppm', async (req: Request, res: Response) => {
  try {
    const formData = req.body;

    if (!formData.namaSatuanPendidikan || !formData.mataPelajaran || !formData.materiPelajaran) {
      res.status(400).json({
        error: 'Data form belum lengkap. Mohon isi data identitas dan pembelajaran yang berbintang wajib.'
      });
      return;
    }

    const ai = getGenAI();

    // If no API key configured, use high-fidelity pedagogical fallback engine
    if (!ai) {
      console.log('Gemini API key not found in env, generating via pedagogical engine fallback.');
      const result = generateFallbackPPM(formData);
      res.json({
        success: true,
        source: 'pedagogical_engine',
        data: result
      });
      return;
    }

    // Prepare rich prompt for Gemini API
    const count = Math.max(1, Number(formData.jumlahPertemuan) || 3);
    const meetingDetails = (formData.pertemuanConfigs || []).map((p: any, i: number) => 
      `Pertemuan ${p.pertemuan || i + 1}: Praktik Pedagogis = "${p.model || 'Discovery Learning'}"`
    ).join('; ');

    const promptText = `
Susun dokumen Perencanaan Pembelajaran Mendalam (PPM) lengkap untuk data berikut:

IDENTITAS:
- Satuan Pendidikan: ${formData.namaSatuanPendidikan}
- Nama Guru: ${formData.namaGuru} (NIP: ${formData.nipGuru || '-'})
- Nama Kepala Sekolah: ${formData.namaKepalaSekolah} (NIP: ${formData.nipKepalaSekolah || '-'})
- Jenjang: ${formData.jenjang}
- Kelas: ${formData.kelas}
- Semester: ${formData.semester}
- Mata Pelajaran: ${formData.mataPelajaran}
- Tahun Pelajaran: ${formData.tahunPelajaran}
- Kabupaten: ${formData.namaKabupaten}
- Tanggal Pembuatan: ${formData.tanggalPembuatan}

DATA PEMBELAJARAN:
- Capaian Pembelajaran (CP): ${formData.capaianPembelajaran}
- Tujuan Pembelajaran (TP): ${formData.tujuanPembelajaran}
- Materi Pelajaran: ${formData.materiPelajaran}
- Jumlah Pertemuan: ${count} pertemuan
- Durasi Tiap Pertemuan: ${formData.durasiPertemuan || '2 x 40 menit'}
- Detail Rencana Model per Pertemuan: ${meetingDetails || 'Sesuaikan secara bertahap dan variatif'}
- Dimensi Profil Lulusan yang Dipilih: ${(formData.dimensiProfilLulusan || []).join(', ') || 'Penalaran Kritis, Kolaborasi, Kreativitas'}

SYARAT HASIL:
1. Bagi materi menjadi ${count} subtopik yang saling menyambung dan logis.
2. Buat Pengalaman Belajar untuk PERSIS ${count} pertemuan, masing-masing dengan tahap Memahami (karakter berkesadaran/bermakna/menggembirakan), Mengaplikasi (mengikuti sintaks model pedagogis yang ditentukan dengan aktivitas nyata siswa), dan Refleksi (penutup metakognisi).
3. Buat Asesmen Awal, Asesmen Proses, Asesmen Akhir, dan Rubrik Asesmen 4 level (Perlu Bimbingan, Cukup, Baik, Sangat Baik) untuk 4 indikator yang relevan.
4. Tentukan Lintas Disiplin Ilmu yang benar-benar relevan dengan ${formData.mataPelajaran}.
5. Berikan rekomendasi Pemanfaatan Digital yang spesifik dan kontekstual.
6. Kembalikan HANYA JSON murni yang valid tanpa awalan atau akhiran teks penjelasan.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          responseMimeType: 'application/json'
        }
      });

      const responseText = response.text?.trim() || '{}';
      let parsedData: any;
      try {
        parsedData = JSON.parse(responseText);
      } catch (parseErr) {
        console.error('Failed to parse Gemini response as JSON, falling back:', parseErr);
        parsedData = generateFallbackPPM(formData);
      }

      // Ensure proper structure
      const finalDoc = {
        id: 'ppm-' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: `PPM ${formData.mataPelajaran} - ${formData.kelas} (${formData.materiPelajaran})`,
        status: 'Selesai',
        identitas: parsedData.identitas || {
          namaSatuanPendidikan: formData.namaSatuanPendidikan,
          namaGuru: formData.namaGuru,
          nipGuru: formData.nipGuru,
          namaKepalaSekolah: formData.namaKepalaSekolah,
          nipKepalaSekolah: formData.nipKepalaSekolah,
          jenjang: formData.jenjang,
          kelas: formData.kelas,
          semester: formData.semester,
          mataPelajaran: formData.mataPelajaran,
          tahunPelajaran: formData.tahunPelajaran,
          namaKabupaten: formData.namaKabupaten,
          tanggalPembuatan: formData.tanggalPembuatan
        },
        identifikasi: parsedData.identifikasi || generateFallbackPPM(formData).identifikasi,
        desainPembelajaran: parsedData.desainPembelajaran || parsedData.desain_pembelajaran || generateFallbackPPM(formData).desainPembelajaran,
        pengalamanBelajar: parsedData.pengalamanBelajar || parsedData.pengalaman_belajar || generateFallbackPPM(formData).pengalamanBelajar,
        asesmenPembelajaran: parsedData.asesmenPembelajaran || parsedData.asesmen_pembelajaran || generateFallbackPPM(formData).asesmenPembelajaran,
        tandaTangan: parsedData.tandaTangan || parsedData.tanda_tangan || {
          tempatTanggal: `${formData.namaKabupaten}, ${formData.tanggalPembuatan}`,
          kepalaSekolah: {
            jabatan: 'Kepala Satuan Pendidikan',
            namaSekolah: formData.namaSatuanPendidikan,
            nama: formData.namaKepalaSekolah,
            nip: formData.nipKepalaSekolah
          },
          guruMapel: {
            jabatan: 'Guru Mata Pelajaran',
            mapel: formData.mataPelajaran,
            nama: formData.namaGuru,
            nip: formData.nipGuru
          }
        }
      };

      res.json({
        success: true,
        source: 'gemini_api',
        data: finalDoc
      });
    } catch (apiError: any) {
      console.error('Gemini API execution error, fallback seamlessly:', apiError?.message || apiError);
      const fallbackResult = generateFallbackPPM(formData);
      res.json({
        success: true,
        source: 'pedagogical_engine_fallback',
        data: fallbackResult
      });
    }
  } catch (error: any) {
    console.error('General error in /api/generate-ppm:', error);
    res.status(500).json({
      error: 'Generator AI sedang mengalami gangguan. Silakan coba kembali.',
      details: error.message
    });
  }
});

// API Regenerate Section
app.post('/api/regenerate-section', async (req: Request, res: Response) => {
  try {
    const { section, fullPPM, customPrompt } = req.body;
    if (!section || !fullPPM) {
      res.status(400).json({ error: 'Section dan fullPPM dibutuhkan.' });
      return;
    }

    const ai = getGenAI();
    const fallback = generateFallbackPPM(fullPPM.identitas);

    if (!ai) {
      let replacementData = null;
      if (section === 'identifikasi') replacementData = fallback.identifikasi;
      else if (section === 'desain') replacementData = fallback.desainPembelajaran;
      else if (section === 'pengalaman') replacementData = fallback.pengalamanBelajar;
      else if (section === 'asesmen') replacementData = fallback.asesmenPembelajaran;
      else if (section === 'rubrik') replacementData = fallback.asesmenPembelajaran.rubrikAsesmen;

      res.json({ success: true, section, data: replacementData, source: 'fallback' });
      return;
    }

    const promptText = `
Sebagai pakar perencanaan pembelajaran kurikulum merdeka Indonesia, lakukan REGENERASI khusus untuk bagian "${section}" dari PPM berikut:
Mata Pelajaran: ${fullPPM.identitas.mataPelajaran}, Jenjang: ${fullPPM.identitas.jenjang}, Kelas: ${fullPPM.identitas.kelas}.
Materi: ${fullPPM.identitas.materiPelajaran || fullPPM.identifikasi.materiPelajaran}.
Jumlah Pertemuan: ${fullPPM.pengalamanBelajar?.length || 3}.
Instruksi Tambahan Guru: ${customPrompt || 'Buat lebih kontekstual, mendalam, dan kaya aktivitas peserta didik.'}

Berikan respon HANYA objek JSON valid untuk bagian "${section}" tersebut sesuai struktur standar dokumen PPM.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      res.json({
        success: true,
        section,
        data: parsed[section] || parsed,
        source: 'gemini_api'
      });
    } catch (e: any) {
      console.warn('Regenerate section fallback:', e.message);
      let replacementData = null;
      if (section === 'identifikasi') replacementData = fallback.identifikasi;
      else if (section === 'desain') replacementData = fallback.desainPembelajaran;
      else if (section === 'pengalaman') replacementData = fallback.pengalamanBelajar;
      else if (section === 'asesmen') replacementData = fallback.asesmenPembelajaran;
      else if (section === 'rubrik') replacementData = fallback.asesmenPembelajaran.rubrikAsesmen;

      res.json({ success: true, section, data: replacementData, source: 'fallback' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Gagal meregenerasi bagian. ' + err.message });
  }
});

// Setup Vite middleware in dev or static server in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GENERATOR PPM PRO PREMIUM server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
