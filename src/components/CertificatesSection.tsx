import React, { useState } from 'react';
import { 
  Award, 
  Building2, 
  ShieldCheck, 
  Eye, 
  Database,
  Loader2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificateItem } from '../data/portfolioData';
import { CertificateModal } from './CertificateModal';
import { getStorageUrl } from '../lib/supabase';

export const CertificatesSection: React.FC = () => {
  const { lang, certificates, loading, openSetupModal } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <section 
      id="certificates" 
      className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Sertifikasi & Lisensi' : 'Certificates & Licensures'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Sertifikat & Pelatihan Resmi' : 'Official Certificates & Accreditations'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Dikelola secara dinamis via Supabase Database (tabel: certificates) dan Supabase Storage.'
              : 'Dynamically managed via Supabase Database (table: certificates) and Supabase Storage.'}
          </p>
        </div>

        {/* Loading State */}
        {loading && certificates.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-xs">Memuat data sertifikat dari Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && certificates.length === 0 && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-3">
            <Database className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Data Sertifikat</h4>
            <p className="text-xs text-slate-500">Tabel 'certificates' belum terisi data.</p>
            <button
              onClick={openSetupModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
            >
              Lihat SQL Seeder
            </button>
          </div>
        )}

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert) => {
            const resolvedImg = getStorageUrl(cert.gambar, 'https://images.unsplash.com/photo-1589330694653-dad6bc0140af?auto=format&fit=crop&w=800&q=80');

            return (
              <div
                key={cert.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                <div>
                  {/* Certificate Preview Frame */}
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={resolvedImg}
                      alt={cert.namaSertifikat[lang]}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        Tahun {cert.tahun}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <span className="px-3 py-1.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow">
                        <Eye className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'id' ? 'Lihat Sertifikat' : 'View Certificate'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      {cert.masaBerlaku[lang] || 'Terverifikasi'}
                    </span>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {cert.namaSertifikat[lang]}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{cert.lembagaPenerbit}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono truncate mr-2">{cert.nomorKredensial}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 flex-shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Valid
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
