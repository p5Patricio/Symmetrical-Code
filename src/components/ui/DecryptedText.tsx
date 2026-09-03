import React, { useEffect, useState, useRef, useCallback } from 'react';

const CIPHER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  triggerOnHover?: boolean;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 35,
  maxIterations = 12,
  className = '',
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / (maxIterations / text.length);
    }, speed);
  }, [text, speed, maxIterations]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAnimation]);

  return (
    <span
      onMouseEnter={triggerOnHover ? startAnimation : undefined}
      className={`font-mono transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};

export default DecryptedText;
