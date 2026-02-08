"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const usluge = [
  {
    id: "tepisi",
    title: "Strojno Pranje Tepiha",
    subtitle: "(Besplatan prikup i dostava)",
    description: "Strojno pranje tepiha uključuje prikup, pranje, ispiranje u centrifugi, sušenje u komori i dostavu tepiha zaštićenih od prljavštine.",
    link: "/usluge#tepisi",
    images: [
      "/Slike/DSC_9116.jpeg",
      "/Slike/DSC_9125.jpeg",
      "/Slike/DSC_9126.jpeg",
      "/Slike/DSC_9129.jpeg",
      "/Slike/DSC_9133.jpeg",
      "/Slike/DSC_9135.jpeg",
    ],
  },
  {
    id: "tepisoni",
    title: "Strojno Pranje Tepisona",
    description: "Strojno pranje tepisona obuhvaća usisavanje s četkama, tretiranje mrlja, šamponiranje i dubinsko ispiranje s ekstraktorom.",
    link: "/usluge#tepisoni",
    images: [
      "/Slike/DSC_9151.jpeg",
      "/Slike/DSC_9150.jpeg",
      "/Slike/DSC_9152.jpeg",
      "/Slike/DSC_9153.jpeg",
      "/Slike/DSC_9154.jpeg",
      "/Slike/DSC_9155.jpeg",
    ],
  },
  {
    id: "namjestaj",
    title: "Dubinsko Čišćenje Namještaja",
    description: "Profesionalno dubinsko čišćenje namještaja uključuje čišćenje kauča, fotelja, stolica i drugog tapaciranog namještaja pomoću ekstraktora i specijalnih sredstava.",
    link: "/usluge#namjestaj",
    images: [
      "/Slike/namjestaj1.webp",
      "/Slike/namjestaj2.webp",
      "/Slike/namjestaj3.jpg",
      "/Slike/namjestaj4.jfif",
      "/Slike/namjestaj5.jpg",
      "/Slike/namjestaj6.jpg",
    ],
  },
];

export default function Usluge() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Inicijaliziraj indekse za svaku uslugu
    const initialIndexes: { [key: string]: number } = {};
    usluge.forEach((usluga) => {
      initialIndexes[usluga.id] = 0;
    });
    setCurrentImageIndex(initialIndexes);
  }, []);

  useEffect(() => {
    // Automatska rotacija slika svakih 4 sekunde
    const intervals: NodeJS.Timeout[] = [];
    
    usluge.forEach((usluga) => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => ({
          ...prev,
          [usluga.id]: (prev[usluga.id] || 0 + 1) % usluga.images.length,
        }));
      }, 4000);
      intervals.push(interval);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  const goToImage = (uslugaId: string, index: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [uslugaId]: index,
    }));
  };

  return (
    <section id="usluge" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Naše Usluge
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Profesionalne usluge čišćenja za vaš dom i ured
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usluge.map((usluga) => {
            const currentIndex = currentImageIndex[usluga.id] || 0;
            return (
              <div
                key={usluga.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 relative overflow-hidden group">
                  {/* Glavna slika */}
                  <Image
                    src={usluga.images[currentIndex]}
                    alt={`${usluga.title} - Slika ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Indikatori slika */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {usluga.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(usluga.id, index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-white w-8"
                            : "bg-white/50 w-2 hover:bg-white/75"
                        }`}
                        aria-label={`Prikaži sliku ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Strelicama za navigaciju */}
                  {usluga.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          goToImage(
                            usluga.id,
                            (currentIndex - 1 + usluga.images.length) % usluga.images.length
                          )
                        }
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label="Prethodna slika"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          goToImage(usluga.id, (currentIndex + 1) % usluga.images.length)
                        }
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        aria-label="Sljedeća slika"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{usluga.title}</h3>
                  {usluga.subtitle && (
                    <p className="text-blue-600 font-semibold mb-3">{usluga.subtitle}</p>
                  )}
                  <p className="text-gray-600 mb-4">{usluga.description}</p>
                  <Link
                    href={usluga.link}
                    className="text-blue-600 font-semibold hover:text-blue-800 transition inline-flex items-center"
                  >
                    Saznaj više
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

