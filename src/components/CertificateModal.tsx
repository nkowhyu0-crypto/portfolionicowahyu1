import React from 'react';
import { X, Award, ShieldCheck, Calendar, Building2, FileCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CertificateItem } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const { lang } = usePortfolio();

  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-left shadow-2xl relative flex flex-col">
        
        {/* Certificate Image Frame */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-slate-950 flex items-center justify-center">
          <img 
            src={certificate.gambar} 
            alt={certificate.namaSertifikat[lang]} 
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/60"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 inline-block">
              {certificate.masaBerlaku[lang]}
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display leading-tight">
              {certificate.namaSertifikat[lang]}
            </h3>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="p-6 sm:p-8 space-y-5 text-slate-800 dark:text-slate-200">
          
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'id' ? 'Lembaga Penerbit:' : 'Issuing Organization:'}
              </p>
              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                {certificate.lembagaPenerbit}
              </p>
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'id' ? 'Tahun Penerbitan:' : 'Year of Issuance:'}
              </p>
              <p className="font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                {certificate.tahun}
              </p>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'id' ? 'Nomor Kredensial / Sertifikat:' : 'Credential / Certificate ID:'}
              </p>
              <p className="font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                {certificate.nomorKredensial}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'id' ? 'Deskripsi Kompetensi' : 'Competency Description'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {certificate.deskripsi[lang]}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span>
              {lang === 'id' 
                ? 'Sertifikat ini sah dan dapat dikonfirmasi untuk keperluan verifikasi berkas lamaran kerja.'
                : 'This certificate is valid and verifiable for employment background screening.'}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            {lang === 'id' ? 'Tutup Pratinjau' : 'Close Preview'}
          </button>
        </div>

      </div>
    </div>
  );
};
