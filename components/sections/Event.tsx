'use client';

import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { CountdownParts, getCountdown } from '@/lib/countdown';
import { Eyebrow, Ornament, Reveal, buttonGhost } from './primitives';

function Countdown() {
  const { isoDateTime, timezoneShort, passedMessage } = WEDDING_CONFIG.date;
  // undefined = not computed yet (avoids an SSR/client mismatch), null = the day has passed
  const [left, setLeft] = useState<CountdownParts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setLeft(getCountdown(isoDateTime));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [isoDateTime]);

  if (left === null) {
    return <p className="mx-auto max-w-xl text-center font-serif text-xl italic leading-relaxed text-secondary">{passedMessage}</p>;
  }

  const units: [keyof CountdownParts, string][] = [
    ['days', 'Hari'],
    ['hours', 'Jam'],
    ['minutes', 'Menit'],
    ['seconds', 'Detik'],
  ];
  return (
    <div>
      <div className="grid grid-cols-4 divide-x divide-border" role="timer" aria-label="Hitung mundur menuju hari pernikahan">
        {units.map(([key, label]) => (
          <div key={key} className="px-2 text-center">
            <p className="font-serif text-4xl tabular-nums text-text md:text-6xl" aria-hidden={key === 'seconds'}>
              {left ? String(left[key]).padStart(2, '0') : '––'}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-muted">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[11px] tracking-wide text-muted">Menuju akad · {timezoneShort}</p>
    </div>
  );
}

/** Akad and resepsi as two typographic columns split by a hairline, then the countdown. */
export function Event() {
  const { events } = WEDDING_CONFIG;
  return (
    <section id="event" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-5xl md:ml-auto md:mr-0 lg:mr-[4%]">
        <Reveal className="text-center md:text-right">
          <Eyebrow>Chapter II — The Day</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl font-normal italic text-text md:text-6xl">The Wedding Details</h2>
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border">
          {events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.15} className={i === 0 ? 'md:pr-12' : 'md:pl-12'}>
              <article>
                <p className="font-serif text-sm italic text-gold">{i === 0 ? 'I' : 'II'}</p>
                <h3 className="mt-2 font-serif text-4xl text-text">{ev.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-secondary">{ev.subtitle}</p>
                <dl className="mt-8 space-y-5 text-sm">
                  <div>
                    <dt className="sr-only">Tanggal</dt>
                    <dd className="font-serif text-xl text-text">{ev.dayAndDate}</dd>
                    <dd className="mt-1 tabular-nums text-muted">
                      {ev.startTime} – {ev.endTime} {ev.timezoneLabel}
                    </dd>
                  </div>
                  <div className="h-px w-10 bg-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Tempat</dt>
                    <dd className="font-medium text-text">{ev.venueName}</dd>
                    <dd className="text-muted">{ev.hallOrArea}</dd>
                    <dd className="mt-2 max-w-xs leading-relaxed text-muted">{ev.address}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.24em] text-secondary">Dress code</dt>
                    <dd className="mt-1 text-muted">{ev.dressCode}</dd>
                  </div>
                </dl>
                <a href={ev.mapUrl} target="_blank" rel="noopener noreferrer" className={`${buttonGhost} mt-9`}>
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  Lihat Lokasi
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 md:mt-32">
          <div className="mb-10 flex justify-center">
            <Ornament />
          </div>
          <Countdown />
        </Reveal>
      </div>
    </section>
  );
}
