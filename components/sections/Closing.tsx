'use client';

import React, { useState } from 'react';
import { Rotate3d, Share2 } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { Ornament, Reveal, buttonGhost, buttonPrimary } from './primitives';

/** Ends where it began: the venue fills the screen again, text sits low like closing credits. */
export function Closing({ onExplore }: { onExplore: (() => void) | null }) {
  const { couple, date, quotes } = WEDDING_CONFIG;
  const [note, setNote] = useState('');

  const share = async () => {
    const data = {
      title: `The Wedding of ${couple.groom.nickname} & ${couple.bride.nickname}`,
      text: `${date.displayFull}. ${quotes.openingQuote}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        setNote('Tautan undangan disalin.');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setNote('Tidak dapat membagikan. Salin tautan dari bilah alamat.');
    }
  };

  return (
    <section id="closing" className="relative flex min-h-[100svh] flex-col items-center justify-end px-6 pb-16 pt-32 text-center">
      <Reveal>
        <p className="font-serif text-2xl italic text-primary">Terima kasih</p>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted">{quotes.closingNote}</p>
      </Reveal>
      <Reveal delay={0.2} className="mt-8">
        <p className="font-serif text-[3.25rem] leading-[0.95] tracking-[-0.01em] text-text sm:text-7xl md:text-8xl">
          {couple.groom.nickname}
          <span className="mx-3 italic text-primary md:mx-5">&amp;</span>
          {couple.bride.nickname}
        </p>
        <div className="mt-5 flex flex-col items-center gap-3">
          <Ornament />
          <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-secondary">{date.shortDate}</p>
        </div>
      </Reveal>
      <Reveal delay={0.4} className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <button type="button" onClick={share} className={buttonPrimary}>
          <Share2 className="h-3.5 w-3.5" aria-hidden />
          Bagikan Kebahagiaan
        </button>
        {onExplore && (
          <button type="button" onClick={onExplore} className={buttonGhost}>
            <Rotate3d className="h-3.5 w-3.5" aria-hidden />
            Lihat venue sekali lagi
          </button>
        )}
      </Reveal>
      <p className="mt-5 h-4 text-xs text-muted" role="status">
        {note}
      </p>
    </section>
  );
}
