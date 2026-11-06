import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Check, 
  Copy, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  FolderArchive, 
  Table, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { SQL_BLUEPRINT, isSupabaseConfigured, PORTFOLIO_STORAGE_BUCKET } from '../lib/supabase';

export const SupabaseSetupModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isLiveSupabase, reloadData, loading, error } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'status' | 'sql_tables' | 'sql_rls' | 'sql_storage' | 'sql_seed'>('status');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const configured = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 text-left">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Supabase Database & Storage Blueprint</span>
                {isLiveSupabase ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-500/30">
                    Live Connected
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-500/30">
                    Ready to Connect / Fallback Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bucket Storage: <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{PORTFOLIO_STORAGE_BUCKET}</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 sm:px-6 pt-3 border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto bg-white dark:bg-slate-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('status')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'status'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Status Koneksi</span>
          </button>

          <button
            onClick={() => setActiveTab('sql_tables')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sql_tables'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>1. SQL Tables (7 Tabel)</span>
          </button>

          <button
            onClick={() => setActiveTab('sql_rls')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sql_rls'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>2. RLS & Security</span>
          </button>

          <button
            onClick={() => setActiveTab('sql_storage')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sql_storage'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>3. Storage Bucket</span>
          </button>

          <button
            onClick={() => setActiveTab('sql_seed')}
            className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sql_seed'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>4. Seed Data Awal</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm space-y-4">
          
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isLiveSupabase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                    Status Integrasi Supabase
                  </span>
                  <button
                    onClick={() => reloadData()}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>Uji / Muat Ulang</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">VITE_SUPABASE_URL</p>
                    <p className="font-mono mt-0.5 truncate text-slate-800 dark:text-slate-200">
                      {import.meta.env.VITE_SUPABASE_URL || '(Belum diatur / menggunakan fallback aman)'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Storage Bucket</p>
                    <p className="font-mono mt-0.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      {PORTFOLIO_STORAGE_BUCKET}
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Pesan Peringatan Supabase:</p>
                      <p className="mt-0.5">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step by step guide */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Cara Menghubungkan ke Proyek Supabase Anda:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <li>Buat proyek baru di dashboard resmi <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-semibold">Supabase.com</a>.</li>
                  <li>Buka menu <strong>SQL Editor</strong> di Supabase, lalu salin dan jalankan tab <strong>1. SQL Tables</strong>, <strong>2. RLS & Security</strong>, dan <strong>3. Storage Bucket</strong>.</li>
                  <li>Jalankan skrip <strong>4. Seed Data Awal</strong> agar tabel terisi data portofolio Nico Wahyu secara instan.</li>
                  <li>Buka <strong>Project Settings → API</strong> di Supabase, salin <code>Project URL</code> dan <code>anon public key</code>.</li>
                  <li>Masukkan ke file <code>.env</code> Anda:
                    <pre className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-[11px] mt-1 text-slate-800 dark:text-slate-200">
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=eyJh...
                    </pre>
                  </li>
                  <li>Website akan langsung membaca seluruh data dan menyimpan pesan kontak secara real-time ke Supabase!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'sql_tables' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Skrip DDL SQL untuk 7 tabel: profiles, educations, skills, experiences, projects, certificates, contact_messages.</p>
                <button
                  onClick={() => handleCopy('tables', SQL_BLUEPRINT.createTables)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold"
                >
                  {copiedKey === 'tables' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tables' ? 'Tersalin!' : 'Salin SQL Tables'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                {SQL_BLUEPRINT.createTables}
              </pre>
            </div>
          )}

          {activeTab === 'sql_rls' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Aturan Row Level Security (RLS) untuk keamanan portofolio dan kerahasiaan pesan pelamar.</p>
                <button
                  onClick={() => handleCopy('rls', SQL_BLUEPRINT.enableRls)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold"
                >
                  {copiedKey === 'rls' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'rls' ? 'Tersalin!' : 'Salin SQL RLS'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                {SQL_BLUEPRINT.enableRls}
              </pre>
            </div>
          )}

          {activeTab === 'sql_storage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Pembuatan bucket 'portfolionicowahyu1' dan akses baca publik untuk foto profil, CV, dan dokumen.</p>
                <button
                  onClick={() => handleCopy('storage', SQL_BLUEPRINT.storageBucket)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold"
                >
                  {copiedKey === 'storage' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'storage' ? 'Tersalin!' : 'Salin SQL Storage'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                {SQL_BLUEPRINT.storageBucket}
              </pre>
            </div>
          )}

          {activeTab === 'sql_seed' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Skrip data awal portofolio Nico Wahyu (fresh graduate S1 Bahasa Inggris & magang SMAN 4 Langsa).</p>
                <button
                  onClick={() => handleCopy('seed', SQL_BLUEPRINT.seedInitialData)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold"
                >
                  {copiedKey === 'seed' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'seed' ? 'Tersalin!' : 'Salin Data Awal'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
                {SQL_BLUEPRINT.seedInitialData}
              </pre>
            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-950/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
