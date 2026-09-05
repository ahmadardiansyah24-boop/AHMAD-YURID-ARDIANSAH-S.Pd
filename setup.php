<?php
/**
 * GENERATOR PPM PRO PREMIUM
 * Perencanaan Pembelajaran Mendalam Berbasis AI
 * By Ahmad Yurid Ardiansah, S.Pd.
 * 
 * Script Setup & Pemeriksaan Lingkungan Hosting cPanel
 */

define('APP_PATH', __DIR__);
header('Content-Type: text/html; charset=utf-8');

$phpVersion = phpversion();
$isPhpOk = version_compare($phpVersion, '8.0.0', '>=');
$hasCurl = extension_loaded('curl');
$hasPdo = extension_loaded('pdo_mysql');
$hasMbstring = extension_loaded('mbstring');
$hasJson = extension_loaded('json');

$configFile = __DIR__ . '/config/config.php';
$hasConfig = file_exists($configFile);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pemeriksaan Sistem - GENERATOR PPM PRO PREMIUM</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 40px 20px; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 32px; border: 1px solid #e2e8f0; }
        h1 { color: #1e40af; margin-top: 0; font-size: 22px; }
        .subtitle { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        .check-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .badge-success { background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .badge-fail { background: #fee2e2; color: #b91c1c; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .btn { display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 24px; }
        .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; }
    </style>
</head>
<body>
<div class="container">
    <h1>GENERATOR PPM PRO PREMIUM</h1>
    <div class="subtitle">Perencanaan Pembelajaran Mendalam Berbasis AI &bull; By Ahmad Yurid Ardiansah, S.Pd.</div>
    <h3>Pemeriksaan Prasyarat cPanel Server:</h3>
    
    <div class="check-item">
        <span>PHP Version (&gt;= 8.0) &mdash; Terpasang: <?php echo $phpVersion; ?></span>
        <span class="<?php echo $isPhpOk ? 'badge-success' : 'badge-fail'; ?>"><?php echo $isPhpOk ? 'Lolos' : 'Perlu Update'; ?></span>
    </div>
    <div class="check-item">
        <span>Ekstensi cURL (Untuk Komunikasi API AI)</span>
        <span class="<?php echo $hasCurl ? 'badge-success' : 'badge-fail'; ?>"><?php echo $hasCurl ? 'Aktif' : 'Nonaktif'; ?></span>
    </div>
    <div class="check-item">
        <span>Ekstensi PDO MySQL (Koneksi Database)</span>
        <span class="<?php echo $hasPdo ? 'badge-success' : 'badge-fail'; ?>"><?php echo $hasPdo ? 'Aktif' : 'Nonaktif'; ?></span>
    </div>
    <div class="check-item">
        <span>Ekstensi Mbstring &amp; JSON</span>
        <span class="<?php echo ($hasMbstring && $hasJson) ? 'badge-success' : 'badge-fail'; ?>"><?php echo ($hasMbstring && $hasJson) ? 'Aktif' : 'Nonaktif'; ?></span>
    </div>
    <div class="check-item">
        <span>File Konfigurasi (config/config.php)</span>
        <span class="<?php echo $hasConfig ? 'badge-success' : 'badge-fail'; ?>"><?php echo $hasConfig ? 'Tersedia' : 'Salin dari config.example.php'; ?></span>
    </div>

    <div style="margin-top: 20px; background: #eff6ff; padding: 16px; border-radius: 8px; font-size: 13px; color: #1e40af;">
        <strong>Langkah Selanjutnya:</strong><br>
        1. Buat database di cPanel (MySQL Database Wizard).<br>
        2. Import file <code>database/database.sql</code> via phpMyAdmin.<br>
        3. Salin <code>config/config.example.php</code> menjadi <code>config/config.php</code> dan isi kredensial MySQL &amp; Gemini API Key.<br>
        4. Akses aplikasi melalui domain Anda.
    </div>

    <div class="footer">
        &copy; 2026 Generator PPM Pro Premium &bull; By Ahmad Yurid Ardiansah, S.Pd.
    </div>
</div>
</body>
</html>
