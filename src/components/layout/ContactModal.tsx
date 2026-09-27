import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import IconFacebook from '~icons/lucide/facebook';
import IconInstagram from '~icons/lucide/instagram';
import IconLinkedin from '~icons/lucide/linkedin';
import IconWhatsapp from '~icons/logos/whatsapp-icon';
import IconMapPin from '~icons/lucide/map-pin';
import IconMail from '~icons/lucide/mail';
import IconClock from '~icons/lucide/clock';
import IconX from '~icons/lucide/x';
import IconCopy from '~icons/lucide/copy';
import IconCheck from '~icons/lucide/check';
import Button from '../ui/Button';

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
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591503452553', icon: IconFacebook },
    { label: 'Instagram', href: 'https://www.instagram.com/symmetrical.code', icon: IconInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/symmetrical-code', icon: IconLinkedin },
  ];

  const contactItems = [
    {
      icon: IconMail,
      label: t('footer.contact_email_label'),
      text: email,
      copyable: true,
    },
    {
      icon: IconClock,
      label: t('footer.contact_schedule_label'),
      text: t('footer.schedule'),
      copyable: false,
    },
    {
      icon: IconMapPin,
      label: t('footer.contact_location_label'),
      text: t('footer.location'),
      copyable: false,
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
        <div className="contact-modal-header">
          <div className="contact-modal-logo">
            <img src="/favicon.svg" alt="Symmetrical Code" />
          </div>
          <div className="contact-modal-title-section">
            <h2 id="contact-modal-title">{t('footer.contact_title')}</h2>
            <p>{t('footer.contact_subtitle')}</p>
          </div>
          <Button variant="icon" size="sm" onClick={onClose} aria-label={t('footer.modal_understood')}>
            <IconX width={16} height={16} />
          </Button>
        </div>

        <div className="contact-modal-body">
          <div className="contact-modal-items">
            {contactItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="contact-modal-item" key={idx}>
                  <div className="contact-modal-item-icon">
                    <Icon width={16} height={16} />
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
                      {copied ? <IconCheck width={14} height={14} /> : <IconCopy width={14} height={14} />}
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
                    <Icon width={14} height={14} />
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

            <Button
              variant="primary"
              size="md"
              href={whatsappUrl}
              external
              leadingIcon={<IconWhatsapp width={16} height={16} />}
              className="w-full"
            >
              {t('footer.cta')}
            </Button>
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
          background: color-mix(in srgb, var(--bg) 78%, black 22%);
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
          background: var(--surface);
          border: 1px solid var(--line-2);
          box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.35);
          z-index: 999999;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .contact-modal-header {
          padding: 22px 22px 18px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          border-bottom: 1px solid var(--line);
          flex-shrink: 0;
        }

        .contact-modal-logo {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--brand-blue) 10%, var(--surface));
          border: 1px solid var(--line-2);
          flex-shrink: 0;
          overflow: hidden;
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
          font-family: var(--ff-text);
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin: 0 0 3px 0;
          letter-spacing: -0.2px;
        }

        .contact-modal-title-section p {
          font-family: var(--ff-mono);
          font-size: 12px;
          color: var(--subtle);
          margin: 0;
          line-height: 1.4;
        }

        .contact-modal-body {
          overflow-y: auto;
          overflow-x: hidden;
          padding: 18px 16px 26px 22px;
          -webkit-overflow-scrolling: touch;
          scrollbar-gutter: stable;
          flex: 1;
          scrollbar-width: thin;
          scrollbar-color: var(--line-2) transparent;
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
          border: 1px solid var(--line);
          transition: border-color 0.2s ease;
        }

        .contact-modal-item:hover {
          border-color: var(--line-2);
        }

        .contact-modal-item-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--brand-blue) 12%, transparent);
          color: var(--brand-blue);
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
          font-family: var(--ff-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--subtle);
        }

        .contact-modal-item-value {
          font-family: var(--ff-text);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text);
          overflow-wrap: break-word;
          word-break: break-word;
        }

        .contact-modal-copy-btn {
          width: 30px;
          height: 30px;
          background: transparent;
          border: 1px solid var(--line);
          color: var(--muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .contact-modal-copy-btn:hover {
          border-color: var(--brand-blue);
          color: var(--brand-blue);
        }

        .contact-modal-copy-btn.is-copied {
          border-color: var(--brand-blue);
          color: var(--brand-blue);
        }

        .contact-modal-label {
          font-family: var(--ff-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--subtle);
          margin: 0 0 10px 0;
        }

        .contact-modal-social {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--line);
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
          background: transparent;
          color: var(--muted);
          transition: all 0.2s ease;
          text-decoration: none;
          border: 1px solid var(--line);
          font-family: var(--ff-text);
          font-size: 12px;
          font-weight: 500;
        }

        .contact-modal-social-link:hover {
          color: var(--on-brand);
          background: var(--brand-blue);
          border-color: var(--brand-blue);
        }

        .contact-modal-project {
          padding: 18px;
          background: color-mix(in srgb, var(--brand-blue) 6%, transparent);
          border: 1px solid var(--line-2);
        }

        .contact-modal-project-badge {
          display: inline-block;
          font-family: var(--ff-mono);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--brand-blue);
          margin-bottom: 10px;
        }

        .contact-modal-project-headline {
          font-family: var(--ff-text);
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px 0;
          letter-spacing: -0.2px;
          line-height: 1.3;
        }

        .contact-modal-project-desc {
          font-family: var(--ff-text);
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.55;
          margin: 0 0 16px 0;
        }

        @media (max-width: 768px) {
          .contact-modal-container {
            width: 94%;
            max-width: 420px;
            max-height: 88vh;
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
        }

        @media (max-width: 480px) {
          .contact-modal-container {
            width: 96%;
            max-width: 380px;
            max-height: 92vh;
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

          .contact-modal-project-headline {
            font-size: 14px;
          }

          .contact-modal-project-desc {
            font-size: 11.5px;
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
        }
      `}</style>
    </>,
    document.body
  );
}
