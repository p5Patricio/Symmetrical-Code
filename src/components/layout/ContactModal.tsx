import { useState, useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiX, FiCopy, FiCheck } from 'react-icons/fi';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, mounted]);

  const email = 'contacto@symmetricalcode.com';

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591503452553', icon: FaFacebookF },
    { label: 'Instagram', href: 'https://www.instagram.com/symmetrical.code', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/symmetrical-code', icon: FaLinkedinIn },
  ];

  const contactItems = [
    { 
      icon: FiMail, 
      label: t('footer.contact_email_label'), 
      text: email, 
      copyable: true, 
      color: '#004EBB' 
    },
    { 
      icon: FiClock, 
      label: t('footer.contact_schedule_label'), 
      text: t('footer.schedule'), 
      copyable: false, 
      color: '#a78bfa' 
    },
    { 
      icon: FiMapPin, 
      label: t('footer.contact_location_label'), 
      text: t('footer.location'), 
      copyable: false, 
      color: '#fbbf24' 
    },
  ];

  const whatsappUrl = 'https://wa.me/524737374224';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible */
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      <div className="contact-modal-overlay" onClick={onClose} />

      <div className="contact-modal-container" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <div className="contact-modal-glow" />

        <div className="contact-modal-header">
          <div className="contact-modal-logo">
            <img src="/favicon.svg" alt="Symmetrical Code" />
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
            <span className="contact-modal-project-badge">{t('footer.project_sub')}</span>
            <p className="contact-modal-project-headline">{t('footer.project_headline')}</p>
            <p className="contact-modal-project-desc">
              {t('footer.project_desc')}
            </p>

            <div className="contact-modal-whatsapp-wrapper">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-modal-cta"
              >
                <span>{t('footer.cta')}</span>
              </a>
            </div>
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
            transform: translate(-50%, -47%) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999998;
          animation: fadeIn 0.25s ease;
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
          background: linear-gradient(90deg, transparent, #004EBB, #004EBB, transparent);
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
          background: radial-gradient(circle at 30% 20%, rgba(0, 78, 187, 0.2), #050505 70%);
          border: 1px solid rgba(0, 78, 187, 0.35);
          flex-shrink: 0;
          overflow: hidden;
          box-shadow: 0 0 0 4px rgba(0, 78, 187, 0.08), 0 4px 14px rgba(0, 78, 187, 0.15);
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
          background: rgba(0, 78, 187, 0.18);
          border-color: #004EBB;
          color: #004EBB;
        }

        .contact-modal-body {
          overflow-y: auto;
          overflow-x: hidden;
          padding: 18px 16px 26px 22px;
          -webkit-overflow-scrolling: touch;
          scrollbar-gutter: stable;
          flex: 1;
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
          border-color: #004EBB;
          color: #004EBB;
        }

        .contact-modal-copy-btn.is-copied {
          background: rgba(0, 78, 187, 0.2);
          border-color: #004EBB;
          color: #004EBB;
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
          background: #004EBB;
          color: #ffffff;
          border-color: #004EBB;
          transform: translateY(-1px);
        }

        .contact-modal-project {
          padding: 18px;
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(0, 78, 187, 0.1), rgba(0, 78, 187, 0.02));
          border: 1px solid rgba(0, 78, 187, 0.25);
        }

        .contact-modal-project-badge {
          display: inline-block;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #004EBB;
          background: rgba(0, 78, 187, 0.15);
          border: 1px solid rgba(0, 78, 187, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 10px;
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

        .contact-modal-whatsapp-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .contact-modal-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          padding: 13px 20px;
          background: #004EBB;
          border-radius: 12px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(0, 78, 187, 0.35);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          border: none;
          cursor: pointer;
        }

        .contact-modal-cta:hover {
          background: #003d94;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(0, 78, 187, 0.45);
        }

        .contact-modal-cta:active {
          transform: translateY(0);
        }

        /* ---------- RESPONSIVE: CENTRADO EN TODOS LOS DISPOSITIVOS ---------- */
        @media (max-width: 768px) {
          .contact-modal-container {
            width: 94%;
            max-width: 420px;
            max-height: 88vh;
            border-radius: 20px;
          }

          .contact-modal-header {
            padding: 18px 18px 16px;
          }

          .contact-modal-body {
            padding: 16px 14px 22px 18px;
          }
        }

        @media (max-width: 640px) {
          .contact-modal-container {
            width: 95%;
            max-width: 400px;
            max-height: 90vh;
            border-radius: 18px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .contact-modal-header {
            padding: 16px 16px 14px;
            gap: 12px;
          }

          .contact-modal-logo {
            width: 42px;
            height: 42px;
          }

          .contact-modal-title-section h2 {
            font-size: 17px;
          }

          .contact-modal-title-section p {
            font-size: 11.5px;
          }

          .contact-modal-body {
            padding: 14px 12px 20px 16px;
          }

          .contact-modal-item {
            padding: 10px 10px;
            gap: 10px;
          }

          .contact-modal-item-icon {
            width: 32px;
            height: 32px;
          }

          .contact-modal-item-label {
            font-size: 9.5px;
          }

          .contact-modal-item-value {
            font-size: 12.5px;
          }

          .contact-modal-social-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }

          .contact-modal-social-link {
            justify-content: center;
            padding: 8px 6px;
            font-size: 11px;
          }

          .contact-modal-social-link span {
            display: none;
          }

          .contact-modal-project {
            padding: 16px;
          }

          .contact-modal-project-headline {
            font-size: 15px;
          }

          .contact-modal-project-desc {
            font-size: 12px;
          }

          .contact-modal-cta {
            padding: 13px 18px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .contact-modal-container {
            width: 96%;
            max-width: 380px;
            max-height: 92vh;
            border-radius: 16px;
          }

          .contact-modal-header {
            padding: 14px 14px 12px;
            gap: 10px;
          }

          .contact-modal-logo {
            width: 38px;
            height: 38px;
          }

          .contact-modal-title-section h2 {
            font-size: 15px;
          }

          .contact-modal-title-section p {
            font-size: 10.5px;
          }

          .contact-modal-body {
            padding: 12px 10px 18px 14px;
          }

          .contact-modal-item {
            padding: 9px 8px;
            gap: 8px;
          }

          .contact-modal-item-icon {
            width: 28px;
            height: 28px;
          }

          .contact-modal-item-icon svg {
            width: 14px;
            height: 14px;
          }

          .contact-modal-item-label {
            font-size: 9px;
          }

          .contact-modal-item-value {
            font-size: 12px;
          }

          .contact-modal-close {
            width: 30px;
            height: 30px;
          }

          .contact-modal-close svg {
            width: 16px;
            height: 16px;
          }

          .contact-modal-project-headline {
            font-size: 14px;
          }

          .contact-modal-project-desc {
            font-size: 11.5px;
          }

          .contact-modal-cta {
            padding: 12px 16px;
            font-size: 12.5px;
          }

          .contact-modal-social-link {
            padding: 6px 4px;
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .contact-modal-container {
            width: 98%;
            max-width: 340px;
          }

          .contact-modal-title-section h2 {
            font-size: 14px;
          }

          .contact-modal-project-headline {
            font-size: 13px;
          }

          .contact-modal-cta {
            font-size: 12px;
            padding: 10px 14px;
          }
        }
      `}</style>
    </>,
    document.body
  );
}