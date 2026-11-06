import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Phone,
  AlertCircle,
  Loader2,
  Database
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { insertContactMessage } from '../lib/supabase';

export const ContactSection: React.FC = () => {
  const { lang, profile, isLiveSupabase, openSetupModal } = usePortfolio();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) {
      newErrors.nama = lang === 'id' ? 'Nama lengkap wajib diisi' : 'Full name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = lang === 'id' ? 'Email yang valid wajib diisi' : 'Valid email is required';
    }
    if (!formData.subjek.trim()) {
      newErrors.subjek = lang === 'id' ? 'Subjek pesan wajib diisi' : 'Subject is required';
    }
    if (!formData.pesan.trim()) {
      newErrors.pesan = lang === 'id' ? 'Pesan untuk Nico Wahyu wajib diisi' : 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await insertContactMessage({
        name: formData.nama,
        email: formData.email,
        subject: formData.subjek,
        message: formData.pesan,
      });

      if (res.success) {
        setSubmitSuccess(true);
        setFormData({
          nama: '',
          email: '',
          subjek: '',
          pesan: '',
        });
      } else {
        setSubmitError(res.error || 'Terjadi kesalahan saat menyimpan ke Supabase.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Gagal mengirim pesan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanWaNumber = (profile.whatsapp || '+6281234567890').replace(/[^0-9]/g, '');

  return (
    <section 
      id="contact" 
      className="py-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Kontak & Formulir Rekrutmen' : 'Contact & Recruitment Inquiries'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {lang === 'id' ? 'Hubungi Saya untuk Peluang Kerja' : 'Get in Touch for Career Opportunities'}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'id'
              ? 'Seluruh pesan recruiter tersimpan aman dan terenkripsi ke database Supabase (tabel: contact_messages).'
              : 'Recruiter messages are securely stored in Supabase Database (table: contact_messages).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (Email, WhatsApp, LinkedIn, Location) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {profile.namaLengkap}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  {profile.posisiGelar[lang]}
                </p>
              </div>

              {/* Contact List */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* 1. Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Email:
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline block mt-0.5"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* 2. WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      WhatsApp:
                    </p>
                    <a
                      href={`https://wa.me/${cleanWaNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline block mt-0.5"
                    >
                      {profile.whatsapp || '+62 812-3456-7890'}
                    </a>
                  </div>
                </div>

                {/* 3. LinkedIn */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      LinkedIn:
                    </p>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block mt-0.5 truncate max-w-[230px]"
                    >
                      linkedin.com/in/nico-wahyu-643a85263
                    </a>
                  </div>
                </div>

                {/* 4. Lokasi */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-slate-800 flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {lang === 'id' ? 'Lokasi Domisili:' : 'Current Location:'}
                    </p>
                    <p className="text-slate-900 dark:text-white font-medium mt-0.5">
                      {profile.domisili}
                    </p>
                  </div>
                </div>

              </div>

              {/* Direct Quick WhatsApp / Instagram Action */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${cleanWaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.01]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Kirim Pesan WhatsApp' : 'Chat via WhatsApp'}</span>
                </a>

                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Instagram className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Instagram {profile.instagramHandle}</span>
                  </a>
                )}
              </div>

            </div>

            {/* Supabase Storage & DB Status Pill */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {isLiveSupabase ? 'Terkoneksi ke Supabase' : 'Mode Siap / Local Cache'}
                </span>
              </div>
              <button
                onClick={openSetupModal}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Lihat Skema SQL
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form with Nama, Email, Subjek, Pesan */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {lang === 'id' ? 'Formulir Pesan untuk Recruiter & HRD' : 'Message Form for Recruiters & HRD'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {lang === 'id'
                    ? 'Silakan kirimkan informasi lowongan, jadwal interview, atau pertanyaan melalui formulir di bawah ini.'
                    : 'Feel free to send job vacancies, interview schedules, or recruitment inquiries through this form.'}
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {lang === 'id' ? 'Pesan Berhasil Terkirim ke Supabase!' : 'Message Sent & Saved to Supabase!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    {lang === 'id'
                      ? 'Terima kasih telah menghubungi Nico Wahyu. Pesan Anda telah tersimpan dengan aman ke tabel database dan Nico akan merespon email Anda sesegera mungkin.'
                      : 'Thank you for reaching out to Nico Wahyu. Your message has been safely recorded in the database, and Nico will reply promptly.'}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xs font-bold shadow cursor-pointer"
                  >
                    {lang === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Nama */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'id' ? 'Nama Lengkap' : 'Full Name'} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder={lang === 'id' ? 'Contoh: Bapak Irfan / Ibu Sari' : 'e.g. Sarah Jenkins'}
                        className={`w-full bg-white dark:bg-slate-950 border ${
                          errors.nama ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                        } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                      />
                      {errors.nama && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.nama}</p>
                      )}
                    </div>

                    {/* 2. Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {lang === 'id' ? 'Alamat Email' : 'Email Address'} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hrd@perusahaan.com"
                        className={`w-full bg-white dark:bg-slate-950 border ${
                          errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                        } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* 3. Subjek (Required by Prompt) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {lang === 'id' ? 'Subjek Pesan' : 'Subject'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subjek"
                      value={formData.subjek}
                      onChange={handleChange}
                      placeholder={lang === 'id' ? 'Contoh: Undangan Wawancara Kerja - Staff Administrasi' : 'e.g. Interview Invitation - Administrative Staff'}
                      className={`w-full bg-white dark:bg-slate-950 border ${
                        errors.subjek ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                    {errors.subjek && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.subjek}</p>
                    )}
                  </div>

                  {/* 4. Pesan (Required by Prompt) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {lang === 'id' ? 'Pesan / Undangan Interview' : 'Message / Details'} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      placeholder={lang === 'id' ? 'Tuliskan rincian lowongan kerja, jadwal interview, atau pertanyaan Anda di sini...' : 'Write job details, interview schedules, or inquiries here...'}
                      className={`w-full bg-white dark:bg-slate-950 border ${
                        errors.pesan ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'
                      } rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                    />
                    {errors.pesan && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.pesan}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === 'id' ? 'Menyimpan ke Supabase...' : 'Saving to Supabase...'}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{lang === 'id' ? 'Kirim Pesan ke Nico Wahyu' : 'Send Message to Nico Wahyu'}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
