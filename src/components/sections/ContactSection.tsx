import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 010 20M2 12h20" />
  </svg>
);

// URL del backend - cambia esto cuando deployes a producción
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Contact() {
  const { t } = useTranslation();

  // Estados de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estados de control de UI
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      // Éxito: limpiar campos y mostrar pantalla de confirmación
      setNombre('');
      setEmail('');
      setMensaje('');
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,229,255,0.04), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label">{t('contact.label')}</span>
            <span className="flex-1 h-px bg-[rgba(0,229,255,0.1)]" />
          </div>
          <h2 className="font-syne font-black text-5xl md:text-6xl text-white">
            {t('contact.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <p className="text-white/40 text-base leading-relaxed">
              {t('contact.subtitle')}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-white/50">
                <div className="text-[#00e5ff]">
                  <MailIcon />
                </div>
                <span className="font-mono text-sm">{t('contact.info_email')}</span>
              </div>
              <div className="flex items-center gap-4 text-white/50">
                <div className="text-[#00e5ff]">
                  <GlobeIcon />
                </div>
                <span className="font-mono text-sm">{t('contact.info_location')}</span>
              </div>
            </div>

            <div className="hidden lg:block mt-auto">
              <div className="w-full h-px bg-gradient-to-r from-[#00e5ff]/30 to-transparent" />
              <div className="mt-4 font-mono text-xs text-white/20 tracking-widest">
                SYMMETRICAL CODE © {new Date().getFullYear()}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="glass-card p-12 flex flex-col items-center justify-center text-center gap-4 min-h-64">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00e5ff, #1565ff)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#020408" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-syne font-bold text-xl text-white">{t('contact.success_title')}</h3>
                <p className="text-white/40 text-sm">{t('contact.success_msg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-[#00e5ff]/50 tracking-widest">
                      {t('contact.form_name')}
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      disabled={loading}
                      className="bg-transparent border border-[rgba(0,229,255,0.12)] text-white text-sm px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.4)] transition-colors placeholder:text-white/20 font-mono disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-[#00e5ff]/50 tracking-widest">
                      {t('contact.form_email')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="bg-transparent border border-[rgba(0,229,255,0.12)] text-white text-sm px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.4)] transition-colors placeholder:text-white/20 font-mono disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-[#00e5ff]/50 tracking-widest">
                    {t('contact.form_message')}
                  </label>
                  <textarea
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={6}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    disabled={loading}
                    className="bg-transparent border border-[rgba(0,229,255,0.12)] text-white text-sm px-4 py-3 outline-none focus:border-[rgba(0,229,255,0.4)] transition-colors placeholder:text-white/20 font-mono resize-none disabled:opacity-50"
                    placeholder={t('contact.form_message')}
                  />
                </div>

                {/* Mensaje de error */}
                {error && (
                  <div className="border border-red-500/40 bg-red-500/10 px-4 py-3 rounded text-sm text-red-300 font-mono">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary py-4 px-8 font-syne font-bold text-sm tracking-wider self-start disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('contact.form_sending') : t('contact.form_submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}