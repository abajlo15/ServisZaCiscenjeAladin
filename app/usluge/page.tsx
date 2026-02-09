"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const uslugeDetalji = [
  {
    id: "tepisi",
    title: "Strojno pranje tepiha",
    subtitle: "(Besplatan prikup i dostava)",
    description: "Strojno pranje tepiha uključuje prikup, pranje, ispiranje u centrifugi, sušenje u komori i dostavu tepiha zaštićenih od prljavštine.",
    features: [
      "Besplatan prikup tepiha",
      "Profesionalno pranje",
      "Ispiranje u centrifugi",
      "Sušenje u komori",
      "Besplatna dostava",
      "Zaštita od prljavštine",
    ],
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
    title: "Strojno pranje tepisona",
    description: "Strojno pranje tepisona obuhvaća usisavanje s četkama, tretiranje mrlja, šamponiranje i dubinsko ispiranje s ekstraktorom.",
    features: [
      "Usisavanje s četkama",
      "Tretiranje mrlja",
      "Šamponiranje",
      "Dubinsko ispiranje",
      "Ekstraktor čišćenje",
    ],
    images: [
      "/Slike/DSC_9150.jpeg",
      "/Slike/DSC_9152.jpeg",
      "/Slike/DSC_9155.jpeg",
      "/Slike/DSC_9158.jpeg",
    ],
  },
  {
    id: "namjestaj",
    title: "Dubinsko čišćenje namještaja",
    description: "Profesionalno dubinsko čišćenje namještaja uključuje čišćenje kauča, fotelja, stolica i drugog tapaciranog namještaja pomoću ekstraktora i specijalnih sredstava za dubinsko čišćenje.",
    features: [
      "Čišćenje kauča i fotelja",
      "Čišćenje tapaciranih stolica",
      "Uklanjanje mrlja i mirisa",
      "Ekstraktor čišćenje",
      "Zaštita materijala",
      "Brzo sušenje",
    ],
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
    title: "Kemijsko čišćenje automobila",
    description: "Profesionalno kemijsko čišćenje automobila uključuje detaljno čišćenje interijera, uklanjanje mrlja, dezinfekciju i zaštitu kože i tekstila.",
    features: [
      "Čišćenje interijera",
      "Uklanjanje mrlja",
      "Dezinfekcija",
      "Zaštita kože i tekstila",
      "Čišćenje klima sistema",
      "Poliranje plastike",
    ],
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
    title: "Generalno čišćenje stanova",
    description: "Kompletan servis generalnog čišćenja stanova uključuje čišćenje svih prostorija, sanitarnih čvorova, kuhinje, prozora i ostalih površina.",
    features: [
      "Čišćenje svih prostorija",
      "Sanitarni čvorovi",
      "Čišćenje kuhinje",
      "Čišćenje prozora",
      "Usisavanje i pranje podova",
      "Uklanjanje prašine",
    ],
    images: [
      "/Slike/ciscenjestana1.jpeg",
      "/Slike/ciscenjestana2.jpeg",
      "/Slike/ciscenjestana3.jpeg",
      "/Slike/ciscenjestana4.jpeg",
      "/Slike/ciscenjestana5.jpeg",
    ],
  },
];

export default function UslugePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initialIndexes: { [key: string]: number } = {};
    uslugeDetalji.forEach((usluga) => {
      if (usluga.images) {
        initialIndexes[usluga.id] = 0;
      }
    });
    setCurrentImageIndex(initialIndexes);
  }, []);

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    uslugeDetalji.forEach((usluga) => {
      if (usluga.images && uslugeDetalji.length > 0) {
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
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Naše Usluge
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Profesionalne usluge čišćenja za vaš dom i ured
          </p>
        </div>

        <div className="space-y-16">
          {uslugeDetalji.map((usluga) => {
            const currentIndex = usluga.images ? (currentImageIndex[usluga.id] || 0) : 0;
            return (
              <div
                key={usluga.id}
                id={usluga.id}
                className="scroll-mt-24 bg-white rounded-lg shadow-lg p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {usluga.title}
                    </h2>
                    {usluga.subtitle && (
                      <p className="text-blue-600 font-semibold text-lg mb-4">
                        {usluga.subtitle}
                      </p>
                    )}
                    <p className="text-gray-700 text-lg mb-6">
                      {usluga.description}
                    </p>
                    <ul className="space-y-3">
                      {usluga.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {usluga.images && usluga.images.length > 0 && usluga.images[currentIndex] ? (
                    <div className="md:w-96 flex-shrink-0">
                      <div className="h-64 relative overflow-hidden rounded-lg group">
                        <Image
                          src={usluga.images[currentIndex]}
                          alt={`${usluga.title} - Slika ${currentIndex + 1}`}
                          fill
                          className="object-cover transition-opacity duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        
                        {/* Indikatori */}
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

                        {/* Strelicama */}
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
                    </div>
                  ) : (
                    <div className="md:w-96 flex-shrink-0">
                      <div className="h-64 relative overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">Slike uskoro</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

