"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GalerijaPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Dinamički učitaj sve slike iz public/Slike/
    const imageFiles = [
      "DSC_9116.jpeg",
      "DSC_9117.jpeg",
      "DSC_9120.jpeg",
      "DSC_9122.jpeg",
      "DSC_9123.jpeg",
      "DSC_9124.jpeg",
      "DSC_9126.jpeg",
      "DSC_9129.jpeg",
      "DSC_9133.jpeg",
      "DSC_9135.jpeg",
      "DSC_9136.jpeg",
      "DSC_9137.jpeg",
      "DSC_9138.jpeg",
      "DSC_9139.jpeg",
      "DSC_9140.jpeg",
      "DSC_9142.jpeg",
      "DSC_9143.jpeg",
      "DSC_9150.jpeg",
      "DSC_9152.jpeg",
      "DSC_9155.jpeg",
      "DSC_9158.jpeg",
      "DSC_9166.jpeg",
      "DSC_9168.jpeg",
      "DSC_9170.jpeg",
      "DSC_9173.jpeg",
      "DSC_9181.jpeg",
      "DSC_9182.jpeg",
      "DSC_9184.jpeg",
      "DSC_9187.jpeg",
      "DSC_9193.jpeg",
      "DSC_9198.jpeg",
      "DSC_9202.jpeg",
      "DSC_9205.jpeg",
      "DSC_9220.jpeg",
      "DSC_9226.jpeg",
      "DSC_9227.jpeg",
      "DSC_9232.jpeg",
      "DSC_9234.jpeg",
      "DSC_9242.jpeg",
      "DSC_9244.jpeg",
      "DSC_9249.jpeg",
      "DSC_9255.jpeg",
      "DSC_9261.jpeg",
      "DSC_9264.jpeg",
      "DSC_9269.jpeg",
    ];
    setImages(imageFiles);
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Galerija
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pogledajte naše radove i rezultate profesionalnog čišćenja
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={`/Slike/${image}`}
                alt={`Galerija slika ${index + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl max-h-full">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
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
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

