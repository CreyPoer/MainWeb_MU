import React from 'react';
import { notFound } from 'next/navigation';
import HeroDetail from '@/components/Media/Berita/Detail/HeroDetail';
import ContentDetail from '@/components/Media/Berita/Detail/ContentDetail';
import FooterSection from '@/components/HomePage/FooterSection';
import { Metadata } from 'next';

// --- DUMMY DATA LOOKUP ---
// In a real app, this would fetch from an API
const getNewsItem = (id: string) => {
    // Extended Dummy Data with Content
    const NEWS_DETAILS: Record<string, any> = {
        "1": {
            id: 1,
            title: "MADURA UNITED FC SIAP HADAPI MUSIM BARU",
            date: "04 Februari 2026",
            category: "Tim Utama",
            author: "Media Officer",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
            content: [
                "Pamekasan - Skuad Laskar Sape Kerrab terus mematangkan persiapan menjelang bergulirnya musim kompetisi baru. Pelatih kepala menegaskan bahwa kondisi fisik dan mental para pemain saat ini berada dalam level terbaik.",
                "Dalam sesi latihan terakhir yang digelar di Stadion Gelora Madura Ratu Pamelingan, seluruh pemain tampak antusias melahap menu latihan yang diberikan. Fokus utama saat ini adalah mematangkan taktik dan strategi permainan yang akan diterapkan.",
                "\"Kami telah melakukan evaluasi mendalam dari musim sebelumnya. Ada beberapa aspek yang perlu ditingkatkan, terutama dalam transisi bertahan ke menyerang. Para pemain baru juga sudah mulai beradaptasi dengan baik dengan gaya permainan tim,\" ujar sang pelatih.",
                "Manajemen Madura United FC juga menargetkan pencapaian yang lebih baik musim ini. Dukungan penuh dari suporter diharapkan dapat menjadi motivasi tambahan bagi para pemain untuk selalu memberikan yang terbaik di setiap pertandingan.",
                "Kompetisi musim ini diprediksi akan berjalan ketat dengan banyaknya tim yang melakukan perombakan skuad. Namun, optimisme tinggi tetap diusung oleh seluruh elemen tim Madura United untuk bersaing di papan atas klasemen."
            ]
        },
        "2": {
            id: 2,
            title: "AKADEMI U-20 MENUNJUKKAN PERFORMA GEMILANG",
            date: "02 Februari 2026",
            category: "Academy",
            author: "Academy Staff",
            image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
            content: [
                "Bangkalan - Kabar gembira datang dari skuad muda Madura United U-20. Dalam serangkaian uji coba yang dilakukan pekan ini, mereka berhasil mencatatkan hasil yang sangat memuaskan.",
                "Kemenangan beruntun ini membuktikan bahwa pembinaan usia dini yang dilakukan oleh manajemen Madura United mulai membuahkan hasil. Beberapa pemain bahkan dinilai pantas untuk segera dipromosikan ke tim utama.",
                "Direktur Akademi Madura United menyatakan kebanggaannya atas progres yang ditunjukkan oleh para pemain muda. \"Ini adalah hasil kerja keras mereka selama latihan. Disiplin dan dedikasi adalah kunci utama,\" ungkapnya.",
                "Program akademi ini memang dirancang untuk mencetak bibit-bibit unggul yang nantinya dapat menjadi tulang punggung tim senior Madura United di masa depan, serta berkontribusi bagi sepak bola nasional."
            ]
        },
        "3": {
            id: 3,
            title: "REKAP HASIL PERTANDINGAN: MENANG DI KANDANG",
            date: "30 Januari 2026",
            category: "Pertandingan",
            author: "Reporter",
            image: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=1000&auto=format&fit=crop",
            content: [
                "Pamekasan - Madura United berhasil mengamankan 3 poin penting saat menjamu tamunya dalam lanjutan liga pekan ini. Bermain di hadapan ribuan pendukung setia, K-Conk Mania, Laskar Sape Kerrab tampil dominan sejak peluit awal dibunyikan.",
                "Gol pembuka lahir pada menit ke-15 melalui skema serangan balik cepat yang dieksekusi dengan sempurna oleh striker andalan. Keunggulan ini membuat para pemain semakin percaya diri dalam menguasai jalannya pertandingan.",
                "Tim tamu sempat memberikan perlawanan sengit di babak kedua, namun solidnya lini pertahanan Madura United berhasil mematahkan setiap serangan. Justru Madura United berhasil menggandakan keunggulan jelang akhir laga melalui tendangan bebas indah.",
                "Kemenangan 2-0 ini menjadi modal berharga untuk menatap laga selanjutnya yang diprediksi akan lebih berat. Pelatih mengapresiasi kerja keras seluruh pemain yang tampil disiplin sepanjang 90 menit."
            ]
        }
    };

    // Fallback for other IDs not detailed above, just use a generic filler
    if (!NEWS_DETAILS[id]) {
        return {
            id: parseInt(id),
            title: "BERITA SEPAK BOLA TERKINI MADURA UNITED",
            date: "01 Januari 2026",
            category: "Umum",
            author: "Admin",
            image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
            content: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
            ]
        };
    }

    return NEWS_DETAILS[id];
};

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const news = getNewsItem(id);

    return {
        title: `${news.title} | Berita Madura United`,
        description: news.content[0].substring(0, 150) + '...',
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const news = getNewsItem(id);

    if (!news) {
        notFound();
    }

    return (
        <main className="bg-neutral-900 min-h-screen">
            {/* Custom Hero */}
            <HeroDetail
                title={news.title}
                image={news.image}
            />

            {/* Content with Sidebar */}
            <ContentDetail newsItem={news} />

            <FooterSection />
        </main>
    );
}
