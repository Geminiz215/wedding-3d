'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { Eyebrow, Reveal, buttonPrimary } from './primitives';

export function Location() {
  const loc = WEDDING_CONFIG.location;
  return (
    <section id="location" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto grid max-w-5xl gap-14 md:ml-auto md:mr-[4%] md:grid-cols-[1.1fr_1fr] md:gap-16">
        <Reveal>
          <Eyebrow>The Venue</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl font-normal leading-tight text-text md:text-5xl">{loc.venueName}</h2>
          <p className="mt-2 font-serif text-lg italic text-primary">{loc.city}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{loc.fullAddress}</p>
          <a href={loc.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} mt-10`}>
            Buka Google Maps
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="divide-y divide-border border-y border-border text-sm">
            <div className="py-6">
              <dt className="text-[10px] uppercase tracking-[0.26em] text-secondary">Parkir</dt>
              <dd className="mt-2 leading-relaxed text-muted">{loc.valetAndParkingInfo}</dd>
            </div>
            <div className="py-6">
              <dt className="text-[10px] uppercase tracking-[0.26em] text-secondary">Aksesibilitas</dt>
              <dd className="mt-2 leading-relaxed text-muted">{loc.accessibilityInfo}</dd>
            </div>
            {loc.landmarks.length > 0 && (
              <div className="py-6">
                <dt className="text-[10px] uppercase tracking-[0.26em] text-secondary">Petunjuk arah</dt>
                <dd>
                  <ul className="mt-2 space-y-1.5 text-muted">
                    {loc.landmarks.map((l) => (
                      <li key={l} className="flex gap-3">
                        <span className="mt-2 h-px w-3 shrink-0 bg-accent" aria-hidden />
                        {l}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
