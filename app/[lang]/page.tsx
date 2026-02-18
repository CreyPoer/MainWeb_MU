import HeroSlider from "@/components/HomePage/HeroSlider";
import MatchSection from "@/components/HomePage/MatchSection";
import ResultSection from "@/components/HomePage/ResultSection";
import NewsStandingsSection from "@/components/HomePage/NewsStandingsSection";
import VideoHighlightSection from "@/components/HomePage/VideoHighlightSection";
import GallerySection from "@/components/HomePage/GallerySection";
import MerchandiseSection from "@/components/HomePage/MerchandiseSection";
import PartnerSection from "@/components/HomePage/PartnerSection";
import FooterSection from "@/components/HomePage/FooterSection";

import AOSInit from "@/components/HomePage/AOSInit";

export default function Home() {
  return (
    <main>
      <AOSInit />
      <div id="home"><HeroSlider /></div>
      <div id="match"><MatchSection /></div>
      <div id="results"><ResultSection /></div>
      <div id="news"><NewsStandingsSection /></div>
      <div id="videos"><VideoHighlightSection /></div>
      <div id="gallery"><GallerySection /></div>
      <div id="merchandise"><MerchandiseSection /></div>
      <div id="partners"><PartnerSection /></div>
      <FooterSection />
    </main>
  );
}
