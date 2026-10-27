'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { EASE, Eyebrow, Reveal } from './primitives';

// Magazine rhythm, repeated every four photos: tall left, wide right, small inset, offset landscape.
const LAYOUT = [
  { cell: 'col-span-2 md:col-span-5 md:row-span-2', ratio: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
  { cell: 'col-span-2 md:col-span-7 md:mt-20', ratio: 'aspect-[16/10]', sizes: '(min-width: 768px) 55vw, 100vw' },
  { cell: 'col-span-1 md:col-span-3 md:col-start-7', ratio: 'aspect-[3/4]', sizes: '(min-width: 768px) 25vw, 50vw' },
  { cell: 'col-span-1 md:col-span-4 md:mt-24', ratio: 'aspect-[4/3]', sizes: '(min-width: 768px) 32vw, 50vw' },
];

export function Gallery() {
  const photos = WEDDING_CONFIG.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const opener = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
    },
    [photos.length],
  );

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, step]);

  const current = index === null ? null : photos[index];

  return (
    <section id="gallery" className="relative px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Chapter III — Moments</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl font-normal italic text-text md:text-6xl">Gallery</h2>
          </div>
          <p className="max-w-xs font-serif text-base italic leading-relaxed text-muted">Potongan cerita yang ingin kami simpan, dan kini kami bagikan.</p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6">
          {photos.map((p, i) => {
            const l = LAYOUT[i % LAYOUT.length];
            return (
              <li key={p.id} className={l.cell}>
                <motion.button
                  type="button"
                  className={`group relative block w-full overflow-hidden ${l.ratio}`}
                  onClick={(e) => {
                    opener.current = e.currentTarget;
                    setDir(1);
                    setIndex(i);
                  }}
                  aria-label={`Perbesar foto: ${p.alt}`}
                  initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                  whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 1.4, ease: EASE, delay: (i % 2) * 0.12 }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes={l.sizes} className="object-cover transition-transform duration-[1.6s] ease-cinematic group-hover:scale-[1.04]" />
                </motion.button>
                <p className="mt-3 flex gap-3 text-[10px] uppercase tracking-[0.24em] text-muted">
                  <span className="text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {p.category}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-text text-surface"
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="flex h-16 items-center justify-between px-5 md:px-10">
              <p className="text-[11px] tabular-nums tracking-[0.3em]">
                {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="inline-flex h-10 w-10 items-center justify-center" aria-label="Tutup galeri">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={current.id}
                  className="absolute inset-0 touch-pan-y px-4 md:px-24"
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } }}
                  exit={{ opacity: 0, x: dir * -60, transition: { duration: 0.5, ease: EASE } }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) step(1);
                    else if (info.offset.x > 60) step(-1);
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image src={current.src} alt={current.alt} fill sizes="100vw" className="pointer-events-none object-contain" priority />
                  </div>
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center md:inline-flex" aria-label="Foto sebelumnya">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center md:inline-flex" aria-label="Foto berikutnya">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-6 px-5 py-6 md:px-10">
              <button type="button" onClick={() => step(-1)} className="inline-flex h-11 w-11 items-center justify-center md:hidden" aria-label="Foto sebelumnya">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <p className="flex-1 text-center font-serif text-base italic md:text-lg">{current.caption}</p>
              <button type="button" onClick={() => step(1)} className="inline-flex h-11 w-11 items-center justify-center md:hidden" aria-label="Foto berikutnya">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
