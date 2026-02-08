"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Odabiremo nekoliko reprezentativnih slika za showcase
const showcaseImages = [
  "DSC_9116.jpeg",
  "DSC_9120.jpeg",
  "DSC_9125.jpeg",
  "DSC_9133.jpeg",
  "DSC_9140.jpeg",
  "DSC_9150.jpeg",
  "DSC_9161.jpeg",
  "DSC_9170.jpeg",
];

export default function ImageShowcase() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Naši Rezultati
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Prije i poslije - vidite razliku koju profesionalno čišćenje čini
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {showcaseImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={`/Slike/${image}`}
                alt={`Rezultat čišćenja ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/galerija"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Pogledajte cijelu galeriju
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
                onClick={() => setSelectedImage(null)}
                aria-label="Zatvori"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={`/Slike/${selectedImage}`}
                alt="Povećana slika"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

