"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/HomePage/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const isMUFA = pathname.startsWith("/mufa");

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
