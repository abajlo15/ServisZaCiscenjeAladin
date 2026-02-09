"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Sadržaj */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Dubinsko čišćenje za temeljitu čistoću svakog kutka vašeg doma ili ureda
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
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
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition text-center"
            >
              Saznaj više
            </Link>
          </div>
          <p className="mt-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Do termina u par koraka
          </p>
        </div>
      </div>
    </section>
  );
}

