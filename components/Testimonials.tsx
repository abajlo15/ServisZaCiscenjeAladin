"use client";

import { useState, useEffect } from "react";

interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
  date?: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/recenzije");
        const data = await response.json();
        
        console.log("API Response:", data); // Debug log
        
        if (data.reviews && data.reviews.length > 0) {
          console.log(`Uspješno dohvaćeno ${data.reviews.length} recenzija`);
          setReviews(data.reviews);
        } else {
          // Ako ima grešku, prikaži je
          if (data.error) {
            console.error("API Error:", data.error);
            setError(data.error);
          } else {
            console.warn("API vratio prazan array recenzija");
            setError("Nema dostupnih recenzija");
          }
          // Fallback na statičke recenzije ako API ne radi
          setReviews([
            {
              name: "Ana M.",
              location: "Zadar",
              text: "Odlična usluga! Tepisi su izgledali kao novi nakon pranja. Profesionalno i brzo.",
              rating: 5,
            },
            {
              name: "Marko P.",
              location: "Zadar",
              text: "Preporučujem svima. Strojno pranje tepiha je bilo izvrsno, a cijena pristupačna.",
              rating: 5,
            },
            {
              name: "Ivana K.",
              location: "Zadar",
              text: "Odlična usluga pranja tepisona. Profesionalno i brzo, preporučujem svima!",
              rating: 5,
            },
            {
              name: "Petar S.",
              location: "Zadar",
              text: "Vrlo zadovoljan uslugom. Tepisi su savršeno očišćeni i brzo vraćeni.",
              rating: 5,
            },
            {
              name: "Marija L.",
              location: "Zadar",
              text: "Profesionalna usluga, preporučujem! Sve je prošlo bez problema.",
              rating: 5,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Greška pri dohvaćanju recenzija");
        // Fallback na statičke recenzije
        setReviews([
          {
            name: "Ana M.",
            location: "Zadar",
            text: "Odlična usluga! Tepisi su izgledali kao novi nakon pranja. Profesionalno i brzo.",
            rating: 5,
          },
          {
            name: "Marko P.",
            location: "Zadar",
            text: "Preporučujem svima. Strojno pranje tepiha je bilo izvrsno, a cijena pristupačna.",
            rating: 5,
          },
          {
            name: "Ivana K.",
            location: "Zadar",
            text: "Odlična usluga pranja tepisona. Profesionalno i brzo, preporučujem svima!",
            rating: 5,
          },
          {
            name: "Petar S.",
            location: "Zadar",
            text: "Vrlo zadovoljan uslugom. Tepisi su savršeno očišćeni i brzo vraćeni.",
            rating: 5,
          },
          {
            name: "Marija L.",
            location: "Zadar",
            text: "Profesionalna usluga, preporučujem! Sve je prošlo bez problema.",
            rating: 5,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Uvijek prikaži točno 5 recenzija
  const displayReviews = reviews.slice(0, 5);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Iskustva Naših Klijenata
          </h2>
          <p className="text-gray-600 text-lg">
            Recenzije s Google-a
          </p>
          {error && (
            <p className="text-red-600 text-sm mt-2">
              ⚠️ {error} (prikazuju se statičke recenzije)
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Učitavanje recenzija...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {displayReviews.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                Trenutno nema dostupnih recenzija.
              </div>
            ) : (
              displayReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="flex items-center mb-4 flex-shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic flex-grow break-words overflow-hidden text-sm leading-relaxed">"{review.text}"</p>
                  <div className="border-t pt-4 mt-auto flex-shrink-0">
                    <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                    {review.date && (
                      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

