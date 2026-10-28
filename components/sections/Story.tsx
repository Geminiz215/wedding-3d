'use client';

import React from 'react';
import Image from 'next/image';
import { WEDDING_CONFIG } from '@/config/wedding';
import { Eyebrow, Reveal } from './primitives';

/** Editorial spread: text column on the left (the camera slides right to make room), photos overlapping on the right. */
export function Story() {
  const { story, couple } = WEDDING_CONFIG;
  return (
    <section id="story" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-6 lg:col-span-5">
          <Reveal>
            <Eyebrow>{story.sectionLabel}</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl font-normal italic text-text md:text-6xl">{story.heading}</h2>
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-muted">{story.leadParagraph}</p>
          </Reveal>

          <ol className="mt-16 space-y-12 border-l border-border pl-8">
            {story.milestones.map((m, i) => (
              <li key={m.title} className="relative">
                <span className="absolute -left-[37px] top-2 h-2 w-2 rotate-45 bg-accent" aria-hidden />
                <Reveal delay={i * 0.08}>
                  <p className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl italic text-gold">{m.year}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-secondary">{m.season}</span>
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-text">{m.title}</h3>
                  <p className="mt-1 text-xs tracking-wide text-gold">{m.location}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{m.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
          <div className="md:sticky md:top-28">
            <Reveal className="relative ml-auto w-[82%] md:w-[78%]" y={40}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
                <Image src={story.featuredPhoto} alt={`${couple.groom.nickname} dan ${couple.bride.nickname}`} fill sizes="(min-width: 768px) 38vw, 82vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal className="relative -mt-24 w-[48%] md:-mt-32 md:w-[44%]" delay={0.25} y={40}>
              <div className="relative aspect-[3/4] overflow-hidden border-[6px] border-surface">
                <Image src={story.secondaryPhoto} alt="" fill sizes="(min-width: 768px) 22vw, 48vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
