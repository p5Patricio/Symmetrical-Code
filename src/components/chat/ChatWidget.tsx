import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ transform: 'translateY(-2px)' }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ChatWidget() {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar el tooltip automáticamente después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      // Solo mostrar si no se ha cerrado manualmente en esta sesión
      const dismissed = sessionStorage.getItem('whatsapp_tooltip_dismissed');
      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowTooltip(false);
    sessionStorage.setItem('whatsapp_tooltip_dismissed', 'true');
  };

  // WhatsApp Link - Se actualizará con el número real cuando el usuario lo provea
  const whatsappUrl = "https://wa.me/XXXXXXXXXXX"; 

  return (
    <div className="fixed bottom-6 right-6 z-[450] flex items-center gap-3">
      {/* Tooltip Card Autoprompt */}
      <div 
        className={`
          relative bg-[#070d14] border border-[rgba(0,229,255,0.3)] px-4 py-2.5 rounded-xl
          transition-all duration-500 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.5)]
          ${(showTooltip || hovered) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}
      >
        <button 
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-5 h-5 bg-[#020408] border border-white/10 rounded-full flex items-center justify-center text-[10px] text-white/40 hover:text-white hover:border-[#00e5ff]/40 transition-colors"
          aria-label="Cerrar aviso"
        >
          ✕
        </button>
        <p className="text-white text-[11px] font-mono tracking-wider whitespace-nowrap pr-2">
          {t('contact.whatsapp_tooltip', { defaultValue: 'Contáctanos por WhatsApp' })}
        </p>
      </div>

      {/* WhatsApp Button */}
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
          bg-gradient-to-br from-[#00e5ff] to-[#1565ff] text-[#020408]
          hover:scale-110 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]
        "
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
