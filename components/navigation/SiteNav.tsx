'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Music2, Rotate3d, VolumeX, X } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { EASE } from '@/components/sections/primitives';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'event', label: 'Event' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'rsvp', label: 'RSVP' },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]['id'];

interface SiteNavProps {
  active: NavId | null;
  hasAudio: boolean;
  playing: boolean;
  onToggleAudio: () => void;
  canExplore: boolean;
  onExplore: () => void;
}

const iconButton =
  'inline-flex h-10 w-10 items-center justify-center text-secondary transition-colors duration-300 hover:text-gold';

export function SiteNav({ active, hasAudio, playing, onToggleAudio, canExplore, onExplore }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const { groom, bride } = WEDDING_CONFIG.couple;

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const controls = (
    <>
      {hasAudio && (
        <button type="button" onClick={onToggleAudio} className={iconButton} aria-pressed={playing} aria-label={playing ? 'Matikan musik' : 'Putar musik'}>
          {playing ? <Music2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </button>
      )}
      {canExplore && (
        <button type="button" onClick={onExplore} className={iconButton} aria-label="Lihat venue 3D" title="Lihat venue">
          <Rotate3d className="h-4 w-4" />
        </button>
      )}
    </>
  );

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-30"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE, delay: 0.4 } }}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-10"
        style={{ background: 'linear-gradient(to bottom, rgb(244 237 225 / 0.92), rgb(244 237 225 / 0))' }}
        aria-label="Navigasi utama"
      >
        <button type="button" onClick={() => go('home')} className="font-serif text-xl tracking-wide text-text">
          {groom.nickname.charAt(0)}
          <span className="mx-1 italic text-primary">&amp;</span>
          {bride.nickname.charAt(0)}
        </button>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((n) => (
            <li key={n.id} className="relative">
              <button
                type="button"
                onClick={() => go(n.id)}
                aria-current={active === n.id ? 'true' : undefined}
                className={`py-2 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-300 ${
                  active === n.id ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {n.label}
              </button>
              {active === n.id && (
                <motion.span layoutId="nav-active" className="absolute inset-x-0 -bottom-0.5 mx-auto h-px w-5 bg-accent" transition={{ duration: 0.6, ease: EASE }} />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          {controls}
          <button type="button" className={`${iconButton} md:hidden`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Tutup menu' : 'Buka menu'}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="mx-4 border border-border bg-surface px-6 py-3 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
          >
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => go(n.id)}
                  className={`flex w-full items-center justify-between py-3.5 font-serif text-xl ${active === n.id ? 'text-text' : 'text-muted'}`}
                >
                  {n.label}
                  {active === n.id && <span className="h-px w-5 bg-accent" aria-hidden />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
