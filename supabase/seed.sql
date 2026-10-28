-- ==============================================================================
-- WEDDING INVITATION: SEED DUMMY DATA
-- Run after schema.sql
-- ==============================================================================

INSERT INTO public.wishes (name, relation, attendance, guests_count, message, created_at)
VALUES
  (
    'Rendra & Clara',
    'Sahabat Mempelai',
    'hadir',
    2,
    'Selamat menempuh hidup baru Arka & Nadine! Semoga perjalanan rumah tangga kalian selalu dipenuhi cinta, ketenangan, dan kebahagiaan tanpa akhir.',
    now() - interval '2 days'
  ),
  (
    'dr. Aditya Pratama',
    'Keluarga Besar',
    'hadir',
    1,
    'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Turut berbahagia untuk kedua keluarga besar.',
    now() - interval '1 day'
  ),
  (
    'Maya Anggraini',
    'Teman Kuliah',
    'hadir',
    2,
    'Happy wedding Nadine & Arka! Masih ingat cerita kalian waktu awal kenal, dan terharu banget akhirnya sampai di pelaminan. Langgeng selalu ya!',
    now() - interval '6 hours'
  ),
  (
    'Dimas & Salsabila',
    'Rekan Kantor',
    'tidak_hadir',
    0,
    'Selamat berbahagia Arka & Nadine. Mohon maaf belum bisa hadir langsung, namun doa terbaik kami panjatkan untuk kebahagiaan kalian berdua.',
    now() - interval '2 hours'
  );

