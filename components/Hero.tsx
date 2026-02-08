"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Odabiremo nekoliko slika za hero pozadinu
  const heroImages = [
    "DSC_9116.jpeg",
    "DSC_9125.jpeg",
    "DSC_9140.jpeg",
    "DSC_9161.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Promijeni sliku svakih 5 sekundi

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Pozadinske slike s fade efektom */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`/Slike/${image}`}
              alt="Hero pozadina"
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Overlay za bolju čitljivost teksta */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/80" />
      </div>

      {/* Sadržaj */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Dubinsko čišćenje za temeljitu čistoću svakog kutka vašeg doma ili ureda
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Pranje tepiha s besplatnim prikupom i dostavom te profesionalno pranje tepisona za poslovne prostore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/rezerviraj"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition text-center"
            >
              Rezerviraj danas
            </Link>
            <Link
              href="/usluge"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition text-center"
            >
              Saznaj više
            </Link>
          </div>
          <p className="mt-6 text-blue-100">
            Do termina u par koraka
          </p>
        </div>
      </div>

      {/* Indikatori slika */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Prikaži sliku ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

