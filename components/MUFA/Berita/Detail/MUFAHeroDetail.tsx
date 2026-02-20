"use client";

import React from "react";
import Image from "next/image";
import styles from "../../HomePage/MUFAHome.module.css";

interface MUFAHeroDetailProps {
  title: string;
  image: string;
}

export default function MUFAHeroDetail({ title, image }: MUFAHeroDetailProps) {
  return (
    <section>
      <div className="relative w-full h-[220px] md:h-[260px] lg:h-[230px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full mt-5 md:mt-10 lg:mt-10">
            <div className={styles.mufaContainer}>
              <h1 className="text-lg md:text-3xl lg:text-4xl font-extrabold text-white uppercase leading-tight max-w-full text-left">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
