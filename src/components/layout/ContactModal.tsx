import { useState, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiX, FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Necesario porque `document` no existe en el render de servidor (SSR/Next.js).
  // Montamos el portal solo cuando ya estamos en el cliente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const email = 'contacto@symmetricalcode.com';

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591503452553', icon: FaFacebookF },
    { label: 'Instagram', href: 'https://www.instagram.com/symmetrical.code', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/symmetrical-code', icon: FaLinkedinIn },
  ];

  const contactItems = [
    { icon: FiMail, label: t('footer.contact_email_label'), text: email, copyable: true, color: '#00e5ff' },
    { icon: FiClock, label: t('footer.contact_schedule_label'), text: t('footer.schedule'), copyable: false, color: '#a78bfa' },
    { icon: FiMapPin, label: t('footer.contact_location_label'), text: t('footer.location'), copyable: false, color: '#fbbf24' },
  ];

  // Misma URL que Footer / ChatWidget
const whatsappMessage = t('whatsapp.message_modal');
const whatsappUrl = `https://wa.me/524737374224?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible: no bloquea la UI */
    }
  };

  // No renderizar en el servidor; evita mismatches de SSR/hidratación
  if (!mounted) return null;

  return createPortal(
    <>
      <div className="contact-modal-overlay" onClick={onClose} />

      <div className="contact-modal-container" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <span className="contact-modal-drag-handle" aria-hidden="true" />

        <div className="contact-modal-glow" />

        <div className="contact-modal-header">
          <div className="contact-modal-logo">
            <img src="/logosc.jpg" alt="Symmetrical Code" />
          </div>
          <div className="contact-modal-title-section">
            <h2 id="contact-modal-title">{t('footer.contact_title')}</h2>
            <p>{t('footer.contact_subtitle')}</p>
          </div>
          <button className="contact-modal-close" onClick={onClose} aria-label="Close">
            <FiX size={18} />
          </button>
        </div>

        <div className="contact-modal-body">
          <div className="contact-modal-items">
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  className="contact-modal-item"
                  key={idx}
                  style={{ '--item-color': item.color } as CSSProperties}
                >
                  <div className="contact-modal-item-icon">
                    <Icon size={16} />
                  </div>
                  <div className="contact-modal-item-text">
                    <span className="contact-modal-item-label">{item.label}</span>
                    <span className="contact-modal-item-value">{item.text}</span>
                  </div>
                  {item.copyable && (
                    <button
                      className={`contact-modal-copy-btn ${copied ? 'is-copied' : ''}`}
                      onClick={handleCopyEmail}
                      aria-label={t('footer.contact_copy_email')}
                      type="button"
                    >
                      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="contact-modal-social">
            <p className="contact-modal-label">{t('footer.follow')}</p>
            <div className="contact-modal-social-links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="contact-modal-social-link"
                  >
                    <Icon size={14} />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="contact-modal-project">
            <div className="contact-modal-project-top">
              <span className="contact-modal-project-badge">{t('footer.project_sub')}</span>
              <span className="contact-modal-online">
                <span className="contact-modal-online-dot" />
                {t('footer.contact_online')}
              </span>
            </div>
            <p className="contact-modal-project-headline">{t('footer.project_headline')}</p>
            <p className="contact-modal-project-desc">{t('footer.project_desc')}</p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-modal-cta"
            >
              <span className="contact-modal-cta-left">
                <span className="contact-modal-cta-icon">
                  <FaWhatsapp size={16} />
                </span>
                <span>{t('footer.cta')}</span>
              </span>
              <FiArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -47%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        @keyframes sheetUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(8px);
          z-index: 999998;
          animation: fadeIn 0.25s ease;
        }

        .contact-modal-drag-handle {
          display: none;
        }

        .contact-modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 92%;
          max-width: 440px;
          max-height: 85vh;
          background: #0a0a0a;
          border-radius: 22px;
          border: 1px solid rgba(0, 229, 255, 0.18);
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 180, 220, 0.05);
          z-index: 999999;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .contact-modal-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent);
        }

        .contact-modal-header {
          padding: 22px 22px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          flex-shrink: 0;
        }

        .contact-modal-logo {
          position: relative;
          width: 48px;
          height: 48px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 30% 20%, rgba(0, 229, 255, 0.12), #050505 70%);
          border: 1px solid rgba(0, 229, 255, 0.25);
          flex-shrink: 0;
          overflow: hidden;
          box-shadow: 0 0 0 4px rgba(0, 229, 255, 0.05), 0 4px 14px rgba(0, 229, 255, 0.08);
        }

        .contact-modal-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 5px;
          box-sizing: border-box;
          display: block;
        }

        .contact-modal-title-section {
          flex: 1;
          min-width: 0;
          padding-top: 2px;
        }

        .contact-modal-title-section h2 {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 3px 0;
          letter-spacing: -0.2px;
        }

        .contact-modal-title-section p {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.45);
          margin: 0;
          line-height: 1.4;
        }

        .contact-modal-close {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.55);
          flex-shrink: 0;
        }

        .contact-modal-close:hover {
          background: rgba(0, 229, 255, 0.15);
          border-color: #00e5ff;
          color: #00e5ff;
        }

        .contact-modal-body {
          overflow-y: auto;
          overflow-x: hidden;
          padding: 18px 16px 26px 22px;
          -webkit-overflow-scrolling: touch;
          scrollbar-gutter: stable;
        }

        .contact-modal-body::-webkit-scrollbar {
          width: 5px;
        }

        .contact-modal-body::-webkit-scrollbar-track {
          background: transparent;
          margin: 4px 0;
        }

        .contact-modal-body::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.3);
          border-radius: 10px;
        }

        .contact-modal-body::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.5);
        }

        .contact-modal-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 229, 255, 0.3) transparent;
        }

        .contact-modal-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .contact-modal-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .contact-modal-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: color-mix(in srgb, var(--item-color) 35%, transparent);
        }

        .contact-modal-item-icon {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--item-color) 14%, transparent);
          color: var(--item-color);
          flex-shrink: 0;
        }

        .contact-modal-item-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
          flex: 1;
        }

        .contact-modal-item-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        .contact-modal-item-value {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .contact-modal-copy-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .contact-modal-copy-btn:hover {
          border-color: #00e5ff;
          color: #00e5ff;
        }

        .contact-modal-copy-btn.is-copied {
          background: rgba(0, 229, 255, 0.15);
          border-color: #00e5ff;
          color: #00e5ff;
        }

        .contact-modal-label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          margin: 0 0 10px 0;
        }

        .contact-modal-social {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .contact-modal-social-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .contact-modal-social-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.65);
          transition: all 0.22s ease;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.07);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
        }

        .contact-modal-social-link:hover {
          background: #00e5ff;
          color: #000000;
          border-color: #00e5ff;
          transform: translateY(-1px);
        }

        .contact-modal-project {
          padding: 18px;
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(0, 229, 255, 0.07), rgba(0, 229, 255, 0.015));
          border: 1px solid rgba(0, 229, 255, 0.15);
        }

        .contact-modal-project-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
        }

        .contact-modal-online {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
        }

        .contact-modal-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
          animation: pulseDot 2s ease-out infinite;
        }

        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.55); }
          70% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .contact-modal-project-badge {
          display: inline-block;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #00e5ff;
          background: rgba(0, 229, 255, 0.12);
          border: 1px solid rgba(0, 229, 255, 0.25);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .contact-modal-project-headline {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          letter-spacing: -0.2px;
          line-height: 1.3;
        }

        .contact-modal-project-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.55;
          margin: 0 0 16px 0;
        }

        .contact-modal-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #000000;
          text-decoration: none;
          padding: 13px 16px;
          background: #00e5ff;
          border-radius: 12px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 229, 255, 0.25);
          width: 100%;
          box-sizing: border-box;
        }

        .contact-modal-cta-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .contact-modal-cta-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-modal-cta:hover {
          background: #00ccee;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(0, 229, 255, 0.35);
        }

        .contact-modal-cta:active {
          transform: translateY(0);
        }

        /* ---------- MÓVIL: bottom sheet nativo ---------- */
        @media (max-width: 640px) {
          .contact-modal-container {
            top: auto;
            bottom: 0;
            left: 0;
            transform: none;
            width: 100%;
            max-width: 100%;
            max-height: 88vh;
            border-radius: 22px 22px 0 0;
            border-left: none;
            border-right: none;
            border-bottom: none;
            animation: sheetUp 0.32s cubic-bezier(0.16, 1, 0.3, 1);
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }

          .contact-modal-drag-handle {
            display: block;
            width: 36px;
            height: 4px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.2);
            margin: 10px auto 0;
            flex-shrink: 0;
          }

          .contact-modal-header {
            padding: 14px 18px 16px;
          }

          .contact-modal-body {
            padding: 16px 14px 24px 18px;
          }

          .contact-modal-social {
            padding-bottom: 18px;
            margin-bottom: 18px;
          }

          .contact-modal-item {
            padding: 12px;
          }

          .contact-modal-social-link {
            flex: 1 1 auto;
            justify-content: center;
          }
        }

        @media (max-width: 360px) {
          .contact-modal-title-section h2 {
            font-size: 16.5px;
          }

          .contact-modal-project-headline {
            font-size: 15px;
          }
        }
      `}</style>
    </>,
    document.body
  );
}