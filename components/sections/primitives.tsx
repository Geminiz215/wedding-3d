'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Thin rule with a five-petal bloom: the venue's giant central flower, drawn in gold line. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 24" className={`h-5 w-40 text-accent ${className}`} fill="none" aria-hidden>
      <path d="M8 12H78M122 12H192" stroke="currentColor" strokeWidth="0.75" />
      <path d="M78 12c5-5 10-5 13 0-3 5-8 5-13 0ZM122 12c-5-5-10-5-13 0 3 5 8 5 13 0Z" stroke="currentColor" strokeWidth="0.75" />
      <g transform="translate(100 12)" stroke="currentColor" strokeWidth="0.75">
        {[0, 72, 144, 216, 288].map((r) => (
          <ellipse key={r} cx="0" cy="-5" rx="2.6" ry="5" transform={`rotate(${r})`} />
        ))}
        <circle r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** Editorial kicker: a gold hairline leading into small spaced capitals. */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-secondary ${className}`}>
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </p>
  );
}

export const buttonPrimary =
  'inline-flex items-center justify-center gap-3 bg-text px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-surface transition-colors duration-700 ease-cinematic hover:bg-gold disabled:cursor-wait';

export const buttonGhost =
  'inline-flex items-center justify-center gap-2.5 border-b border-accent pb-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-secondary transition-colors duration-500 hover:border-gold hover:text-gold';
