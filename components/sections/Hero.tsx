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
      <motion.p {...rise(0.2)} className="text-[10px] font-medium uppercase tracking-[0.42em] text-secondary md:text-[11px]">
        {headerLabel}
      </motion.p>
      <motion.h1 {...rise(0.45)} className="mt-4 font-serif text-5xl font-normal leading-none text-text md:text-7xl">
        {couple.groom.nickname}
        <span className="mx-3 italic text-primary md:mx-5">&amp;</span>
        {couple.bride.nickname}
      </motion.h1>
      <motion.div {...rise(0.7)} className="mt-5 flex flex-col items-center gap-3">
        <Ornament />
        <p className="font-serif text-lg tracking-[0.08em] text-secondary md:text-xl">{date.displayFull}</p>
      </motion.div>
      <motion.blockquote {...rise(0.95)} className="mt-5 max-w-xl font-serif text-[15px] italic leading-relaxed text-muted md:text-base">
        {quotes.mainVerse}
        <footer className="mt-2 font-sans text-[10px] not-italic uppercase tracking-[0.3em] text-gold">{quotes.mainVerseSource}</footer>
      </motion.blockquote>
      <motion.div {...rise(1.2)} className="mt-8">
        <button type="button" className={buttonPrimary} onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>
          Jelajahi Undangan
          <ChevronDown className="h-3.5 w-3.5" aria-hidden />
        </button>
      </motion.div>
    </section>
  );
}
