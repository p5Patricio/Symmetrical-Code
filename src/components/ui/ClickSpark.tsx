import React, { useRef, useEffect, useCallback } from 'react';

export interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  children?: React.ReactNode;
  className?: string;
  isGlobal?: boolean;
}

interface Spark {
  x: number;
  y: number;
  startTime: number;
}

export default function ClickSpark({
  sparkColor = '#00e5ff',
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
  extraScale = 1.0,
  children,
  className = '',
  isGlobal = true,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const isAnimatingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);

  const getEase = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case 'ease-out':
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (!isGlobal && canvas.parentElement) {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
  }, [isGlobal]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [resizeCanvas]);

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = isGlobal ? window.innerWidth : (canvas.parentElement?.getBoundingClientRect().width || canvas.width);
      const height = isGlobal ? window.innerHeight : (canvas.parentElement?.getBoundingClientRect().height || canvas.height);

      ctx.clearRect(0, 0, width, height);

      const remainingSparks: Spark[] = [];

      for (let s = 0; s < sparksRef.current.length; s++) {
        const spark = sparksRef.current[s];
        const elapsed = timestamp - spark.startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = getEase(progress);

        if (progress < 1) {
          remainingSparks.push(spark);

          const distance = sparkRadius * easeVal * extraScale;
          const currentLineLength = sparkSize * (1 - easeVal);
          const alpha = 1 - easeVal;

          ctx.save();
          ctx.strokeStyle = sparkColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';

          for (let i = 0; i < sparkCount; i++) {
            const angle = (2 * Math.PI * i) / sparkCount;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            const x1 = spark.x + distance * cos;
            const y1 = spark.y + distance * sin;
            const x2 = spark.x + (distance + currentLineLength) * cos;
            const y2 = spark.y + (distance + currentLineLength) * sin;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      sparksRef.current = remainingSparks;

      if (sparksRef.current.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(draw);
      } else {
        isAnimatingRef.current = false;
        ctx.clearRect(0, 0, width, height);
      }
    },
    [duration, extraScale, getEase, isGlobal, sparkColor, sparkCount, sparkRadius, sparkSize]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let x = e.clientX;
    let y = e.clientY;

    if (!isGlobal && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    sparksRef.current.push({
      x,
      y,
      startTime: performance.now(),
    });

    if (!isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animFrameIdRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div
      onClickCapture={handleClick}
      className={`relative w-full min-h-full ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`pointer-events-none ${
          isGlobal ? 'fixed inset-0 z-[9999]' : 'absolute inset-0 z-50'
        }`}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
