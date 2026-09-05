# GENERATOR PPM PRO PREMIUM
### Perencanaan Pembelajaran Mendalam Berbasis AI
**By Ahmad Yurid Ardiansah, S.Pd.**

Aplikasi web modern, premium, dan elegan untuk menghasilkan Perencanaan Pembelajaran Mendalam (PPM) kurikulum Indonesia secara otomatis untuk SEMUA JENJANG (SD, SMP, SMA) dan SEMUA MATA PELAJARAN dengan output 5 Tabel Standar Resmi, multi-pertemuan dinamis, diferensiasi praktik pedagogis, rubrik asesmen 4 level, dan ekspor Microsoft Word (.docx).

---

## 🌟 Fitur Utama

1. **AI Generator Pembelajaran Mendalam:**
   - Menghubungkan Capaian Pembelajaran (CP), Tujuan Pembelajaran (TP), Materi, Praktik Pedagogis, dan Asesmen.
   - Pembagian otomatis materi menjadi subtopik terstruktur per pertemuan.
   - 8 Pilihan Praktik Pedagogis per pertemuan (Inkuiri, Discovery, Guided Discovery, PjBL, PBL, Problem Solving, Game Based, Station Learning).
   - 8 Dimensi Profil Lulusan dengan elaborasi relevansi mendalam.
   - Integrasi karakter pembelajaran: *Berkesadaran*, *Bermakna*, *Menggembirakan*.

2. **Output 5 Tabel Resmi Sesuai Panduan:**
   - **Tabel 1: Identitas** (Satuan Pendidikan, Mapel, Kelas/Semester, Materi, Durasi, Tahun Pelajaran).
   - **Tabel 2: Identifikasi** (Peserta Didik: kesiapan, minat, latar belakang, kebutuhan; Materi; Capaian Dimensi Profil).
   - **Tabel 3: Desain Pembelajaran** (CP, Lintas Disiplin Ilmu relevan, TP, Topik, Praktik Pedagogis, Kemitraan, Lingkungan Belajar, Pemanfaatan Digital terpilih).
   - **Tabel 4: Pengalaman Belajar per Pertemuan** (Memahami, Mengaplikasi dengan sintaks model nyata, Refleksi).
   - **Tabel 5: Asesmen Pembelajaran** (Asesmen Awal diagnostik, Asesmen Proses formatif, Asesmen Akhir sumatif, serta Rubrik Asesmen 4 Level otomatis).
   - **Blok Tanda Tangan Resmi**: Kepala Satuan Pendidikan dan Guru Mata Pelajaran.

3. **Fitur Interaktif & Produktivitas:**
   - **Preview Dokumen Standar A4**: Tampilan seperti Microsoft Word dengan batas margin, Arial 11, border tabel rapi, teks justify.
   - **Ekspor Dokumen Microsoft Word (.docx)**: Hasil unduhan langsung siap buka dan cetak di Microsoft Word.
   - **Cetak Langsung (Print PDF/Kertas)**: Dukungan layout A4 cetak bersih tanpa elemen navigasi.
   - **Regenerasi Parsial**: Tombol regenerasi per bagian (Tabel 2, Tabel 3, Tabel 4, atau Tabel 5) tanpa kehilangan data bagian lainnya.
   - **Editor Inline**: Seluruh teks hasil dapat disunting langsung sebelum disimpan atau diunduh.
   - **Riwayat & Manajemen Dokumen**: Simpan, cari, filter jenjang, duplikasi, sunting, dan hapus.
   - **Perpustakaan Template Siap Pakai**: Puluhan template terkurasi untuk SD, SMP, SMA berbagai mata pelajaran.
   - **Multi-Role**: Mode Guru dan Mode Admin dengan dashboard statistik lengkap.

---

## 🚀 Panduan Instalasi di Hosting cPanel

### Prasyarat:
- cPanel dengan PHP 8.0+
- MySQL 5.7+ / MariaDB 10.3+
- Ekstensi PHP: `pdo_mysql`, `curl`, `mbstring`, `json`
- Google Gemini API Key

### Langkah-Langkah:
1. **Upload File**:
   - Kompres seluruh isi proyek dan unggah ke cPanel `public_html` (atau subdomain Anda).
   - Ekstrak berkas melalui File Manager cPanel.

2. **Buat Database MySQL**:
   - Masuk ke menu **MySQL Databases** atau **MySQL Database Wizard** di cPanel.
   - Buat nama database (contoh: `user_ppmpro`).
   - Buat user database dan beri hak akses penuh (**ALL PRIVILEGES**).

3. **Import Database SQL**:
   - Buka **phpMyAdmin** dari cPanel.
   - Pilih database yang baru dibuat, klik tab **Import**.
   - Pilih file `database/database.sql` dan klik **Go / Kirim**.

4. **Konfigurasi Aplikasi**:
   - Salin file `config/config.example.php` menjadi `config/config.php`.
   - Buka dan edit `config/config.php`:
     ```php
     'database' => [
         'host'     => 'localhost',
         'database' => 'user_ppmpro',
         'username' => 'user_dbuser',
         'password' => 'PasswordDatabaseAnda',
     ],
     'ai' => [
         'api_key'  => 'API_KEY_GEMINI_ANDA',
     ]
     ```

5. **Uji Sistem**:
   - Buka `https://domain-anda.com/setup.php` di browser untuk memverifikasi kesiapan server.
   - Buka `https://domain-anda.com/` untuk mulai menggunakan Generator PPM Pro Premium.

---

## 🛡️ Hak Cipta & Branding
© 2026 Generator PPM Pro Premium  
**By Ahmad Yurid Ardiansah, S.Pd.**
