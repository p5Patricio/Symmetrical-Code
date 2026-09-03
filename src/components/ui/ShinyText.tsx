import React from 'react';

interface ShinyTextProps {
  text: string;
  speed?: number;
  className?: string;
  highlightColor?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 4,
  className = '',
  highlightColor = '#ffffff',
}) => {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#94a3b8,35%,var(--shiny-highlight),50%,#94a3b8,65%)] bg-[length:250%_100%] animate-shine ${className}`}
      style={
        {
          '--shiny-highlight': highlightColor,
          animation: `shine ${speed}s linear infinite`,
        } as React.CSSProperties
      }
    >
      {text}
    </span>
  );
};

export default ShinyText;
