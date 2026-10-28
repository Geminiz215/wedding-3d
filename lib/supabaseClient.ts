/**
 * Native Supabase REST Client
 * Uses native Web Fetch to communicate with Supabase PostgREST API.
 * Requires 0 external npm dependencies and works seamlessly in Next.js browser & SSR.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey && !supabaseUrl.includes('your-project-id')
);

export interface SupabaseWishRow {
  id: string;
  name: string;
  relation: string | null;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guests_count: number | null;
  message: string;
  created_at: string;
}

export interface SupabaseWishInsert {
  name: string;
  relation?: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guests_count?: number;
  message: string;
}

const defaultHeaders = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
};

export const supabaseRest = {
  async getWishes(): Promise<{ data: SupabaseWishRow[] | null; error: string | null }> {
    if (!isSupabaseConfigured) return { data: null, error: 'Supabase is not configured' };

    try {
      const endpoint = `${supabaseUrl}/rest/v1/wishes?select=id,name,relation,attendance,guests_count,message,created_at&order=created_at.desc`;
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: defaultHeaders,
        cache: 'no-store',
      });

      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: `HTTP ${res.status}: ${text}` };
      }

      const data = (await res.json()) as SupabaseWishRow[];
      return { data, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },

  async insertWish(
    payload: SupabaseWishInsert
  ): Promise<{ data: SupabaseWishRow | null; error: string | null }> {
    if (!isSupabaseConfigured) return { data: null, error: 'Supabase is not configured' };

    try {
      const endpoint = `${supabaseUrl}/rest/v1/wishes`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          ...defaultHeaders,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        return { data: null, error: `HTTP ${res.status}: ${text}` };
      }

      const rows = (await res.json()) as SupabaseWishRow[];
      return { data: rows[0] ?? null, error: null };
    } catch (err) {
      return { data: null, error: (err as Error).message };
    }
  },
};
