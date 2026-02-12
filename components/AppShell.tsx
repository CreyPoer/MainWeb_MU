"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/HomePage/Navbar";
import ScrollToTop from "@/components/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

export default function AppShell({ children }: Props) {
  const pathname = usePathname();
  const isMUFA = pathname.startsWith("/mufa");

  return (
    <>
      {!isMUFA && <Navbar />}
      {children}
      <ScrollToTop />
    </>
  );
}
