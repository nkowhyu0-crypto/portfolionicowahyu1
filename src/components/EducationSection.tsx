import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Award,
  Database,
  Loader2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationSection: React.FC = () => {
  const { lang, educations, loading, openSetupModal } = usePortfolio();

  return (
    <section 
      id="education" 
      className="py-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Latar Belakang Akademis' : 'Academic Credentials'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Riwayat Pendidikan Formal' : 'Formal Education History'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Data pendidikan dikelola secara dinamis melalui Supabase Database (tabel: educations).'
              : 'Education background dynamically managed and fetched via Supabase Database (table: educations).'}
          </p>
        </div>

        {/* Loading State */}
        {loading && educations.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-xs">Memuat data pendidikan dari Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && educations.length === 0 && (
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-3">
            <Database className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Data Pendidikan</h4>
            <p className="text-xs text-slate-500">Tabel 'educations' belum terisi data.</p>
            <button
              onClick={openSetupModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Lihat SQL Seeder
            </button>
          </div>
        )}

        {/* Education Card */}
        <div className="max-w-4xl mx-auto space-y-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              {/* Subtle accent badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-xs">
                    {edu.jenjang[lang] || 'S1'}
                  </span>
                  <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {edu.lokasi || 'Kota Langsa, Aceh'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.periode || '2019 - 2023'}</span>
                </div>
              </div>

              {/* Major & Institution */}
              <div className="space-y-2 mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {edu.institusi || '[Nama Universitas / Perguruan Tinggi di Langsa]'}
                </h3>
                <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                  Jurusan: {edu.jurusan[lang] || 'Bahasa Inggris'} {edu.nilaiIPK ? `• ${edu.nilaiIPK}` : ''}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                  {edu.keterangan[lang] || 'Menyelesaikan kurikulum S1 Bahasa Inggris yang membekali fondasi komunikasi, linguistik, penulisan, dan pedagogi.'}
                </p>
              </div>

              {/* Achievements & Highlights */}
              {edu.pencapaian && edu.pencapaian.length > 0 && (
                <div className="space-y-2.5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{lang === 'id' ? 'Sorotan Kompetensi Selama Studi:' : 'Competencies & Academic Highlights:'}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {edu.pencapaian.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
