import React from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Instagram, 
  MapPin, 
  Linkedin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const CvModal: React.FC = () => {
  const { isCvModalOpen, closeCvModal, lang, profile, educations, experiences, skills, certificates } = usePortfolio();

  if (!isCvModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto text-left shadow-2xl relative flex flex-col">
        
        {/* Top Action Bar (No Print) */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {lang === 'id' ? `Curriculum Vitae (CV) - ${profile.namaLengkap}` : `Curriculum Vitae (CV) - ${profile.namaLengkap}`}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              title={lang === 'id' ? 'Cetak atau Simpan sebagai PDF' : 'Print or Save as PDF'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Cetak / Unduh PDF' : 'Print / Download PDF'}</span>
            </button>
            <button
              onClick={closeCvModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Container */}
        <div className="p-6 sm:p-10 space-y-7 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 print:p-0 print:text-black">
          
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {profile.namaLengkap}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {profile.posisiGelar[lang] || 'S1 Bahasa Inggris'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.domisili}
                </p>
              </div>

              <div className="text-xs space-y-1 sm:text-right">
                <p className="flex sm:justify-end items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.email}</span>
                </p>
                {profile.whatsapp && (
                  <p className="flex sm:justify-end items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{profile.whatsapp}</span>
                  </p>
                )}
                {profile.instagram && (
                  <p className="flex sm:justify-end items-center gap-1.5 font-medium">
                    <Instagram className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{profile.instagramHandle}</span>
                  </p>
                )}
                <p className="flex sm:justify-end items-center gap-1.5 font-medium">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>linkedin.com/in/nico-wahyu-643a85263</span>
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {profile.deskripsiDiri[lang]}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'id' ? 'Latar Belakang Pendidikan' : 'Education Background'}</span>
            </h2>

            {educations.map((edu) => (
              <div key={edu.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>{edu.institusi}</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{edu.periode}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {edu.jenjang[lang]} - {edu.jurusan[lang]} {edu.nilaiIPK ? `(${edu.nilaiIPK})` : ''}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  {edu.keterangan[lang]}
                </p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{lang === 'id' ? 'Pengalaman Kerja & Magang' : 'Work & Internship Experience'}</span>
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-slate-900 dark:text-white text-sm">
                    <span>{exp.peran[lang]}</span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{exp.periode[lang]}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {exp.institusi} • {exp.lokasi} <span className="text-slate-400 font-normal">({exp.tipeLabel[lang]})</span>
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                    {exp.poinTugas.map((pt) => (
                      <li key={pt.id}>{pt.text[lang]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'id' ? 'Keahlian Pokok & Software' : 'Core Skills & Software Proficiency'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              {skills.map((skill) => (
                <div key={skill.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{skill.nama}</span>
                    <span className="text-emerald-600 font-mono text-[11px]">{skill.level}%</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {skill.deskripsi[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-800 pb-1 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{lang === 'id' ? 'Sertifikat & Lisensi' : 'Certificates & Credentials'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <p className="font-semibold text-slate-900 dark:text-white">{cert.namaSertifikat[lang]}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{cert.lembagaPenerbit} ({cert.tahun})</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions (No Print) */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 sticky bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md no-print">
          <button
            onClick={closeCvModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'id' ? 'Cetak / Unduh PDF' : 'Print / Download PDF'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
