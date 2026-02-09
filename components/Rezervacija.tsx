"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const reservationSchema = z.object({
  ime: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Nevažeća email adresa"),
  telefon: z.string().min(6, "Telefon mora imati najmanje 6 znakova"),
  usluga: z.string().min(1, "Morate odabrati uslugu"),
  datum: z.string().min(1, "Morate odabrati datum"),
  vrijeme: z.string().min(1, "Morate odabrati vrijeme"),
  poruka: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const usluge = [
  "Strojno pranje tepiha",
  "Strojno pranje tepisona",
  "Dubinsko čišćenje namještaja",
];

const vremena = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function Rezervacija() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/rezervacija", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Rezervacija je uspješno poslana!",
        });
        reset();
      } else {
        const errorMessage = result.error || "Greška pri slanju rezervacije";
        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
        // Loguj detaljne greške u konzolu za debugging
        console.error("Rezervacija error:", result);
        if (result.details) {
          console.error("Error details:", result.details);
        }
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Greška pri slanju rezervacije. Pokušajte ponovno.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Postavi minimalni datum na danas
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Rezerviraj danas
            </h1>
            <p className="text-xl text-gray-600">
              Rezervirajte uslugu čišćenja online u samo nekoliko klikova
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="ime" className="block text-gray-700 font-semibold mb-2">
                  Ime i prezime *
                </label>
                <input
                  type="text"
                  id="ime"
                  {...register("ime")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Vaše ime i prezime"
                />
                {errors.ime && (
                  <p className="mt-1 text-sm text-red-600">{errors.ime.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="vas@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="telefon" className="block text-gray-700 font-semibold mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="telefon"
                  {...register("telefon")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+385 95 123 4567"
                />
                {errors.telefon && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefon.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="usluga" className="block text-gray-700 font-semibold mb-2">
                  Usluga *
                </label>
                <select
                  id="usluga"
                  {...register("usluga")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Odaberite uslugu</option>
                  {usluge.map((usluga) => (
                    <option key={usluga} value={usluga}>
                      {usluga}
                    </option>
                  ))}
                </select>
                {errors.usluga && (
                  <p className="mt-1 text-sm text-red-600">{errors.usluga.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="datum" className="block text-gray-700 font-semibold mb-2">
                    Datum *
                  </label>
                  <input
                    type="date"
                    id="datum"
                    {...register("datum")}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.datum && (
                    <p className="mt-1 text-sm text-red-600">{errors.datum.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="vrijeme" className="block text-gray-700 font-semibold mb-2">
                    Vrijeme *
                  </label>
                  <select
                    id="vrijeme"
                    {...register("vrijeme")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Odaberite vrijeme</option>
                    {vremena.map((vrijeme) => (
                      <option key={vrijeme} value={vrijeme}>
                        {vrijeme}
                      </option>
                    ))}
                  </select>
                  {errors.vrijeme && (
                    <p className="mt-1 text-sm text-red-600">{errors.vrijeme.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="poruka" className="block text-gray-700 font-semibold mb-2">
                  Dodatna poruka (opcionalno)
                </label>
                <textarea
                  id="poruka"
                  {...register("poruka")}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Dodatne informacije ili posebni zahtjevi..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Šalje se..." : "Pošalji rezervaciju"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

