"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/HomePage/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import type { Locale } from "@/i18n.config";

interface Props {
  children: React.ReactNode;
  lang: Locale;
}

export default function AppShell({ children, lang }: Props) {
  const pathname = usePathname();
  const isMUFA = pathname.startsWith(`/${lang}/mufa`) || pathname === `/${lang}/mufa`;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      {!isMUFA && <Navbar />}
      {children}
      <ScrollToTop />
    </>
  );
}
