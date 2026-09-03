import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  accentColor?: string;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = 'rgba(255, 255, 255, 0.08)',
  accentColor,
  className = '',
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const activeSpotlight = accentColor ? `${accentColor}20` : spotlightColor;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${className}`}
      style={{
        background: isHovered
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 50%, rgba(3, 7, 18, 0.7) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.008) 50%, rgba(3, 7, 18, 0.6) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderColor: isHovered && accentColor ? `${accentColor}40` : isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered && accentColor
          ? `inset 0 1px 1px 0 rgba(255, 255, 255, 0.22), inset 0 0 0 1px ${accentColor}25, 0 16px 36px -12px ${accentColor}18, 0 8px 24px rgba(0, 0, 0, 0.4)`
          : isHovered
          ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 12px 30px rgba(0, 0, 0, 0.4)'
          : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 6px 20px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      }}
      {...props}
    >
      {/* ─── Liquid Glass Specular Top Sheen ─── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: isHovered && accentColor
            ? `linear-gradient(90deg, transparent 0%, ${accentColor}88 50%, transparent 100%)`
            : 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.25) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* ─── Minimalist Soft Radial Spotlight ─── */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${position.x}px ${position.y}px, ${activeSpotlight}, transparent 65%)`,
        }}
      />

      {/* ─── Card Content ─── */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
