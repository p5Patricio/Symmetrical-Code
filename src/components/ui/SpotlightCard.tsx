import React, { useRef, useState, useCallback } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  accentColor?: string;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${className}`}
      style={{
        background: isHovered
          ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(3, 7, 18, 0.7) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0.006) 50%, rgba(3, 7, 18, 0.6) 100%)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.07)',
        boxShadow: isHovered
          ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 14px 34px -10px rgba(0, 0, 0, 0.5)'
          : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 6px 20px rgba(0, 0, 0, 0.35)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        ...style,
      }}
      {...props}
    >
      {/* ─── Physical Specular Top Sheen (Pure Neutral Rim) ─── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* ─── Physical Specular Surface Reflection (Zero Neon) ─── */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(380px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.045), transparent 65%)`,
        }}
      />

      {/* ─── Card Content ─── */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightCard;
