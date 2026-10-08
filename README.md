# GeoPulse Enterprise Desktop Attendance System

Aplikasi Desktop Sistem Absensi & Geofence GPS presisi tinggi untuk **GeoPulse Enterprise**, dibangun menggunakan **React 18**, **TypeScript**, **CSS (Tailwind dengan Design Tokens resmi GeoPulse)**, dan **Electron**.

---

## 🚀 Fitur Utama & Kesesuaian Desain

### 1. 🖥️ Desktop Command Center & Dual Viewport Mode
- **Frameless Window TitleBar**: Desain bar judul desktop modern dengan kontrol jendela (*Minimize*, *Maximize*, *Close* via Electron IPC), indikator satelit real-time, dan jam sinkronisasi live.
- **Sidebar Navigasi Desktop (260px)**: Navigasi cepat ke 4 halaman utama dengan status radar aktif, profil ringkas pengguna, dan status presensi.
- **Toggle Viewport Mode**:
  - **🖥️ Desktop Mode (Default)**: Tampilan luas multi-kolom yang nyaman untuk layar komputer/laptop.
  - **📱 Mobile Mockup Mode**: Tampilan bingkai ponsel yang 100% presisi dan identik dengan preview gambar `screen.png`.

### 2. 📊 4 Halaman Utama Terintegrasi
1. **Employee Attendance Dashboard (`/dashboard`)**:
   - Greeting karyawan & jam digital real-time WIB (UTC+7) per detik.
   - Hero Card Geofence: Tombol **ABSEN MASUK** (dengan verifikasi biometrik) & **ABSEN PULANG**.
   - Ringkasan hari ini (Jam masuk, pulang, durasi kerja minimum 8 jam).
   - Radar Geofence Mini interaktif dengan shortcut ke peta penuh.
   - Layanan Mandiri (*Self-Service*): Izin/Sakit, Lembur, Tukar Shift, dan Slip Absen.
   - Riwayat 3 hari terakhir dengan status badge.

2. **📍 GPS Geofence Verification (`/verify-gps`)**:
   - Visualizer Radar interaktif dengan batas radius 100m, pin gedung Menara Mandiri HQ, dan pin user beranimasi.
   - Panel Telemetri: Akurasi (3.8m), Satelit (14 Aktif Galileo/GPS), Mock GPS Shield (Aman).
   - **Live Simulator 4 Mode Diagnostik**:
     - **A. Terverifikasi** (42m, Hijau Lime, In-Bounds)
     - **B. Di Luar Radius** (145m, Merah, Out-of-bounds)
     - **C. GPS Lemah** (Sinyal satelit rendah, Kuning)
     - **D. Izin Ditolak** (Akses lokasi OS dimatikan)
   - Tombol **Konfirmasi & Lanjutkan Absen** dengan token keamanan SHA-256.

3. **📅 Attendance History & Log (`/history`)**:
   - Pemilih bulan (Oktober 2024).
   - 4 Kartu Metrik: Hadir 18 Hari (94.7%), Terlambat 1 Hari, Cuti 1 Hari, Alpha 0 Hari.
   - Pencarian instan dan filter segmen (Semua, Tepat Waktu, Terlambat, Izin/Sakit).
   - Log kronologis lengkap dengan jam, lokasi pintu masuk/keluar, durasi kerja, dan surat dokter.
   - Modal audit jejak koordinat GPS (**Lihat Peta**).
   - Tombol **Unduh Rekap Bulanan (PDF/CSV)** terintegrasi dengan dialog file Electron / unduhan browser.

4. **👤 Employee Profile & Security (`/profile`)**:
   - Kartu Profil Karyawan: Rizky Pratama, S.Kom (GP-884210) - Pegawai Tetap.
   - Metrik kepatuhan (Skor hadir 98.5%, rata-rata jam masuk 08:45 WIB, sisa cuti 10 hari).
   - Informasi penugasan kantor & radius geofence (Menara Mandiri Lt. 18).
   - Perangkat terikat: Samsung Galaxy S23 (IMEI-1 Locked).
   - Switch otentikasi biometrik & status Fake GPS Shield.
   - Pengaturan akun & dialog konfirmasi Logout.

---

## 🛠️ Cara Menjalankan Aplikasi

### 1. Mode Web / Browser (Development)
Untuk menjalankan server pengembangan lokal dengan fitur Hot Module Reload (HMR):
```bash
npm run dev
```
Akses di browser pada: `http://localhost:5173/`

### 2. Mode Desktop (Electron)
Untuk menjalankan sebagai aplikasi desktop mandiri di Windows:
```bash
npm run electron
```
Atau jika server dev sudah berjalan:
```bash
npm run electron:start
```

### 3. Build & Kompilasi Produksi
Untuk mengompilasi kode React dan Electron menjadi bundle produksi:
```bash
npm run build
npm run build:electron
```
Hasil file web akan berada di folder `dist/` dan file script Electron di folder `dist-electron/`.

---

## 📂 Struktur Direktori Proyek

```
Desktop Absensi/
├── electron/
│   ├── main.ts            # Electron main process (frameless window, IPC, file export)
│   └── preload.ts         # Secure contextBridge API
├── src/
│   ├── components/
│   │   ├── DesktopTitleBar.tsx     # Bar jendela desktop dengan kontrol & mode switch
│   │   ├── SidebarNav.tsx          # Navigasi sidebar 260px desktop
│   │   ├── MobileBottomNav.tsx     # Navigasi tab bawah mobile mockup
│   │   ├── BiometricModal.tsx      # Modal simulasi sidik jari & validasi GPS
│   │   ├── SelfServiceModal.tsx    # Modal formulir izin/lembur/shift/slip
│   │   ├── LocationDetailModal.tsx # Modal audit jejak peta koordinat
│   │   └── Toast.tsx               # Notifikasi alert pop-up
│   ├── pages/
│   │   ├── DashboardPage.tsx       # Halaman Dashboard utama
│   │   ├── VerifyGpsPage.tsx       # Halaman Verifikasi GPS & Simulator
│   │   ├── HistoryPage.tsx         # Halaman Riwayat Presensi & Filter
│   │   └── ProfilePage.tsx         # Halaman Profil & Keamanan Karyawan
│   ├── data/
│   │   └── mockData.ts             # Dataset presensi, profil, dan skenario diagnostik
│   ├── types/
│   │   └── attendance.ts           # Definisi tipe TypeScript
│   ├── App.tsx                     # Komponen utama React & manajemen state
│   ├── main.tsx                    # Entry point React
│   └── index.css                   # Tailwind base, token warna, animasi radar
├── dist/                           # Bundle hasil build web
├── dist-electron/                  # Bundle hasil build Electron main & preload
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.cjs
```
