import React from "react";

export default function HeroTentang() {
  return (
    <section
      className="relative w-full min-h-105 md:min-h-130 flex items-center justify-center overflow-hidden"
      style={{ color: "#FFFFFF", marginBottom: "50px" }}
      data-aos="fade-down"
      data-aos-duration="1200"
    >
      {/* Background image + red overlay (match section style) */}
      <div
        className="absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: "url('/madura-united.png')",
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#D32F2F",
          backgroundBlendMode: "multiply",
          opacity: 1,
        }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/40 mix-blend-multiply opacity-70" />

      <div className="relative z-20 container mx-auto px-4 md:px-8 py-20 md:py-28 flex flex-col items-center text-center">
        <span
          className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-neutral-200 mb-4"
          data-aos="fade-up"
        >
          Klub
        </span>
        <h1
          className="font-black uppercase tracking-tight leading-tight text-white drop-shadow-xl"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.8rem)" }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          TENTANG MADURA UNITED FC
        </h1>
      </div>
    </section>
  );
}
