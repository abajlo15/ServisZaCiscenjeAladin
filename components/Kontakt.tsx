"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  ime: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
  email: z.string().email("Nevažeća email adresa"),
  telefon: z.string().optional(),
  poruka: z.string().min(10, "Poruka mora imati najmanje 10 znakova"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Kontakt() {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/kontakt", {
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
          message: result.message || "Poruka je uspješno poslana!",
        });
        reset();
      } else {
        const errorMessage = result.error || "Greška pri slanju poruke";
        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
        // Loguj detaljne greške u konzolu za debugging
        console.error("Kontakt error:", result);
        if (result.details) {
          console.error("Error details:", result.details);
        }
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Greška pri slanju poruke. Pokušajte ponovno.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Kontaktirajte nas
            </h2>
            <p className="text-xl text-gray-600">
              Imate pitanja? Javite nam se, rado ćemo vam pomoći!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kontakt informacije */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Kontakt informacije</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Adresa</p>
                    <p className="text-gray-600">Ul. Branimira Gušića 4, 23000, Zadar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Radno vrijeme</p>
                    <p className="text-gray-600">Ponedjeljak - Subota: 8:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Telefon</p>
                    <a href="tel:+385992930824" className="text-blue-600 hover:text-blue-800 transition">
                      +385 (0)99 293 0824
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:Serviszaciscenjealadin@gmail.com" className="text-blue-600 hover:text-blue-800 transition">
                      Serviszaciscenjealadin@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontakt forma */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Pošaljite poruku</h3>

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
                  <label htmlFor="kontakt-ime" className="block text-gray-700 font-semibold mb-2">
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    id="kontakt-ime"
                    {...register("ime")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Vaše ime i prezime"
                  />
                  {errors.ime && (
                    <p className="mt-1 text-sm text-red-600">{errors.ime.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="kontakt-email" className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="kontakt-email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="vas@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="kontakt-telefon" className="block text-gray-700 font-semibold mb-2">
                    Telefon (opcionalno)
                  </label>
                  <input
                    type="tel"
                    id="kontakt-telefon"
                    {...register("telefon")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+385 95 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="kontakt-poruka" className="block text-gray-700 font-semibold mb-2">
                    Poruka *
                  </label>
                  <textarea
                    id="kontakt-poruka"
                    {...register("poruka")}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Vaša poruka..."
                  />
                  {errors.poruka && (
                    <p className="mt-1 text-sm text-red-600">{errors.poruka.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Šalje se..." : "Pošalji poruku"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

