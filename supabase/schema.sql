-- ==============================================================================
-- WEDDING INVITATION: SUPABASE DATABASE SCHEMA
-- Table: public.wishes (RSVP & Guest Messages)
-- ==============================================================================

-- 1. Create the wishes table
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  relation VARCHAR(100) DEFAULT 'Tamu Undangan',
  attendance VARCHAR(20) NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  guests_count SMALLINT NOT NULL DEFAULT 1 CHECK (guests_count >= 0 AND guests_count <= 10),
  message TEXT NOT NULL CHECK (char_length(message) >= 2 AND char_length(message) <= 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add table comments for documentation
COMMENT ON TABLE public.wishes IS 'Menyimpan konfirmasi kehadiran (RSVP) dan ucapan doa dari para tamu undangan.';
COMMENT ON COLUMN public.wishes.id IS 'ID unik pesan/ucapan (UUID v4).';
COMMENT ON COLUMN public.wishes.name IS 'Nama tamu undangan.';
COMMENT ON COLUMN public.wishes.relation IS 'Hubungan dengan mempelai (misal: Teman Kuliah, Keluarga, Rekan Kerja).';
COMMENT ON COLUMN public.wishes.attendance IS 'Status kehadiran: hadir | tidak_hadir | ragu.';
COMMENT ON COLUMN public.wishes.guests_count IS 'Jumlah tamu yang akan hadir bersama undangan ini.';
COMMENT ON COLUMN public.wishes.message IS 'Teks ucapan dan doa untuk kedua mempelai.';
COMMENT ON COLUMN public.wishes.created_at IS 'Waktu pengiriman ucapan.';

-- 2. Create index for performant ordering of recent wishes
CREATE INDEX IF NOT EXISTS idx_wishes_created_at_desc ON public.wishes (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy: Siapa saja dapat melihat daftar ucapan
DROP POLICY IF EXISTS "Public can view wishes" ON public.wishes;
CREATE POLICY "Public can view wishes"
ON public.wishes
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. RLS Policy: Publik dapat mengirimkan ucapan baru
DROP POLICY IF EXISTS "Public can insert wishes" ON public.wishes;
CREATE POLICY "Public can insert wishes"
ON public.wishes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) >= 2 AND
  char_length(trim(message)) >= 2
);

-- 6. Enable Realtime updates (opsional: agar ucapan langsung muncul saat ada yang input baru)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
      AND schemaname = 'public' 
      AND tablename = 'wishes'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;
  END IF;
END $$;

