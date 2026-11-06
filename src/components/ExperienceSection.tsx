import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Database,
  Loader2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { lang, experiences, loading, openSetupModal } = usePortfolio();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredExperiences = filterType === 'all'
    ? experiences
    : experiences.filter((e) => e.tipe === filterType);

  return (
    <section 
      id="experience" 
      className="py-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Pengalaman Nyata' : 'Track Record'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Pengalaman Magang & Kerja Profesional' : 'Internship & Professional Experience'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Data pengalaman dikelola secara dinamis melalui Supabase Database (tabel: experiences).'
              : 'Experience history dynamically managed and fetched via Supabase Database (table: experiences).'}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: { id: 'Semua Pengalaman', en: 'All Experiences' } },
              { id: 'magang', label: { id: 'Magang SMA 4 Langsa', en: 'SMAN 4 Langsa Internship' } },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                {tab.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && experiences.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-xs">Memuat data pengalaman dari Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredExperiences.length === 0 && (
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-3">
            <Database className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Data Pengalaman</h4>
            <p className="text-xs text-slate-500">Tabel 'experiences' belum terisi atau sedang dalam proses sinkronisasi.</p>
            <button
              onClick={openSetupModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Lihat SQL Seeder
            </button>
          </div>
        )}

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900">
                    {exp.tipeLabel[lang] || 'Internship'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {exp.lokasi}
                  </span>
                </div>

                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.periode[lang]}</span>
                </div>
              </div>

              {/* Role & Institution */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {exp.peran[lang]}
                </h3>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{exp.institusi}</span>
                  <span className="text-xs text-slate-400 font-normal">• Bidang: Education</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2 text-justify">
                  {exp.deskripsi[lang]}
                </p>
              </div>

              {/* Responsibilities */}
              {exp.poinTugas && exp.poinTugas.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {lang === 'id' ? 'Tanggung Jawab Pokok & Tugas:' : 'Key Responsibilities & Tasks:'}
                  </h4>
                  <ul className="space-y-2">
                    {exp.poinTugas.map((pt) => (
                      <li key={pt.id} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{pt.text[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {exp.tagKeahlian && exp.tagKeahlian.length > 0 && (
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-2">
                  {exp.tagKeahlian.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
