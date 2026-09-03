import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface ChatWidgetProps {
  forceVisible?: boolean;
}

export default function ChatWidget({ forceVisible = false }: ChatWidgetProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  const checkFooter = useCallback(() => {
    const footer = document.querySelector('footer');
    if (!footer) {
      setFooterVisible(false);
      return;
    }
    const rect = footer.getBoundingClientRect();
    setFooterVisible(rect.top < window.innerHeight);
  }, []);

  useEffect(() => {
    if (forceVisible) {
      return;
    }

    checkFooter();
    window.addEventListener('scroll', checkFooter, { passive: true });
    window.addEventListener('resize', checkFooter, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', checkFooter);
      window.removeEventListener('resize', checkFooter);
    };
  }, [checkFooter, forceVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('whatsapp_tooltip_dismissed');
      if (!dismissed) setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem('whatsapp_tooltip_dismissed', 'true');
  };

  const whatsappUrl = 'https://wa.me/524737374224';

  const isVisible = forceVisible ? true : !footerVisible;

  return (
    <div
      className="fixed right-6 bottom-6 z-[600] flex items-center gap-3"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
    >
      <div
        className={`
          relative ${isLight ? 'bg-white border-[rgba(25,95,193,0.2)] shadow-[0_10px_30px_rgba(25,95,193,0.12)]' : 'bg-[#070d14] border-[rgba(25,95,193,0.3)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'} px-4 py-2.5 rounded-xl
          transition-all duration-300 ease-out
          ${(showTooltip || hovered)
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        <button
          onClick={handleDismiss}
          className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-colors ${isLight ? 'bg-white border border-[#195fc1]/20 text-slate-400 hover:text-slate-800' : 'bg-[#020408] border border-white/10 text-white/40 hover:text-white hover:border-[#195fc1]/40'}`}
          aria-label="Cerrar aviso"
        >
          ✕
        </button>
        <p className={`${isLight ? 'text-[#0B132B]' : 'text-white'} text-[11px] font-mono tracking-wider whitespace-nowrap pr-2`}>
          {t('contact.whatsapp_tooltip', { defaultValue: 'Contáctanos por WhatsApp' })}
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          w-14 h-14 rounded-full shrink-0
          flex items-center justify-center
          transition-all duration-300 ease-out
          bg-gradient-to-br from-[#195fc1] to-[#0d3b82] text-white
          hover:scale-110 hover:shadow-[0_0_40px_rgba(25,95,193,0.6)]
        "
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}