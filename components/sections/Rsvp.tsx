'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { GuestWish, WEDDING_CONFIG } from '@/config/wedding';
import { RsvpFieldErrors, RsvpSubmissionInput, listWishes, submitGuestRsvp, validateRsvp } from '@/lib/rsvpService';
import { EASE, Eyebrow, Reveal, buttonGhost, buttonPrimary } from './primitives';

const ATTENDANCE: { value: GuestWish['attendance']; label: string }[] = [
  { value: 'hadir', label: 'Hadir' },
  { value: 'tidak_hadir', label: 'Berhalangan' },
  { value: 'ragu', label: 'Belum pasti' },
];

const field =
  'mt-2 w-full border-0 border-b border-border bg-transparent px-0 py-3 text-base text-text placeholder:text-muted focus:border-secondary focus:outline-none focus:ring-0';
const label = 'text-[10px] font-medium uppercase tracking-[0.26em] text-secondary';

const EMPTY: RsvpSubmissionInput = { name: '', guestsCount: 1, attendance: 'hadir', message: '' };

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function Rsvp() {
  const { maxGuestsPerInvitation, deadlineDisplay } = WEDDING_CONFIG.rsvp;
  const [form, setForm] = useState<RsvpSubmissionInput>(EMPTY);
  const [errors, setErrors] = useState<RsvpFieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [wishes, setWishes] = useState<GuestWish[]>([]);

  useEffect(() => {
    listWishes().then(setWishes);
  }, []);

  const set = <K extends keyof RsvpSubmissionInput>(key: K, value: RsvpSubmissionInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateRsvp(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`rsvp-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    const res = await submitGuestRsvp(form);
    if (res.ok && res.data) {
      setWishes((w) => [res.data!, ...w]);
      setStatus('sent');
    } else {
      setErrors(res.fieldErrors ?? {});
      setServerError(res.error ?? 'Terjadi kesalahan. Silakan coba lagi.');
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="relative px-5 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
        <div>
          <Reveal>
            <Eyebrow>Chapter IV — With You</Eyebrow>
            <h2 className="mt-5 font-serif text-5xl font-normal italic text-text md:text-6xl">RSVP</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              Mohon konfirmasi kehadiran Anda sebelum <span className="text-text">{deadlineDisplay}</span>.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }} exit={{ opacity: 0 }} role="status">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent text-gold">
                    <Check className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-6 font-serif text-3xl text-text">Terima kasih, {form.name.trim()}.</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {form.attendance === 'hadir'
                      ? 'Kami menantikan kehadiran Anda di hari bahagia kami.'
                      : 'Doa dan ucapan Anda sangat berarti bagi kami.'}
                  </p>
                  <button
                    type="button"
                    className={`${buttonGhost} mt-8`}
                    onClick={() => {
                      setForm(EMPTY);
                      setStatus('idle');
                    }}
                  >
                    Kirim konfirmasi lain
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate className="space-y-9" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
                  <div>
                    <label htmlFor="rsvp-name" className={label}>Nama</label>
                    <input
                      id="rsvp-name"
                      className={field}
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      autoComplete="name"
                      placeholder="Nama lengkap Anda"
                      maxLength={80}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'rsvp-name-err' : undefined}
                    />
                    {errors.name && <p id="rsvp-name-err" className="mt-2 text-xs text-primary">{errors.name}</p>}
                  </div>

                  <fieldset>
                    <legend className={label}>Kehadiran</legend>
                    <div className="mt-3 grid grid-cols-3 border border-border">
                      {ATTENDANCE.map((a, i) => (
                        <label
                          key={a.value}
                          className={`flex min-h-[48px] cursor-pointer items-center justify-center px-2 text-center text-xs tracking-wide transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-secondary ${
                            i > 0 ? 'border-l border-border' : ''
                          } ${form.attendance === a.value ? 'bg-text text-surface' : 'text-muted hover:text-text'}`}
                        >
                          <input type="radio" name="attendance" value={a.value} checked={form.attendance === a.value} onChange={() => set('attendance', a.value)} className="sr-only" />
                          {a.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {form.attendance === 'hadir' && (
                    <div>
                      <label htmlFor="rsvp-guestsCount" className={label}>Jumlah tamu</label>
                      <select
                        id="rsvp-guestsCount"
                        className={field}
                        value={form.guestsCount}
                        onChange={(e) => set('guestsCount', Number(e.target.value))}
                        aria-invalid={!!errors.guestsCount}
                      >
                        {Array.from({ length: maxGuestsPerInvitation }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} orang
                          </option>
                        ))}
                      </select>
                      {errors.guestsCount && <p className="mt-2 text-xs text-primary">{errors.guestsCount}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="rsvp-message" className={label}>Ucapan &amp; doa</label>
                    <textarea
                      id="rsvp-message"
                      className={`${field} min-h-[110px] resize-y`}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Tuliskan ucapan untuk kedua mempelai"
                      maxLength={500}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'rsvp-message-err' : undefined}
                    />
                    {errors.message && <p id="rsvp-message-err" className="mt-2 text-xs text-primary">{errors.message}</p>}
                  </div>

                  {status === 'error' && serverError && (
                    <p role="alert" className="border-l-2 border-primary pl-4 text-sm text-text">{serverError}</p>
                  )}

                  <div>
                    <button type="submit" disabled={status === 'sending'} className={`${buttonPrimary} w-full sm:w-auto`}>
                      {status === 'sending' && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
                      {status === 'sending' ? 'Mengirim…' : 'Kirim Konfirmasi'}
                    </button>
                    <p className="mt-4 text-[11px] leading-relaxed text-muted">
                      Versi pratinjau: konfirmasi hanya tersimpan di perangkat ini dan belum terkirim ke mempelai.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        <Wishes wishes={wishes} />
      </div>
    </section>
  );
}

function Wishes({ wishes }: { wishes: GuestWish[] }) {
  return (
    <Reveal delay={0.2} className="lg:pt-24">
      <div id="wishes">
        <div className="flex items-baseline justify-between border-b border-border pb-4">
          <h3 className="font-serif text-3xl italic text-text">Wishes</h3>
          <p className="text-[11px] tabular-nums tracking-wide text-muted">{wishes.length} ucapan</p>
        </div>
        {wishes.length === 0 ? (
          <p className="py-10 font-serif text-lg italic leading-relaxed text-muted">Belum ada ucapan. Jadilah yang pertama menitipkan doa untuk kami.</p>
        ) : (
          <ul className="max-h-[32rem] divide-y divide-border overflow-y-auto overscroll-contain pr-2" tabIndex={0} aria-label="Ucapan tamu">
            {wishes.map((w) => (
              <li key={w.id} className="py-7">
                <p className="font-serif text-lg leading-relaxed text-text">“{w.message}”</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-wide text-muted">
                  <span className="font-medium text-secondary">{w.name}</span>
                  <span className="h-px w-3 bg-accent" aria-hidden />
                  <span>{ATTENDANCE.find((a) => a.value === w.attendance)?.label}</span>
                  {formatDate(w.createdAt) && <span>· {formatDate(w.createdAt)}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
