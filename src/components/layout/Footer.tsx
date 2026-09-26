import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiCopy, FiCheck } from 'react-icons/fi';
import Button from '../ui/Button';

export default function Footer() {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591503452553', icon: FaFacebookF },
    { label: 'Instagram', href: 'https://www.instagram.com/symmetrical.code', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/symmetrical-code', icon: FaLinkedinIn },
  ];

  const contactItems = [
    { icon: FiMail, text: 'contacto@symmetricalcode.com' },
    { icon: FiClock, text: t('footer.schedule') },
    { icon: FiMapPin, text: t('footer.location') },
  ];

  const whatsappUrl = 'https://wa.me/524737374224';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contacto@symmetricalcode.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <footer id="footer" className="relative border-t border-line bg-transparent" style={{ marginTop: 'auto' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-16 relative z-10">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-5">
              <img src="/favicon.svg" alt="Symmetrical Code" className="h-9 w-auto" />
              <span className="font-syne font-bold text-lg text-text tracking-tight">
                Symmetrical<span className="text-accent-blue">Code</span>
              </span>
            </div>

            <p className="text-sm text-muted leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>

            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-accent-blue mb-3.5">
                {t('footer.follow')}
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="footer-social-link flex items-center justify-center w-9 h-9 border border-line text-muted transition-all duration-200 hover:text-on-brand hover:bg-accent-blue hover:border-accent-blue"
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="footer-col">
            <p className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-accent-blue mb-5">
              {t('footer.contact_title')}
            </p>

            <div className="flex flex-col gap-4">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 py-1.5">
                    <Icon size={16} className="text-accent-blue shrink-0" />
                    <div className="footer-contact-text text-[13px] font-medium text-text">
                      {item.text}
                    </div>
                    {idx === 0 && (
                      <button
                        onClick={handleCopyEmail}
                        title={copiedEmail ? t('footer.contact_copy_email') : t('footer.contact_copy_email')}
                        className={`ml-auto inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono border transition-all duration-200 ${
                          copiedEmail
                            ? 'text-accent-blue border-accent-blue bg-[color-mix(in_srgb,var(--brand-blue)_12%,transparent)]'
                            : 'text-muted border-line hover:text-text hover:border-line-2'
                        }`}
                      >
                        {copiedEmail ? <FiCheck size={11} /> : <FiCopy size={11} />}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <p className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-accent-blue mb-5">
              {t('footer.project_title')}
            </p>

            <div className="flex flex-col flex-1">
              <p className="text-lg font-bold text-text mb-1 tracking-tight">
                {t('footer.project_headline')}
              </p>
              <p className="text-[15px] font-semibold text-accent-blue mb-2.5">
                {t('footer.project_sub')}
              </p>
              <p className="text-xs text-muted leading-relaxed mb-5">
                {t('footer.project_desc')}
              </p>

              <Button
                variant="primary"
                size="md"
                href={whatsappUrl}
                external
                leadingIcon={<FaWhatsapp size={16} />}
                className="w-full mt-auto"
              >
                {t('footer.cta')}
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-line my-10" />

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-1 flex-wrap justify-center items-center">
            {(
              [
                { to: '/privacidad', label: t('footer.privacy') },
                { to: '/terminos', label: t('footer.terms') },
              ] as { to: string; label: string }[]
            ).map(({ to, label }) => (
              <Button key={to} variant="link" size="sm" to={to} className="px-2">
                {label}
              </Button>
            ))}
          </div>

          <span className="font-mono text-[11px] text-subtle">
            © Symmetrical Code {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
          align-items: start;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .footer-grid {
            gap: 30px;
            margin-bottom: 30px;
          }

          .footer-col {
            min-width: 0;
          }
        }
      `}</style>
    </footer>
  );
}
