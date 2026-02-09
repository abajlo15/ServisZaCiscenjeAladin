"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Slike iz galerije za pozadinu
const backgroundImages = [
  "DSC_9116.jpeg",
  "DSC_9120.jpeg",
  "DSC_9126.jpeg",
  "DSC_9133.jpeg",
  "DSC_9135.jpeg",
  "DSC_9140.jpeg",
  "DSC_9150.jpeg",
  "DSC_9152.jpeg",
  "DSC_9170.jpeg",
  "DSC_9181.jpeg",
  "DSC_9182.jpeg",
  "DSC_9220.jpeg",
];

export default function VideoBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Promijeni sliku svakih 5 sekundi
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`/Slike/${image}`}
            alt="Pozadinska slika"
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
            quality={75}
          />
        </div>
      ))}
      {/* Overlay za bolju čitljivost */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

