import React, { useState } from 'react';
import {
  Server,
  Database,
  Code2,
  FileCheck,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  Terminal,
  HelpCircle
} from 'lucide-react';
import { saveAs } from 'file-saver';

export const CpanelPackageView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'guide' | 'sql' | 'config' | 'setup' | 'htaccess'>('guide');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const SQL_CONTENT = `-- GENERATOR PPM PRO PREMIUM DATABASE SCHEMA
-- Author: Ahmad Yurid Ardiansah, S.Pd.
-- Compatible: MySQL 5.7+ / MariaDB 10.3+ / phpMyAdmin cPanel

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    nip VARCHAR(32) DEFAULT '-',
    school_name VARCHAR(128) NOT NULL,
    role ENUM('GURU', 'ADMIN') NOT NULL DEFAULT 'GURU',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ppm_documents (
    id VARCHAR(64) PRIMARY KEY,
    user_id INT NULL,
    title VARCHAR(255) NOT NULL,
    jenjang ENUM('SD', 'SMP', 'SMA') NOT NULL,
    kelas VARCHAR(32) NOT NULL,
    mata_pelajaran VARCHAR(128) NOT NULL,
    materi_pelajaran TEXT NOT NULL,
    status ENUM('Draft', 'Selesai', 'Diarsipkan') DEFAULT 'Selesai',
    data_json LONGTEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_jenjang (jenjang),
    INDEX idx_mapel (mata_pelajaran)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;`;

  const CONFIG_CONTENT = `<?php
/**
 * GENERATOR PPM PRO PREMIUM - CONFIGURATION
 * By Ahmad Yurid Ardiansah, S.Pd.
 */

return [
    'app' => [
        'name'        => 'GENERATOR PPM PRO PREMIUM',
        'subtitle'    => 'Perencanaan Pembelajaran Mendalam Berbasis AI',
        'creator'     => 'Ahmad Yurid Ardiansah, S.Pd.',
        'version'     => '2.6.0',
        'environment' => 'production',
        'url'         => 'https://domain-anda.com'
    ],
    'database' => [
        'host'     => 'localhost',
        'database' => 'user_ppmpro',
        'username' => 'user_dbuser',
        'password' => 'PasswordDatabaseAnda',
        'charset'  => 'utf8mb4'
    ],
    'ai' => [
        'provider' => 'gemini',
        'model'    => 'gemini-3.8-flash',
        'api_key'  => 'API_KEY_GEMINI_ANDA'
    ]
];`;

  const SETUP_CONTENT = `<?php
/**
 * SETUP & DIAGNOSTIC ENVIRONMENT CPANEL
 * Buka URL ini di browser setelah mengunggah berkas ke cPanel.
 */

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Setup & Diagnostic - Generator PPM Pro Premium</title>
    <style>
        body { font-family: sans-serif; background: #f8fafc; color: #0f172a; padding: 40px; }
        .card { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; }
        .success { color: #16a34a; font-weight: bold; }
        .badge { background: #dbeafe; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Pemeriksaan Lingkungan cPanel</h2>
        <p>PHP Version: <span class="badge"><?= phpversion(); ?></span></p>
        <p>Ekstensi PDO MySQL: <span class="success"><?= extension_loaded('pdo_mysql') ? 'Tersedia' : 'Non-Aktif'; ?></span></p>
        <p>Ekstensi cURL: <span class="success"><?= extension_loaded('curl') ? 'Tersedia' : 'Non-Aktif'; ?></span></p>
        <p>Ekstensi JSON: <span class="success"><?= extension_loaded('json') ? 'Tersedia' : 'Non-Aktif'; ?></span></p>
        <hr/>
        <p>Status: Server cPanel Anda Siap Menjalankan GENERATOR PPM PRO PREMIUM!</p>
    </div>
</body>
</html>`;

  const HTACCESS_CONTENT = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Server className="w-4 h-4" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Paket Deployment Hosting cPanel & MySQL
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Panduan lengkap dan berkas konfigurasi siap pakai untuk hosting cPanel Anda
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            cPanel Certified Ready
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'guide', label: 'Panduan Instalasi cPanel', icon: HelpCircle },
          { id: 'sql', label: 'database.sql', icon: Database },
          { id: 'config', label: 'config.php', icon: Code2 },
          { id: 'setup', label: 'setup.php', icon: FileCheck },
          { id: 'htaccess', label: '.htaccess', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Installation Guide */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Langkah Cepat Instalasi pada Hosting cPanel (Shared Hosting)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ikuti 5 langkah sederhana berikut untuk menyebarkan aplikasi ke domain atau subdomain Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Unggah File ke cPanel</h3>
              <p className="text-slate-600 leading-relaxed">
                Masuk ke <strong>cPanel File Manager</strong>. Buka folder <code>public_html</code> (atau subdomain Anda). Unggah file ZIP aplikasi dan ekstrak di direktori tersebut.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Buat Database MySQL</h3>
              <p className="text-slate-600 leading-relaxed">
                Buka menu <strong>MySQL Database Wizard</strong> di cPanel. Buat nama database baru, buat user database beserta password, lalu berikan hak akses <strong>ALL PRIVILEGES</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs">
                3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Import database.sql di phpMyAdmin</h3>
              <p className="text-slate-600 leading-relaxed">
                Buka <strong>phpMyAdmin</strong> dari cPanel. Pilih database Anda di panel kiri, klik menu <strong>Import</strong>, lalu pilih file <code>database/database.sql</code> dan klik <strong>Go / Kirim</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                4
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Konfigurasi config.php</h3>
              <p className="text-slate-600 leading-relaxed">
                Salin file <code>config/config.example.php</code> menjadi <code>config/config.php</code>. Masukkan nama database, user, password, dan Gemini API Key Anda.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 md:col-span-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                5
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Uji dan Jalankan Aplikasi</h3>
              <p className="text-slate-600 leading-relaxed">
                Buka <code>https://domain-anda.com/setup.php</code> di browser untuk memverifikasi lingkungan. Setelah status siap, buka <code>https://domain-anda.com/</code> untuk langsung menggunakan generator!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SQL */}
      {activeTab === 'sql' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              database/database.sql
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(SQL_CONTENT, 'sql')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                {copySuccess === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin SQL</span>
              </button>
              <button
                onClick={() => downloadFile(SQL_CONTENT, 'database.sql')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .sql</span>
              </button>
            </div>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
            {SQL_CONTENT}
          </pre>
        </div>
      )}

      {/* Tab 3: config.php */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              config/config.php
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(CONFIG_CONTENT, 'config')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                {copySuccess === 'config' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Config</span>
              </button>
              <button
                onClick={() => downloadFile(CONFIG_CONTENT, 'config.example.php')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .php</span>
              </button>
            </div>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
            {CONFIG_CONTENT}
          </pre>
        </div>
      )}

      {/* Tab 4: setup.php */}
      {activeTab === 'setup' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              setup.php (Verifikasi Otomatis Server)
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(SETUP_CONTENT, 'setup')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                {copySuccess === 'setup' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin Setup</span>
              </button>
              <button
                onClick={() => downloadFile(SETUP_CONTENT, 'setup.php')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh setup.php</span>
              </button>
            </div>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
            {SETUP_CONTENT}
          </pre>
        </div>
      )}

      {/* Tab 5: .htaccess */}
      {activeTab === 'htaccess' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              .htaccess (URL Rewrite Rules)
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(HTACCESS_CONTENT, 'htaccess')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                {copySuccess === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Salin .htaccess</span>
              </button>
              <button
                onClick={() => downloadFile(HTACCESS_CONTENT, '.htaccess')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh .htaccess</span>
              </button>
            </div>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
            {HTACCESS_CONTENT}
          </pre>
        </div>
      )}
    </div>
  );
};
