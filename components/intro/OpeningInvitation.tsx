'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { EASE } from '@/components/sections/primitives';

interface OpeningInvitationProps {
  visible: boolean;
  status: 'loading' | 'ready' | 'failed';
  progress: number | null;
  pending: boolean; // guest pressed "Buka" before the venue finished loading
  onOpen: () => void;
}

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.6, ease: EASE, delay } },
});

const bar = 'absolute inset-x-0 h-[8svh] bg-[#1c1611]';

/**
 * Title sequence over the venue at dusk: letterbox bars, ivory type straight on the scene, no card.
 * On open the bars retract and the dusk lifts while the camera walks in.
 */
export function OpeningInvitation({ visible, status, progress, pending, onOpen }: OpeningInvitationProps) {
  const { couple, date, quotes, headerLabel, audio } = WEDDING_CONFIG;
  const waiting = pending && status === 'loading';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="opening"
          className="dusk fixed inset-0 z-40 overflow-y-auto text-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: EASE, delay: 0.3 } }}
          role="dialog"
          aria-label="Undangan pernikahan"
        >
          <motion.div className={`${bar} top-0`} aria-hidden exit={{ y: '-100%', transition: { duration: 1.2, ease: EASE } }} />
          <motion.div className={`${bar} bottom-0`} aria-hidden exit={{ y: '100%', transition: { duration: 1.2, ease: EASE } }} />

          <div className="relative flex min-h-[100svh] flex-col items-center justify-end px-6 pb-[calc(8svh+2.5rem)] pt-[14svh] text-center">
            <motion.p {...item(0.6)} className="text-[10px] font-medium uppercase tracking-[0.5em] text-beige md:text-[11px]">
              {headerLabel}
            </motion.p>

            <motion.h1 {...item(0.9)} className="mt-6 font-serif text-[3.25rem] font-normal leading-[0.95] tracking-[-0.01em] sm:text-7xl md:text-8xl">
              {couple.groom.nickname}
              <span className="mx-3 font-normal italic text-blush md:mx-5">&amp;</span>
              {couple.bride.nickname}
            </motion.h1>

            <motion.div {...item(1.2)} className="mt-8 flex items-center gap-5 text-[11px] font-medium uppercase tracking-[0.36em] text-beige">
              <span className="h-px w-10 bg-accent" aria-hidden />
              {date.shortDate}
              <span className="h-px w-10 bg-accent" aria-hidden />
            </motion.div>

            <motion.p {...item(1.4)} className="mx-auto mt-6 max-w-sm font-serif text-base italic leading-relaxed text-ivory/80">
              {quotes.openingQuote}
            </motion.p>

            <motion.div {...item(1.8)} className="mt-11">
              <button
                type="button"
                onClick={onOpen}
                disabled={waiting}
                aria-live="polite"
                className="inline-flex min-w-[15rem] items-center justify-center gap-3 border border-ivory/40 px-9 py-4 text-[11px] font-medium uppercase tracking-[0.34em] text-ivory transition-colors duration-700 ease-cinematic hover:border-ivory hover:bg-ivory hover:text-text disabled:cursor-wait disabled:hover:bg-transparent disabled:hover:text-ivory"
              >
                {waiting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    <span>Menyiapkan venue{progress !== null ? ` · ${Math.round(progress)}%` : '…'}</span>
                  </>
                ) : (
                  <span>Buka Undangan</span>
                )}
              </button>
            </motion.div>

            <motion.div {...item(2.1)} className="mt-6 text-[11px] leading-relaxed tracking-[0.08em] text-ivory/70">
              {status === 'failed' ? (
                <p>Venue 3D tidak dapat ditampilkan di perangkat ini. Undangan tetap dapat dibaca sepenuhnya.</p>
              ) : status === 'loading' ? (
                <p className="flex items-center justify-center gap-3">
                  <span className="relative h-px w-16 overflow-hidden bg-ivory/20" aria-hidden>
                    <span className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300" style={{ width: `${progress ?? 30}%` }} />
                  </span>
                  <span>Memuat venue</span>
                </p>
              ) : (
                <p>{audio.src ? 'Musik akan diputar setelah undangan dibuka' : 'Selamat datang di hari bahagia kami'}</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
