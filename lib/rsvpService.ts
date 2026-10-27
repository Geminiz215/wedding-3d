/**
 * MOCK RSVP & GUEST WISHES SERVICE
 *
 * No backend exists yet. Submissions are kept in this browser's localStorage only, and the UI
 * says so. Nothing pretends to reach a server.
 *
 * === BACKEND INTEGRATION ===
 * Replace the bodies of `listWishes` and `submitGuestRsvp` with fetch calls to e.g.
 * `app/api/rsvp/route.ts` (GET = list wishes, POST = create RSVP), keeping the same signatures.
 *   POST body:  { name: string, guestsCount: number (1..max), attendance: 'hadir'|'tidak_hadir'|'ragu', message: string }
 *   201 reply:  { ok: true, data: GuestWish }
 *   4xx reply:  { ok: false, error: string, fieldErrors?: RsvpFieldErrors }
 * Run `validateRsvp` on the server too; the client check is only for UX.
 */

import { GuestWish, WEDDING_CONFIG } from '@/config/wedding';

const STORAGE_KEY = 'wedding_3d_rsvp_wishes_v2';

export interface RsvpSubmissionInput {
  name: string;
  guestsCount: number;
  attendance: GuestWish['attendance'];
  message: string;
}

export type RsvpFieldErrors = Partial<Record<keyof RsvpSubmissionInput, string>>;

export interface RsvpServiceResponse {
  ok: boolean;
  data?: GuestWish;
  error?: string;
  fieldErrors?: RsvpFieldErrors;
}

export function validateRsvp(input: RsvpSubmissionInput): RsvpFieldErrors {
  const errors: RsvpFieldErrors = {};
  const max = WEDDING_CONFIG.rsvp.maxGuestsPerInvitation;
  if (input.name.trim().length < 2) errors.name = 'Mohon tuliskan nama Anda.';
  if (input.name.trim().length > 80) errors.name = 'Nama terlalu panjang (maks. 80 karakter).';
  if (input.attendance === 'hadir' && !(input.guestsCount >= 1 && input.guestsCount <= max)) {
    errors.guestsCount = `Jumlah tamu antara 1 dan ${max} orang.`;
  }
  if (input.message.trim().length < 5) errors.message = 'Mohon tuliskan ucapan singkat (min. 5 karakter).';
  if (input.message.trim().length > 500) errors.message = 'Ucapan maksimal 500 karakter.';
  return errors;
}

function readStore(): GuestWish[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listWishes(): Promise<GuestWish[]> {
  return [...readStore(), ...WEDDING_CONFIG.initialWishes];
}

export async function submitGuestRsvp(input: RsvpSubmissionInput): Promise<RsvpServiceResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600)); // mimic network latency

  const fieldErrors = validateRsvp(input);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: 'Mohon periksa kembali isian Anda.', fieldErrors };
  }

  const wish: GuestWish = {
    id: `wish-${Date.now()}`,
    name: input.name.trim(),
    relation: 'Tamu Undangan',
    attendance: input.attendance,
    guestsCount: input.attendance === 'hadir' ? input.guestsCount : 0,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([wish, ...readStore()]));
  } catch {
    return { ok: false, error: 'Konfirmasi gagal disimpan di perangkat ini. Silakan coba lagi.' };
  }
  return { ok: true, data: wish };
}
