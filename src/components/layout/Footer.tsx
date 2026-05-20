import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaShieldAlt, FaFileContract, FaCookieBite, FaCheckCircle } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiX } from 'react-icons/fi';
import { SiX } from 'react-icons/si';

export default function Footer() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<'privacidad' | 'terminos' | 'cookies' | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { label: 'Facebook', href: '#', icon: FaFacebookF },
    { label: 'Instagram', href: '#', icon: FaInstagram },
    { label: 'X', href: '#', icon: SiX },
    { label: 'LinkedIn', href: '#', icon: FaLinkedinIn },
  ];

  const contactItems = [
    { icon: FiMail, text: 'hola@symmetricalcode.com' },
    { icon: FiClock, text: t('footer.schedule') },
    { icon: FiMapPin, text: t('footer.location') },
  ];

  const whatsappNumber = '5214731234567';
  const chatbotMessage = encodeURIComponent(t('footer.whatsapp_message'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${chatbotMessage}`;

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

  const Modal = ({ type, onClose }: { type: 'privacidad' | 'terminos' | 'cookies', onClose: () => void }) => {
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, -48%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(8px);
            z-index: 9998;
            animation: fadeIn 0.3s ease;
          }

          .modal-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 700px;
            height: 80vh;
            max-height: 600px;
            background: #000000;
            border-radius: 24px;
            border: 1px solid rgba(0, 229, 255, 0.2);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 180, 220, 0.06);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.35s ease;
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
            padding: 24px 28px;
            display: flex;
            align-items: center;
            gap: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-shrink: 0;
          }

          .modal-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 229, 255, 0.1);
            color: #00e5ff;
            border: 1px solid rgba(0, 229, 255, 0.2);
          }

          .modal-title-section {
            flex: 1;
          }

          .modal-title-section h2 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 22px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 4px 0;
          }

          .modal-title-section p {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.4);
            margin: 0;
          }

          .modal-close {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            color: rgba(255, 255, 255, 0.6);
          }

          .modal-close:hover {
            background: rgba(0, 229, 255, 0.15);
            border-color: #00e5ff;
            color: #00e5ff;
          }

          .modal-content-wrapper {
            flex: 1;
            overflow-y: auto;
            min-height: 0;
            padding: 0 28px;
          }

          .modal-content {
            padding: 20px 0 28px 0;
          }

          .modal-content-wrapper::-webkit-scrollbar {
            width: 8px;
          }

          .modal-content-wrapper::-webkit-scrollbar-track {
            background: #111111;
            border-radius: 10px;
            margin: 8px 0;
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb {
            background: #00e5ff;
            border-radius: 10px;
          }

          .modal-content-wrapper::-webkit-scrollbar-thumb:hover {
            background: #00ccee;
          }

          .modal-content-wrapper {
            scrollbar-width: thin;
            scrollbar-color: #00e5ff #111111;
          }

          .modal-section {
            margin-bottom: 28px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .modal-section:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
          }

          .modal-section h3 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #00e5ff;
            margin: 0 0 10px 0;
          }

          .modal-section p {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.75);
            margin: 0 0 6px 0;
          }

          .modal-section p strong {
            color: #00e5ff;
          }

          .modal-footer {
            padding: 20px 28px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            display: flex;
            justify-content: center;
            flex-shrink: 0;
            background: rgba(0, 0, 0, 0.3);
          }

          .modal-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 48px;
            min-width: 200px;
            border: none;
            border-radius: 40px;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: #000000;
            background: #00e5ff;
            cursor: pointer;
            transition: all 0.25s ease;
            box-shadow: 0 4px 15px rgba(0, 229, 255, 0.3);
          }

          .modal-button:hover {
            background: #00ccee;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 229, 255, 0.4);
          }

          .modal-button:active {
            transform: translateY(0);
          }

          @media (max-width: 640px) {
            .modal-container {
              width: 95%;
              height: 85vh;
            }

            .modal-header {
              padding: 20px 20px;
            }

            .modal-icon {
              width: 42px;
              height: 42px;
            }

            .modal-title-section h2 {
              font-size: 18px;
            }

            .modal-content-wrapper {
              padding: 0 20px;
            }

            .modal-footer {
              padding: 16px 20px;
            }

            .modal-button {
              padding: 12px 32px;
              min-width: 180px;
              font-size: 15px;
            }
          }
        `}</style>
      </>
    );
  };

  return (
    <footer style={{
      background: '#000000',
      borderTop: '1px solid rgba(0, 229, 255, 0.15)',
      position: 'relative',
      marginTop: 'auto',
      overflow: 'hidden',
    }}>
      {/* Top gradient line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent)',
      }} />

      {/* Glow radial — igual al resplandor del logo */}
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 40px', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '50px',
          alignItems: 'stretch',
        }}>

          {/* Columna 1: Logo + Tagline + Redes */}
          <div style={{
            flex: '1',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <img
                src="/logo.png"
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

            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}>
                {t('footer.tagline')}
              </p>
            </div>

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
              <div style={{ display: 'flex', gap: '10px' }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
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

          {/* Columna 2: Contacto */}
          <div style={{
            flex: '1',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>
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
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px',
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

          {/* Columna 3: Asistente / WhatsApp */}
          <div style={{
            flex: '1',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#00e5ff',
              marginBottom: '20px',
            }}>
              {t('footer.assistant_title')}
            </p>

            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '6px',
                letterSpacing: '-0.3px',
              }}>
                {t('footer.project_headline')}
              </p>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                color: '#00e5ff',
                marginBottom: '12px',
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
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
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
                  padding: '10px 20px',
                  background: '#00e5ff',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 229, 255, 0.2)',
                  width: '100%',
                  border: 'none',
                  cursor: 'pointer',
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
                <FaWhatsapp size={16} style={{ color: '#000000' }} />
                {t('footer.cta')}
              </a>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.1), rgba(0,229,255,0.1), transparent)',
          margin: '30px 0 25px',
        }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
          }}>
            © {new Date().getFullYear()} Symmetrical Code.
          </span>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveModal('privacidad')}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00e5ff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
            >
              {t('footer.privacy')}
            </button>
            <button
              onClick={() => setActiveModal('terminos')}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00e5ff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
            >
              {t('footer.terms')}
            </button>
            <button
              onClick={() => setActiveModal('cookies')}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                transition: 'color 0.2s',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00e5ff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
            >
              {t('footer.cookies')}
            </button>
          </div>
        </div>
      </div>

      {activeModal === 'privacidad' && (
        <Modal type="privacidad" onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'terminos' && (
        <Modal type="terminos" onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'cookies' && (
        <Modal type="cookies" onClose={() => setActiveModal(null)} />
      )}
    </footer>
  );
}