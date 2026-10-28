/**
 * RSVP & GUEST WISHES SERVICE (Supabase + Local Fallback)
 */

import { GuestWish, WEDDING_CONFIG } from '@/config/wedding';
import { supabaseRest, SupabaseWishRow, isSupabaseConfigured } from '@/lib/supabaseClient';

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

function mapRowToWish(row: SupabaseWishRow): GuestWish {
  return {
    id: row.id,
    name: row.name,
    relation: row.relation ?? 'Tamu Undangan',
    attendance: row.attendance,
    guestsCount: row.guests_count ?? 0,
    message: row.message,
    createdAt: row.created_at,
  };
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
  if (isSupabaseConfigured) {
    const { data, error } = await supabaseRest.getWishes();
    if (!error && data && data.length > 0) {
      const dbWishes = data.map(mapRowToWish);
      return [...dbWishes, ...WEDDING_CONFIG.initialWishes];
    }
  }

  return [...readStore(), ...WEDDING_CONFIG.initialWishes];
}

export async function submitGuestRsvp(input: RsvpSubmissionInput): Promise<RsvpServiceResponse> {
  const fieldErrors = validateRsvp(input);
  if (Object.keys(fieldErrors).length) {
    return { ok: false, error: 'Mohon periksa kembali isian Anda.', fieldErrors };
  }

  const guestsCount = input.attendance === 'hadir' ? input.guestsCount : 0;

  if (isSupabaseConfigured) {
    const { data, error } = await supabaseRest.insertWish({
      name: input.name.trim(),
      relation: 'Tamu Undangan',
      attendance: input.attendance,
      guests_count: guestsCount,
      message: input.message.trim(),
    });

    if (!error && data) {
      return { ok: true, data: mapRowToWish(data) };
    }
  }

  const wish: GuestWish = {
    id: `wish-${Date.now()}`,
    name: input.name.trim(),
    relation: 'Tamu Undangan',
    attendance: input.attendance,
    guestsCount,
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([wish, ...readStore()]));
  } catch {
    return { ok: false, error: 'Konfirmasi gagal disimpan. Silakan coba lagi.' };
  }
  return { ok: true, data: wish };
}
