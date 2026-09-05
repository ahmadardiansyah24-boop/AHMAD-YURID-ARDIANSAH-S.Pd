-- =======================================================
-- GENERATOR PPM PRO PREMIUM
-- Perencanaan Pembelajaran Mendalam Berbasis AI
-- By Ahmad Yurid Ardiansah, S.Pd.
-- Database SQL Schema for cPanel / MySQL / MariaDB
-- =======================================================

CREATE DATABASE IF NOT EXISTS `generator_ppm_pro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `generator_ppm_pro`;

-- 1. Tabel Users (Admin & Guru)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `nip` VARCHAR(50) DEFAULT '-',
  `satuan_pendidikan` VARCHAR(200) DEFAULT '',
  `role` ENUM('ADMIN', 'GURU') NOT NULL DEFAULT 'GURU',
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default admin & sample guru
INSERT INTO `users` (`nama`, `email`, `password`, `nip`, `satuan_pendidikan`, `role`) VALUES
('Ahmad Yurid Ardiansah, S.Pd.', 'admin@ppmpro.id', '$2y$10$wN1GgD6aA.BqYjJ8vX.a0.vTklX7L4qQ31KfZu4J93k9e01B9v2pS', '198905142015031002', 'SMA Negeri 1 Prestasi', 'ADMIN'),
('Guru Penggerak Indonesia', 'guru@ppmpro.id', '$2y$10$wN1GgD6aA.BqYjJ8vX.a0.vTklX7L4qQ31KfZu4J93k9e01B9v2pS', '199208152019022001', 'SMP Negeri 2 Merdeka', 'GURU')
ON DUPLICATE KEY UPDATE `nama`=VALUES(`nama`);

-- 2. Tabel PPM Documents (Dokumen Utama PPM)
CREATE TABLE IF NOT EXISTS `ppm_documents` (
  `id` VARCHAR(64) PRIMARY KEY,
  `user_id` INT DEFAULT 1,
  `title` VARCHAR(255) NOT NULL,
  `satuan_pendidikan` VARCHAR(200) NOT NULL,
  `nama_guru` VARCHAR(150) NOT NULL,
  `nip_guru` VARCHAR(50) DEFAULT '-',
  `nama_kepsek` VARCHAR(150) NOT NULL,
  `nip_kepsek` VARCHAR(50) DEFAULT '-',
  `jenjang` ENUM('SD', 'SMP', 'SMA') NOT NULL,
  `kelas` VARCHAR(50) NOT NULL,
  `semester` ENUM('Ganjil', 'Genap') NOT NULL,
  `mata_pelajaran` VARCHAR(150) NOT NULL,
  `tahun_pelajaran` VARCHAR(30) NOT NULL,
  `nama_kabupaten` VARCHAR(100) NOT NULL,
  `tanggal_pembuatan` DATE NOT NULL,
  `materi_pelajaran` TEXT NOT NULL,
  `jumlah_pertemuan` INT NOT NULL DEFAULT 1,
  `durasi_pertemuan` VARCHAR(50) NOT NULL,
  `status` ENUM('Selesai', 'Draft') DEFAULT 'Selesai',
  `full_json_data` LONGTEXT NOT NULL COMMENT 'Structured JSON with 5 tables',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_jenjang` (`user_id`, `jenjang`),
  INDEX `idx_mapel` (`mata_pelajaran`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel PPM Drafts (Penyimpanan Sementara)
CREATE TABLE IF NOT EXISTS `ppm_drafts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `form_step` INT DEFAULT 1,
  `draft_data` LONGTEXT NOT NULL,
  `last_saved` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel PPM Templates (Preset Template Siap Pakai)
CREATE TABLE IF NOT EXISTS `ppm_templates` (
  `id` VARCHAR(64) PRIMARY KEY,
  `judul` VARCHAR(255) NOT NULL,
  `jenjang` ENUM('SD', 'SMP', 'SMA') NOT NULL,
  `kelas` VARCHAR(50) NOT NULL,
  `semester` ENUM('Ganjil', 'Genap') NOT NULL,
  `mata_pelajaran` VARCHAR(150) NOT NULL,
  `materi_pelajaran` TEXT NOT NULL,
  `jumlah_pertemuan` INT NOT NULL,
  `durasi_pertemuan` VARCHAR(50) NOT NULL,
  `capaian_pembelajaran` TEXT NOT NULL,
  `tujuan_pembelajaran` TEXT NOT NULL,
  `dimensi_profil` TEXT NOT NULL COMMENT 'JSON array of string',
  `pedagogis` TEXT NOT NULL COMMENT 'JSON array of pedagogic models',
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Generation Logs (Riwayat dan Analisis Beban AI)
CREATE TABLE IF NOT EXISTS `generation_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action_type` VARCHAR(50) NOT NULL COMMENT 'GENERATE_FULL, REGENERATE_SECTION',
  `target_section` VARCHAR(50) NULL,
  `jenjang` VARCHAR(20) NOT NULL,
  `mata_pelajaran` VARCHAR(150) NOT NULL,
  `jumlah_pertemuan` INT NOT NULL,
  `model_ai` VARCHAR(50) NOT NULL,
  `response_time_ms` INT DEFAULT 0,
  `status` ENUM('SUCCESS', 'FAILED') NOT NULL DEFAULT 'SUCCESS',
  `error_message` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabel System Settings (Pengaturan Administrator)
CREATE TABLE IF NOT EXISTS `settings` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `value_text` TEXT NOT NULL,
  `description` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `settings` (`key_name`, `value_text`, `description`) VALUES
('app_name', 'GENERATOR PPM PRO PREMIUM', 'Nama resmi aplikasi'),
('app_subtitle', 'Perencanaan Pembelajaran Mendalam Berbasis AI', 'Subjudul aplikasi'),
('creator_name', 'Ahmad Yurid Ardiansah, S.Pd.', 'Nama pencipta aplikasi'),
('footer_text', '© 2026 Generator PPM Pro Premium By Ahmad Yurid Ardiansah, S.Pd.', 'Teks footer hak cipta'),
('ai_model', 'gemini-3.8-flash', 'Model AI Google Gemini'),
('maintenance_mode', 'false', 'Mode pemeliharaan sistem')
ON DUPLICATE KEY UPDATE `value_text`=VALUES(`value_text`);
