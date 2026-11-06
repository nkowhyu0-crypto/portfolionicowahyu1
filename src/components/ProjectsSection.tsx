import React, { useState, useMemo } from 'react';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Database,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { getStorageUrl } from '../lib/supabase';

export const ProjectsSection: React.FC = () => {
  const { lang, projects, loading, openSetupModal } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: { id: 'Semua Kategori', en: 'All Categories' } },
      { id: 'karya_tulis', label: { id: 'Karya Tulis', en: 'Writing Works' } },
      { id: 'buku', label: { id: 'Buku yang Pernah Dibuat', en: 'Published Books' } },
      { id: 'dokumen', label: { id: 'Dokumen & Hasil Kerja', en: 'Work Documents' } },
      { id: 'pribadi', label: { id: 'Proyek Pribadi', en: 'Personal Projects' } },
      { id: 'akademik', label: { id: 'Hasil Kegiatan Akademik', en: 'Academic Output' } },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      let matchCat = true;
      const catText = (p.kategori.id + ' ' + p.kategori.en).toLowerCase();

      if (selectedCategory === 'karya_tulis') {
        matchCat = catText.includes('karya') || catText.includes('tulis') || catText.includes('writing');
      } else if (selectedCategory === 'buku') {
        matchCat = catText.includes('buku') || catText.includes('book');
      } else if (selectedCategory === 'dokumen') {
        matchCat = catText.includes('dokumen') || catText.includes('arsip') || catText.includes('work');
      } else if (selectedCategory === 'pribadi') {
        matchCat = catText.includes('pribadi') || catText.includes('personal');
      } else if (selectedCategory === 'akademik') {
        matchCat = catText.includes('akademik') || catText.includes('pendidikan') || catText.includes('academic') || catText.includes('modul');
      }

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        p.judul[lang].toLowerCase().includes(q) ||
        p.ringkasan[lang].toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, lang, projects]);

  return (
    <section 
      id="projects" 
      className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Karya & Portofolio' : 'Projects & Portfolio'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Karya Tulis, Buku & Hasil Pekerjaan' : 'Written Works, Books & Deliverables'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Dikelola secara dinamis via Supabase Database (tabel: projects) dan Supabase Storage.'
              : 'Dynamically managed via Supabase Database (table: projects) and Supabase Storage.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-950 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'id' ? 'Cari portofolio (misal: modul, buku, dokumen, Excel)...' : 'Search projects (e.g. module, book, document, Excel)...'}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 self-end md:self-center">
              <span>{lang === 'id' ? 'Menampilkan:' : 'Showing:'}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-900 font-mono">
                {filteredProjects.length} {lang === 'id' ? 'Karya' : 'Items'}
              </span>
            </div>

          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              {lang === 'id' ? 'Kategori:' : 'Category:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && projects.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2" />
            <p className="text-xs">Memuat proyek dari Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-3">
            <Database className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tidak Ada Proyek Ditemukan</h4>
            <p className="text-xs text-slate-500">Tidak ada item proyek yang sesuai filter pencarian.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const resolvedImg = getStorageUrl(project.gambar, 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80');

            return (
              <div
                key={project.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={resolvedImg}
                      alt={project.judul[lang]}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                        {project.kategori[lang]}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded border border-emerald-700/80">
                        {project.statusProyek[lang]}
                      </span>
                      {project.tautanDemo && project.tautanDemo !== '#' && (
                        <a
                          href={project.tautanDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-semibold text-white bg-blue-600/90 hover:bg-blue-600 px-2.5 py-0.5 rounded flex items-center gap-1 shadow"
                        >
                          <span>Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 space-y-3.5">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display">
                      {project.judul[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
                      {project.ringkasan[lang]}
                    </p>

                    {/* Tools */}
                    {project.tools && project.tools.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                        {project.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[11px] font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 text-slate-800 hover:text-white dark:bg-slate-900 dark:hover:from-blue-600 dark:hover:to-emerald-600 dark:text-slate-200 dark:hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 group-hover:shadow hover:border-transparent cursor-pointer"
                  >
                    <span>{lang === 'id' ? 'Lihat Dokumentasi & Detail Proyek' : 'View Documentation & Details'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
