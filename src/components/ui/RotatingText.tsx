import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  loop?: boolean;
  auto?: boolean;
  onNext?: (index: number) => void;
  mainClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>((props, ref) => {
  const {
    texts,
    rotationInterval = 2200,
    staggerDuration = 0.025,
    loop = true,
    auto = true,
    onNext,
    mainClassName,
    className,
    style,
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentTextIndex(prev => {
      const nextIndex = prev === texts.length - 1 ? (loop ? 0 : prev) : prev + 1;
      if (onNext && nextIndex !== prev) onNext(nextIndex);
      return nextIndex;
    });
  }, [texts.length, loop, onNext]);

  const previous = useCallback(() => {
    setCurrentTextIndex(prev => {
      const prevIndex = prev === 0 ? (loop ? texts.length - 1 : prev) : prev - 1;
      if (onNext && prevIndex !== prev) onNext(prevIndex);
      return prevIndex;
    });
  }, [texts.length, loop, onNext]);

  const jumpTo = useCallback(
    (index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      setCurrentTextIndex(validIndex);
      if (onNext) onNext(validIndex);
    },
    [texts.length, onNext]
  );

  const reset = useCallback(() => {
    setCurrentTextIndex(0);
    if (onNext) onNext(0);
  }, [onNext]);

  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  const currentWord = texts[currentTextIndex] || '';
  const characters = Array.from(currentWord);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDuration,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerDuration * 0.5,
        staggerDirection: -1,
      },
    },
  };

  const childVariants = {
    initial: { y: '100%', opacity: 0 },
    animate: {
      y: '0%',
      opacity: 1,
      transition: {
        type: 'spring' as const,
        damping: 30,
        stiffness: 400,
      },
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: 'easeIn' as const,
      },
    },
  };

  return (
    <span
      className={cn(
        'relative inline-flex items-baseline align-baseline',
        mainClassName,
        className
      )}
      style={style}
    >
      <span className="sr-only">{currentWord}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentTextIndex}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="inline-flex items-baseline overflow-hidden py-1 leading-none text-[#00e5ff]"
          aria-hidden="true"
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              className="inline-block text-[#00e5ff]"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
