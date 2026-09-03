import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  showCorners?: boolean;
  showDotMatrix?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(0, 229, 255, 0.15)',
  className = '',
  showCorners = true,
  showDotMatrix = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b12]/80 backdrop-blur-md transition-all duration-300 hover:border-white/20 ${className}`}
      {...props}
    >
      {/* ─── Dot Matrix Blueprint Texture ─── */}
      {showDotMatrix && (
        <div
          className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-35"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      )}

      {/* ─── React Bits Dynamic Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* ─── Cyberpunk Corner Brackets ─── */}
      {showCorners && (
        <>
          <div className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 transition-colors duration-300 group-hover:border-[#00e5ff]" />
          <div className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 transition-colors duration-300 group-hover:border-[#00e5ff]" />
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 transition-colors duration-300 group-hover:border-[#00e5ff]" />
          <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 transition-colors duration-300 group-hover:border-[#00e5ff]" />
        </>
      )}

      {/* ─── Card Content ─── */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
