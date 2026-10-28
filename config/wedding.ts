/**
 * CENTRALIZED WEDDING CONFIGURATION
 * Edit this file to customize names, dates, quotes, schedule, gallery, and RSVP settings
 * without touching individual UI or 3D components.
 */

export interface StoryMilestone {
  year: string;
  season: string;
  title: string;
  location: string;
  description: string;
}

export interface EventScheduleItem {
  id: 'akad' | 'resepsi';
  title: string;
  subtitle: string;
  dayAndDate: string;
  startTime: string;
  endTime: string;
  timezoneLabel: string;
  venueName: string;
  hallOrArea: string;
  address: string;
  dressCode: string;
  mapUrl: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  guestsCount: number;
  message: string;
  createdAt: string; // ISO 8601
}

export const WEDDING_CONFIG = {
  // Example content below. Set to false once every value is real; while true a small "draft" marker is shown.
  draft: true,
  conceptTitle: 'A Day Written in Love',
  headerLabel: 'THE WEDDING OF',
  modelPath: '/models/Backdrop_Pernikahan_Romantis_Updated.glb',

  couple: {
    groom: {
      fullName: 'Arkananta Pramudya',
      nickname: 'Arka',
      parents: 'Putra pertama dari Bapak H. Hendra Pramudya & Ibu Hj. Ratna Kusuma',
      instagram: '@arkananta.p',
    },
    bride: {
      fullName: 'Nadine Ayuningtyas',
      nickname: 'Nadine',
      parents: 'Putri bungsu dari Bapak Ir. Surya Wijaya & Ibu Dra. Maharani Putri',
      instagram: '@nadine.ayuningtyas',
    },
    portraitImage: '/images/couple_portrait.jpg',
  },

  date: {
    displayFull: 'Sabtu, 12 Desember 2026',
    shortDate: '12 . 12 . 2026',
    isoDateTime: '2026-12-12T08:30:00+07:00',
    timezone: 'Asia/Jakarta',
    timezoneShort: 'WIB (UTC+7)',
    passedMessage: 'Alhamdulillah, rangkaian akad dan resepsi pernikahan telah terlaksana dengan penuh kehangatan. Terima kasih atas doa restu Anda.',
  },

  quotes: {
    openingQuote: '“Two hearts, one beautiful beginning.”',
    mainVerse: '“Dan di antara tanda-tanda-Nya, Dia menciptakan pasangan-pasangan untukmu agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.”',
    mainVerseSource: 'QS. Ar-Rum : 21',
    closingNote: 'Kehadiran dan doa restu Anda adalah kado terindah bagi langkah awal perjalanan rumah tangga kami.',
  },

  story: {
    sectionLabel: 'CHAPTER I — THE JOURNEY',
    heading: 'Our Story',
    leadParagraph:
      'Setiap pertemuan memiliki waktunya sendiri. Dari perbincangan singkat di sela hujan sore hingga keyakinan untuk melangkah menuju meja akad, inilah lembaran perjalanan yang membawa kami ke hari ini.',
    featuredPhoto: '/images/couple_portrait.jpg',
    secondaryPhoto: '/images/aisle_walk.jpg',
    milestones: [
      {
        year: '2022',
        season: 'Oktober • Pertemuan Pertama',
        title: 'Sebuah Sapa di Pameran Arsitektur',
        location: 'Senayan, Jakarta Selatan',
        description:
          'Berawal dari diskusi mengenai tata cahaya ruang dan estetika taman tropis, percakapan sore itu berlanjut menjadi persahabatan yang hangat dan saling menguatkan.',
      },
      {
        year: '2024',
        season: 'Mei • Menumbuhkan Keyakinan',
        title: 'Menemukan Rumah dalam Satu Sama Lain',
        location: 'Bandung, Jawa Barat',
        description:
          'Melalui berbagai musim dan kesibukan, kami belajar bahwa ketenangan sejati hadir ketika dua insan saling mendukung mimpi dan bertumbuh bersama.',
      },
      {
        year: '2026',
        season: 'Maret • Lamaran Keluarga',
        title: 'Mengikat Janji di Hadapan Dua Keluarga',
        location: 'Kebayoran Baru, Jakarta',
        description:
          'Dengan restu kedua orang tua, dua cincin emas hangat menjadi simbol kesungguhan kami untuk melangkah menuju ikatan suci pernikahan.',
      },
      {
        year: '2026',
        season: '12 Desember • A Day Written in Love',
        title: 'Melangkah ke Pelaminan',
        location: 'The Glasshouse Botanical Venue, Jakarta',
        description:
          'Di bawah naungan kain olive dan rangkaian mawar dusty blush, kami mengundang Anda menjadi saksi awal kehidupan baru kami.',
      },
    ] as StoryMilestone[],
  },

  events: [
    {
      id: 'akad',
      title: 'Akad Nikah',
      subtitle: 'Prosesi Ijab Qabul Intim',
      dayAndDate: 'Sabtu, 12 Desember 2026',
      startTime: '08:30',
      endTime: '10:30',
      timezoneLabel: 'WIB',
      venueName: 'The Glasshouse Conservatory & Garden',
      hallOrArea: 'Main Botanical Sanctuary (Sesuai Model 3D)',
      address: 'Jl. Wijaya Kusuma No. 42, Dharmawangsa, Kebayoran Baru, Jakarta Selatan 12160',
      dressCode: 'Warm Ivory, Champagne Beige, atau Dusty Blush Attire',
      mapUrl: 'https://www.google.com/maps/place/Dharmawangsa,+Kebayoran+Baru,+South+Jakarta+City,+Jakarta',
    },
    {
      id: 'resepsi',
      title: 'Intimate Garden Reception',
      subtitle: 'Perjamuan Malam & Ramah Tamah',
      dayAndDate: 'Sabtu, 12 Desember 2026',
      startTime: '18:30',
      endTime: '21:30',
      timezoneLabel: 'WIB',
      venueName: 'The Glasshouse Conservatory & Garden',
      hallOrArea: 'Grand Rose Pavilion & Candlelight Terrace',
      address: 'Jl. Wijaya Kusuma No. 42, Dharmawangsa, Kebayoran Baru, Jakarta Selatan 12160',
      dressCode: 'Formal Evening / Earth & Botanical Palette (Olive, Gold, Mauve)',
      mapUrl: 'https://www.google.com/maps/place/Dharmawangsa,+Kebayoran+Baru,+South+Jakarta+City,+Jakarta',
    },
  ] as EventScheduleItem[],

  location: {
    venueName: 'The Glasshouse Conservatory & Garden',
    city: 'Dharmawangsa, Jakarta Selatan',
    fullAddress: 'Jl. Wijaya Kusuma No. 42, Dharmawangsa, Kebayoran Baru, Jakarta Selatan 12160',
    googleMapsUrl: 'https://www.google.com/maps/place/Dharmawangsa,+Kebayoran+Baru,+South+Jakarta+City,+Jakarta',
    valetAndParkingInfo:
      'Layanan Complimentary Valet Parking tersedia di lobi utama Gate A. Area parkir basement B1 & B2 terhubung langsung dengan lift menuju Garden Conservatory.',
    accessibilityInfo:
      'Jalur ramah kursi roda (wheelchair accessible) dan buggy car tersedia dari area drop-off menuju lorong utama pelaminan.',
    landmarks: [
      '5 menit dari Stasiun MRT Blok A / Haji Nawi',
      'Bersebelahan dengan Taman Brawijaya Dharmawangsa',
      'Akses bebas ganjil-genap melalui Jl. Pangeran Antasari',
    ],
  },

  gallery: [
    {
      id: 'photo-1',
      src: '/images/couple_portrait.jpg',
      alt: 'Potret editorial kedua mempelai di depan backdrop mawar dusty blush',
      caption: 'Di bawah lengkungan mawar dusty blush dan kain warm ivory.',
      category: 'Editorial Portrait',
      aspectRatio: 'portrait',
    },
    {
      id: 'photo-2',
      src: '/images/wedding_rings.jpg',
      alt: 'Detail cincin pernikahan emas di dalam kotak beludru dusty blush',
      caption: 'Simbol ikatan suci di atas kotak cincin beludru dusty blush & kain champagne.',
      category: 'Sacred Details',
      aspectRatio: 'landscape',
    },
    {
      id: 'photo-3',
      src: '/images/aisle_walk.jpg',
      alt: 'Mempelai berjalan di atas lorong warm ivory bertabur kelopak mawar',
      caption: 'Langkah bahagia menyusuri lorong warm ivory bertabur kelopak mawar.',
      category: 'The Aisle',
      aspectRatio: 'portrait',
    },
    {
      id: 'photo-4',
      src: '/images/reception_table.jpg',
      alt: 'Dekorasi meja resepsi dengan lilin taper gading dan lampu gantung kristal',
      caption: 'Kehangatan cahaya lilin taper dan kilau chandelier kristal di malam resepsi.',
      category: 'Venue Atmosphere',
      aspectRatio: 'landscape',
    },
  ] as GalleryPhoto[],

  audio: {
    // Put an mp3 in public/audio/ and set e.g. '/audio/background.mp3'. null hides the music button.
    src: null as string | null,
    trackTitle: 'A Day Written in Love',
  },

  rsvp: {
    maxGuestsPerInvitation: 4,
    deadlineDisplay: '1 Desember 2026',
  },

  initialWishes: [
    {
      id: 'wish-dummy-1',
      name: 'Rendra & Clara',
      relation: 'Sahabat Mempelai',
      attendance: 'hadir',
      guestsCount: 2,
      message:
        'Selamat menempuh hidup baru Arka & Nadine! Semoga pernikahan kalian selalu diberkahi kebahagiaan, ketenangan, dan cinta yang terus bertumbuh hingga menua bersama.',
      createdAt: '2026-11-28T10:15:00+07:00',
    },
    {
      id: 'wish-dummy-2',
      name: 'dr. Aditya Pratama',
      relation: 'Keluarga Besar',
      attendance: 'hadir',
      guestsCount: 1,
      message:
        'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Turut berbahagia atas bersatunya Arka dan Nadine dalam ikatan suci pernikahan.',
      createdAt: '2026-11-25T19:30:00+07:00',
    },
    {
      id: 'wish-dummy-3',
      name: 'Maya Anggraini',
      relation: 'Teman Kuliah',
      attendance: 'hadir',
      guestsCount: 2,
      message:
        'Happy wedding Nadine & Arka! Masih ingat cerita kalian waktu awal ketemu dulu, dan seneng banget akhirnya sampai di pelaminan. Langgeng dan bahagia selalu ya!',
      createdAt: '2026-11-26T14:20:00+07:00',
    },
    {
      id: 'wish-dummy-4',
      name: 'Dimas Setiawan & Keluarga',
      relation: 'Rekan Kerja',
      attendance: 'hadir',
      guestsCount: 3,
      message:
        'Selamat atas pernikahannya Mas Arka & Mbak Nadine. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah. Aamiin.',
      createdAt: '2026-11-27T08:45:00+07:00',
    },
    {
      id: 'wish-dummy-5',
      name: 'Salsabila Putri',
      relation: 'Sahabat Nadine',
      attendance: 'tidak_hadir',
      guestsCount: 0,
      message:
        'Dearest Nadine & Arka, mohon maaf sekali belum bisa hadir langsung karena masih di luar kota. Dari jauh aku doakan semoga seluruh rangkaian acara berjalan lancar dan kalian berdua selalu dilimpahi keberkahan!',
      createdAt: '2026-11-28T16:10:00+07:00',
    },
  ] as GuestWish[],
} as const;
