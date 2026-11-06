import React, { useState } from 'react';
import { 
  Cpu, 
  FileText, 
  Sheet, 
  BookOpen, 
  Languages, 
  FolderKanban, 
  Users, 
  Sparkles, 
  Presentation,
  CheckCircle2,
  Database,
  Loader2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { lang, skills, loading, isLiveSupabase, openSetupModal } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'hard' | 'soft' | 'technical'>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.kategori === activeCategory);

  const getSkillIcon = (ikonName: string) => {
    switch (ikonName) {
      case 'FileText': return <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Sheet': return <Sheet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Languages': return <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'FolderKanban': return <FolderKanban className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'Users': return <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Presentation': return <Presentation className="w-6 h-6 text-orange-600 dark:text-orange-400" />;
      default: return <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const getCategoryBadge = (kategori: string) => {
    switch (kategori) {
      case 'hard':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Hard Skill</span>;
      case 'soft':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Soft Skill</span>;
      case 'technical':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">Technical & Tool</span>;
      default:
        return null;
    }
  };

  return (
    <section 
      id="skills" 
      className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Kompetensi & Keahlian' : 'Competencies & Skills'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Keahlian Pokok & Software yang Dikuasai' : 'Core Skills & Software Mastery'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Data keahlian dikelola secara dinamis melalui Supabase Database (tabel: skills).'
              : 'Skill competencies dynamically managed and fetched via Supabase Database (table: skills).'}
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: { id: 'Semua Keahlian', en: 'All Skills' } },
              { id: 'hard', label: { id: 'Hard Skills', en: 'Hard Skills' } },
              { id: 'soft', label: { id: 'Soft Skills', en: 'Soft Skills' } },
              { id: 'technical', label: { id: 'Technical & Tools', en: 'Technical & Tools' } },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                {tab.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && skills.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-xs">Memuat data keahlian dari Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredSkills.length === 0 && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-3">
            <Database className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Data Keahlian</h4>
            <p className="text-xs text-slate-500">Belum ada data keahlian di kategori ini dalam tabel Supabase 'skills'.</p>
            <button
              onClick={openSetupModal}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
            >
              Lihat SQL Seeder
            </button>
          </div>
        )}

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getSkillIcon(skill.ikon)}
                  </div>
                  {getCategoryBadge(skill.kategori)}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {skill.nama}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 text-justify">
                  {skill.deskripsi[lang]}
                </p>
              </div>

              {/* Progress and Level */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {skill.tingkat[lang]}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
