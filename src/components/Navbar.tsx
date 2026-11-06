import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X, 
  FileText, 
  Mail, 
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { personalProfileData } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const { lang, toggleLang, isDark, toggleDarkMode, openCvModal, profile, isLiveSupabase, openSetupModal } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'certificates', 'contact'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: { id: 'Home', en: 'Home' }, id: 'home' },
    { href: '#about', label: { id: 'About Me', en: 'About Me' }, id: 'about' },
    { href: '#skills', label: { id: 'Skills', en: 'Skills' }, id: 'skills' },
    { href: '#experience', label: { id: 'Experience', en: 'Experience' }, id: 'experience' },
    { href: '#projects', label: { id: 'Projects', en: 'Projects' }, id: 'projects' },
    { href: '#education', label: { id: 'Education', en: 'Education' }, id: 'education' },
    { href: '#certificates', label: { id: 'Certificates', en: 'Certificates' }, id: 'certificates' },
    { href: '#contact', label: { id: 'Contact', en: 'Contact' }, id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-emerald-500 text-white font-extrabold text-base flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              NW
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {profile.namaLengkap}
              </span>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium -mt-0.5 hidden sm:block">
                {profile.posisiGelar[lang] || 'S1 Bahasa Inggris'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label[lang]}
                </button>
              );
            })}
          </nav>

          {/* Utility Controls (Theme, Language, Supabase DB, CTA) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Supabase Status Trigger */}
            <button
              onClick={openSetupModal}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isLiveSupabase
                  ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-500'
              }`}
              title="Status Supabase & Skrip SQL"
            >
              <span className={`w-2 h-2 rounded-full ${isLiveSupabase ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="hidden xl:inline">DB</span>
            </button>

            {/* Bilingual Switcher (ID / EN) */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title={lang === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase">{lang}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Download CV Button (Desktop) */}
            <button
              onClick={openCvModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Download CV' : 'Download CV'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-950/98 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label[lang]}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCvModal();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'id' ? 'Download CV Lengkap (PDF)' : 'Download Full CV (PDF)'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('#contact');
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 hover:border-emerald-500/50"
            >
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'id' ? 'Hubungi Saya' : 'Contact Me'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
