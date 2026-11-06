/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { SupabaseSetupModal } from './components/SupabaseSetupModal';
import { FileText, Phone, Database } from 'lucide-react';

function PortfolioApp() {
  const { lang, openCvModal, profile, isSetupModalOpen, openSetupModal, closeSetupModal } = usePortfolio();
  const cleanWaNumber = (profile.whatsapp || '+6281234567890').replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      
      {/* Sticky Top Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. HOME */}
        <HeroSection />

        {/* 2. ABOUT ME */}
        <AboutSection />

        {/* 3. SKILLS */}
        <SkillsSection />

        {/* 4. EXPERIENCE */}
        <ExperienceSection />

        {/* 5. PROJECT / PORTFOLIO */}
        <ProjectsSection />

        {/* 6. EDUCATION */}
        <EducationSection />

        {/* 7. CERTIFICATES */}
        <CertificatesSection />

        {/* 8. CONTACT */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <Footer />

      {/* Interactive Printable CV / Download Resume Modal */}
      <CvModal />

      {/* Supabase Schema & Setup Inspector Modal */}
      <SupabaseSetupModal isOpen={isSetupModalOpen} onClose={closeSetupModal} />

      {/* Floating Action Buttons for Recruiter Convenience */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5 no-print">
        {/* Supabase Inspector quick button */}
        <button
          onClick={openSetupModal}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 text-emerald-400 font-semibold text-xs shadow-lg border border-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
          title="Lihat Skema Supabase Database"
        >
          <Database className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Supabase DB</span>
        </button>

        {/* WhatsApp direct chat */}
        <a
          href={`https://wa.me/${cleanWaNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 hover:scale-105 active:scale-95 transition-all"
          title="WhatsApp Nico Wahyu"
        >
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* CV quick print/download */}
        <button
          onClick={openCvModal}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all border border-emerald-400/30 cursor-pointer"
          title={lang === 'id' ? 'Download CV Nico Wahyu' : 'Download CV'}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'id' ? 'Download CV' : 'Download CV'}</span>
        </button>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
