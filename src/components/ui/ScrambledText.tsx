import React, { useEffect, useRef, useMemo } from 'react';
import './ScrambledText.css';

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  scrambleColor?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
}

interface CharEntry {
  el: HTMLSpanElement;
  originalChar: string;
  endTime: number;
  isScrambling: boolean;
  timerId?: ReturnType<typeof setInterval>;
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 80,
  duration = 1.0,
  speed = 0.5,
  scrambleChars = '.:',
  scrambleColor,
  className = '',
  style = {},
  children,
  as: Component = 'p',
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const charsRef = useRef<CharEntry[]>([]);

  // Split string into words and characters to preserve natural responsive word wrapping
  const words = useMemo(() => {
    if (typeof children !== 'string') return [];
    return children.split(' ').map(word => Array.from(word));
  }, [children]);

  useEffect(() => {
    if (!rootRef.current) return;

    // Collect all char elements
    const charElements = rootRef.current.querySelectorAll<HTMLSpanElement>('.scrambled-char');
    const entries: CharEntry[] = [];

    charElements.forEach(el => {
      const orig = el.getAttribute('data-char') || el.textContent || '';
      entries.push({
        el,
        originalChar: orig,
        endTime: 0,
        isScrambling: false,
      });
    });

    charsRef.current = entries;

    // Scramble tick rate based on speed parameter (lower speed = faster scramble tick)
    const tickInterval = Math.max(25, Math.floor(60 * (1 - speed + 0.2)));

    const handlePointerMove = (e: PointerEvent) => {
      const cursorX = e.clientX;
      const cursorY = e.clientY;
      const charsLen = scrambleChars.length;
      if (charsLen === 0) return;

      entries.forEach(entry => {
        const rect = entry.el.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const dist = Math.hypot(cursorX - charCenterX, cursorY - charCenterY);

        if (dist < radius) {
          const proximity = 1 - dist / radius;
          const activeDuration = duration * proximity * 1000;
          const newEndTime = performance.now() + activeDuration;

          entry.endTime = Math.max(entry.endTime, newEndTime);

          if (!entry.isScrambling) {
            entry.isScrambling = true;
            if (scrambleColor) {
              entry.el.style.color = scrambleColor;
            }

            entry.timerId = setInterval(() => {
              if (performance.now() >= entry.endTime) {
                // Resolved
                clearInterval(entry.timerId);
                entry.isScrambling = false;
                entry.el.textContent = entry.originalChar;
                if (scrambleColor) {
                  entry.el.style.color = '';
                }
              } else {
                // Random scramble character
                const randomChar = scrambleChars[Math.floor(Math.random() * charsLen)];
                entry.el.textContent = randomChar;
              }
            }, tickInterval);
          }
        }
      });
    };

    const rootEl = rootRef.current;
    rootEl.addEventListener('pointermove', handlePointerMove as EventListener);

    return () => {
      rootEl.removeEventListener('pointermove', handlePointerMove as EventListener);
      entries.forEach(entry => {
        if (entry.timerId) clearInterval(entry.timerId);
        entry.el.textContent = entry.originalChar;
      });
    };
  }, [radius, duration, speed, scrambleChars, scrambleColor, words]);

  return (
    <Component
      ref={rootRef as any}
      className={`scrambled-text ${className}`}
      style={style}
    >
      {words.map((chars, wordIndex) => (
        <span key={wordIndex} className="scrambled-word">
          {chars.map((char, charIndex) => (
            <span
              key={charIndex}
              className="scrambled-char"
              data-char={char}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
};

export default ScrambledText;
