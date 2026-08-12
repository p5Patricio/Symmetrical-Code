import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // Por defecto true para evitar flash
  const [isInitialized, setIsInitialized] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

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
    // Leer sessionStorage al inicio
    const dismissed = sessionStorage.getItem('whatsapp_tooltip_dismissed');
    
    if (dismissed === 'true') {
      setIsDismissed(true);
      setShowTooltip(false);
      setIsInitialized(true);
    } else {
      setIsDismissed(false);
      // Mostrar el tooltip después de 2 segundos solo si no está descartado
      const timer = setTimeout(() => {
        // Verificar nuevamente antes de mostrar
        const stillDismissed = sessionStorage.getItem('whatsapp_tooltip_dismissed');
        if (stillDismissed !== 'true') {
          setShowTooltip(true);
        }
        setIsInitialized(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Manejar clicks fuera del tooltip en celular
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (showTooltip && !isDismissed && tooltipRef.current) {
        const target = e.target as Node;
        // Verificar si el click fue fuera del tooltip y no en el botón de WhatsApp
        if (!tooltipRef.current.contains(target)) {
          const whatsappBtn = document.querySelector('a[aria-label="WhatsApp"]');
          if (whatsappBtn && !whatsappBtn.contains(target)) {
            // Solo cerramos si no fue en el botón de WhatsApp
            setShowTooltip(false);
            setIsDismissed(true);
            sessionStorage.setItem('whatsapp_tooltip_dismissed', 'true');
          }
        }
      }
    };

    if (showTooltip && !isDismissed) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTooltip, isDismissed]);

  const handleDismiss = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    setIsDismissed(true);
    sessionStorage.setItem('whatsapp_tooltip_dismissed', 'true');
  };

  const whatsappMessage = t('whatsapp.message_chatwidget');
  const whatsappUrl = `https://wa.me/524737374224?text=${encodeURIComponent(whatsappMessage)}`;

  const isVisible = forceVisible ? true : !footerVisible;
  
  // El tooltip solo se muestra si está inicializado, no está descartado y showTooltip es true
  const shouldShowTooltip = isInitialized && showTooltip && !isDismissed;

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
        ref={tooltipRef}
        className={`
          relative bg-[#070d14] border border-[rgba(0,229,255,0.3)] px-4 py-2.5 rounded-xl
          shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          transition-all duration-300 ease-out
          ${(shouldShowTooltip || hovered)
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
        style={{
          pointerEvents: (shouldShowTooltip || hovered) ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleDismiss}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDismiss(e);
          }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-[#020408] border border-white/10 rounded-full flex items-center justify-center text-[10px] text-white/40 hover:text-white hover:border-[#00e5ff]/40 transition-colors z-10"
          aria-label="Cerrar aviso"
          type="button"
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          ✕
        </button>
        <p className="text-white text-[11px] font-mono tracking-wider whitespace-nowrap pr-2">
          {t('contact.whatsapp_tooltip', { defaultValue: 'Contáctanos por WhatsApp' })}
        </p>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => {
          // En celular, al tocar el botón de WhatsApp, ocultamos el tooltip
          if (showTooltip && !isDismissed) {
            setShowTooltip(false);
            setIsDismissed(true);
            sessionStorage.setItem('whatsapp_tooltip_dismissed', 'true');
          }
        }}
        className="
          w-14 h-14 rounded-full shrink-0
          flex items-center justify-center
          transition-all duration-300 ease-out
          bg-gradient-to-br from-[#00e5ff] to-[#1565ff] text-[#020408]
          hover:scale-110 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]
          active:scale-95
        "
        aria-label="WhatsApp"
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          touchAction: 'manipulation',
        }}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}