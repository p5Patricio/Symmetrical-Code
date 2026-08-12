import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaShieldAlt, FaFileContract, FaCookieBite, FaCheckCircle } from 'react-icons/fa';
import { FiMapPin, FiMail, FiClock, FiX, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<'privacidad' | 'terminos' | 'cookies' | 'contacto' | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591503452553', icon: FaFacebookF },
    { label: 'Instagram', href: 'https://www.instagram.com/symmetrical.code', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/symmetrical-code', icon: FaLinkedinIn },
  ];

  const contactItems = [
    { icon: FiMail, text: 'contacto@symmetricalcode.com', label: 'Correo electrónico', detail: 'Escríbenos para cualquier consulta o proyecto' },
    { icon: FiClock, text: t('footer.schedule'), label: 'Horario de atención', detail: 'Estamos disponibles en horario laboral' },
    { icon: FiMapPin, text: t('footer.location'), label: 'Ubicación', detail: 'Operamos de forma remota y presencial' },
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeModal && modalContentRef.current) {
        const modal = document.querySelector('.modal-container');
        if (modal && !modal.contains(e.target as Node)) {
          setActiveModal(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    },
    contacto: {
      titulo: 'Información de Contacto',
      icon: FiMail,
      fecha: 'Actualizado recientemente',
      contenido: (
        <>
          <div className="modal-section contact-highlight">
            <div className="contact-item-modal">
              <FiMail size={22} className="contact-icon-modal" />
              <div>
                <h4>Correo Electrónico</h4>
                <a href="mailto:contacto@symmetricalcode.com" className="contact-link-modal">
                  contacto@symmetricalcode.com
                  <FiExternalLink size={14} />
                </a>
                <p>Escríbenos para cualquier consulta o proyecto</p>
              </div>
            </div>
          </div>

          <div className="modal-section contact-highlight">
            <div className="contact-item-modal">
              <FiClock size={22} className="contact-icon-modal" />
              <div>
                <h4>Horario de Atención</h4>
                <p className="contact-text-modal">{t('footer.schedule')}</p>
                <p>Estamos disponibles en horario laboral</p>
              </div>
            </div>
          </div>

          <div className="modal-section contact-highlight">
            <div className="contact-item-modal">
              <FiMapPin size={22} className="contact-icon-modal" />
              <div>
                <h4>Ubicación</h4>
                <p className="contact-text-modal">{t('footer.location')}</p>
                <p>Operamos de forma remota y presencial</p>
              </div>
            </div>
          </div>

          <div className="modal-section contact-highlight" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
            <div className="contact-item-modal">
              <FaWhatsapp size={22} className="contact-icon-modal" style={{ color: '#25D366' }} />
              <div>
                <h4>WhatsApp</h4>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-modal"
                  style={{ color: '#25D366' }}
                >
                  +52 473 737 4224
                  <FiExternalLink size={14} />
                </a>
                <p>Respuesta rápida por mensaje</p>
              </div>
            </div>
          </div>
        </>
      )
    }
  };

  const renderModal = (type: 'privacidad' | 'terminos' | 'cookies' | 'contacto', onClose: () => void) => {
    const content = modalContent[type];
    const Icon = content.icon;
    const isContact = type === 'contacto';

    return (
      <>
        <div className="modal-overlay" onClick={onClose} />

        <div className={`modal-container ${isContact ? 'modal-contact' : ''}`}>
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
              transform: translate(-50%, -45%) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes slideUpMobile {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
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
            -webkit-backdrop-filter: blur(8px);
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

          .modal-contact {
            max-width: 600px;
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
            flex-shrink: 0;
          }

          .modal-title-section {
            flex: 1;
            min-width: 0;
          }

          .modal-title-section h2 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 22px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 4px 0;
            word-break: break-word;
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
            flex-shrink: 0;
          }

          .modal-close:hover {
            background: rgba(0, 229, 255, 0.15);
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
            padding: 0 28px;
          }

          .modal-content {
            padding: 20px 0 28px 0;
          }

          .modal-content-wrapper::-webkit-scrollbar {
            width: 6px;
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

          .contact-highlight {
            background: rgba(0, 229, 255, 0.03);
            border-radius: 12px;
            padding: 16px 18px;
            border: 1px solid rgba(0, 229, 255, 0.06);
            transition: all 0.2s ease;
          }

          .contact-highlight:hover {
            background: rgba(0, 229, 255, 0.06);
            border-color: rgba(0, 229, 255, 0.12);
          }

          .contact-item-modal {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .contact-icon-modal {
            color: #00e5ff;
            flex-shrink: 0;
            margin-top: 2px;
          }

          .contact-item-modal h4 {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 4px 0;
          }

          .contact-link-modal {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 15px;
            font-weight: 500;
            color: #00e5ff;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            word-break: break-all;
          }

          .contact-link-modal:hover {
            color: #00ccee;
            transform: translateX(2px);
          }

          .contact-text-modal {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.85);
            margin: 0;
          }

          .contact-item-modal p:last-child {
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.45);
            margin: 4px 0 0 0;
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
            transform: translateY(0) scale(0.98);
          }

          @media (max-width: 768px) {
            .modal-container {
              width: 95%;
              height: 90vh;
              max-height: 90vh;
              border-radius: 20px;
              animation: slideUpMobile 0.3s ease;
            }

            .modal-header {
              padding: 18px 18px 16px 18px;
              gap: 12px;
            }

            .modal-icon {
              width: 40px;
              height: 40px;
            }

            .modal-icon svg {
              width: 18px;
              height: 18px;
            }

            .modal-title-section h2 {
              font-size: 18px;
            }

            .modal-title-section p {
              font-size: 11px;
            }

            .modal-close {
              width: 34px;
              height: 34px;
            }

            .modal-content-wrapper {
              padding: 0 16px;
            }

            .modal-content {
              padding: 16px 0 20px 0;
            }

            .modal-section {
              margin-bottom: 20px;
              padding-bottom: 16px;
            }

            .modal-section h3 {
              font-size: 15px;
            }

            .modal-section p {
              font-size: 13px;
              line-height: 1.5;
            }

            .modal-footer {
              padding: 16px 18px;
            }

            .modal-button {
              padding: 12px 32px;
              min-width: 160px;
              font-size: 14px;
            }

            .contact-highlight {
              padding: 14px 14px;
            }

            .contact-item-modal {
              gap: 12px;
            }

            .contact-icon-modal {
              width: 20px;
              height: 20px;
            }

            .contact-item-modal h4 {
              font-size: 13px;
            }

            .contact-link-modal {
              font-size: 14px;
            }

            .contact-text-modal {
              font-size: 13px;
            }

            .contact-item-modal p:last-child {
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .modal-container {
              width: 98%;
              height: 95vh;
              max-height: 95vh;
              border-radius: 16px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .modal-header {
              padding: 14px 14px 12px 14px;
              gap: 10px;
            }

            .modal-icon {
              width: 36px;
              height: 36px;
            }

            .modal-icon svg {
              width: 16px;
              height: 16px;
            }

            .modal-title-section h2 {
              font-size: 16px;
            }

            .modal-title-section p {
              font-size: 10px;
            }

            .modal-close {
              width: 30px;
              height: 30px;
            }

            .modal-close svg {
              width: 16px;
              height: 16px;
            }

            .modal-content-wrapper {
              padding: 0 12px;
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
              font-size: 12px;
              line-height: 1.5;
            }

            .modal-footer {
              padding: 14px 14px;
            }

            .modal-button {
              padding: 10px 24px;
              min-width: 140px;
              font-size: 13px;
              gap: 8px;
            }

            .modal-button svg {
              width: 16px;
              height: 16px;
            }

            .contact-highlight {
              padding: 12px 12px;
            }

            .contact-item-modal {
              gap: 10px;
            }

            .contact-icon-modal {
              width: 18px;
              height: 18px;
            }

            .contact-item-modal h4 {
              font-size: 12px;
            }

            .contact-link-modal {
              font-size: 13px;
            }

            .contact-text-modal {
              font-size: 12px;
            }

            .contact-item-modal p:last-child {
              font-size: 11px;
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
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #00e5ff, #00e5ff, transparent)',
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
                src="/logo.webp"
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
              gap: '12px',
              flex: 1,
            }}>
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveModal('contacto')}
                    className="contact-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 10px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all 0.25s ease',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                    onMouseEnter={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(0, 229, 255, 0.06)';
                      target.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                      target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.background = 'rgba(255,255,255,0.02)';
                      target.style.borderColor = 'rgba(255,255,255,0.04)';
                      target.style.transform = 'translateX(0)';
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
                    <span style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}>
                      {item.text}
                    </span>
                  </button>
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
              {t('footer.assistant_title')}
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
                <FaWhatsapp size={16} style={{ color: '#000000' }} />
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
            gap: '12px',
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
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  minHeight: '36px',
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

          {/* Copyright con animación de iluminación */}
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

        .contact-btn {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .legal-btn {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .whatsapp-btn {
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* Copyright con animación de iluminación */
        .copyright-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
          display: inline-block;
          animation: glowPulse 3s ease-in-out infinite;
          position: relative;
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
        }
      `}</style>

      {activeModal && renderModal(activeModal, () => setActiveModal(null))}
    </footer>
  );
}