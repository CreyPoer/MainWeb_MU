"use client";

import React from "react";
import MUFANavbar from "./MUFANavbar";
import MUFAHeroSection from "./MUFAHeroSection";
import MUFAProgramSection from "./MUFAProgramSection";
import MUFAFacilitiesSection from "./MUFAFacilitiesSection";
import MUFANewsSection from "./MUFANewsSection";
import MUFAGallerySection from "./MUFAGallerySection";
import MUFAVideoSection from "./MUFAVideoSection";
import MUFAFooter from "./MUFAFooter";
import styles from "./MUFAHome.module.css";

export default function MUFAHomePage() {
  return (
    <div className={styles.mufaPage}>
      <MUFANavbar />
      <main>
        <MUFAHeroSection />
        <MUFAProgramSection />
        <MUFAFacilitiesSection />
        <MUFANewsSection />
        <MUFAGallerySection />
        <MUFAVideoSection />
      </main>
      <MUFAFooter />
    </div>
  );
}
