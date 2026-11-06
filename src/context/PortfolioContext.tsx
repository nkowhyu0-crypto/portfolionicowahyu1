/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  fetchProfileData, 
  fetchEducationsData, 
  fetchSkillsData, 
  fetchExperiencesData, 
  fetchProjectsData, 
  fetchCertificatesData,
  isSupabaseConfigured,
  ProfileRow,
  EducationRow,
  SkillRow,
  ExperienceRow,
  ProjectRow,
  CertificateRow
} from '../lib/supabase';
import {
  personalProfileData as seedProfile,
  educationsData as seedEducations,
  skillsData as seedSkills,
  experiencesData as seedExperiences,
  projectsData as seedProjects,
  certificatesData as seedCertificates,
  PersonalProfile,
  EducationItem,
  SkillItem,
  ExperienceItem,
  ProjectItem,
  CertificateItem
} from '../data/portfolioData';

type Language = 'id' | 'en';

interface PortfolioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  toggleDarkMode: () => void;
  isCvModalOpen: boolean;
  openCvModal: () => void;
  closeCvModal: () => void;
  isSetupModalOpen: boolean;
  openSetupModal: () => void;
  closeSetupModal: () => void;
  
  // Dynamic Supabase Data & States
  profile: PersonalProfile;
  educations: EducationItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  loading: boolean;
  error: string | null;
  isLiveSupabase: boolean;
  reloadData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('id');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState<boolean>(false);

  // Data states
  const [profile, setProfile] = useState<PersonalProfile>(seedProfile);
  const [educations, setEducations] = useState<EducationItem[]>(seedEducations);
  const [skills, setSkills] = useState<SkillItem[]>(seedSkills);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(seedExperiences);
  const [projects, setProjects] = useState<ProjectItem[]>(seedProjects);
  const [certificates, setCertificates] = useState<CertificateItem[]>(seedCertificates);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLiveSupabase, setIsLiveSupabase] = useState<boolean>(false);

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  const openCvModal = () => setIsCvModalOpen(true);
  const closeCvModal = () => setIsCvModalOpen(false);

  const openSetupModal = () => setIsSetupModalOpen(true);
  const closeSetupModal = () => setIsSetupModalOpen(false);

  // Fetch data dynamically from Supabase
  const loadSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsLiveSupabase(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [
        pData,
        eData,
        sData,
        expData,
        prjData,
        cData,
      ] = await Promise.all([
        fetchProfileData(),
        fetchEducationsData(),
        fetchSkillsData(),
        fetchExperiencesData(),
        fetchProjectsData(),
        fetchCertificatesData(),
      ]);

      let hasSupabaseData = false;

      // 1. Profile Mapping
      if (pData) {
        hasSupabaseData = true;
        setProfile({
          namaLengkap: pData.full_name || seedProfile.namaLengkap,
          namaPanggilan: pData.full_name?.split(' ')[0] || seedProfile.namaPanggilan,
          posisiGelar: {
            id: pData.degree_id || seedProfile.posisiGelar.id,
            en: pData.degree_en || seedProfile.posisiGelar.en,
          },
          tagline: {
            id: pData.headline_id || seedProfile.tagline.id,
            en: pData.headline_en || seedProfile.tagline.en,
          },
          fotoProfil: pData.avatar_path || seedProfile.fotoProfil,
          fotoFallback: seedProfile.fotoFallback,
          domisili: pData.location || seedProfile.domisili,
          email: pData.email || seedProfile.email,
          whatsapp: pData.whatsapp || seedProfile.whatsapp,
          linkedin: pData.linkedin || seedProfile.linkedin,
          instagram: pData.instagram || seedProfile.instagram,
          instagramHandle: pData.instagram ? `@${pData.instagram.split('/').filter(Boolean).pop()}` : seedProfile.instagramHandle,
          deskripsiDiri: {
            id: pData.about_description_id || seedProfile.deskripsiDiri.id,
            en: pData.about_description_en || seedProfile.deskripsiDiri.en,
          },
          minatKarier: seedProfile.minatKarier,
          tujuanKarier: seedProfile.tujuanKarier,
          kelebihanDiri: seedProfile.kelebihanDiri,
          statistikKunci: seedProfile.statistikKunci,
        });
      }

      // 2. Educations Mapping
      if (eData && eData.length > 0) {
        hasSupabaseData = true;
        setEducations(
          eData.map((e) => ({
            id: e.id,
            institusi: e.institution_name,
            jenjang: { id: e.degree_level, en: e.degree_level },
            jurusan: { id: e.major_id, en: e.major_en },
            periode: `${e.start_year} - ${e.end_year}`,
            nilaiIPK: e.gpa_score || undefined,
            lokasi: 'Kota Langsa, Aceh',
            keterangan: {
              id: e.description_id || '',
              en: e.description_en || e.description_id || '',
            },
            pencapaian: seedEducations[0]?.pencapaian || [],
          }))
        );
      }

      // 3. Skills Mapping
      if (sData && sData.length > 0) {
        hasSupabaseData = true;
        setSkills(
          sData.map((s) => ({
            id: s.id,
            nama: s.name,
            kategori: s.category,
            level: s.proficiency_level,
            tingkat: {
              id: s.proficiency_level >= 90 ? 'Mahir (Advanced)' : 'Menengah (Intermediate)',
              en: s.proficiency_level >= 90 ? 'Advanced' : 'Intermediate',
            },
            deskripsi: {
              id: s.description_id,
              en: s.description_en,
            },
            ikon: s.icon_name,
          }))
        );
      }

      // 4. Experiences Mapping
      if (expData && expData.length > 0) {
        hasSupabaseData = true;
        setExperiences(
          expData.map((exp) => ({
            id: exp.id,
            tipe: 'magang',
            tipeLabel: { id: exp.position_id, en: exp.position_en },
            peran: { id: exp.position_id, en: exp.position_en },
            institusi: exp.institution_name,
            lokasi: exp.location,
            periode: { id: `${exp.start_period} - ${exp.end_period}`, en: `${exp.start_period} - ${exp.end_period}` },
            deskripsi: { id: exp.description_id, en: exp.description_en },
            poinTugas: (exp.key_tasks_id || []).map((text, idx) => ({
              id: `task-${idx}`,
              text: {
                id: text,
                en: exp.key_tasks_en?.[idx] || text,
              },
            })),
            tagKeahlian: exp.skills_tags || ['Magang', 'Pendidikan'],
          }))
        );
      }

      // 5. Projects Mapping
      if (prjData && prjData.length > 0) {
        hasSupabaseData = true;
        setProjects(
          prjData.map((prj) => ({
            id: prj.id,
            judul: { id: prj.title_id, en: prj.title_en },
            kategori: { id: prj.category_id, en: prj.category_en },
            ringkasan: { id: prj.description_id, en: prj.description_en },
            deskripsiLengkap: { id: prj.description_id, en: prj.description_en },
            fiturDanHasil: [
              { id: prj.description_id, en: prj.description_en },
            ],
            tools: prj.tools || ['Microsoft Office'],
            gambar: prj.image_path,
            statusProyek: { id: 'Tersimpan di Supabase', en: 'Managed in Supabase' },
            tautanDemo: prj.link_url || undefined,
          }))
        );
      }

      // 6. Certificates Mapping
      if (cData && cData.length > 0) {
        hasSupabaseData = true;
        setCertificates(
          cData.map((c) => ({
            id: c.id,
            namaSertifikat: { id: c.name_id, en: c.name_en },
            lembagaPenerbit: c.issuer_name,
            tahun: c.year,
            masaBerlaku: { id: 'Terverifikasi', en: 'Verified' },
            nomorKredensial: c.credential_number || `CERT-${c.year}`,
            deskripsi: {
              id: c.description_id || c.name_id,
              en: c.description_en || c.name_en,
            },
            gambar: c.image_path,
          }))
        );
      }

      setIsLiveSupabase(hasSupabaseData);
    } catch (err: any) {
      console.error('[Supabase Load Error]:', err);
      setError(err?.message || 'Gagal memuat data dari Supabase. Menggunakan data cadangan awal.');
      setIsLiveSupabase(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSupabaseData();
  }, [loadSupabaseData]);

  return (
    <PortfolioContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        isDark,
        setIsDark,
        toggleDarkMode,
        isCvModalOpen,
        openCvModal,
        closeCvModal,
        isSetupModalOpen,
        openSetupModal,
        closeSetupModal,
        profile,
        educations,
        skills,
        experiences,
        projects,
        certificates,
        loading,
        error,
        isLiveSupabase,
        reloadData: loadSupabaseData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
