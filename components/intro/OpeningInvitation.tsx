'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { EASE, Ornament, buttonPrimary } from '@/components/sections/primitives';

interface OpeningInvitationProps {
  visible: boolean;
  status: 'loading' | 'ready' | 'failed';
  progress: number | null;
  pending: boolean; // guest pressed "Buka" before the venue finished loading
  onOpen: () => void;
}

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE, delay } },
});

export function OpeningInvitation({ visible, status, progress, pending, onOpen }: OpeningInvitationProps) {
  const { couple, date, quotes, headerLabel, audio } = WEDDING_CONFIG;
  const waiting = pending && status === 'loading';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-5 py-10"
          style={{ background: 'rgb(246 242 234 / 0.62)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 1.8, ease: EASE } }}
          role="dialog"
          aria-label="Undangan pernikahan"
        >
          <motion.div
            className="relative w-full max-w-[24rem] rounded-t-[999px] border border-border bg-surface px-8 pb-12 pt-24 text-center shadow-[0_30px_80px_-40px_rgba(42,51,33,0.35)] sm:px-10 sm:pt-28"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1.8, ease: EASE } }}
            exit={{ opacity: 0, y: -40, scale: 1.04, transition: { duration: 1.2, ease: EASE } }}
          >
            {/* Inner arch line, after the backdrop's drape arch */}
            <div className="pointer-events-none absolute inset-2.5 rounded-t-[999px] border border-accent opacity-60" aria-hidden />

            <motion.p {...item(0.5)} className="text-[10px] font-medium uppercase tracking-[0.42em] text-secondary">
              {headerLabel}
            </motion.p>

            <motion.h1 {...item(0.8)} className="mt-7 font-serif text-[2.75rem] font-normal leading-[1.05] text-text sm:text-5xl">
              {couple.groom.nickname}
              <span className="my-1 block font-serif text-3xl italic text-primary">&amp;</span>
              {couple.bride.nickname}
            </motion.h1>

            <motion.div {...item(1.1)} className="mt-7 flex justify-center">
              <Ornament />
            </motion.div>

            <motion.p {...item(1.25)} className="mt-5 font-serif text-lg tracking-[0.08em] text-secondary">
              {date.displayFull}
            </motion.p>

            <motion.p {...item(1.4)} className="mx-auto mt-4 max-w-[16rem] font-serif text-[15px] italic leading-relaxed text-muted">
              {quotes.openingQuote}
            </motion.p>

            <motion.div {...item(1.7)} className="mt-10">
              <button type="button" onClick={onOpen} disabled={waiting} className={buttonPrimary} aria-live="polite">
                {waiting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    <span>
                      Menyiapkan venue{progress !== null ? ` · ${Math.round(progress)}%` : '…'}
                    </span>
                  </>
                ) : (
                  <span>Buka Undangan</span>
                )}
              </button>
            </motion.div>

            <motion.div {...item(2)} className="mt-6 text-[11px] leading-relaxed tracking-wide text-muted">
              {status === 'failed' ? (
                <p>Venue 3D tidak dapat ditampilkan di perangkat ini. Undangan tetap dapat dibaca sepenuhnya.</p>
              ) : status === 'loading' ? (
                <p className="flex items-center justify-center gap-3">
                  <span className="relative h-px w-16 overflow-hidden bg-border" aria-hidden>
                    <span
                      className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300"
                      style={{ width: `${progress ?? 30}%` }}
                    />
                  </span>
                  <span>Memuat venue 3D</span>
                </p>
              ) : (
                <p>{audio.src ? 'Musik akan diputar setelah undangan dibuka' : 'Gulir perlahan untuk memasuki venue'}</p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
