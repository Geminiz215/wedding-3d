'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { EASE, Ornament, buttonPrimary } from './primitives';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.6, ease: EASE, delay } },
});

/** Title card under the venue: the 3D backdrop keeps the upper two-thirds of the screen. */
export function Hero() {
  const { couple, date, quotes, headerLabel } = WEDDING_CONFIG;
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col items-center justify-end px-6 pb-14 text-center md:pb-16">
      <div className="relative flex flex-col items-center rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(24,18,13,0.58)_0%,rgba(24,18,13,0.28)_58%,transparent_82%)] px-6 py-8">
        <motion.p
          {...rise(0.2)}
          className="text-[10px] font-semibold uppercase tracking-[0.5em] text-[#F5DFA3] [text-shadow:0_1px_3px_rgba(18,13,9,0.95),0_2px_12px_rgba(18,13,9,0.85)] md:text-[11px]"
        >
          {headerLabel}
        </motion.p>
        <motion.h1
          {...rise(0.45)}
          className="mt-5 font-serif text-[3.25rem] font-normal leading-[0.95] tracking-[-0.01em] text-[#FFFDF9] [text-shadow:0_2px_6px_rgba(18,13,9,0.95),0_6px_28px_rgba(18,13,9,0.85)] sm:text-7xl md:text-8xl"
        >
          {couple.groom.nickname}
          <span className="my-1 block italic text-[#F5DFA3] sm:mx-3 sm:my-0 sm:inline md:mx-5">&amp;</span>
          {couple.bride.nickname}
        </motion.h1>
        <motion.div {...rise(0.7)} className="mt-7 flex flex-col items-center gap-4">
          <Ornament className="text-[#F5DFA3] drop-shadow-[0_2px_6px_rgba(18,13,9,0.9)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#FFFDF9] [text-shadow:0_1px_4px_rgba(18,13,9,0.95),0_2px_12px_rgba(18,13,9,0.85)]">
            {date.displayFull}
          </p>
        </motion.div>
        <motion.blockquote
          {...rise(0.95)}
          className="mt-6 max-w-xl font-serif text-[15px] italic leading-relaxed text-[#FFFDF9] [text-shadow:0_1px_4px_rgba(18,13,9,0.95),0_3px_16px_rgba(18,13,9,0.9)] md:text-base"
        >
          {quotes.mainVerse}
          <footer className="mt-3 font-sans text-[10px] font-semibold not-italic uppercase tracking-[0.34em] text-[#F5DFA3] [text-shadow:0_1px_4px_rgba(18,13,9,0.95),0_2px_10px_rgba(18,13,9,0.9)]">
            {quotes.mainVerseSource}
          </footer>
        </motion.blockquote>
      </div>
      <motion.div {...rise(1.2)} className="mt-4">
        <button type="button" className={buttonPrimary} onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
          Jelajahi Undangan
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}
