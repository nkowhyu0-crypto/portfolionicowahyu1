import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Linkedin, 
  Instagram, 
  FileText,
  Phone,
  Database
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { lang, openCvModal, profile, openSetupModal, isLiveSupabase } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWaNumber = (profile.whatsapp || '+6281234567890').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-sm shadow-emerald-500/20">
                NW
              </div>
              <h3 className="text-white font-bold text-base tracking-tight">
                {profile.namaLengkap}
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {profile.posisiGelar[lang]}
            </p>
            <p className="text-[11px] text-emerald-400 font-medium">
              📍 {profile.domisili}
            </p>

            <button
              onClick={openSetupModal}
              className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Database className="w-3 h-3" />
              <span>{isLiveSupabase ? 'Supabase: Connected' : 'Supabase: SQL Blueprint'}</span>
            </button>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {lang === 'id' ? 'Navigasi Portofolio' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#home" className="hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a></li>
              <li><a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a></li>
              <li><a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a></li>
              <li><a href="#education" className="hover:text-emerald-400 transition-colors">Education</a></li>
              <li><a href="#certificates" className="hover:text-emerald-400 transition-colors">Certificates</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Core Competencies */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              {lang === 'id' ? 'Keahlian Utama' : 'Core Skills'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Microsoft Word (Dokumen & Buku)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Microsoft Excel (Data & Laporan)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Book Writing & Development
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> English Communication
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Document Management
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Teamwork & Collaboration
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-2.5">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {lang === 'id' ? 'Kontak & Jejaring' : 'Connect & Socials'}
            </h4>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-600 hover:via-rose-600 hover:to-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                  title={`Instagram: ${profile.instagramHandle}`}
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200 hover:scale-105"
                title={`Email: ${profile.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Email: <a href={`mailto:${profile.email}`} className="text-emerald-400 hover:underline font-mono">{profile.email}</a>
            </p>

            <div className="pt-2">
              <button
                onClick={openCvModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 text-emerald-400 hover:bg-blue-900 border border-emerald-500/30 text-xs font-semibold transition-all hover:scale-102 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'id' ? 'Download CV (PDF)' : 'Download CV (PDF)'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">{profile.namaLengkap}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {profile.domisili}
            </span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Atas' : 'Top'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
