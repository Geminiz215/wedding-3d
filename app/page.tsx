'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { WEDDING_CONFIG } from '@/config/wedding';
import { SectionId } from '@/config/theme';
import { useModelDownload } from '@/lib/useModelDownload';
import { OpeningInvitation } from '@/components/intro/OpeningInvitation';
import { NavId, SiteNav } from '@/components/navigation/SiteNav';
import { EASE } from '@/components/sections/primitives';
import { Hero } from '@/components/sections/Hero';
import { Story } from '@/components/sections/Story';
import { Event } from '@/components/sections/Event';
import { Location } from '@/components/sections/Location';
import { Gallery } from '@/components/sections/Gallery';
import { Rsvp } from '@/components/sections/Rsvp';
import { Closing } from '@/components/sections/Closing';

const VenueSceneCanvas = dynamic(() => import('@/components/scene/VenueSceneCanvas').then((m) => m.VenueSceneCanvas), {
  ssr: false,
});

type Phase = 'intro' | 'entering' | 'venue';
type Section = Exclude<SectionId, 'opening'>;

const SECTIONS: Section[] = ['home', 'story', 'event', 'location', 'gallery', 'rsvp', 'closing'];
const NAV_FOR: Record<Section, NavId | null> = {
  home: 'home',
  story: 'story',
  event: 'event',
  location: 'event',
  gallery: 'gallery',
  rsvp: 'rsvp',
  closing: null,
};

interface Env {
  webgl: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
}

function detectEnv(): Env {
  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webgl = false;
  }
  return {
    webgl,
    isMobile: window.matchMedia('(max-width: 767px)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
}

export default function WeddingInvitationPage() {
  const [env, setEnv] = useState<Env | null>(null);
  const [phase, setPhase] = useState<Phase>('intro');
  const [pendingOpen, setPendingOpen] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [active, setActive] = useState<Section>('home');
  const [explore, setExplore] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setEnv(detectEnv());
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setEnv((e) => (e ? { ...e, isMobile: mq.matches } : e));
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const download = useModelDownload(WEDDING_CONFIG.modelPath, !!env?.webgl);
  const failed = !!env && (!env.webgl || download.error || sceneFailed);
  const status = failed ? 'failed' : sceneReady ? 'ready' : 'loading';
  const has3D = !!env && !failed;

  const begin = useCallback(() => {
    setPhase('entering');
    // Text waits for the camera to finish most of its walk toward the backdrop.
    window.setTimeout(() => setPhase('venue'), env?.reducedMotion ? 0 : 1900);
  }, [env?.reducedMotion]);

  const open = () => {
    const audio = audioRef.current;
    if (audio) {
      // Must start inside the click (autoplay policy), even if the venue is still loading.
      audio.volume = 0.6;
      audio.play().then(() => setPlaying(true), () => setPlaying(false));
    }
    if (status === 'loading') setPendingOpen(true);
    else begin();
  };

  useEffect(() => {
    if (pendingOpen && status !== 'loading' && phase === 'intro') begin();
  }, [pendingOpen, status, phase, begin]);

  // Lock scrolling until the guest has entered, and while they look around the venue.
  useEffect(() => {
    document.body.style.overflow = phase !== 'venue' || explore ? 'hidden' : '';
  }, [phase, explore]);

  useEffect(() => {
    if (phase !== 'venue') return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as Section)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [phase]);

  useEffect(() => {
    if (!explore) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setExplore(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [explore]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().then(() => setPlaying(true), () => setPlaying(false));
    else {
      audio.pause();
      setPlaying(false);
    }
  };

  const onReady = useCallback(() => setSceneReady(true), []);
  const onError = useCallback(() => setSceneFailed(true), []);
  const startExplore = has3D ? () => setExplore(true) : null;
  const shot: SectionId = phase === 'intro' ? 'opening' : explore ? 'home' : active;

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen w-full overflow-x-clip">
        {/* Venue layer: the 3D backdrop, or its palette when 3D is unavailable */}
        <div className={`fixed inset-0 z-0 ${explore ? '' : 'pointer-events-none'}`}>
          {failed && <div className="venue-fallback absolute inset-0" aria-hidden />}
          {has3D && env && (
            <VenueSceneCanvas
              modelUrl={download.url}
              shot={shot}
              intro={phase === 'intro'}
              explore={explore}
              isMobile={env.isMobile}
              reducedMotion={env.reducedMotion}
              onReady={onReady}
              onError={onError}
            />
          )}
        </div>

        {/* Section veils keep text legible and set how present the venue feels in each chapter */}
        <div className={`pointer-events-none fixed inset-0 z-[1] transition-opacity duration-1000 ${explore ? 'opacity-0' : ''}`} aria-hidden>
          {SECTIONS.map((s) => (
            <div key={s} className={`veil veil-${s}`} data-active={phase !== 'intro' && active === s} />
          ))}
        </div>

        <OpeningInvitation visible={phase === 'intro'} status={status} progress={download.progress} pending={pendingOpen} onOpen={open} />

        {phase === 'venue' && (
          <SiteNav
            active={NAV_FOR[active]}
            hasAudio={!!WEDDING_CONFIG.audio.src}
            playing={playing}
            onToggleAudio={toggleAudio}
            canExplore={has3D}
            onExplore={() => setExplore(true)}
          />
        )}

        <div
          className={`relative z-10 transition-opacity duration-700 ${explore ? 'pointer-events-none opacity-0' : ''}`}
          aria-hidden={phase === 'intro' || explore}
          inert={phase === 'intro' || explore ? true : undefined}
        >
          {phase === 'venue' ? <Hero /> : <div id="home" className="min-h-[100svh]" />}
          <Story />
          <Event />
          <Location />
          <Gallery />
          <Rsvp />
          <Closing onExplore={startExplore} />
        </div>

        <AnimatePresence>
          {explore && (
            <motion.div
              className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 px-6 pb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <p className="text-[11px] tracking-[0.2em] text-secondary">
                {env?.isMobile ? 'Geser untuk memutar · cubit untuk zoom' : 'Seret untuk memutar · gulir untuk zoom'}
              </p>
              <button
                type="button"
                onClick={() => setExplore(false)}
                className="pointer-events-auto inline-flex items-center gap-3 bg-secondary px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.26em] text-surface"
                autoFocus
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Kembali ke undangan
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {WEDDING_CONFIG.audio.src && <audio ref={audioRef} src={WEDDING_CONFIG.audio.src} loop preload="none" onEnded={() => setPlaying(false)} />}

        {WEDDING_CONFIG.draft && (
          <p className="pointer-events-none fixed bottom-3 left-3 z-50 bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
            Draf · data contoh
          </p>
        )}
      </main>
    </MotionConfig>
  );
}
