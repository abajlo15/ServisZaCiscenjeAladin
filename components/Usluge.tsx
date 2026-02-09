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
      "/Slike/DSC_9150.jpeg",
      "/Slike/DSC_9152.jpeg",
      "/Slike/DSC_9155.jpeg",
      "/Slike/DSC_9158.jpeg",
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
      "/Slike/namjestaj5.jpg",
      "/Slike/namjestaj6.jpg",
    ],
  },
  {
    id: "automobili",
    title: "Kemijsko Čišćenje Automobila",
    description: "Profesionalno kemijsko čišćenje automobila uključuje detaljno čišćenje interijera, uklanjanje mrlja, dezinfekciju i zaštitu kože i tekstila.",
    link: "/usluge#automobili",
    images: [
      "/Slike/DSC_9232.jpeg",
      "/Slike/DSC_9198.jpeg",
      "/Slike/DSC_9242.jpeg",
      "/Slike/DSC_9261.jpeg",
      "/Slike/DSC_9202.jpeg",
    ],
  },
  {
    id: "stanovi",
    title: "Generalno Čišćenje Stanova",
    description: "Kompletan servis generalnog čišćenja stanova uključuje čišćenje svih prostorija, sanitarnih čvorova, kuhinje, prozora i ostalih površina.",
    link: "/usluge#stanovi",
    images: [
      "/Slike/ciscenjestana1.jpeg",
      "/Slike/ciscenjestana2.jpeg",
      "/Slike/ciscenjestana3.jpeg",
      "/Slike/ciscenjestana4.jpeg",
      "/Slike/ciscenjestana5.jpeg",
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
      if (usluga.images && usluga.images.length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => ({
            ...prev,
            [usluga.id]: ((prev[usluga.id] || 0) + 1) % usluga.images.length,
          }));
        }, 4000);
        intervals.push(interval);
      }
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
    <section id="usluge" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Naše Usluge
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Profesionalne usluge čišćenja za vaš dom i ured
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usluge.map((usluga) => {
            const currentIndex = currentImageIndex[usluga.id] || 0;
            const hasImages = usluga.images && usluga.images.length > 0;
            return (
              <div
                key={usluga.id}
                className="bg-white/90 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {hasImages ? (
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
                  {usluga.images.length > 0 && (
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
                  )}

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
                ) : (
                  <div className="h-64 relative overflow-hidden bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Slike uskoro</p>
                    </div>
                  </div>
                )}
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

