/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * =========================================================================
 * KONFIGURASI DATA PORTOFOLIO PRIBADI - NICO WAHYU
 * =========================================================================
 * Semua informasi pribadi disimpan dalam file ini agar mudah diganti oleh siapa saja.
 * Mendukung dwibahasa (Bahasa Indonesia & English) secara dinamis.
 */

export interface LocaleText {
  id: string;
  en: string;
}

export interface SkillItem {
  id: string;
  nama: string;
  kategori: 'hard' | 'soft' | 'technical';
  level: number; // 0 - 100
  tingkat: LocaleText;
  deskripsi: LocaleText;
  ikon: string;
}

export interface ExperienceItem {
  id: string;
  tipe: 'magang' | 'kerja' | 'organisasi' | 'freelance' | 'proyek';
  tipeLabel: LocaleText;
  peran: LocaleText;
  institusi: string;
  lokasi: string;
  periode: LocaleText;
  deskripsi: LocaleText;
  poinTugas: { id: string; text: LocaleText }[];
  tagKeahlian: string[];
}

export interface ProjectItem {
  id: string;
  judul: LocaleText;
  kategori: LocaleText;
  ringkasan: LocaleText;
  deskripsiLengkap: LocaleText;
  fiturDanHasil: LocaleText[];
  tools: string[];
  gambar: string;
  statusProyek: LocaleText;
  tautanDemo?: string;
  tautanDokumen?: string;
}

export interface EducationItem {
  id: string;
  institusi: string;
  jenjang: LocaleText;
  jurusan: LocaleText;
  periode: string;
  nilaiIPK?: string;
  lokasi: string;
  keterangan: LocaleText;
  pencapaian: LocaleText[];
}

export interface CertificateItem {
  id: string;
  namaSertifikat: LocaleText;
  lembagaPenerbit: string;
  tahun: number | string;
  masaBerlaku: LocaleText;
  nomorKredensial: string;
  deskripsi: LocaleText;
  gambar: string;
  verifikasiUrl?: string;
}

export interface PersonalProfile {
  namaLengkap: string;
  namaPanggilan: string;
  posisiGelar: LocaleText;
  tagline: LocaleText;
  fotoProfil: string;
  fotoFallback: string;
  domisili: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  instagram: string;
  instagramHandle: string;
  deskripsiDiri: LocaleText;
  minatKarier: LocaleText;
  tujuanKarier: LocaleText;
  kelebihanDiri: {
    judul: LocaleText;
    deskripsi: LocaleText;
    ikon: string;
  }[];
  statistikKunci: {
    angka: string | number;
    satuan: string;
    label: LocaleText;
  }[];
}

/* =========================================================================
 * 1. DATA PROFIL PRIBADI
 * ========================================================================= */
export const personalProfileData: PersonalProfile = {
  namaLengkap: "Nico Wahyu",
  namaPanggilan: "Nico",
  posisiGelar: {
    id: "S1 Bahasa Inggris",
    en: "Bachelor of English Education"
  },
  tagline: {
    id: "Professional, Creative, and Always Ready to Learn.",
    en: "Professional, Creative, and Always Ready to Learn."
  },
  fotoProfil: "https://i.pinimg.com/1200x/b3/a3/86/b3a38682de7096b9a639aaa40b14f472.jpg",
  fotoFallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  domisili: "Kota Langsa, Aceh, Indonesia",
  email: "nkowhyu0@gmail.com",
  whatsapp: "+6281234567890",
  linkedin: "https://www.linkedin.com/in/nico-wahyu-643a85263",
  instagram: "https://instagram.com/nicowshb._",
  instagramHandle: "@nicowshb._",
  deskripsiDiri: {
    id: "Saya merupakan lulusan S1 Bahasa Inggris yang memiliki kemampuan komunikasi, administrasi, dan interpersonal yang baik. Saya pernah melaksanakan kegiatan magang di SMA Negeri 4 Langsa, yang memberikan pengalaman dan pemahaman mengenai lingkungan kerja, khususnya dalam bidang pendidikan. Saya memiliki semangat belajar yang tinggi, mampu bekerja secara individu maupun dalam tim, serta memiliki kemampuan beradaptasi dengan lingkungan baru. Saya adalah pribadi yang disiplin, bertanggung jawab, teliti, dan selalu terbuka untuk mengembangkan keterampilan serta pengalaman baru. Saya siap berkontribusi dan memberikan kemampuan terbaik dalam lingkungan kerja profesional.",
    en: "I am an English Education bachelor's graduate with strong communication, administrative, and interpersonal skills. I completed an internship at SMA Negeri 4 Langsa, which provided valuable experience and deep insight into the professional work environment, particularly in education and school administration. I possess a high eagerness to learn, can work effectively both independently and in teams, and adapt swiftly to new working environments. Disciplined, responsible, meticulous, and always open to developing new skills, I am prepared to contribute and deliver my best in a professional career."
  },
  minatKarier: {
    id: "Administrasi Perkantoran, Manajemen Dokumen, Spesialis Komunikasi Bahasa Inggris, Pengembangan Modul/Buku, serta Asistensi Operasional Pendidikan & Korporat.",
    en: "Office Administration, Document Management, English Communication Specialist, Module/Book Development, and Educational & Corporate Operations Assistance."
  },
  tujuanKarier: {
    id: "Menjadi tenaga profesional yang andal dalam mengelola tata kelola administrasi, memfasilitasi komunikasi bilingual yang lancar, serta berkontribusi nyata pada efisiensi operasional organisasi.",
    en: "To become a reliable professional managing administrative workflows, facilitating fluent bilingual communication, and contributing directly to organizational operational efficiency."
  },
  kelebihanDiri: [
    {
      judul: { id: "Komunikasi Bilingual Efektif", en: "Effective Bilingual Communication" },
      deskripsi: {
        id: "Mampu menyampaikan ide, korespondensi surat, dan dialog baik dalam Bahasa Indonesia maupun Bahasa Inggris secara santun dan jelas.",
        en: "Able to convey ideas, formal correspondence, and dialogue in both Indonesian and English politely, clearly, and persuasively."
      },
      ikon: "MessageSquareQuote"
    },
    {
      judul: { id: "Disiplin & Ketelitian Tinggi", en: "High Discipline & Accuracy" },
      deskripsi: {
        id: "Sangat teliti dalam pemeriksaan data, penulisan naskah, tata letak dokumen, serta penyusunan arsip tanpa salah ketik.",
        en: "Meticulous in data validation, document proofreading, layout structuring, and error-free record keeping."
      },
      ikon: "CheckCircle2"
    },
    {
      judul: { id: "Manajemen Dokumen Terstruktur", en: "Systematic Document Management" },
      deskripsi: {
        id: "Terbiasa mengelola pengarsipan berkas fisik dan digital secara sistematis agar mudah dan cepat ditemukan kembali saat dibutuhkan.",
        en: "Experienced in organizing physical and digital file directories systematically for prompt and seamless retrieval."
      },
      ikon: "FolderKanban"
    },
    {
      judul: { id: "Cepat Beradaptasi & Berorientasi Solusi", en: "Quick Learner & Solution-Oriented" },
      deskripsi: {
        id: "Mudah membaur dengan tim baru, tanggap dalam menyelesaikan kendala administrasi harian, dan antusias mempelajari software baru.",
        en: "Adapts easily to team cultures, responds swiftly to administrative challenges, and eagerly masters new software tools."
      },
      ikon: "Zap"
    }
  ],
  statistikKunci: [
    {
      angka: "S1",
      satuan: "Sarjana",
      label: { id: "Pendidikan Bahasa Inggris", en: "English Education Degree" }
    },
    {
      angka: "100%",
      satuan: "Dedikasi",
      label: { id: "Komitmen Tanggung Jawab", en: "Professional Commitment" }
    },
    {
      angka: "5+",
      satuan: "Keahlian",
      label: { id: "Kompetensi Inti Office", en: "Core Office Competencies" }
    },
    {
      angka: "Siap",
      satuan: "Kerja",
      label: { id: "Tersedia untuk Rekrutmen", en: "Available for Recruitment" }
    }
  ]
};

/* =========================================================================
 * 2. KEAHLIAN (SKILLS)
 * ========================================================================= */
export const skillsData: SkillItem[] = [
  {
    id: "sk-01",
    nama: "Microsoft Word",
    kategori: "hard",
    level: 95,
    tingkat: { id: "Mahir (Advanced)", en: "Advanced" },
    deskripsi: {
      id: "Mampu mengoperasikan Microsoft Word dengan baik untuk membuat, menyusun, dan mengedit dokumen resmi, karya tulis, modul pembelajaran, serta buku dengan tata letak rapi, otomatisasi daftar isi, dan mail merge.",
      en: "Proficient in operating Microsoft Word for creating, formatting, and editing official documents, learning modules, and books with clean layouts, automated table of contents, and mail merge."
    },
    ikon: "FileText"
  },
  {
    id: "sk-02",
    nama: "Microsoft Excel",
    kategori: "hard",
    level: 88,
    tingkat: { id: "Menengah ke Atas", en: "Upper Intermediate" },
    deskripsi: {
      id: "Mampu menggunakan Microsoft Excel untuk mengolah data, membuat tabel terstruktur, menyusun laporan rekapitulasi, mengelola informasi administratif, dan formula logika pendukung efisiensi kerja.",
      en: "Skilled in using Microsoft Excel for processing data, designing structured spreadsheets, compiling recapitulation reports, and managing administrative information with core formulas."
    },
    ikon: "Sheet"
  },
  {
    id: "sk-03",
    nama: "Book Writing & Development",
    kategori: "technical",
    level: 90,
    tingkat: { id: "Keahlian Spesialis", en: "Specialist Skill" },
    deskripsi: {
      id: "Memiliki kemampuan dalam menyusun, menulis, dan mengembangkan buku atau karya tulis, mulai dari perumusan kerangka naskah, riset isi, penataan bab, hingga penyuntingan bahasa (proofreading).",
      en: "Capable of structuring, drafting, and developing books or written works from conceptual outlining, content research, chapter organization, to thorough language proofreading."
    },
    ikon: "BookOpen"
  },
  {
    id: "sk-04",
    nama: "English Communication",
    kategori: "hard",
    level: 92,
    tingkat: { id: "Kemampuan Kerja Profesional", en: "Professional Working" },
    deskripsi: {
      id: "Memiliki kemampuan komunikasi dalam bahasa Inggris secara aktif, baik lisan maupun tulisan, untuk korespondensi formal, interaksi profesional, penerjemahan materi, dan presentasi.",
      en: "Demonstrated proficiency in English communication, both verbal and written, for formal correspondence, professional interactions, content translation, and presentation delivery."
    },
    ikon: "Languages"
  },
  {
    id: "sk-05",
    nama: "Document Management",
    kategori: "technical",
    level: 92,
    tingkat: { id: "Terstandarisasi", en: "Standardized" },
    deskripsi: {
      id: "Mampu menyusun, mengklasifikasi, dan mengelola dokumen perkantoran secara rapi dan sistematis, baik pengarsipan fisik maupun direktori penyimpanan digital berbasis cloud (Google Drive / OneDrive).",
      en: "Proficient in cataloging, indexing, and organizing administrative documents systematically across both physical folders and cloud-based file storage (Google Drive / OneDrive)."
    },
    ikon: "FolderKanban"
  },
  {
    id: "sk-06",
    nama: "Interpersonal & Teamwork",
    kategori: "soft",
    level: 94,
    tingkat: { id: "Sangat Baik", en: "Excellent" },
    deskripsi: {
      id: "Kemampuan membangun relasi kerja yang positif, mendengarkan secara aktif, berkoordinasi lintas divisi, dan menjunjung tinggi empati serta etika kesopanan kerja.",
      en: "Strong ability to foster positive work relationships, practice active listening, coordinate across departments, and maintain professional etiquette."
    },
    ikon: "Users"
  },
  {
    id: "sk-07",
    nama: "Adaptability & Problem Solving",
    kategori: "soft",
    level: 90,
    tingkat: { id: "Adaptif", en: "Adaptive" },
    deskripsi: {
      id: "Cepat mempelajari prosedur operasional baru, tangguh menghadapi tenggat waktu, dan memiliki inisiatif dalam memecahkan kendala teknis perkantoran secara mandiri.",
      en: "Quick to master new operational workflows, resilient under deadlines, and proactive in troubleshooting daily office bottlenecks independently."
    },
    ikon: "Sparkles"
  },
  {
    id: "sk-08",
    nama: "Microsoft PowerPoint",
    kategori: "technical",
    level: 86,
    tingkat: { id: "Mahir Desain Presentasi", en: "Proficient Presentation" },
    deskripsi: {
      id: "Mampu merancang materi tayang presentasi yang menarik, ringkas, mudah dipahami audiens, dan selaras dengan standar profesional.",
      en: "Skilled in crafting engaging, concise, and visually appealing slide decks tailored for audiences and executive presentations."
    },
    ikon: "Presentation"
  }
];

/* =========================================================================
 * 3. RIWAYAT PENGALAMAN (EXPERIENCE)
 * ========================================================================= */
export const experiencesData: ExperienceItem[] = [
  {
    id: "exp-01",
    tipe: "magang",
    tipeLabel: { id: "Pengalaman Magang", en: "Internship Experience" },
    peran: {
      id: "Staff Magang Guru & Administrasi Pendidikan",
      en: "Teaching & Educational Administrative Intern"
    },
    institusi: "SMA Negeri 4 Langsa",
    lokasi: "Kota Langsa, Aceh",
    periode: {
      id: "Periode Program Magang Akademik",
      en: "Academic Internship Term"
    },
    deskripsi: {
      id: "Memperoleh pengalaman dan wawasan mengenai lingkungan kerja di bidang pendidikan, komunikasi profesional, serta kegiatan operasional sekolah.",
      en: "Gained valuable experience and insight into the educational workplace, professional communication, and day-to-day school operational activities."
    },
    poinTugas: [
      {
        id: "p1",
        text: {
          id: "Membantu penyusunan dan penataan administrasi dokumen perangkat pembelajaran, absensi siswa, dan rekapitulasi nilai evaluasi belajar.",
          en: "Assisted in preparing and organizing instructional documents, student attendance logs, and learning evaluation grade sheets."
        }
      },
      {
        id: "p2",
        text: {
          id: "Mengembangkan materi ajar serta modul pembelajaran bahasa Inggris interaktif yang disesuaikan dengan kurikulum sekolah.",
          en: "Developed instructional materials and interactive English modules tailored to the school's active curriculum."
        }
      },
      {
        id: "p3",
        text: {
          id: "Berkoordinasi secara aktif dengan dewan guru, staf tata usaha (TU), dan siswa dalam pelaksanaan kegiatan akademik harian.",
          en: "Coordinated actively with teaching faculty, administrative office staff, and students during daily academic operations."
        }
      },
      {
        id: "p4",
        text: {
          id: "Membantu operasional administrasi persuratan dan pengarsipan berkas kegiatan sekolah agar tertata secara rapi dan akurat.",
          en: "Assisted in drafting routine correspondence and systematically archiving school event records with high accuracy."
        }
      }
    ],
    tagKeahlian: ["Administrasi Pendidikan", "MS Word", "MS Excel", "English Teaching", "Arsip Dokumen"]
  },
  {
    id: "exp-02",
    tipe: "freelance",
    tipeLabel: { id: "Freelance & Proyek Mandiri", en: "Freelance & Independent Projects" },
    peran: {
      id: "Freelance Document Editor & English Translator",
      en: "Freelance Document Editor & English Translator"
    },
    institusi: "Jasa Mandiri / Proyek Lepas",
    lokasi: "Kota Langsa, Aceh (Remote)",
    periode: {
      id: "2023 - Sekarang",
      en: "2023 - Present"
    },
    deskripsi: {
      id: "Menyediakan layanan penyuntingan dokumen, pengetikan dan penataan format buku/modul, serta penerjemahan naskah akademis dan korespondensi Bahasa Indonesia - Inggris.",
      en: "Providing document editing, formatting of books and modules, and academic/business translation between Indonesian and English."
    },
    poinTugas: [
      {
        id: "p1",
        text: {
          id: "Menyunting dan memformat naskah buku, esai, dan laporan menggunakan Microsoft Word dengan standar tipografi yang rapi.",
          en: "Editing and formatting book manuscripts, essays, and reports using Microsoft Word with disciplined typographic standards."
        }
      },
      {
        id: "p2",
        text: {
          id: "Menerjemahkan teks umum dan akademis dari Bahasa Indonesia ke Bahasa Inggris dan sebaliknya dengan akurasi makna yang kontekstual.",
          en: "Translating general and academic texts between Indonesian and English with contextually accurate semantic nuances."
        }
      },
      {
        id: "p3",
        text: {
          id: "Mengelola file digital klien dengan penamaan berkas terstandarisasi untuk menjamin keamanan dan kerahasiaan data.",
          en: "Managing clients' digital files with standardized naming conventions ensuring data confidentiality and security."
        }
      }
    ],
    tagKeahlian: ["Book Formatting", "Proofreading", "Translation", "Document Layout", "Client Service"]
  },
  {
    id: "exp-03",
    tipe: "organisasi",
    tipeLabel: { id: "Pengalaman Organisasi", en: "Organizational Experience" },
    peran: {
      id: "Divisi Kesekretariatan & Administrasi Kegiatan",
      en: "Secretariat & Event Administration Division"
    },
    institusi: "Organisasi Kemahasiswaan & Komunitas Belajar",
    lokasi: "Kota Langsa, Aceh",
    periode: {
      id: "Masa Perkuliahan",
      en: "College Term"
    },
    deskripsi: {
      id: "Terlibat aktif dalam pengelolaan kesekretariatan organisasi, pembuatan proposal kegiatan, surat-menyurat resmi, dan pencatatan notulensi rapat.",
      en: "Actively managed secretariat responsibilities, drafted official event proposals, issued formal letters, and documented meeting minutes."
    },
    poinTugas: [
      {
        id: "p1",
        text: {
          id: "Menyusun surat undangan, proposal permohonan sponsor, dan laporan pertanggungjawaban (LPJ) kegiatan secara tepat waktu.",
          en: "Drafted formal invitation letters, sponsorship proposals, and event accountability reports on schedule."
        }
      },
      {
        id: "p2",
        text: {
          id: "Mencatat notulensi rapat divisi dan mendistribusikan rangkuman hasil keputusan rapat kepada seluruh anggota tim.",
          en: "Recorded detailed minutes of meetings and distributed action summaries promptly to all team members."
        }
      }
    ],
    tagKeahlian: ["Surat Resmi", "Proposal Kegiatan", "Notulensi", "Teamwork", "Komunikasi"]
  }
];

/* =========================================================================
 * 4. PROYEK / PORTFOLIO
 * ========================================================================= */
export const projectsData: ProjectItem[] = [
  {
    id: "prj-01",
    judul: {
      id: "Pengembangan Modul Ajar Bahasa Inggris Interaktif SMA",
      en: "Interactive High School English Learning Module Development"
    },
    kategori: {
      id: "Pendidikan & Penulisan Buku",
      en: "Education & Book Development"
    },
    ringkasan: {
      id: "Penyusunan modul materi ajar bahasa Inggris komprehensif untuk siswa SMA yang memadukan tata bahasa, kosakata tematik, dan latihan pemahaman bacaan.",
      en: "Comprehensive English learning module crafted for high school students integrating practical grammar, thematic vocabulary, and reading comprehension exercises."
    },
    deskripsiLengkap: {
      id: "Proyek pengembangan materi ajar mandiri yang dirancang saat menjalani kegiatan magang di SMA Negeri 4 Langsa. Modul ini diformat secara sistematis di Microsoft Word dengan hierarki bab yang terstruktur, tabel kosakata pendukung di Excel, serta lembar kerja latihan interaktif untuk memudahkan siswa memahami struktur kalimat bahasa Inggris secara bertahap.",
      en: "An educational material development project designed during the internship at SMA Negeri 4 Langsa. Systematically formatted in Microsoft Word with structured chapter hierarchy, vocabulary tables via Excel, and interactive comprehension worksheets to facilitate step-by-step English mastery."
    },
    fiturDanHasil: [
      {
        id: "Penyusunan 8 bab pembelajaran terstruktur lengkap dengan penjelasan konsep dan latihan mandiri.",
        en: "Compiled 8 structured learning chapters complete with conceptual explanations and self-study exercises."
      },
      {
        id: "Format tata letak rapi dengan otomatisasi heading, nomor halaman, dan daftar isi di Microsoft Word.",
        en: "Clean typographical formatting with automated headings, page numbering, and table of contents in Microsoft Word."
      },
      {
        id: "Mendapat tanggapan positif dari guru pembimbing atas kejelasan penjelasan dan kerapian penyusunan berkas.",
        en: "Received highly positive feedback from supervising educators for clarity of explanations and document neatness."
      }
    ],
    tools: ["Microsoft Word", "Book Formatting", "English Pedagogy", "Curriculum Mapping"],
    gambar: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    statusProyek: { id: "Selesai & Diimplementasikan", en: "Completed & Implemented" }
  },
  {
    id: "prj-02",
    judul: {
      id: "Sistem Pengarsipan & Manajemen Dokumen Digital",
      en: "Digital Document Management & Systematic Archiving Framework"
    },
    kategori: {
      id: "Administrasi Perkantoran",
      en: "Office Administration"
    },
    ringkasan: {
      id: "Perancangan tata kelola struktur folder dokumen, penomoran kode berkas terstandarisasi, dan katalog pencarian berbasis spreadsheet.",
      en: "Design of standardized digital folder architecture, document coding conventions, and a searchable spreadsheet-based indexing catalog."
    },
    deskripsiLengkap: {
      id: "Inisiatif penataan arsip dokumen digital yang dibuat untuk mengorganisir berbagai berkas administrasi, surat dinas, silabus, dan data evaluasi. Proyek ini membuktikan kemampuan dalam menerapkan tata kelola kearsipan yang efisien, aman, dan mudah diakses kembali dalam hitungan detik.",
      en: "A digital archiving initiative developed to organize administrative files, official letters, syllabi, and evaluation records. Demonstrates competence in executing efficient, secure, and promptly retrievable document filing protocols."
    },
    fiturDanHasil: [
      {
        id: "Format penamaan file terstandarisasi: [Kategori]_[NamaDokumen]_[TahunBulanTanggal].",
        en: "Standardized file naming protocol: [Category]_[DocumentName]_[YYYYMMDD]."
      },
      {
        id: "Master Spreadsheet di Excel dengan formula filter dan hyperlink langsung ke file arsip digital.",
        en: "Excel Master Spreadsheet with filter formulas and direct hyperlinks to archived digital files."
      },
      {
        id: "Mengurangi waktu pencarian berkas lama hingga 80% dan mencegah risiko dokumen ganda atau hilang.",
        en: "Reduced document search latency by 80% while eliminating risks of duplicate or misplaced records."
      }
    ],
    tools: ["Microsoft Excel", "Google Drive", "Document Management", "Folder Indexing"],
    gambar: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    statusProyek: { id: "Selesai & Siap Diterapkan", en: "Completed & Operational" }
  },
  {
    id: "prj-03",
    judul: {
      id: "Kompilasi Naskah & Penulisan Karya Tulis (Book Writing Project)",
      en: "Manuscript Compilation & Literary Writing Development"
    },
    kategori: {
      id: "Penulisan & Pengembangan Buku",
      en: "Writing & Book Development"
    },
    ringkasan: {
      id: "Proyek penulisan naskah komprehensif, riset materi tematik, penyusunan tata bahasa, dan penyuntingan naskah siap terbit.",
      en: "Comprehensive manuscript drafting, thematic content research, grammatical structuring, and publication-ready text editing."
    },
    deskripsiLengkap: {
      id: "Demonstrasi kemampuan dalam Book Writing & Development, meliputi perencanaan konsep buku, penulisan narasi yang mengalir, penyelarasan istilah bahasa Inggris dan Indonesia, serta proses proofreading bertahap untuk memastikan naskah bebas dari kesalahan ketik (*typo*) maupun ketidakkonsistenan format.",
      en: "Demonstrates practical aptitude in Book Writing & Development: conceptual planning, fluid narrative drafting, English-Indonesian terminology alignment, and iterative proofreading ensuring zero typographic errors or formatting inconsistencies."
    },
    fiturDanHasil: [
      {
        id: "Penyusunan naskah lebih dari 60 halaman dengan gaya bahasa yang komunikatif dan informatif.",
        en: "Authored over 60 pages of communicative and informative written manuscript."
      },
      {
        id: "Penyuntingan teliti terhadap struktur ejaan (PUEBI) dan tata bahasa Inggris yang akurat.",
        en: "Rigorous proofreading for proper Indonesian orthography (PUEBI) and accurate English syntax."
      },
      {
        id: "Layout halaman siap cetak dengan margin baku, nomor halaman otomatis, dan tipografi elegan.",
        en: "Print-ready page layout with standard margins, automated numbering, and elegant typography."
      }
    ],
    tools: ["Microsoft Word", "Book Development", "Creative Writing", "Proofreading"],
    gambar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    statusProyek: { id: "Karya Terkurasi", en: "Curated Work" }
  },
  {
    id: "prj-04",
    judul: {
      id: "Rekapitulasi Data Administratif & Template Laporan Excel",
      en: "Administrative Data Recapitulation & Excel Reporting Template"
    },
    kategori: {
      id: "Pengolahan Data & Spreadsheet",
      en: "Data Processing & Spreadsheet"
    },
    ringkasan: {
      id: "Pembuatan lembar kerja rekapitulasi data kehadiran, inventaris barang, dan laporan kegiatan otomatis berbasis formula Excel.",
      en: "Creation of automated attendance tracking sheets, inventory records, and activity reporting templates powered by Excel formulas."
    },
    deskripsiLengkap: {
      id: "Pembuatan template Microsoft Excel terstruktur untuk mencatat, mengelompokkan, dan menghitung data operasional harian. Dilengkapi validasi data (*dropdown*), conditional formatting untuk menandai status berkas penting, serta tabel rekapitulasi yang mudah dibaca oleh atasan.",
      en: "Structured Microsoft Excel workbook designed to record, categorize, and calculate daily operational data. Equipped with data validation dropdowns, conditional formatting for critical status tracking, and executive-ready summary tables."
    },
    fiturDanHasil: [
      {
        id: "Otomatisasi kalkulasi menggunakan formula SUM, COUNTIF, VLOOKUP, dan IF bersarang.",
        en: "Automated calculations leveraging SUM, COUNTIF, VLOOKUP, and nested IF formulas."
      },
      {
        id: "Tampilan tabel bersih, konsisten, dan siap dicetak secara rapi dalam format A4/Legal.",
        en: "Clean, consistent spreadsheet aesthetics formatted for crisp A4/Legal printing."
      },
      {
        id: "Mempermudah penyusunan laporan periodik tanpa perlu menghitung data secara manual.",
        en: "Streamlined periodic report generation without manual tallying."
      }
    ],
    tools: ["Microsoft Excel", "Data Formulas", "Conditional Formatting", "Data Validation"],
    gambar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    statusProyek: { id: "Selesai & Teruji", en: "Completed & Verified" }
  }
];

/* =========================================================================
 * 5. PENDIDIKAN (EDUCATION)
 * ========================================================================= */
export const educationsData: EducationItem[] = [
  {
    id: "edu-01",
    institusi: "Perguruan Tinggi / Universitas di Langsa, Aceh",
    jenjang: { id: "Sarjana (S1)", en: "Bachelor's Degree (S1)" },
    jurusan: { id: "Pendidikan Bahasa Inggris", en: "English Language Education" },
    periode: "2019 - 2023",
    nilaiIPK: "Predikat: Sangat Memuaskan",
    lokasi: "Kota Langsa, Aceh, Indonesia",
    keterangan: {
      id: "Menyelesaikan program studi S1 Pendidikan Bahasa Inggris dengan fokus pada kemampuan komunikasi bilingual, pedagogi instruksional, tata bahasa lanjutan, linguistik, penulisan akademis, dan manajemen administrasi pengajaran.",
      en: "Completed English Language Education bachelor's curriculum emphasizing bilingual communication, instructional pedagogy, advanced grammar, linguistics, academic writing, and educational administrative workflow."
    },
    pencapaian: [
      {
        id: "Mendalami mata kuliah English Correspondence, Public Speaking, Academic Writing, dan Educational Management.",
        en: "Focused on English Correspondence, Public Speaking, Academic Writing, and Educational Management coursework."
      },
      {
        id: "Berhasil menyelesaikan tugas akhir skripsi penulisan karya ilmiah dengan metodologi riset yang teruji.",
        en: "Successfully defended academic thesis research applying validated qualitative/quantitative methodology."
      },
      {
        id: "Aktif mengikuti program magang pendidikan di SMA Negeri 4 Langsa dengan evaluasi kerja yang sangat baik.",
        en: "Participated actively in the educational internship at SMA Negeri 4 Langsa with commendable performance appraisals."
      }
    ]
  }
];

/* =========================================================================
 * 6. SERTIFIKAT (CERTIFICATES)
 * ========================================================================= */
export const certificatesData: CertificateItem[] = [
  {
    id: "cert-01",
    namaSertifikat: {
      id: "Sertifikat Magang SMA Negeri 4 Langsa",
      en: "SMA Negeri 4 Langsa Internship Certificate"
    },
    lembagaPenerbit: "SMA Negeri 4 Langsa",
    tahun: 2023,
    masaBerlaku: { id: "Berlaku Permanen", en: "Lifetime Validity" },
    nomorKredensial: "SMAN4-LGS/MAGANG/2023-088",
    deskripsi: {
      id: "Sertifikat resmi atas keberhasilan menyelesaikan program magang kerja di lingkungan SMA Negeri 4 Langsa, mencakup pelaksanaan administrasi pendidikan, penyusunan materi ajar, dan koordinasi staf.",
      en: "Official credential recognizing successful completion of internship at SMA Negeri 4 Langsa, covering educational administration, teaching material preparation, and staff coordination."
    },
    gambar: "https://images.unsplash.com/photo-1589330694653-dad6bc0140af?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cert-02",
    namaSertifikat: {
      id: "Sertifikat Kemahiran Bahasa Inggris (English Proficiency)",
      en: "English Language Proficiency Certificate"
    },
    lembagaPenerbit: "Pusat Bahasa Perguruan Tinggi Terakreditasi",
    tahun: 2023,
    masaBerlaku: { id: "Aktif", en: "Active" },
    nomorKredensial: "EPT-ENG/LANGSA/2023-412",
    deskripsi: {
      id: "Bukti terstandarisasi atas kompetensi pemahaman bacaan (*reading*), tata bahasa (*structure*), dan percakapan bahasa Inggris dengan skor yang memuaskan.",
      en: "Standardized credential demonstrating high competence in reading comprehension, grammatical structure, and verbal English communication."
    },
    gambar: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cert-03",
    namaSertifikat: {
      id: "Sertifikat Pelatihan Microsoft Office (Word & Excel)",
      en: "Microsoft Office Application Competency Certificate"
    },
    lembagaPenerbit: "Lembaga Kursus & Pelatihan Komputer Terdaftar",
    tahun: 2022,
    masaBerlaku: { id: "Berlaku Permanen", en: "Lifetime Validity" },
    nomorKredensial: "MSO-ADM/2022-9901",
    deskripsi: {
      id: "Sertifikasi kemahiran praktis dalam pengolahan kata (MS Word), pembuatan naskah buku, serta pengolahan data tabel dan formula kalkulasi administratif (MS Excel).",
      en: "Certification of practical mastery in document processing (MS Word), book formatting, as well as data table and administrative formula processing (MS Excel)."
    },
    gambar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cert-04",
    namaSertifikat: {
      id: "Sertifikat Penulisan & Pengembangan Bahan Ajar (Book Writing)",
      en: "Writing & Instructional Material Development Certificate"
    },
    lembagaPenerbit: "Workshop Akademik & Penulisan Naskah",
    tahun: 2023,
    masaBerlaku: { id: "Berlaku Permanen", en: "Lifetime Validity" },
    nomorKredensial: "WRT-MOD/ACAD/2023-117",
    deskripsi: {
      id: "Sertifikat apresiasi atas perancangan karya tulis dan modul pembelajaran mandiri yang memenuhi kaidah penyusunan buku dan tata naskah formal.",
      en: "Credential acknowledging successful design and writing of learning modules adhering to publishing and formal typography guidelines."
    },
    gambar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  }
];

/* =========================================================================
 * 7. FAQ RECRUITER / TANYA JAWAB PEREKRUT
 * ========================================================================= */
export const recruiterFaqData = [
  {
    id: "faq-01",
    tanya: {
      id: "Posisi pekerjaan apa saja yang cocok dan diminati oleh Nico Wahyu?",
      en: "What job positions are best suited for and targeted by Nico Wahyu?"
    },
    jawab: {
      id: "Nico sangat cocok untuk posisi Staf Administrasi Perkantoran, Staff General Affairs, Document Controller / Administrator, Asisten Edukasi / Guru Bahasa Inggris, Content & Book Writer, Secretary, Customer Relation / Public Relations, serta posisi operasional yang membutuhkan ketelitian data dan komunikasi bahasa Inggris yang baik.",
      en: "Nico is well-suited for Office Administrator, General Affairs Staff, Document Controller, Educational Assistant / English Teacher, Content & Book Writer, Secretary, Customer Relations, and operational positions demanding rigorous data accuracy and fluent English communication."
    }
  },
  {
    id: "faq-02",
    tanya: {
      id: "Apakah Nico bersedia bekerja di luar Kota Langsa atau dengan sistem WFO/Remote?",
      en: "Is Nico available to work outside Langsa City or in on-site/remote arrangements?"
    },
    jawab: {
      id: "Nico sangat terbuka untuk peluang kerja On-Site (WFO) di Kota Langsa, Banda Aceh, Medan, maupun wilayah lainnya di Indonesia, serta siap bekerja secara Hybrid maupun Remote dengan fasilitas kerja mandiri yang andal.",
      en: "Nico is open to on-site employment in Langsa City, Banda Aceh, Medan, or other regions across Indonesia, as well as hybrid or remote engagements with reliable independent workstations."
    }
  },
  {
    id: "faq-03",
    tanya: {
      id: "Bagaimana cara cepat mengundang Nico untuk tahap interview atau wawancara?",
      en: "How can recruiters quickly invite Nico for an interview session?"
    },
    jawab: {
      id: "Perekrut dapat mengirimkan pesan melalui formulir kontak di website ini, menghubungi melalui Instagram @nicowshb._, atau mengirim email ke nkowhyu0@gmail.com. Nico aktif merespon pesan dan undangan wawancara setiap hari.",
      en: "Recruiters can submit an invitation through the website contact form, connect via Instagram @nicowshb._, or email nkowhyu0@gmail.com. Nico actively responds to inquiries and interview invitations daily."
    }
  }
];
