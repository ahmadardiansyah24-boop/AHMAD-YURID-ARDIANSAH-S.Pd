<?php
/**
 * GENERATOR PPM PRO PREMIUM
 * Perencanaan Pembelajaran Mendalam Berbasis AI
 * By Ahmad Yurid Ardiansah, S.Pd.
 * 
 * File Konfigurasi cPanel / PHP
 */

// Cegah akses langsung jika tidak melalui index atau bootstrap
defined('APP_PATH') or define('APP_PATH', dirname(__DIR__));

return [
    // Pengaturan Aplikasi
    'app' => [
        'name'        => 'GENERATOR PPM PRO PREMIUM',
        'subtitle'    => 'Perencanaan Pembelajaran Mendalam Berbasis AI',
        'creator'     => 'Ahmad Yurid Ardiansah, S.Pd.',
        'footer'      => '© 2026 Generator PPM Pro Premium By Ahmad Yurid Ardiansah, S.Pd.',
        'url'         => 'https://domain-anda.com/ppm',
        'env'         => 'production', // 'development' atau 'production'
        'debug'       => false,
        'timezone'    => 'Asia/Jakarta',
    ],

    // Konfigurasi Database MySQL (cPanel)
    'database' => [
        'host'        => 'localhost',
        'port'        => 3306,
        'database'    => 'cpaneluser_ppmpro',
        'username'    => 'cpaneluser_dbuser',
        'password'    => 'PasswordKuatDatabase123!',
        'charset'     => 'utf8mb4',
        'collation'   => 'utf8mb4_unicode_ci',
    ],

    // Konfigurasi AI Engine
    'ai' => [
        'provider'    => 'gemini',
        'api_key'     => getenv('GEMINI_API_KEY') ?: 'AIzaSyYourGeminiApiKeyHere',
        'model'       => 'gemini-3.8-flash',
        'timeout'     => 60,
    ],

    // Keamanan dan Sesi
    'security' => [
        'session_name' => 'PPM_PRO_SESSID',
        'token_secret' => 'GantiDenganRandomSecretKey64KarakterUntukEnkripsiDanCSRF',
        'rate_limit'   => 30, // request per menit
    ]
];
