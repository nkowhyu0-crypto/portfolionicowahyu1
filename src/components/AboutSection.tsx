import React from 'react';
import { 
  User, 
  GraduationCap, 
  Target, 
  Compass, 
  CheckCircle2, 
  MapPin, 
  MessageSquareQuote, 
  FolderKanban, 
  Zap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalProfileData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { lang, profile } = usePortfolio();

  const getStrengthIcon = (ikon: string) => {
    switch (ikon) {
      case 'MessageSquareQuote': return <MessageSquareQuote className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'FolderKanban': return <FolderKanban className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <section 
      id="about" 
      className="py-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Tentang Saya' : 'About Me'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Perkenalan Diri & Profil Profesional' : 'Personal Introduction & Professional Profile'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Latar belakang pendidikan, komitmen etos kerja, serta kelebihan diri untuk memberikan kontribusi terbaik bagi perusahaan.'
              : 'Educational background, disciplined work ethic, and core strengths to deliver high-impact contributions to organizations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Full Biography Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {lang === 'id' ? 'Biografi Ringkas' : 'Personal Biography'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {profile.domisili}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {profile.namaLengkap} - {profile.posisiGelar[lang]}
              </h3>

              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify space-y-3">
                <p>
                  {profile.deskripsiDiri[lang]}
                </p>
              </div>
            </div>

            {/* Minat & Tujuan Karier (Career Interests & Goals) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Target className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Minat Karier' : 'Career Interests'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {personalProfileData.minatKarier[lang]}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Compass className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Tujuan Karier' : 'Career Objective'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {personalProfileData.tujuanKarier[lang]}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Kelebihan & Kemampuan Diri (Strengths) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'id' ? 'Kelebihan & Karakter Kerja' : 'Core Strengths & Work Ethic'}
              </h3>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                4 {lang === 'id' ? 'Pilar Utama' : 'Key Pillars'}
              </span>
            </div>

            <div className="space-y-3.5">
              {personalProfileData.kelebihanDiri.map((k, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex-shrink-0 group-hover:scale-105 transition-transform">
                    {getStrengthIcon(k.ikon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {k.judul[lang]}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                      {k.deskripsi[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Callout Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-bold text-blue-700 dark:text-blue-300">
                {lang === 'id' ? 'Siap Bergabung Segera:' : 'Immediate Availability:'}
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                {lang === 'id'
                  ? 'Nico tidak terikat masa tunggu notice period panjang dan siap menjalani proses seleksi serta wawancara kerja kapan pun dibutuhkan.'
                  : 'Nico is not bound by long notice periods and is ready for recruitment screenings and interview sessions immediately.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
