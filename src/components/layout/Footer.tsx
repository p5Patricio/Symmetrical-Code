import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaShieldAlt, FaFileContract, FaCookieBite, FaCheckCircle } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiX } from 'react-icons/fi';

export default function Footer() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<'privacidad' | 'terminos' | 'cookies' | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  const whatsappMessage = t('whatsapp.message_footer');
  const whatsappUrl = `https://wa.me/524737374224?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeModal]);

  const modalContent = {
    privacidad: {
      titulo: t('footer.modal_privacy_title'),
      icon: FaShieldAlt,
      fecha: t('footer.modal_last_updated'),
      contenido: (
        <>
          <div className="modal-section">
            <h3>{t('footer.privacy_s1_title')}</h3>
            <p>{t('footer.privacy_s1_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s2_title')}</h3>
            <p>{t('footer.privacy_s2_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s3_title')}</h3>
            <p>{t('footer.privacy_s3_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s4_title')}</h3>
            <p>{t('footer.privacy_s4_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s5_title')}</h3>
            <p>{t('footer.privacy_s5_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s6_title')}</h3>
            <p>{t('footer.privacy_s6_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.privacy_s7_title')}</h3>
            <p>{t('footer.privacy_s7_body')}</p>
          </div>
        </>
      )
    },
    terminos: {
      titulo: t('footer.modal_terms_title'),
      icon: FaFileContract,
      fecha: t('footer.modal_last_updated'),
      contenido: (
        <>
          <div className="modal-section">
            <h3>{t('footer.terms_s1_title')}</h3>
            <p>{t('footer.terms_s1_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.terms_s2_title')}</h3>
            <p>{t('footer.terms_s2_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.terms_s3_title')}</h3>
            <p>{t('footer.terms_s3_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.terms_s4_title')}</h3>
            <p>{t('footer.terms_s4_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.terms_s5_title')}</h3>
            <p>{t('footer.terms_s5_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.terms_s6_title')}</h3>
            <p>{t('footer.terms_s6_body')}</p>
          </div>
        </>
      )
    },
    cookies: {
      titulo: t('footer.modal_cookies_title'),
      icon: FaCookieBite,
      fecha: t('footer.modal_last_updated'),
      contenido: (
        <>
          <div className="modal-section">
            <h3>{t('footer.cookies_s1_title')}</h3>
            <p>{t('footer.cookies_s1_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.cookies_s2_title')}</h3>
            <p><strong>{t('footer.cookies_s2_essential_label')}</strong> {t('footer.cookies_s2_essential_body')}</p>
            <p><strong>{t('footer.cookies_s2_performance_label')}</strong> {t('footer.cookies_s2_performance_body')}</p>
            <p><strong>{t('footer.cookies_s2_functional_label')}</strong> {t('footer.cookies_s2_functional_body')}</p>
            <p><strong>{t('footer.cookies_s2_ads_label')}</strong> {t('footer.cookies_s2_ads_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.cookies_s3_title')}</h3>
            <p>{t('footer.cookies_s3_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.cookies_s4_title')}</h3>
            <p>{t('footer.cookies_s4_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.cookies_s5_title')}</h3>
            <p>{t('footer.cookies_s5_body')}</p>
          </div>
          <div className="modal-section">
            <h3>{t('footer.cookies_s6_title')}</h3>
            <p>{t('footer.cookies_s6_body')}</p>
          </div>
        </>
      )
    }
  };

  const renderModal = (type: 'privacidad' | 'terminos' | 'cookies', onClose: () => void) => {
    const content = modalContent[type];
    const Icon = content.icon;

    return (
      <>
        <div className="modal-overlay" onClick={onClose} />

        <div className="modal-container">
          <div className="modal-glow" />

          <div className="modal-header">
            <div className="modal-icon">
              <Icon size={24} />
            </div>
            <div className="modal-title-section">
              <h2>{content.titulo}</h2>
              <p>{content.fecha}</p>
            </div>
            <button className="modal-close" onClick={onClose}>
              <FiX size={20} />
            </button>
          </div>

          <div className="modal-content-wrapper">
            <div className="modal-content" ref={modalContentRef}>
              {content.contenido}
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-button" onClick={onClose}>
              <FaCheckCircle size={18} />
              <span>{t('footer.modal_understood')}</span>
            </button>
          </div>
        </div>

        <style>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 9998;
          }

          .modal-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 92%;
            max-width: 650px;
            height: auto;
            max-height: 85vh;
            background: #000000;
            border-radius: 20px;
            border: 1px solid rgba(0, 229, 255, 0.15);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            flex-direction: column;
          }

          .modal-glow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent);
          }

          .modal-header {
            padding: 20px 24px;
            display: flex;
            align-items: center;
            gap: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            flex-shrink: 0;
          }

          .modal-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 229, 255, 0.08);
            color: #00e5ff;
            border: 1px solid rgba(0, 229, 255, 0.15);
            flex-shrink: 0;
          }

          .modal-title-section {
            flex: 1;
            min-width: 0;
          }

          .modal-title-section h2 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 2px 0;
            word-break: break-word;
          }

          .modal-title-section p {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.35);
            margin: 0;
          }

          .modal-close {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.06);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            color: rgba(255, 255, 255, 0.5);
            flex-shrink: 0;
          }

          .modal-close:hover {
            background: rgba(0, 229, 255, 0.12);
            border-color: #00e5ff;
            color: #00e5ff;
          }

          .modal-close:active {
            transform: scale(0.92);
          }

          .modal-content-wrapper {
            flex: 1;
            overflow-y: auto;
            min-height: 0;
            padding: 0 24px;
          }

          .modal-content {
            padding: 16px 0 20px 0;
          }

          .modal-content-wrapper::-webkit-scrollbar {
            width: 4px;
          }

          .modal-content-wrapper::-webkit-scrollbar-track {
            background: transparent;
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb {
            background: rgba(0, 229, 255, 0.3);
            border-radius: 10px;
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb:hover {
            background: #00e5ff;
          }

          .modal-content-wrapper {
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 229, 255, 0.3) transparent;
          }

          .modal-section {
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          }

          .modal-section:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .modal-section h3 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 15px;
            font-weight: 600;
            color: #00e5ff;
            margin: 0 0 8px 0;
          }

          .modal-section p {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 13px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.7);
            margin: 0 0 4px 0;
          }

          .modal-section p strong {
            color: #00e5ff;
          }

          .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            display: flex;
            justify-content: center;
            flex-shrink: 0;
            background: rgba(0, 0, 0, 0.2);
          }

          .modal-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 40px;
            min-width: 160px;
            border: none;
            border-radius: 40px;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #000000;
            background: #00e5ff;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 15px rgba(0, 229, 255, 0.25);
          }

          .modal-button:hover {
            background: #00ccee;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0, 229, 255, 0.3);
          }

          .modal-button:active {
            transform: translateY(0) scale(0.98);
          }

          @media (max-width: 768px) {
            .modal-container {
              width: 95%;
              max-height: 90vh;
              border-radius: 16px;
            }

            .modal-header {
              padding: 16px 18px;
              gap: 12px;
            }

            .modal-icon {
              width: 38px;
              height: 38px;
            }

            .modal-icon svg {
              width: 18px;
              height: 18px;
            }

            .modal-title-section h2 {
              font-size: 17px;
            }

            .modal-title-section p {
              font-size: 10px;
            }

            .modal-close {
              width: 32px;
              height: 32px;
            }

            .modal-close svg {
              width: 16px;
              height: 16px;
            }

            .modal-content-wrapper {
              padding: 0 18px;
            }

            .modal-content {
              padding: 12px 0 16px 0;
            }

            .modal-section {
              margin-bottom: 16px;
              padding-bottom: 12px;
            }

            .modal-section h3 {
              font-size: 14px;
            }

            .modal-section p {
              font-size: 12.5px;
              line-height: 1.5;
            }

            .modal-footer {
              padding: 14px 18px;
            }

            .modal-button {
              padding: 11px 32px;
              min-width: 140px;
              font-size: 13px;
            }

            .modal-button svg {
              width: 16px;
              height: 16px;
            }
          }

          @media (max-width: 480px) {
            .modal-container {
              width: 98%;
              max-height: 92vh;
              border-radius: 14px;
            }

            .modal-header {
              padding: 14px 14px;
              gap: 10px;
            }

            .modal-icon {
              width: 34px;
              height: 34px;
            }

            .modal-icon svg {
              width: 16px;
              height: 16px;
            }

            .modal-title-section h2 {
              font-size: 15px;
            }

            .modal-title-section p {
              font-size: 9px;
            }

            .modal-close {
              width: 28px;
              height: 28px;
            }

            .modal-close svg {
              width: 14px;
              height: 14px;
            }

            .modal-content-wrapper {
              padding: 0 14px;
            }

            .modal-content {
              padding: 10px 0 14px 0;
            }

            .modal-section {
              margin-bottom: 14px;
              padding-bottom: 10px;
            }

            .modal-section h3 {
              font-size: 13px;
            }

            .modal-section p {
              font-size: 12px;
              line-height: 1.5;
            }

            .modal-footer {
              padding: 12px 14px;
            }

            .modal-button {
              padding: 10px 28px;
              min-width: 120px;
              font-size: 12.5px;
              gap: 6px;
            }

            .modal-button svg {
              width: 14px;
              height: 14px;
            }
          }
        `}</style>
      </>
    );
  };

  return (
    <footer style={{
      background: 'transparent',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      position: 'relative',
      marginTop: 'auto',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(0, 180, 220, 0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '60px 40px 40px', 
        position: 'relative', 
        zIndex: 1,
      }}>
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img
                src="/favicon.svg"
                alt="Symmetrical Code"
                style={{ height: '40px', width: 'auto' }}
              />
              <span style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                color: '#ffffff',
                letterSpacing: '-0.5px'
              }}>
                Symmetrical<span style={{ color: '#00e5ff' }}>Code</span>
              </span>
            </div>

            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}>
              {t('footer.tagline')}
            </p>

            <div>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#00e5ff',
                marginBottom: '14px',
              }}>
                {t('footer.follow')}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'rgba(255,255,255,0.5)',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                      onMouseEnter={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = '#00e5ff';
                        target.style.color = '#000000';
                        target.style.borderColor = '#00e5ff';
                        target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.background = 'rgba(255,255,255,0.03)';
                        target.style.color = 'rgba(255,255,255,0.5)';
                        target.style.borderColor = 'rgba(255,255,255,0.06)';
                        target.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="footer-col">
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00e5ff',
              marginBottom: '20px',
            }}>
              {t('footer.contact_title')}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              flex: 1,
            }}>
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '6px 0',
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: '#00e5ff',
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.85)',
                    }}>
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00e5ff',
              marginBottom: '20px',
            }}>
              {t('footer.project_title')}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '4px',
                letterSpacing: '-0.3px',
              }}>
                {t('footer.project_headline')}
              </p>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#00e5ff',
                marginBottom: '10px',
              }}>
                {t('footer.project_sub')}
              </p>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: '1.5',
                marginBottom: '20px',
              }}>
                {t('footer.project_desc')}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#000000',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  background: '#00e5ff',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 229, 255, 0.2)',
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  marginTop: 'auto',
                }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = '#00ccee';
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 6px 18px rgba(0, 229, 255, 0.3)';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.background = '#00e5ff';
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 4px 12px rgba(0, 229, 255, 0.2)';
                }}
              >
                {t('footer.cta')}
              </a>
            </div>
          </div>
        </div>

        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.1), rgba(0,229,255,0.1), transparent)',
          margin: '30px 0 25px',
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {(
              [
                { key: 'privacidad', label: t('footer.privacy') },
                { key: 'terminos',   label: t('footer.terms') },
                { key: 'cookies',    label: t('footer.cookies') },
              ] as { key: 'privacidad' | 'terminos' | 'cookies'; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveModal(key)}
                className="legal-btn"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  minHeight: '32px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  lineHeight: 1,
                  borderRadius: '6px',
                }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = '#00e5ff';
                  target.style.background = 'rgba(0, 229, 255, 0.08)';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.color = 'rgba(255,255,255,0.5)';
                  target.style.background = 'transparent';
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <span className="copyright-text">
            © Symmetrical Code {new Date().getFullYear()}
          </span>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
          align-items: start;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .legal-btn {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .whatsapp-btn {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .copyright-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
          display: inline-block;
          animation: glowPulse 3s ease-in-out infinite;
          padding: 4px 12px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .copyright-text:hover {
          color: #00e5ff;
          text-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
          animation-play-state: paused;
        }

        @keyframes glowPulse {
          0%, 100% {
            color: rgba(255, 255, 255, 0.25);
            text-shadow: 0 0 0px rgba(0, 229, 255, 0);
          }
          30% {
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
          }
          50% {
            color: #00e5ff;
            text-shadow: 0 0 25px rgba(0, 229, 255, 0.4), 0 0 50px rgba(0, 229, 255, 0.15);
          }
          70% {
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            gap: 30px;
            margin-bottom: 35px;
          }
          
          .footer-col {
            min-width: 0;
          }

          .copyright-text {
            font-size: 10px;
            padding: 3px 10px;
          }

          .legal-btn {
            font-size: 11px !important;
            padding: 5px 10px !important;
            min-height: 28px !important;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            gap: 24px;
            margin-bottom: 30px;
          }

          .copyright-text {
            font-size: 9px;
            padding: 2px 8px;
          }

          .legal-btn {
            font-size: 10px !important;
            padding: 4px 8px !important;
            min-height: 26px !important;
          }
        }
      `}</style>

      {activeModal && renderModal(activeModal, () => setActiveModal(null))}
    </footer>
  );
}