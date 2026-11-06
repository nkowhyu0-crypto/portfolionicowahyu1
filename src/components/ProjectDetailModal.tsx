import React from 'react';
import { X, CheckCircle2, Cpu, Layers, ExternalLink, Calendar, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { lang } = usePortfolio();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-left shadow-2xl relative flex flex-col">
        
        {/* Banner */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden rounded-t-3xl">
          <img 
            src={project.gambar} 
            alt={project.judul[lang]} 
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/60"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow">
              {project.kategori[lang]}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight">
              {project.judul[lang]}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200">
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              {project.statusProyek[lang]}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>{lang === 'id' ? 'Deskripsi Lengkap Proyek' : 'Full Project Description'}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {project.deskripsiLengkap[lang]}
            </p>
          </div>

          {/* Key Deliverables & Outcomes */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'id' ? 'Fitur Utama & Hasil Pengerjaan' : 'Key Features & Deliverables'}</span>
            </h4>
            <div className="space-y-2">
              {project.fiturDanHasil.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{f[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Tech */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'id' ? 'Software & Keahlian yang Diaplikasikan' : 'Software & Skills Applied'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-100 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors"
          >
            {lang === 'id' ? 'Tutup Rincian' : 'Close Details'}
          </button>
        </div>

      </div>
    </div>
  );
};
