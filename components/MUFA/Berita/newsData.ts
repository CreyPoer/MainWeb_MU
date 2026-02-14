export type MufaNewsBase = {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  tags: string[];
};

export type MufaNewsDetail = MufaNewsBase & {
  content: string[];
  author: string;
  penerbit?: string;
  link_berita?: string;
};

export const MUFA_NEWS_DETAILS: MufaNewsDetail[] = [
  {
    id: 1,
    title: "Trial Day MUFA: Ratusan Talenta Mengikuti Seleksi",
    date: "02 Februari 2026",
    category: "Academy",
    excerpt:
      "Talenta muda dari berbagai daerah mengikuti seleksi terbuka program Madura United Football Academy di MUTG.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1400",
    tags: ["academy", "trial", "mufa"],
    author: "Redaksi MUFA",
    content: [
      "Ratusan talenta muda hadir di Madura United Training Ground (MUTG) untuk mengikuti Trial Day MUFA. Kegiatan ini menjadi pintu awal bagi pemain muda yang ingin menapaki jalur pembinaan resmi Madura United Football Academy.",
      "Para peserta menjalani serangkaian tes mulai dari aspek teknik dasar, pemahaman taktik, hingga kemampuan fisik. Tim pelatih MUFA bersama perwakilan tim pemandu bakat Madura United FC melakukan pemantauan langsung sepanjang sesi.",
      "Dari rangkaian seleksi ini, MUFA menargetkan menemukan pemain-pemain potensial yang dapat dibina dalam jangka panjang melalui kurikulum akademi yang terstruktur dan berjenjang.",
    ],
  },
  {
    id: 2,
    title: "Coaching Clinic Bersama Tim Utama Madura United",
    date: "28 Januari 2026",
    category: "Klinik Kepelatihan",
    excerpt:
      "Peserta MUFA mendapat sesi spesial bersama pemain dan pelatih tim utama untuk mengasah pemahaman taktik modern.",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1400",
    tags: ["clinic", "tim utama", "experience"],
    author: "Redaksi MUFA",
    content: [
      "Dalam rangka mempererat hubungan antara akademi dan tim utama, MUFA menggelar sesi coaching clinic di MUTG. Para pemain muda berkesempatan merasakan langsung atmosfer latihan yang dipimpin oleh staf pelatih Madura United FC.",
      "Materi yang diberikan mencakup organisasi permainan, transisi menyerang dan bertahan, hingga pentingnya komunikasi di lapangan. Pemain tim utama juga membagikan pengalaman mereka mengenai perjalanan karier profesional.",
      "Melalui kegiatan ini, diharapkan para peserta mendapatkan gambaran nyata standar permainan yang dibutuhkan untuk bisa menembus level senior.",
    ],
  },
  {
    id: 3,
    title: "U-18 MUFA Raih Kemenangan Besar di Laga Uji Coba",
    date: "21 Januari 2026",
    category: "Pertandingan",
    excerpt:
      "Skuad U-18 menunjukkan progres signifikan dengan kemenangan telak atas tim akademi lain dari Jawa Timur.",
    image:
      "https://images.unsplash.com/photo-1521410843008-dce7a1f4e0f3?auto=format&fit=crop&q=80&w=1400",
    tags: ["u18", "match", "progress"],
    author: "Redaksi MUFA",
    content: [
      "Tim U-18 MUFA menjalani laga uji coba melawan salah satu akademi ternama di Jawa Timur dan berhasil meraih kemenangan meyakinkan. Permainan kolektif dan intensitas tinggi menjadi kunci keberhasilan tim.",
      "Pelatih kepala U-18 menyoroti peningkatan dalam hal penguasaan bola, pressing, dan penyelesaian akhir dibandingkan laga-laga sebelumnya. Rotasi pemain juga dilakukan untuk memberikan menit bermain yang merata.",
      "Hasil positif ini menjadi modal penting sebelum memasuki kompetisi resmi kelompok umur yang akan berlangsung dalam beberapa bulan ke depan.",
    ],
  },
  {
    id: 4,
    title: "Program Latihan Khusus Penjaga Gawang MUFA",
    date: "18 Januari 2026",
    category: "Latihan",
    excerpt:
      "Pelatih kiper memperkenalkan modul latihan baru untuk meningkatkan refleks, distribusi bola, dan komunikasi penjaga gawang.",
    image:
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1400",
    tags: ["goalkeeper", "training"],
    author: "Redaksi MUFA",
    content: [
      "Departemen kepelatihan MUFA meluncurkan program khusus untuk penjaga gawang di seluruh kelompok umur. Sesi ini difokuskan pada peningkatan ketangkasan, kecepatan reaksi, serta kemampuan membaca arah bola.",
      "Selain latihan teknis di bawah mistar, penjaga gawang juga diberi porsi latihan distribusi menggunakan kaki untuk mendukung pola build-up dari belakang. Aspek komunikasi dengan lini belakang tak luput dari perhatian.",
      "Program ini dirancang agar kiper MUFA mampu menjawab kebutuhan sepak bola modern yang menuntut peran lebih aktif dalam fase menyerang maupun bertahan.",
    ],
  },
  {
    id: 5,
    title: "Fasilitas Gym MUFA Ditingkatkan untuk Musim Baru",
    date: "12 Januari 2026",
    category: "Fasilitas",
    excerpt:
      "Area kebugaran di kompleks latihan mendapat pembaruan peralatan untuk mendukung pengembangan fisik pemain akademi.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&q=80&w=1400",
    tags: ["facility", "gym", "upgrade"],
    author: "Redaksi MUFA",
    content: [
      "MUFA resmi memperbarui fasilitas gym yang berada di area training ground. Sejumlah peralatan baru berstandar tinggi dihadirkan untuk menunjang program penguatan fisik pemain.",
      "Tim performance coach menyusun jadwal pemanfaatan gym yang terintegrasi dengan sesi latihan di lapangan. Setiap kelompok umur mendapatkan menu spesifik sesuai kebutuhan perkembangan usia.",
      "Peningkatan fasilitas ini menunjukkan komitmen klub untuk memberikan lingkungan latihan profesional sejak dini bagi para pemain akademi.",
    ],
  },
  {
    id: 6,
    title: "Sesi Mental Coaching: Membangun Karakter Profesional",
    date: "08 Januari 2026",
    category: "Pengembangan Diri",
    excerpt:
      "Tim psikolog olahraga memberikan sesi khusus tentang mentalitas kompetitif dan manajemen tekanan bagi pemain muda.",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1400",
    tags: ["mental", "coaching", "character"],
    author: "Redaksi MUFA",
    content: [
      "Selain aspek teknis dan fisik, MUFA juga menaruh perhatian besar pada pengembangan mental pemain. Melalui sesi mental coaching, pemain diajak memahami pentingnya fokus, disiplin, dan pengelolaan emosi.",
      "Psikolog olahraga memaparkan berbagai situasi tekanan yang umum terjadi dalam pertandingan serta strategi praktis untuk menghadapinya. Sesi diskusi interaktif membuat pemain lebih leluasa berbagi pengalaman.",
      "Program ini diharapkan dapat membantu pemain membangun karakter profesional yang siap menghadapi tantangan kompetisi di level lebih tinggi.",
    ],
  },
];

export const MUFA_NEWS_LIST = MUFA_NEWS_DETAILS.map(
  ({ content, author, ...rest }) => rest
);
