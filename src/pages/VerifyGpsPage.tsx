import React, { useState, useEffect } from 'react';
import { DiagnosticState, DiagnosticConfig } from '../types/attendance';
import { DIAGNOSTIC_SCENARIOS } from '../data/mockData';
import {
  ShieldCheck,
  Radio,
  Satellite,
  ShieldAlert,
  Navigation,
  Fingerprint,
  Lock,
  Building,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

interface VerifyGpsPageProps {
  onConfirmAttendance: () => void;
  canClockIn: boolean;
}

export const VerifyGpsPage: React.FC<VerifyGpsPageProps> = ({
  onConfirmAttendance,
  canClockIn,
}) => {
  const [selectedState, setSelectedState] = useState<DiagnosticState>('verified');
  const [telemetryTime, setTelemetryTime] = useState('');

  const currentScenario: DiagnosticConfig = DIAGNOSTIC_SCENARIOS[selectedState];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTelemetryTime(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full pb-8">
      {/* Header section with telemetry badge */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-on-surface-variant font-medium tracking-tight">
              ENCRYPTED TELEMETRY
            </span>
          </div>
          <span className="font-mono text-xs text-on-surface-variant font-medium">
            {telemetryTime || '08:42:19 WIB'}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight mt-1">
          Verifikasi Lokasi & GPS
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Pastikan Anda berada dalam radius aman geofence sebelum mengirim bukti presensi.
        </p>
      </div>

      {/* Main Interactive Map & Radar Visualizer */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#161a33] shadow-card border border-structural-border flex items-center justify-center">
        {/* Map Blueprint Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3a4efb_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5 bg-[#1e2238]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#353c63] shadow-sm">
            <Building className="w-4 h-4 text-primary" />
            <span className="text-xs text-white font-semibold truncate max-w-[170px]">
              Menara Mandiri HQ
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1e2238]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#353c63] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
            <span className="font-mono text-xs text-white font-semibold">
              100m Geofence
            </span>
          </div>
        </div>

        {/* Animated Geofence Circles & Radar Sweep */}
        <div className="relative z-10 flex items-center justify-center w-64 h-64 pointer-events-none">
          {/* Outer Geofence 100m Perimeter */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-500 ${
              selectedState === 'verified'
                ? 'border-secondary-container bg-secondary-container/10'
                : selectedState === 'out_of_bounds'
                ? 'border-red-500 bg-red-500/10'
                : 'border-yellow-500 bg-yellow-500/10'
            } animate-pulse-ring`}
          ></div>

          {/* Inner 50m core zone */}
          <div className="absolute w-44 h-44 rounded-full bg-secondary-container/10 border border-secondary-container/30"></div>

          {/* Sweeping Radar beam */}
          <div className="absolute w-56 h-56 rounded-full border-r-2 border-tertiary-fixed opacity-40 animate-radar-sweep"></div>

          {/* Central HQ Pin */}
          <div className="absolute flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-secondary shadow-lg ring-4 ring-[#161a33]"></div>
            <span className="font-mono text-[10px] text-white font-bold mt-1 px-2 py-0.5 bg-[#161a33]/90 rounded backdrop-blur-sm border border-[#353c63]">
              Pusat HQ
            </span>
          </div>

          {/* Dynamic User Location Pin */}
          {selectedState !== 'permission_denied' && (
            <div
              className="absolute flex flex-col items-center transition-all duration-700 ease-out z-20"
              style={{
                top: `${currentScenario.pinCoordinates.y}%`,
                left: `${currentScenario.pinCoordinates.x}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`animate-ping absolute inline-flex h-10 w-10 rounded-full opacity-60 ${
                    currentScenario.badgeType === 'lime'
                      ? 'bg-tertiary-fixed'
                      : currentScenario.badgeType === 'red'
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
                  }`}
                ></span>
                <span
                  className={`relative flex items-center justify-center w-7 h-7 rounded-full text-white shadow-xl ring-2 ring-white ${
                    currentScenario.badgeType === 'lime'
                      ? 'bg-primary'
                      : currentScenario.badgeType === 'red'
                      ? 'bg-red-600'
                      : 'bg-yellow-600'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 bg-[#1e2238]/95 px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap border border-[#353c63]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentScenario.badgeType === 'lime'
                      ? 'bg-tertiary-fixed'
                      : currentScenario.badgeType === 'red'
                      ? 'bg-red-500'
                      : 'bg-yellow-400'
                  }`}
                ></span>
                <span className="font-mono text-white font-semibold text-[11px]">
                  {currentScenario.userDistanceMeters}m dari pusat
                </span>
              </div>
            </div>
          )}

          {/* Permission Denied Overlay */}
          {selectedState === 'permission_denied' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-full flex flex-col items-center justify-center text-center p-4">
              <XCircle className="w-10 h-10 text-red-400 mb-1" />
              <span className="text-xs font-bold text-white">GPS Access Denied</span>
            </div>
          )}
        </div>

        {/* Bottom Geofence live badge inside map */}
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <div className="flex items-center justify-between bg-[#1e2238]/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#353c63] shadow-md">
            <div className="flex items-center gap-2.5">
              {currentScenario.badgeType === 'lime' ? (
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
              ) : currentScenario.badgeType === 'red' ? (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              ) : (
                <Radio className="w-5 h-5 text-yellow-400" />
              )}
              <div className="flex flex-col">
                <span className="text-xs text-white font-bold leading-tight">
                  {currentScenario.statusTitle}
                </span>
                <span className="font-mono text-[11px] text-[#bdc2ff]">
                  {selectedState === 'permission_denied'
                    ? 'Akses GPS dinonaktifkan di sistem'
                    : `${currentScenario.userDistanceMeters} meter dari pusat kantor`}
                </span>
              </div>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                currentScenario.badgeType === 'lime'
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : currentScenario.badgeType === 'red'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
              }`}
            >
              {currentScenario.statusBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Diagnostics Metric Cards */}
      <div className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-card border border-structural-border">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-on-surface-variant mb-0.5">
              <Navigation className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Akurasi</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface font-mono">
              {currentScenario.accuracyMeters > 0
                ? `High (${currentScenario.accuracyMeters}m)`
                : 'Offline'}
            </span>
            <span className="font-mono text-[10px] text-tertiary-container font-semibold mt-0.5">
              {currentScenario.accuracyMeters > 0 ? 'Sangat Presisi' : 'Tidak Terbaca'}
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-on-surface-variant mb-0.5">
              <Satellite className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Satelit</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface font-mono">
              {currentScenario.satellites} Aktif
            </span>
            <span className="font-mono text-[10px] text-secondary font-semibold mt-0.5">
              Galileo & GPS
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-on-surface-variant mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Mock GPS</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface font-mono">
              {currentScenario.isMockSafe ? 'Aman' : 'Peringatan'}
            </span>
            <span className="font-mono text-[10px] text-tertiary-container font-semibold mt-0.5">
              Authentic OS
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Mode Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            PILIH MODE DIAGNOSTIK PREVIEW
          </span>
          <span className="font-mono text-xs text-primary font-medium">
            Live Simulator
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-surface-container rounded-2xl border border-structural-border">
          {(Object.keys(DIAGNOSTIC_SCENARIOS) as DiagnosticState[]).map((key) => {
            const sc = DIAGNOSTIC_SCENARIOS[key];
            const isSelected = selectedState === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedState(key)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-bold scale-[1.02]'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    sc.badgeType === 'lime'
                      ? 'bg-tertiary-fixed'
                      : sc.badgeType === 'red'
                      ? 'bg-red-500'
                      : sc.badgeType === 'yellow'
                      ? 'bg-yellow-500'
                      : 'bg-gray-400'
                  }`}
                ></span>
                <span>{sc.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contextual Status Detail Box */}
      <div
        className={`p-4 rounded-2xl border flex flex-col gap-2 transition-all ${
          currentScenario.badgeType === 'lime'
            ? 'bg-surface-container-lowest border-structural-border'
            : currentScenario.badgeType === 'red'
            ? 'bg-red-50 border-red-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              currentScenario.badgeType === 'lime'
                ? 'bg-tertiary-fixed/30 text-tertiary-container'
                : currentScenario.badgeType === 'red'
                ? 'bg-red-100 text-red-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {currentScenario.badgeType === 'lime' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : currentScenario.badgeType === 'red' ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Radio className="w-5 h-5" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-on-surface">
              {currentScenario.statusTitle}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              {currentScenario.statusSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-structural-border/60 flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-mono">
            Radius Terkunci: 100 Meter Geofence (Safe)
          </span>
          <span
            className={`font-semibold flex items-center gap-1 ${
              currentScenario.canProceed ? 'text-primary' : 'text-red-600'
            }`}
          >
            {currentScenario.canProceed ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Lolos Validasi</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Validasi Gagal</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Main Action Button */}
      <button
        onClick={onConfirmAttendance}
        disabled={!currentScenario.canProceed}
        className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
          currentScenario.canProceed
            ? 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-60'
        }`}
      >
        <Fingerprint className="w-5 h-5" />
        <span>Konfirmasi & Lanjutkan Absen</span>
      </button>

      {/* Security hash footer */}
      <div className="flex items-center justify-center gap-1 text-[11px] text-on-surface-variant font-mono">
        <Lock className="w-3 h-3" />
        <span>TOKEN: 8F2A-99B1-GEO-MANDIRI | HASH: OK</span>
      </div>
    </div>
  );
};
