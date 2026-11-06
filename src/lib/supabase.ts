/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * =========================================================================
 * KONFIGURASI SUPABASE CLIENT & DATA ACCESS LAYER
 * =========================================================================
 * Mengelola koneksi ke Supabase Database dan Supabase Storage bucket 'portfolionicowahyu1'.
 * Menggunakan environment variables VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid and provided
export const isSupabaseConfigured = (): boolean => {
  if (!rawSupabaseUrl || !rawSupabaseAnonKey) return false;
  if (
    rawSupabaseUrl.includes('placeholder') ||
    rawSupabaseUrl.includes('your-project') ||
    rawSupabaseAnonKey.includes('placeholder') ||
    rawSupabaseAnonKey.includes('your-anon-key')
  ) {
    return false;
  }
  return true;
};

// Safe client instantiation (does not throw fatal errors if unconfigured)
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase = createClient(
  rawSupabaseUrl || fallbackUrl,
  rawSupabaseAnonKey || fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Storage Bucket Name as required by prompt
export const PORTFOLIO_STORAGE_BUCKET = 'portfolionicowahyu1';

/**
 * Mendapatkan Public URL dari Supabase Storage atau URL gambar eksternal.
 * @param path Path relatif file di bucket 'portfolionicowahyu1' atau URL absolut (http/https)
 * @param fallbackUrl URL default cadangan jika path kosong
 */
export const getStorageUrl = (path?: string | null, fallbackUrl: string = ''): string => {
  if (!path || path.trim() === '') {
    return fallbackUrl;
  }

  // Jika sudah merupakan URL lengkap (http/https), gunakan langsung
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Jika Supabase terkonfigurasi, ambil dari Supabase Storage bucket 'portfolionicowahyu1'
  if (isSupabaseConfigured()) {
    try {
      const { data } = supabase.storage
        .from(PORTFOLIO_STORAGE_BUCKET)
        .getPublicUrl(path);
      return data?.publicUrl || fallbackUrl;
    } catch {
      return fallbackUrl;
    }
  }

  return fallbackUrl;
};

/* =========================================================================
 * DATABASE TYPINGS & INTERFACES (SUPABASE TABLES)
 * ========================================================================= */

export interface ProfileRow {
  id: string;
  full_name: string;
  degree_id: string;
  degree_en: string;
  headline_id: string;
  headline_en: string;
  short_bio_id: string;
  short_bio_en: string;
  about_description_id: string;
  about_description_en: string;
  avatar_path: string;
  cv_path: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  instagram: string;
  location: string;
  created_at?: string;
  updated_at?: string;
}

export interface EducationRow {
  id: string;
  degree_level: string; // "S1"
  major_id: string;      // "Bahasa Inggris" / "Pendidikan Bahasa Inggris"
  major_en: string;      // "English Language Education"
  institution_name: string; // Nama Universitas
  start_year: number;
  end_year: number;
  gpa_score?: string;
  description_id?: string;
  description_en?: string;
  sort_order?: number;
  created_at?: string;
}

export interface SkillRow {
  id: string;
  name: string;
  category: 'hard' | 'soft' | 'technical';
  proficiency_level: number; // 0 - 100
  description_id: string;
  description_en: string;
  icon_name: string;
  sort_order?: number;
  created_at?: string;
}

export interface ExperienceRow {
  id: string;
  institution_name: string; // "SMA Negeri 4 Langsa"
  position_id: string;      // "Internship"
  position_en: string;      // "Internship"
  field_id: string;         // "Education"
  field_en: string;         // "Education"
  location: string;         // "Kota Langsa, Aceh"
  start_period: string;     // "Periode Magang"
  end_period: string;       // "Selesai"
  description_id: string;   // Deskripsi magang
  description_en: string;
  key_tasks_id?: string[];
  key_tasks_en?: string[];
  skills_tags?: string[];
  sort_order?: number;
  created_at?: string;
}

export interface ProjectRow {
  id: string;
  title_id: string;
  title_en: string;
  category_id: string; // "Karya tulis", "Buku yang pernah dibuat", "Dokumen atau hasil pekerjaan", "Proyek pribadi", "Hasil kegiatan akademik"
  category_en: string;
  description_id: string;
  description_en: string;
  image_path: string;
  link_url?: string;
  tools?: string[];
  sort_order?: number;
  created_at?: string;
}

export interface CertificateRow {
  id: string;
  name_id: string;
  name_en: string;
  issuer_name: string;
  year: number;
  image_path: string;
  credential_number?: string;
  description_id?: string;
  description_en?: string;
  sort_order?: number;
  created_at?: string;
}

export interface ContactMessageRow {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

/* =========================================================================
 * DATA ACCESS METHODS (FETCH & INSERT)
 * ========================================================================= */

export const fetchProfileData = async (): Promise<ProfileRow | null> => {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.warn('[Supabase] Fetch profile error/empty:', error.message);
    return null;
  }
  return data;
};

export const fetchEducationsData = async (): Promise<EducationRow[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('educations')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('start_year', { ascending: false });

  if (error) {
    console.warn('[Supabase] Fetch educations error:', error.message);
    return [];
  }
  return data || [];
};

export const fetchSkillsData = async (): Promise<SkillRow[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.warn('[Supabase] Fetch skills error:', error.message);
    return [];
  }
  return data || [];
};

export const fetchExperiencesData = async (): Promise<ExperienceRow[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.warn('[Supabase] Fetch experiences error:', error.message);
    return [];
  }
  return data || [];
};

export const fetchProjectsData = async (): Promise<ProjectRow[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.warn('[Supabase] Fetch projects error:', error.message);
    return [];
  }
  return data || [];
};

export const fetchCertificatesData = async (): Promise<CertificateRow[]> => {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('year', { ascending: false });

  if (error) {
    console.warn('[Supabase] Fetch certificates error:', error.message);
    return [];
  }
  return data || [];
};

/**
 * Mengirim pesan kontak ke tabel 'contact_messages' di Supabase.
 */
export const insertContactMessage = async (
  message: { name: string; email: string; subject: string; message: string }
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    // Simulasi sukses lokal jika Supabase belum terhubung
    return { success: true };
  }

  const { error } = await supabase.from('contact_messages').insert([
    {
      name: message.name.trim(),
      email: message.email.trim(),
      subject: message.subject.trim(),
      message: message.message.trim(),
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
};

/* =========================================================================
 * BLUEPRINT DOKUMENTASI SQL (CREATE TABLE, RLS, STORAGE)
 * ========================================================================= */

export const SQL_BLUEPRINT = {
  createTables: `-- ============================================================
-- 1. TABEL: PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    degree_id TEXT NOT NULL,
    degree_en TEXT NOT NULL,
    headline_id TEXT NOT NULL,
    headline_en TEXT NOT NULL,
    short_bio_id TEXT NOT NULL,
    short_bio_en TEXT NOT NULL,
    about_description_id TEXT NOT NULL,
    about_description_en TEXT NOT NULL,
    avatar_path TEXT,
    cv_path TEXT,
    email TEXT NOT NULL,
    whatsapp TEXT,
    linkedin TEXT,
    instagram TEXT,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. TABEL: EDUCATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.educations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    degree_level TEXT NOT NULL,
    major_id TEXT NOT NULL,
    major_en TEXT NOT NULL,
    institution_name TEXT NOT NULL,
    start_year INT NOT NULL,
    end_year INT NOT NULL,
    gpa_score TEXT,
    description_id TEXT,
    description_en TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. TABEL: SKILLS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('hard', 'soft', 'technical')),
    proficiency_level INT NOT NULL CHECK (proficiency_level BETWEEN 0 AND 100),
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 4. TABEL: EXPERIENCES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_name TEXT NOT NULL,
    position_id TEXT NOT NULL,
    position_en TEXT NOT NULL,
    field_id TEXT NOT NULL,
    field_en TEXT NOT NULL,
    location TEXT NOT NULL,
    start_period TEXT NOT NULL,
    end_period TEXT NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    key_tasks_id TEXT[] DEFAULT '{}',
    key_tasks_en TEXT[] DEFAULT '{}',
    skills_tags TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 5. TABEL: PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    category_id TEXT NOT NULL,
    category_en TEXT NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    image_path TEXT NOT NULL,
    link_url TEXT,
    tools TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. TABEL: CERTIFICATES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_id TEXT NOT NULL,
    name_en TEXT NOT NULL,
    issuer_name TEXT NOT NULL,
    year INT NOT NULL,
    image_path TEXT NOT NULL,
    credential_number TEXT,
    description_id TEXT,
    description_en TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. TABEL: CONTACT_MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);`,

  enableRls: `-- ============================================================
-- AKTIFKAN ROW LEVEL SECURITY (RLS) DI SEMUA TABEL
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Pengunjung dapat membaca data portfolio publik (read-only)
CREATE POLICY "Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Educations" ON public.educations FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);

-- 2. Pengunjung HANYA dapat mengirim pesan di contact_messages (insert-only)
CREATE POLICY "Public Insert Contact Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- 3. Pengunjung TIDAK dapat membaca pesan milik perekrut lainnya (privasi terjamin)
CREATE POLICY "Deny Public Read Contact Messages" ON public.contact_messages FOR SELECT USING (false);`,

  storageBucket: `-- ============================================================
-- SETUP STORAGE BUCKET: portfolionicowahyu1
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolionicowahyu1', 'portfolionicowahyu1', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy agar semua orang dapat membaca/melihat file portfolio (Foto, CV PDF, Proyek)
CREATE POLICY "Public Read Portfolio Storage" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolionicowahyu1');`,

  seedInitialData: `-- ============================================================
-- INSERT SEED DATA AWAL: NICO WAHYU (S1 BAHASA INGGRIS)
-- ============================================================

-- 1. PROFILE
INSERT INTO public.profiles (
    full_name, degree_id, degree_en, headline_id, headline_en,
    short_bio_id, short_bio_en,
    about_description_id, about_description_en,
    avatar_path, cv_path,
    email, whatsapp, linkedin, instagram, location
) VALUES (
    'Nico Wahyu',
    'S1 Bahasa Inggris',
    'Bachelor of English Education',
    'Professional, Creative, and Always Ready to Learn.',
    'Professional, Creative, and Always Ready to Learn.',
    'Lulusan S1 Bahasa Inggris berdedikasi tinggi dengan keahlian komunikasi bilingual, manajemen dokumen rapi, pengolahan data Word & Excel, dan pengalaman magang di SMA Negeri 4 Langsa.',
    'Dedicated English Education graduate skilled in bilingual communication, systematic document filing, Word & Excel data management, and practical internship experience at SMA Negeri 4 Langsa.',
    'Saya merupakan lulusan S1 Bahasa Inggris yang memiliki kemampuan komunikasi, administrasi, dan interpersonal yang baik. Saya pernah melaksanakan kegiatan magang di SMA Negeri 4 Langsa yang memberikan pengalaman dalam lingkungan kerja pendidikan. Saya memiliki semangat belajar tinggi, disiplin, bertanggung jawab, serta mampu bekerja secara individu maupun dalam tim.',
    'I am an English Education bachelor graduate with strong communication, administrative, and interpersonal abilities. I completed an internship at SMA Negeri 4 Langsa which provided valuable insight into educational work environments. Disciplined, responsible, with high eagerness to learn, I am capable of thriving both independently and as part of a team.',
    'https://i.pinimg.com/1200x/b3/a3/86/b3a38682de7096b9a639aaa40b14f472.jpg',
    'cv-nico-wahyu.pdf',
    'nkowhyu0@gmail.com',
    '+6281234567890',
    'https://www.linkedin.com/in/nico-wahyu-643a85263',
    'https://instagram.com/nicowshb._',
    'Kota Langsa, Aceh, Indonesia'
);

-- 2. EDUCATIONS
INSERT INTO public.educations (degree_level, major_id, major_en, institution_name, start_year, end_year, gpa_score, description_id, description_en, sort_order)
VALUES (
    'S1',
    'Bahasa Inggris (Pendidikan Bahasa Inggris)',
    'English Language Education',
    'Perguruan Tinggi di Kota Langsa',
    2019,
    2023,
    'Sangat Memuaskan',
    'Fokus studi pada linguistik, tata bahasa terapan, pengajaran kurikulum, korespondensi bilingual resmi, serta penulisan karya ilmiah akademis.',
    'Focused coursework in linguistics, applied syntax, instructional curriculum, formal bilingual correspondence, and academic research writing.',
    1
);

-- 3. SKILLS
INSERT INTO public.skills (name, category, proficiency_level, description_id, description_en, icon_name, sort_order) VALUES
('Microsoft Word', 'hard', 95, 'Membuat, menyusun, dan mengedit dokumen serta buku dengan format baku, penomoran rapi, dan otomasi daftar isi.', 'Creating, formatting, and editing official documents and books with disciplined typography and automated tables of content.', 'FileText', 1),
('Microsoft Excel', 'hard', 88, 'Mengolah data, membuat tabel terstruktur, dan menyusun laporan administratif menggunakan formula kalkulasi logika.', 'Processing data, designing structured spreadsheets, and compiling administrative reports with core calculation formulas.', 'Sheet', 2),
('Book Writing & Development', 'technical', 90, 'Menulis dan mengembangkan buku atau karya tulis dari penyusunan kerangka naskah hingga penyuntingan bahasa (proofreading).', 'Drafting and developing books or written works from conceptual outlining, content structuring, to rigorous proofreading.', 'BookOpen', 3),
('English Communication', 'hard', 92, 'Komunikasi bahasa Inggris lisan dan tulisan aktif untuk interaksi formal, presentasi, dan korespondensi profesional.', 'Active verbal and written English communication for formal interactions, client correspondence, and presentations.', 'Languages', 4),
('Document Management', 'technical', 92, 'Mengelola dokumen secara rapi dan sistematis, baik penataan berkas fisik maupun direktori penyimpanan digital berbasis cloud.', 'Managing and indexing documents systematically across physical files and cloud storage directories.', 'FolderKanban', 5),
('Teamwork', 'soft', 94, 'Kemampuan bekerja sama dalam tim, mendengarkan aktif, empati kerja, dan koordinasi lintas divisi secara profesional.', 'Strong collaborative teamwork, active listening, professional etiquette, and cross-division coordination.', 'Users', 6);

-- 4. EXPERIENCES
INSERT INTO public.experiences (
    institution_name, position_id, position_en, field_id, field_en, location,
    start_period, end_period, description_id, description_en,
    key_tasks_id, key_tasks_en, skills_tags, sort_order
) VALUES (
    'SMA Negeri 4 Langsa',
    'Internship (Magang Guru & Administrasi)',
    'Internship (Teaching & Administration)',
    'Education (Pendidikan)',
    'Education',
    'Kota Langsa, Aceh',
    'Periode Magang',
    'Selesai',
    'Memperoleh pengalaman dan wawasan mengenai lingkungan kerja di bidang pendidikan, komunikasi profesional, serta kegiatan operasional sekolah.',
    'Gained hands-on experience and deep insight into the educational workplace environment, professional communication, and day-to-day school operational workflows.',
    ARRAY[
        'Membantu penyusunan dan pengarsipan administrasi dokumen pembelajaran dan rekapitulasi evaluasi siswa.',
        'Mengembangkan materi ajar serta modul bahasa Inggris interaktif yang disesuaikan dengan kurikulum aktif.',
        'Berkoordinasi secara aktif dengan dewan guru, staf tata usaha (TU), dan siswa dalam pelaksanaan kegiatan akademik.'
    ],
    ARRAY[
        'Assisted in preparing and archiving instructional documents and student evaluation records.',
        'Developed instructional materials and interactive English modules tailored to the active curriculum.',
        'Coordinated actively with teaching faculty, administrative office staff, and students during school operations.'
    ],
    ARRAY['Pendidikan', 'Administrasi Sekolah', 'MS Word & Excel', 'Komunikasi'],
    1
);

-- 5. PROJECTS
INSERT INTO public.projects (title_id, title_en, category_id, category_en, description_id, description_en, image_path, link_url, tools, sort_order) VALUES
('Pengembangan Modul Ajar Bahasa Inggris Interaktif SMA', 'Interactive High School English Learning Module Development', 'Pendidikan & Modul', 'Education & Modules', 'Penyusunan modul materi ajar bahasa Inggris komprehensif untuk siswa SMA memadukan tata bahasa, kosakata tematik, dan lembar kerja latihan.', 'Comprehensive English learning module crafted for high school students integrating practical grammar, thematic vocabulary, and exercise worksheets.', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80', '#', ARRAY['Microsoft Word', 'Pedagogy', 'Curriculum Mapping'], 1),
('Kompilasi Naskah & Penulisan Buku (Book Writing Project)', 'Manuscript Compilation & Literary Writing Development', 'Buku yang Pernah Dibuat', 'Book Writing & Publication', 'Perencanaan konsep buku, penulisan narasi informatif, penyuntingan ejaan (PUEBI & grammar), serta tata letak halaman siap cetak.', 'Conceptual book planning, informative drafting, spelling proofreading, and print-ready typesetting.', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', '#', ARRAY['Book Development', 'Microsoft Word', 'Proofreading'], 2),
('Sistem Pengarsipan & Manajemen Dokumen Digital', 'Digital Document Management & Systematic Archiving Framework', 'Dokumen atau Hasil Pekerjaan', 'Work Documents & Archives', 'Perancangan struktur folder direktori kearsipan, kodefikasi penomoran berkas, dan master katalog pencarian dokumen berbasis spreadsheet.', 'Folder directory architecture, document classification codes, and a searchable spreadsheet indexing catalog.', 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80', '#', ARRAY['Microsoft Excel', 'Cloud Archiving', 'Document Indexing'], 3),
('Rekapitulasi Data Administratif & Template Excel Otomatis', 'Administrative Data Recapitulation & Excel Reporting Template', 'Proyek Pribadi', 'Personal Projects', 'Template spreadsheet terstruktur untuk menghitung data kehadiran dan log operasional secara otomatis menggunakan formula logika Excel.', 'Structured spreadsheet workbook calculating attendance and operational logs automatically with Excel logical formulas.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', '#', ARRAY['Microsoft Excel', 'Formulas & Functions', 'Conditional Formatting'], 4);

-- 6. CERTIFICATES
INSERT INTO public.certificates (name_id, name_en, issuer_name, year, image_path, credential_number, description_id, description_en, sort_order) VALUES
('Sertifikat Magang SMA Negeri 4 Langsa', 'SMA Negeri 4 Langsa Internship Certificate', 'SMA Negeri 4 Langsa', 2023, 'https://images.unsplash.com/photo-1589330694653-dad6bc0140af?auto=format&fit=crop&w=800&q=80', 'SMAN4-LGS/MAGANG/2023-088', 'Sertifikat resmi atas keberhasilan menyelesaikan program magang kerja di lingkungan SMA Negeri 4 Langsa.', 'Official credential recognizing successful completion of internship at SMA Negeri 4 Langsa.', 1),
('Sertifikat Kemahiran Bahasa Inggris (English Proficiency)', 'English Language Proficiency Certificate', 'Pusat Bahasa Terakreditasi', 2023, 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', 'EPT-ENG/LANGSA/2023-412', 'Bukti kompetensi pemahaman bacaan (reading), struktur tata bahasa, dan komunikasi bahasa Inggris.', 'Standardized credential demonstrating high competence in reading comprehension, grammar, and verbal English.', 2),
('Sertifikat Pelatihan Microsoft Office (Word & Excel)', 'Microsoft Office Application Competency Certificate', 'Lembaga Pelatihan Komputer Terdaftar', 2022, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', 'MSO-ADM/2022-9901', 'Kemahiran dalam pengolahan kata (MS Word), pembuatan buku, serta pengolahan tabel dan formula administratif (MS Excel).', 'Certification in document processing (MS Word), book layout, and spreadsheet formulas (MS Excel).', 3),
('Sertifikat Penulisan & Pengembangan Buku (Book Writing)', 'Writing & Instructional Material Development Certificate', 'Workshop Akademik & Penulisan Naskah', 2023, 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'WRT-MOD/ACAD/2023-117', 'Apresiasi atas perancangan karya tulis dan modul pembelajaran mandiri yang memenuhi standar penerbitan.', 'Credential acknowledging successful drafting of instructional learning modules adhering to publishing standards.', 4);`
};
