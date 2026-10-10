// lib/wedding-data.ts
// Semua data undangan ada di sini. Edit file ini untuk mengubah isi website.

export const WEDDING = {
  slug: "tisya-madroji",
  title: "The Wedding of Tisya & Madroji",
  description: "Undangan Pernikahan Tisya Azzahra & Madroji - 8 November 2026",

  bride: {
    shortName: " Icha ",
    fullName: "Tisya Azzahra",
    childOrder: "Putri ke-2 dari",
    father: "Bpk. Sudarman",
    mother: "Ibu Siti Khodijah",
    photo: "/images/couple/bride.jpg", // PLACEHOLDER: ganti dengan foto asli
  },
  groom: {
    shortName: " Oji ",
    fullName: "Madroji",
    childOrder: "Putra Tunggal dari",
    father: "Bpk. Otib",
    mother: "Ibu Suaidah",
    photo: "/images/couple/groom.jpg", // PLACEHOLDER: ganti dengan foto asli
  },

  // Format ISO dengan offset WIB (+07:00) supaya countdown akurat di semua zona waktu
  eventDateISO: "2026-11-08T09:00:00+07:00",
  timezone: "Asia/Jakarta",
  dateLabel: "Minggu, 8 November 2026",
  coverDate: "08-11-2026",

  events: [
    { id: "akad", title: "Akad Nikah", date: "Minggu, 8 November 2026", time: "09.00 WIB - selesai" },
    { id: "resepsi", title: "Resepsi", date: "Minggu, 8 November 2026", time: "11.00 WIB - selesai" },
  ],

  address: [
    "Jl. Akasia Kp. Duren Sawit RT.02/RW.04",
    "Gg. Mesjid An - Nur Tajur",
    "Ciledug - Tangerang",
  ],

  quote: {
    text: "Jika seseorang menikah, maka ia telah menyempurnakan separuh agamanya. Karena bertakwalah pada Allah SWT pada separuh yang lainnya.",
    source: "HR. Al Baihaqi",
  },

  families: [
    "Kel. Besar (Alm) Bpk. Sukatma (Ciledug)",
    "Kel. Besar (Alm) Bpk. Rangga (Legok)",
    "Kel. Besar (Alm) Bpk. Ilyas (Cirebon)",
    "Kel. Besar (Alm) Bpk. Permana Sajum (Kuningan)",
    "Kel. Besar Balaraja, Bpk. Zaenal Hakim / Bpk. Jejen Dkk",
    "Ust. Kosasih Pimpinan PP Al Uluniyah (Tangerang)",
    "Ust. H. Mansyur (Adik - Tangerang)",
    "Wa. Minah (Kakak - Tangerang)",
    "Ust. Amri (Kakak - Lampung)",
    "Amir Ahmad Zainudin (Adik - Lampung)",
    "Sutisna / Bos Ayeng (Tangerang)",
    "Bpk. Ketua RT. 02/04 Adami",
    "Bpk. Ketua RT. 02/03 Sukirman",
    "Segenap Kel. Besar PT. RMP",
  ],

  // TODO: isi lewat .env.local (lihat .env.example), jangan ditulis di sini
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "",
    // OPSIONAL: src dari Google Maps → Bagikan → Sematkan peta. Kosongkan jika belum ada.
  mapsEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ?? "",

  music: "/music/wedding.mp3",
  ogImage: "/images/og-image.jpg",

  allowSearchIndexing: false,

  // Foto galeri: simpan sebagai public/images/gallery/1.jpg, 2.jpg, dst.
  // Ubah angka 8 menjadi jumlah foto Anda (6 sampai 12).
  gallery: Array.from({ length: 8 }, (_, i) => ({
    src: `/images/gallery/${i + 1}.jpg`,
    alt: `Foto galeri ${i + 1}`,
  })),

  // TODO: ganti nilai "TODO_..." dengan data asli. Jangan diisi data karangan.
  gift: {
    accounts: [
      {
        bank: "TODO_BANK_NAME",
        number: "TODO_ACCOUNT_NUMBER",
        name: "TODO_ACCOUNT_NAME",
      },
    ],
    qris: "/images/qris/qris.png", // PLACEHOLDER: ganti dengan gambar QRIS asli
  },
} as const;

export type Wedding = typeof WEDDING;