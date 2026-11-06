import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Download,
  Database,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getStorageUrl } from '../lib/supabase';

export const HeroSection: React.FC = () => {
  const { lang, openCvModal, profile, isLiveSupabase, openSetupModal } = usePortfolio();
  const [imgSrc, setImgSrc] = useState(profile.fotoProfil);

  useEffect(() => {
    if (profile.fotoProfil) {
      setImgSrc(getStorageUrl(profile.fotoProfil, profile.fotoFallback));
    }
  }, [profile.fotoProfil, profile.fotoFallback]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Subtle Background Glows (Blue and Emerald Green) */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/15 dark:bg-emerald-500/20 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[400px] bg-blue-600/15 dark:bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {lang === 'id' ? 'Siap Bekerja & Berkontribusi' : 'Open to Job Opportunities'}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs font-semibold text-blue-700 dark:text-blue-300">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{profile.posisiGelar[lang] || 'S1 Bahasa Inggris'}</span>
          </div>

          {/* Supabase Dynamic Indicator Badge */}
          <button
            onClick={openSetupModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
            title="Klik untuk melihat status Supabase Database & SQL Blueprint"
          >
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {isLiveSupabase 
                ? (lang === 'id' ? 'Supabase: Live Connected' : 'Supabase: Live Connected') 
                : (lang === 'id' ? 'Supabase: Ready / Fallback' : 'Supabase: Ready / Fallback')}
            </span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300">
            <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>{profile.domisili}</span>
          </div>
        </div>

        {/* Main Grid: Photo and Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Role, Headline, Intro, Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase mb-2">
                {lang === 'id' ? 'Selamat Datang • Portfolio Pelamar Kerja' : 'Welcome • Job Candidate Portfolio'}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {profile.namaLengkap}
              </h1>
              <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 dark:from-blue-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent mt-2">
                {profile.posisiGelar[lang] || 'S1 Bahasa Inggris'}
              </p>
            </div>

            {/* Mandatory Headline */}
            <div className="p-3.5 px-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                "{profile.tagline[lang] || 'Professional, Creative, and Always Ready to Learn.'}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {lang === 'id'
                ? 'Lulusan S1 Bahasa Inggris berdedikasi tinggi dengan keahlian komunikasi bilingual, manajemen administrasi dokumen terstruktur, dan pengalaman magang di SMA Negeri 4 Langsa.'
                : 'Dedicated English Education graduate skilled in bilingual communication, systematic document filing, and practical internship experience at SMA Negeri 4 Langsa.'}
            </p>

            {/* Profile Highlight Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-sm space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-3">
                {profile.deskripsiDiri[lang]}
              </p>
              
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {lang === 'id' ? 'Komunikasi Bahasa Inggris Aktif' : 'Active English Communication'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {lang === 'id' ? 'Keahlian Microsoft Word & Excel' : 'MS Word & Excel Proficiency'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {lang === 'id' ? 'Pengalaman Magang SMAN 4 Langsa' : 'SMAN 4 Langsa Internship'}
                </span>
              </div>
            </div>

            {/* Required Action Buttons: Download CV & Contact Me */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={openCvModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'id' ? 'Download CV' : 'Download CV'}</span>
              </button>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500/60 font-bold text-xs sm:text-sm transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === 'id' ? 'Contact Me' : 'Contact Me'}</span>
              </button>

              <button
                onClick={scrollToAbout}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold transition-colors"
              >
                <span>{lang === 'id' ? 'Pelajari Profil Lengkap' : 'Explore Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Profile Picture Card (via Supabase Storage) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 opacity-25 blur-lg dark:opacity-35" />
              
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl p-3">
                
                {/* Photo Frame */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={imgSrc}
                    alt={profile.namaLengkap}
                    onError={() => setImgSrc(profile.fotoFallback)}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                      {lang === 'id' ? 'Kandidat Profesional' : 'Professional Candidate'}
                    </span>
                    <h3 className="text-lg font-bold mt-1 text-white drop-shadow">
                      {profile.namaLengkap}
                    </h3>
                    <p className="text-xs text-slate-200 drop-shadow flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {profile.domisili}
                    </p>
                  </div>
                </div>

                {/* Quick Info Bar below photo */}
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                      {lang === 'id' ? 'Status Pelamar:' : 'Applicant Status:'}
                    </p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {lang === 'id' ? 'Siap Interview & Bergabung' : 'Available for Interviews'}
                    </p>
                  </div>
                  <button
                    onClick={openCvModal}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-100 transition-colors"
                  >
                    CV
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {profile.statistikKunci.map((st, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {st.angka}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {st.satuan}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                  {st.label[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
